package org.moneymatters.mm_backend.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@MappedSuperclass
public abstract class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Amount cannot be null")
    @NotBlank(message = "Amount cannot be blank")
    private int amount;

    private boolean isIncome = false;

    @Size(max = 200, message = "Description cannot be larger than 200 characters")
    private String description;

    @OneToOne
    private Budget budget;

    @ManyToOne
    private User user;

    public Entry(int id, int amount, boolean isIncome, String description, Budget budget, User user) {
        this.id = id;
        this.amount = amount;
        this.isIncome = isIncome;
        this.description = description;
        this.budget = budget;
        this.user = user;
    }

    public Entry() {
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Budget getBudget() {
        return budget;
    }

    public void setBudgetId(Budget budget) {
        this.budget = budget;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isIncome() {
        return isIncome;
    }

    public void setIncome(boolean income) {
        isIncome = income;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Entry that = (Entry) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
