package org.moneymatters.mm_backend.controllers;

import org.moneymatters.mm_backend.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

//    Placeholder for creating new user
    @PostMapping
    public String createUser() {
        return "Create user endpoint";
    }

//    Placeholder for retrieving user by id
    @GetMapping("/{id}")
    public String getUserById(@PathVariable int id)  {
        return "Retrive user by id endpoint";
    }

//    Placeholder for updating user
    @PutMapping("/{id}")
    public String updateUser(@PathVariable int id) {
        return "Update user endpoint";
    }

// Placehold for deleting a user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        return "Delete user";
    }
}
