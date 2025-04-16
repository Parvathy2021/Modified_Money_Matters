package org.moneymatters.mm_backend.models.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class LoginFormDto {

    @NotNull(message = "Email must not be null")
    @NotBlank(message = "Email must not be blank")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull
    @NotBlank(message = "Password must not be blank")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,16}$", message = "Password must be between 8-16 characters, contain at least one letter, one number, and one special character")
    private String password;

    public LoginFormDto() {}

    public String getEmail() {
        return email;
    }

    public void setEmail (String email) {
        this.email = email;
    }

    public  String getPassword() {
        return password;
    }

    public void setPassword (String password) {
        this.password = password;
    }
}
