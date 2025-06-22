package com.sorte.io.apirestful.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Giveaway {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String title;
    private String description;
    private double entryPrice;
    private int numEntries;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonBackReference("user-owner")
    private User owner;

    @ManyToOne
    @JoinColumn(name = "winner_id", nullable = true)
    @JsonBackReference("user-winner")
    private User winner;

    @OneToMany(mappedBy = "giveaway")
    @JsonManagedReference("giveaway-entry")
    private List<Entry> entries;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
