package com.sorte.io.apirestful.repository;

import com.sorte.io.apirestful.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EntryRepository extends JpaRepository<Entry, String> {
    @Query("SELECT e FROM Entry e JOIN FETCH e.luckyNumber WHERE e.giveaway.id = :giveawayId")
    List<Entry> findGiveawayEntries(@Param("giveawayId") String giveawayId);
}
