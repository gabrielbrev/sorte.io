package com.sorte.io.apirestful.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@ToString(exclude = {"user", "giveaway"})
@Entity
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonIgnore
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-entry")
    private User user;

    @ManyToOne
    @JoinColumn(name = "giveaway_id")
    @JsonBackReference("giveaway-entry")
    private Giveaway giveaway;

    private int luckyNumber;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Entry(Giveaway giveaway, User user, int luckyNumber) {
        this.luckyNumber = luckyNumber;
        this.user = user;
        this.giveaway = giveaway;
    }
}
