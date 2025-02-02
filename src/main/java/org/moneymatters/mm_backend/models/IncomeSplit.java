package org.moneymatters.mm_backend.models;

import java.util.Map;

public class IncomeSplit {

    private double totalIncome;
    private Map<String, Double> allocations;

    public IncomeSplit(double totalIncome, Map<String, Double> allocations) {
        this.totalIncome = totalIncome;
        this.allocations = allocations;
    }

    public double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Map<String, Double> getAllocations() {
        return allocations;
    }

    public void setAllocations(Map<String, Double> allocations) {
        this.allocations = allocations;
    }
}
