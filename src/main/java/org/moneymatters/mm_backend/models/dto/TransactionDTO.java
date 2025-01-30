package org.moneymatters.mm_backend.models.dto;


public class TransactionDTO {

    private Integer userId;
    private Integer budgetId;
    private Integer tagId;
    private int amount;
    private String description;
    private boolean isRecurring;
    private boolean isIncome;
    private int recurringDate;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBudgetId() {
        return budgetId;
    }

    public void setBudgetId(Integer budgetId) {
        this.budgetId = budgetId;
    }

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isRecurring() {
        return isRecurring;
    }

    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }

    public boolean isIncome() {
        return isIncome;
    }

    public void setIncome(boolean income) {
        isIncome = income;
    }

    public int getRecurringDate() {
        return recurringDate;
    }

    public void setRecurringDate(int recurringDate) {
        this.recurringDate = recurringDate;
    }
}

