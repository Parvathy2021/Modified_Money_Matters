package org.moneymatters.mm_backend.models;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Entity
public class RecurringTransaction extends Entry {


    @NotNull (message = "Day cannot be null")
    @NotBlank(message = "Day cannot be blank")
    @Min(value = 1, message = "Number cannot be less than 1 or greater than 31")
    @Max(value = 31, message = "Number cannot be less than 1 or greater than 31")
    private int recurringDay;

    private LocalDate nextTransactionDate;

    //Need to create a method to calculate the nextTransactionDate -Cy


    public RecurringTransaction(int recurringDay) {
        super();
        this.recurringDay = recurringDay;
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

}
