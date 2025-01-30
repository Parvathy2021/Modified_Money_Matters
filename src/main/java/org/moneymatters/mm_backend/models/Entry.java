package org.moneymatters.mm_backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.Objects;

@MappedSuperclass
public abstract class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull(message = "Amount cannot be null")
    private Integer amount;

    private boolean isIncome = false;

    @Size(max = 200, message = "Description cannot be larger than 200 characters")
    private String description;

    @ManyToOne
    @JoinColumn(name = "budget_id", unique = false)
    @JsonBackReference
    private Budget budget;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @JsonIgnoreProperties({"transactions", "budgets"})
    private User user;

    @Column(name="created_date", updatable = false)
    private LocalDateTime createdDate;

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

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    @PrePersist
    public void prePersist(){
        this.createdDate = LocalDateTime.now();
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
