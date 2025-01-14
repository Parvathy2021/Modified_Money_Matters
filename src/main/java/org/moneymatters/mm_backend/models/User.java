package org.moneymatters.mm_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Objects;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_Id;

    @NotNull
    @NotBlank(message = "Name cannot be left blank")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.")
    private String username;

    @NotNull
    @NotBlank(message = "Password must not be blank")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,16})", message = "Password must be between 8-16 characters, contain at least one letter, one number, and one special character")
    public String pwhash;

    @NotNull
    @NotBlank(message = "Confirm password must not be blank")
    private String ConfirmPassword;

    @NotNull(message = "Email must not be null")
    @Email(message = "Invalid email format")
    private String email;

    public User(){}

    public User(int user_Id, String username, String password, String confirmPassword, String email) {
        this.user_Id = user_Id;
        this.username = username;
        this.pwhash = encoder.encode(password);
        this.email = email;
    }

    public void setUsername(@NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.") String username) {
        this.username = username;
    }

    public @NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.") String getUsername() {
        return username;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean isMatchingPassword(String password){
        return encoder.matches(password, pwhash);
    }

    public @NotNull(message = "Email must not be null") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }


}
