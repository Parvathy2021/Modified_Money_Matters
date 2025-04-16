package org.moneymatters.mm_backend.models.dto;

import java.util.Map;

public class IncomeSplitDto {

    private Double totalIncome;
    private Map<String, Double> allocations;

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Map<String, Double> getAllocations() {
        return allocations;
    }

    public void setAllocations(Map<String, Double> allocations) {
        this.allocations = allocations;
    }
}
