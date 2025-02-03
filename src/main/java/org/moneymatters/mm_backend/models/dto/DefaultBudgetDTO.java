package org.moneymatters.mm_backend.models.dto;

public class DefaultBudgetDTO {
    private String name;
    private Double amount;
    private Boolean isDefault;

    public DefaultBudgetDTO(String name, Boolean isDefault) {
        this.name = name;
        this.isDefault = isDefault;
    }

    public String getName() {return name;}
    public void setName(String name) {this.name = name;}

    public Boolean isDefault() {return isDefault;}
    public void setDefault(Boolean isDefault) {this.isDefault = isDefault;}
}
