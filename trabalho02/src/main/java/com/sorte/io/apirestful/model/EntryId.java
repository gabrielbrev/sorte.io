package com.sorte.io.apirestful.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class EntryId implements Serializable {
    private String userId;
    private String giveawayId;

    public EntryId(String giveawayId, String userId) {
        this.giveawayId = giveawayId;
        this.userId = userId;
    }
}
