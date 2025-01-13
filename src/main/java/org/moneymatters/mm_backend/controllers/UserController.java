package org.moneymatters.mm_backend.controllers;

import org.moneymatters.mm_backend.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

//    Retrieve all users
    @GetMapping
    public String getAllUsers() {
        return "Retrieve all users enpoint";
    }

    //    Retrieve a user by ID
    @GetMapping("/{id}")
    public String getUserById(@PathVariable int id)  {
        return "Retrieve user by id endpoint";
    }

//    Create new user
    @PostMapping
    public String createUser() {
        return "Create user endpoint";
    }

//    Update an existing user
    @PutMapping("/{id}")
    public String updateUser(@PathVariable int id) {
        return "Update user endpoint";
    }

// Delete a user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        return "Delete user";
    }
}

