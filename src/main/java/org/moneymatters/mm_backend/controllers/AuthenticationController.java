package org.moneymatters.mm_backend.controllers;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.moneymatters.mm_backend.data.UserRepository;
import org.moneymatters.mm_backend.models.User;
import org.moneymatters.mm_backend.models.dto.LoginFormDto;
import org.moneymatters.mm_backend.models.dto.RegistrationFormDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@Controller
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    private static final String userSessionKey = "user";

    private static void setUserInSession(HttpSession session, User user) {
        session.setAttribute(userSessionKey, user.getUser_id());
    }

    public User getUserFromSession(HttpSession session) {

        Integer user_id = (Integer) session.getAttribute(userSessionKey);

        if (user_id == null) {
            return null;
        }

        Optional<User> userOpt = userRepository.findById(user_id);

        if (userOpt.isEmpty()) {
            return null;
        }
        return userOpt.get();
    }

    @GetMapping("/register")
    public String displayRegistrationForm(Model model, HttpSession session) {
        model.addAttribute(new RegistrationFormDto());
        model.addAttribute("loggedIn", session.getAttribute("user") != null);
        return "register";

    }

    @PostMapping("/register")
    public String processRegistrationForm(@ModelAttribute @Valid RegistrationFormDto registrationFormDto, Errors errors, HttpServletRequest request) {

        // send user back to form if errors are found
        if (errors.hasErrors()) {
            return "register";
        }

        // Look up user in database using username they provided in the form
        User existingUserUsername = userRepository.findByUsername(registrationFormDto.getUsername());

        // Send user back to form if username already exists
        if (existingUserUsername != null) {
            errors.rejectValue("username", "username.alreadyExists", "A user with that username already exists ");
            return "register";
        }

        // Send user back to form if passwords didn't match
        String password = registrationFormDto.getPassword();
        String confirmPassword = registrationFormDto.getConfirmPassword();
        if (!password.equals(confirmPassword)) {
            errors.rejectValue("password", "password.mismatch", "Password do not match");
            return "register";
        }

        // Look up user in database using email they provided in the form
        User existingUserEmail= userRepository.findByEmail(registrationFormDto.getEmail());

        // Send user back to form if email already exists
        if (existingUserEmail != null) {
            errors.rejectValue("email", "email.alreadyExists", "A user with that email already exists ");
            return "register";
        }

        // Create a new session for the user and take them to the budget page.
       User newUser = new User(registrationFormDto.getEmail(), registrationFormDto.getPassword());
        userRepository.save(newUser);
        setUserInSession(request.getSession(),newUser);
        return "redirect:/budget";
    }

    // Handlers for login form
    @GetMapping("/login")
    public String displayLoginForm(Model model, HttpSession session){
        model.addAttribute(new LoginFormDto());
        model.addAttribute("loggedIn", session.getAttribute("user") != null);
        return "login";
    }

    @PostMapping("/login")
    public String processLoginForm(@ModelAttribute @Valid LoginFormDto loginFormDto, Errors errors, HttpServletRequest request){

        // Send user back to form if errors are found
        if(errors.hasErrors()){
            return "login";
        }

        User theUser = userRepository.findByEmail(loginFormDto.getEmail());

        //Get the password the user given in the form
        String password = loginFormDto.getPassword();

        // Send the User back to form is email does not exist OR if password hash doesn't match
        if(theUser == null || !theUser.isMatchingPassword(password)){
            errors.rejectValue("password","login.invalid", "Credentials invalid. Please try again with correct email/password combination.");
            return "login";
        }
        // Create a new session for the user and take them to the budget page.
        setUserInSession(request.getSession(), theUser);
        return "redirect:/budget";
    }
    // Handler for logout
    @GetMapping("/logout")
    public String logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return "redirect:/login";
    }
}