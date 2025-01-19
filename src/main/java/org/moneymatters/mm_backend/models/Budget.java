package org.moneymatters.mm_backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @NotBlank (message = "Name cannot be left blank")
    @Size(min = 3, max = 30, message = "Name must be longer than 3 characters but shorter than 30 characters.")
    private String name;

    @ManyToOne
    @JoinColumn(name = "user_user_id", nullable = false)
    private User user;

    public Budget() {}

    public Budget(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Budget(int id, String name, User user) {
        this.id = id;
        this.name = name;
        this.user = user;
    }

    public int getId() {
        return id;
    }


    public @NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Name must be longer than 3 characters but shorter than 30 characters.") String getName() {
        return name;
    }

    public void setName(@NotNull @NotBlank(message = "Name cannot be left blank") @Size(min = 3, max = 30, message = "Name must be longer than 3 characters but shorter than 30 characters.") String name) {
        this.name = name;
    }

    public int getUser_id() {
        return user.getUser_id();
    }

    public void setUser_id(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Budget budget = (Budget) o;
        return id == budget.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
