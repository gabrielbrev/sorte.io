package com.sorte.io.apirestful.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    @Column(columnDefinition = "TEXT")
    private String description;
    private double entryPrice;
    private int numEntries;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @JsonIgnoreProperties({"wonGiveaways", "ownedGiveaways", "entries"})
    private User owner;

    @ManyToOne
    @JoinColumn(name = "winner_id")
    @JsonIgnoreProperties({"wonGiveaways", "ownedGiveaways", "entries"})
    private User winner;
    private Integer luckyNumber;

    @OneToMany(mappedBy = "giveaway")
    @JsonIgnore
    private List<Entry> entries = new ArrayList<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public int getSoldEntries() { return entries == null ? 0 : entries.size(); }

    public Giveaway(String title, String description, double entryPrice, int numEntries, String imageUrl, User owner) {
        this.title = title;
        this.description = description;
        this.entryPrice = entryPrice;
        this.numEntries = numEntries;
        this.owner = owner;
        this.imageUrl = imageUrl;
    }
}
