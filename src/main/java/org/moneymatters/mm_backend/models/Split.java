package org.moneymatters.mm_backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Split {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String tag;
    private Integer splitAmount;

    public Split(Integer id, Integer splitAmount, String tag) {
        this.id = id;
        this.splitAmount = splitAmount;
        this.tag = tag;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSplitAmount() {
        return splitAmount;
    }

    public void setSplitAmount(Integer splitAmount) {
        this.splitAmount = splitAmount;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
