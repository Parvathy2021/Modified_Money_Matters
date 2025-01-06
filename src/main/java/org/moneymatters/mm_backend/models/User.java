package org.moneymatters.mm_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

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
    public String password;

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
        this.password = password;
        this.ConfirmPassword = confirmPassword;
        this.email = email;
        validateConfirmPassword();
    }
    public void validateConfirmPassword(){
        if(this.password == null || !this.password.equals(this.ConfirmPassword)){
            throw new IllegalArgumentException("Password do not match");
        }
    }

    public int getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(int user_Id) {
        this.user_Id = user_Id;
    }

    public @NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.") String getUsername() {
        return username;
    }

    public void setUsername(@NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters.") String username) {
        this.username = username;
    }

    public @NotNull @NotBlank(message = "Password must not be blank") @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,16})", message = "Password must be between 8-16 characters, contain at least one letter, one number, and one special character") String getPassword() {
        return password;
    }

    public void setPassword(@NotNull @NotBlank(message = "Password must not be blank") @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[!@#$%^&*])(?=.{8,16})", message = "Password must be between 8-16 characters, contain at least one letter, one number, and one special character") String password) {
        this.password = password;
    }

    public @NotNull @NotBlank(message = "Confirm password must not be blank") String getConfirmPassword() {
        return ConfirmPassword;
    }

    public void setConfirmPassword(@NotNull @NotBlank(message = "Confirm password must not be blank") String confirmPassword) {
        ConfirmPassword = confirmPassword;
    }

    public @NotNull(message = "Email must not be null") @Email(message = "Invalid email format") String getEmail() {
        return email;
    }

    public void setEmail(@NotNull(message = "Email must not be null") @Email(message = "Invalid email format") String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return user_Id == user.user_Id && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(ConfirmPassword, user.ConfirmPassword) && Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_Id, username, password, ConfirmPassword, email);
    }

    @Override
    public String toString() {
        return "User{" +
                "user_Id=" + user_Id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
