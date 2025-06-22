package com.sorte.io.apirestful.repository;

import com.sorte.io.apirestful.model.Entry;
import com.sorte.io.apirestful.model.Giveaway;
import com.sorte.io.apirestful.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GiveawayRepository extends JpaRepository<Giveaway, String> {
    @Query("SELECT g FROM Giveaway g WHERE g.title LIKE %:title%")
    List<Giveaway> findByTitle(@Param("title") String title);
}
