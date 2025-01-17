package org.moneymatters.mm_backend.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.List;
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
    @JoinColumn
    private User user;

    @OneToMany(mappedBy = "budget")
    private List<Transaction> transactions = new ArrayList<>();

    @OneToMany(mappedBy = "budget")
    private List<RecurringTransaction> recurringTransactions = new ArrayList<>();

    public Budget(String name, User user) {
        this.name = name;
        this.user = user;
    }

    public Budget(int id, String name, User user, List<Transaction> transactions, List<RecurringTransaction> recurringTransactions) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.transactions = transactions;
        this.recurringTransactions = recurringTransactions;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<Transaction> transactions) {
        this.transactions = transactions;
    }

    public List<RecurringTransaction> getRecurringTransactions() {
        return recurringTransactions;
    }

    public void setRecurringTransactions(List<RecurringTransaction> recurringTransactions) {
        this.recurringTransactions = recurringTransactions;
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
