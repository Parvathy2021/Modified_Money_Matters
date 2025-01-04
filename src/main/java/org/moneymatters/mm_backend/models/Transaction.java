package org.moneymatters.mm_backend.models;


import jakarta.persistence.Entity;

@Entity
public class Transaction extends Entry{

    private boolean isRecurring = false;

    public Transaction(boolean isRecurring) {
        super();
        this.isRecurring = isRecurring;
    }

    public Transaction() { };

    public boolean isRecurring() {
        return isRecurring;
    }

    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }

}
