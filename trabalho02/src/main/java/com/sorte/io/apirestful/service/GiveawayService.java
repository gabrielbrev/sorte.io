package com.sorte.io.apirestful.service;

import com.sorte.io.apirestful.model.Entry;
import com.sorte.io.apirestful.model.Giveaway;
import com.sorte.io.apirestful.model.User;
import com.sorte.io.apirestful.repository.EntryRepository;
import com.sorte.io.apirestful.repository.GiveawayRepository;
import com.sorte.io.apirestful.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class GiveawayService {
    @Autowired
    private GiveawayRepository giveawayRepository;

    @Autowired
    private EntryRepository entryRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Giveaway> findAll() {
        return giveawayRepository.findAll();
    }

    public Giveaway findById(String id) {
        Optional<Giveaway> giveaway = giveawayRepository.findById(id);

        if (giveaway.isEmpty()) {
            throw new RuntimeException("Giveaway not found");
        }

        return giveaway.get();
    }

    public List<Giveaway> findByTitle(String title) {
        return giveawayRepository.findByTitle(title);
    }

    public void createGiveaway(Giveaway giveaway) {
        giveawayRepository.save(giveaway);
    }

    public List<Integer> joinGiveaway(String giveawayId, String userId, int num) {
        List<Entry> entries = entryRepository.findGiveawayEntries(giveawayId);

        Optional<Giveaway> optionalGiveaway = giveawayRepository.findById(giveawayId);
        if (optionalGiveaway.isEmpty()) {
            throw new RuntimeException("Giveaway not found");
        }

        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Giveaway giveaway = optionalGiveaway.get();
        User user = optionalUser.get();

        List<Integer> existingEntries = new ArrayList<>();
        for (Entry entry : entries) {
            existingEntries.add(entry.getLuckyNumber());
        }

        List<Integer> generatedNumbers = new ArrayList<>();
        for (int i = 0; i < num; i++) {
            int randomNumber;
            do {
                randomNumber = ThreadLocalRandom.current().nextInt(1, giveaway.getNumEntries() + 1);
            } while (generatedNumbers.contains(randomNumber) || existingEntries.contains(randomNumber));
            generatedNumbers.add(randomNumber);
        }

        List<Entry> newEntries = new ArrayList<>();
        for (int i = 0; i < num; i++) {
            newEntries.add(new Entry(giveaway, user, generatedNumbers.get(i)));
        }

        entryRepository.saveAll(newEntries);

        return generatedNumbers;
    }

    public Giveaway generateWinningNumber(String giveawayId) {
        Optional<Giveaway> optionalGiveaway = giveawayRepository.findById(giveawayId);
        if (optionalGiveaway.isEmpty()) throw new RuntimeException("Giveaway not found");
        Giveaway giveaway = optionalGiveaway.get();

        List<Entry> entries = entryRepository.findGiveawayEntries(giveawayId);
        int randomNumber = ThreadLocalRandom.current().nextInt(0, entries.size());
        Entry winningEntry = entries.get(randomNumber);

        giveaway.setWinner(winningEntry.getUser());
        giveawayRepository.save(giveaway);

        return giveaway;
    }
}
