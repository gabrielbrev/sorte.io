package com.sorte.io.apirestful.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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
    @JsonManagedReference("user-owner")
    private List<Giveaway> ownedGiveaways;

    @OneToMany(mappedBy = "winner")
    @JsonManagedReference("user-winner")
    private List<Giveaway> wonGiveaways;

    @OneToMany(mappedBy = "user")
    @JsonManagedReference("user-entry")
    private List<Entry> entries;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
