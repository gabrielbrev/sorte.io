package com.sorte.io.apirestful.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Entry {
    @EmbeddedId
    private EntryId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("giveawayId")
    @JoinColumn(name = "giveaway_id")
    private Giveaway giveaway;

    private int luckyNumber;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Entry(Giveaway giveaway, User user, int luckyNumber) {
        this.id = new EntryId(giveaway.getId(), user.getId());
        this.luckyNumber = luckyNumber;
    }
}
