package org.moneymatters.mm_backend.models;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

import java.util.List;

@Entity
public class Transaction extends Entry{

    private boolean isRecurring = false;

    @ManyToOne
    private Tag tag;

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

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }
}
