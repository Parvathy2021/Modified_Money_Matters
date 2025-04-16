package org.moneymatters.mm_backend.models.dto;

import java.util.List;

public class SplitDto {

        private Integer splitAmount;
        private Integer tagId;

    public Integer getTagId() {
        return tagId;
    }

    public void setTagId(Integer tagId) {
        this.tagId = tagId;
    }

    public Integer getSplitAmount() {
            return splitAmount;
        }

        public void setSplitAmount(Integer splitAmount) {
            this.splitAmount = splitAmount;
        }
    }
