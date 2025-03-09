package org.moneymatters.mm_backend.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties({"user", "tag", "hibernateLazyInitializer", "handler"})
@Entity
public class Transaction extends Entry{

    private boolean isRecurring;

    @ManyToOne
    @JsonIgnore
    private Tag tag;

    @OneToMany(mappedBy = "transaction", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("transaction")
    private List<Split> splits;

    private boolean isSplit;

    public Transaction(int id, Double amount, boolean isIncome, String description, Budget budget, User user, boolean isRecurring, Tag tag, List<Split> splits, boolean isSplit) {
        super(id, amount, isIncome, description, budget, user);
        this.isRecurring = isRecurring;
        this.tag = tag;
        this.splits = splits;
        this.isSplit = isSplit;
    }

    public Transaction(boolean isRecurring) {
        super();
        this.isRecurring = isRecurring;
    }

    public boolean isSplit() {
        return isSplit;
    }

    public void setSplit(boolean split) {
        isSplit = split;
    }

    public void updateIsSplitStatus(){
        if (splits != null && !splits.isEmpty()) {
            this.isSplit = true;
        } else {
            this.isSplit = false;
        }
    }

    public Transaction() { };

    public List<Split> getSplits() {
        return splits;
    }

    public void setSplits(List<Split> splits) {
        this.splits = splits;
        updateIsSplitStatus();
    }

    public void addSplit(Split split){
        if(this.splits == null){
            this.splits = new ArrayList<>();
        }
        this.splits.add(split);
        updateIsSplitStatus();
    }

    public void removeSplit (Split split){
        if(this.splits != null){
            this.splits.remove(split);
            updateIsSplitStatus();
        }
    }

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
