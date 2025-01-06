package org.moneymatters.mm_backend.controllers;

import org.moneymatters.mm_backend.data.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {

    @Autowired
    private UserRepository userRepository;



}
