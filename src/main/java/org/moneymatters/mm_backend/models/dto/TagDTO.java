package org.moneymatters.mm_backend.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.moneymatters.mm_backend.models.Tag;

public class TagDTO {

    private Integer id;

    @NotBlank(message = "Tag name is required")
    @Size(min = 2, max = 30, message = "Tag name must be between 2 and 30 characters")
    @Pattern(regexp = "^[a-zA-Z0-9\\s-]+$", message = "Tag name can only contain letters, numbers, spaces, and hyphens")
    private String name;

    @Pattern(regexp = "^#([A-Fa-f0-9]{6})$",
            message = "Color must be a valid 6-digit hex code (e.g., #FF0000)")
    private String color;

    private boolean isDefault;

    public TagDTO() {
        this.color = "#808080";
        this.isDefault = false;
    }

    public TagDTO(String name, String color) {
        this.name = name;
        this.color = color != null ? color : "#808080";
        this.isDefault = false;
    }

    public TagDTO(String name, String color, boolean isDefault) {
        this.name = name;
        this.color = color;
        this.isDefault = isDefault;
    }

    public Integer setId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name.trim();
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }

    public static TagDTO fromEntity(Tag tag) {
        TagDTO dto = new TagDTO();
        dto.setId(tag.getId());
        dto.setName(tag.getName());
        dto.setColor(tag.getColor());
        dto.setDefault(tag.isDefault());
        return dto;
    }
}
