package org.moneymatters.mm_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.moneymatters.mm_backend.data.UserRepository;
import org.moneymatters.mm_backend.models.User;
import org.moneymatters.mm_backend.models.dto.LoginFormDto;
import org.moneymatters.mm_backend.models.dto.RegistrationFormDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

//    Helper method to store user ID in session
    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getUser_id());
    }

//    Helper method to retrieve user from session
    public User getUserFromSession(HttpSession session) {
        Integer user_id = (Integer) session.getAttribute(userSessionKey);
        if (user_id == null) {
            return null;
        }

        Optional<User> userOpt = userRepository.findById(user_id);
        return userOpt.orElse(null);
    }

//    Registration endpoints
    @GetMapping("/register")
    public ResponseEntity<Map<String, Object>> displayRegistrationForm(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration form loaded");
        response.put("isLoggedIn", session.getAttribute("user") != null);
        response.put("form", new RegistrationFormDto());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> processRegistrationForm(
            @RequestBody @Valid RegistrationFormDto registrationFormDto,
            HttpServletRequest request) {


//        Check if username already exists
        User existingUserUsername = userRepository.findByUsername(registrationFormDto.getUsername());
        if (existingUserUsername != null) {

            Map<String , Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "username_exists");
            errorResponse.put("message", "A user with that username already exists");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Verify password match
        if (!registrationFormDto.getPassword().equals(registrationFormDto.getConfirmPassword())) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "password_mismatch");
            errorResponse.put("message", "Passwords do not match");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        // Check if email already exists
        User existingUserEmail = userRepository.findByEmail(registrationFormDto.getEmail());
        if (existingUserEmail != null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "email_exists");
            errorResponse.put("message", "A user with that email already exists");
            return ResponseEntity.badRequest().body(errorResponse);
        }

//        Create and save new user
        User newUser = new User(
                registrationFormDto.getEmail(),
                registrationFormDto.getUsername(),
                registrationFormDto.getPassword()
        );
        userRepository.save(newUser);
        setUserInSession(request.getSession(), newUser);

        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("message", "Registration successful");
        successResponse.put("userId", newUser.getUser_id());
        successResponse.put("username", newUser.getUsername());
        successResponse.put("email", newUser.getEmail());

        return ResponseEntity.ok(successResponse);
    }

//    Login endpoints
    @GetMapping("/login")
    public ResponseEntity<Map<String, Object>> displayLoginForm(HttpSession session){
        Map<String, Object> response = new HashMap<>();

        response.put("message", "Login form loaded");
        response.put("isLoggdedIn", session.getAttribute("user") != null);
        response.put("form", new LoginFormDto());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> processLoginForm(@RequestBody @Valid LoginFormDto loginFormDto, HttpServletRequest request){

        User theUser = userRepository.findByEmail(loginFormDto.getEmail());

        //Get the password the user given in the form
        String password = loginFormDto.getPassword();

        // Send the User back to form is email does not exist OR if password hash doesn't match
        if(theUser == null || !theUser.isMatchingPassword(password)){
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "invalid_credentials");
            errorResponse.put("message", "Invalid email or password");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
        // Create a new session and return success
        setUserInSession(request.getSession(), theUser);

        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("message", "Login successful");
        successResponse.put("userId", theUser.getUser_id());
        successResponse.put("username", theUser.getUsername());
        successResponse.put("email", theUser.getEmail());

        return ResponseEntity.ok(successResponse);
    }
    // Handler for logout
    @GetMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpServletRequest request) {
        request.getSession().invalidate();

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Logged out successfully");

        return ResponseEntity.ok(response);
    }
    }


