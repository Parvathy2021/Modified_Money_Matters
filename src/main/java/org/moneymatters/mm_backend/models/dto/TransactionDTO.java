package org.moneymatters.mm_backend.models.dto;


import java.util.List;

public class TransactionDTO {

    private Integer userId;
    private Integer budgetId;
    private Integer tagId;
    private int amount;
    private String description;
    private boolean isRecurring;
    private boolean isIncome;
    private int recurringDate;
    private List<SplitDto> splits;

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

    public double getAmount() {
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

    public List<SplitDto> getSplits() {
        return splits;
    }

    public void setSplits(List<SplitDto> splits) {
        this.splits = splits;
    }

    // Nested DTO for split
    public static class SplitDto{

            private Integer splitAmount;
            private String tag;

            public String getTag() {
                return tag;
            }

            public void setTag(String tag) {
                this.tag = tag;
            }

            public Integer getSplitAmount() {
                return splitAmount;
            }

            public void setSplitAmount(Integer splitAmount) {
                this.splitAmount = splitAmount;
            }
        }

}

