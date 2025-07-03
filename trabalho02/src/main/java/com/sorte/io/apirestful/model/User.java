package com.sorte.io.apirestful.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;
    @Email
    private String email;
    private String password;
    private String phoneNumber;

    @OneToMany(mappedBy = "owner")
    @JsonIgnoreProperties({"owner", "winner", "entries"})
    private List<Giveaway> ownedGiveaways;

    @OneToMany(mappedBy = "winner")
    @JsonIgnoreProperties({"owner", "winner", "entries"})
    private List<Giveaway> wonGiveaways;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Entry> entries;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @JsonIgnoreProperties({"owner", "winner", "entries"})
    public List<Giveaway> getParticipatingGiveaways() {
        Map<String, Giveaway> giveaways = new HashMap<>();
        for (Entry entry : entries) {
            Giveaway giveaway = entry.getGiveaway();
            giveaways.put(giveaway.getId(), giveaway);
        }

        return new ArrayList<>(giveaways.values());
    }
}