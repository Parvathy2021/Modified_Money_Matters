package org.moneymatters.mm_backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Budget {

    @Id
    @GeneratedValue
    private int id;

    @NotNull
    @NotBlank (message = "Name cannot be left blank")
    @Size(min = 3, max = 30, message = "Name must be longer than 3 characters but shorter than 30 characters.")
    private String name;

    private int user_id;

    public Budget(String name, int user_id) {
        this.name = name;
        this.user_id = user_id;
    }

    public Budget(int id, String name, int user_id) {
        this.id = id;
        this.name = name;
        this.user_id = user_id;
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
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}
