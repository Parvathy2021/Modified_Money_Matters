package org.moneymatters.mm_backend.models;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.YearMonth;

@Entity
public class RecurringTransaction extends Entry {


    @NotNull (message = "Day cannot be null")
    @NotBlank(message = "Day cannot be blank")
    @Min(value = 1, message = "Number cannot be less than 1 or greater than 31")
    @Max(value = 31, message = "Number cannot be less than 1 or greater than 31")
    private int recurringDay;

    private LocalDate nextTransactionDate;


    //This is a method to get what the nextTransactionDate should be after a recurring transaction occurs. If the recurring date is the 30-31 and we reach a month that doesn't have that like February, this will set the next date to be the last day of the month. -Cy
    public LocalDate calculateNextTransactionDate() {

        YearMonth yearMonth = YearMonth.now();
        int maxDays = yearMonth.lengthOfMonth();

        int validDay = Math.min(recurringDay,maxDays);
        return LocalDate.of(yearMonth.getYear(), yearMonth.getMonth(), validDay);

    }

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
