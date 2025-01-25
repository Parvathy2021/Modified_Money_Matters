package org.moneymatters.mm_backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;

    @NotNull
    @NotBlank(message = "Name cannot be left blank")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.")
    private String username;

    @NotNull
    @NotBlank(message = "Password must not be blank")
    public String pwhash;

    @NotNull(message = "Email must not be null")
    @Email(message = "Invalid email format")
    private String email;

    @ManyToMany
    private List<Tag> tags = new ArrayList<>();

    @OneToMany
    private List<Budget> budgets;

    public User(){}

    public User(String email, String username, String password) {
        this.email = email;
        this.username = username;
        this.pwhash = encoder.encode(password);

    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setUsername(@NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.") String username) {
        this.username = username;
    }

    public @NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.") String getUsername() {
        return username;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public List<Budget> getBudgets() {
        return budgets;
    }

    public void setBudgets(List<Budget> budgets) {
        this.budgets = budgets;
    }

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public boolean isMatchingPassword(String password){
        return encoder.matches(password, pwhash);
    }

    public @NotNull(message = "Email must not be null") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
