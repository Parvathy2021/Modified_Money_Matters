package org.moneymatters.mm_backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.YearMonth;

@Entity
public class RecurringTransaction extends Entry {

    @ManyToOne
    private Transaction transaction;


    @Min(value = 1, message = "Number cannot be less than 1 or greater than 31")
    @Max(value = 31, message = "Number cannot be less than 1 or greater than 31")
    private int recurringDay;

    private LocalDate nextTransactionDate;

    @ManyToOne
    @JsonIgnore
    private Tag tag;


    //This is a method to get what the nextTransactionDate should be after a recurring transaction occurs. If the recurring date is the 30-31 and we reach a month that doesn't have that like February, this will set the next date to be the last day of the month. -Cy
    public LocalDate calculateNextTransactionDate() {

        YearMonth yearMonth = YearMonth.now();
        int maxDays = yearMonth.lengthOfMonth();

        int validDay = Math.min(recurringDay,maxDays);
        return LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), validDay);

    }

    public RecurringTransaction(int id, int amount, boolean isIncome, String description, Budget budget, User user, Transaction transaction, int recurringDay, Tag tag) {
        super();
        this.transaction = transaction;
        this.recurringDay = recurringDay;
        this.tag = tag;
        this.nextTransactionDate = calculateNextTransactionDate();
    }

    public RecurringTransaction(){}

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public int getRecurringDay() {
        return recurringDay;
    }

    public void setRecurringDay(int recurringDay) {
        this.recurringDay = recurringDay;
    }

    public LocalDate getNextTransactionDate() {
        return nextTransactionDate;
    }

    public void setNextTransactionDate(LocalDate nextTransactionDate) {
        this.nextTransactionDate = nextTransactionDate;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }
}
