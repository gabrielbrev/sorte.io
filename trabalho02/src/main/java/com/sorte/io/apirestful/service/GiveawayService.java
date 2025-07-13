package com.sorte.io.apirestful.service;

import com.sorte.io.apirestful.dto.request.JoinGiveawaysRequest;
import com.sorte.io.apirestful.dto.response.JoinGiveawaysResponse;
import com.sorte.io.apirestful.model.Entry;
import com.sorte.io.apirestful.model.Giveaway;
import com.sorte.io.apirestful.model.User;
import com.sorte.io.apirestful.repository.EntryRepository;
import com.sorte.io.apirestful.repository.GiveawayRepository;
import com.sorte.io.apirestful.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public Page<Giveaway> findActiveGiveaways(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return giveawayRepository.findActiveGiveaways(pageable);
    }

    public Giveaway findById(String id) {
        return giveawayRepository.findById(id).orElseThrow(() -> new RuntimeException("Giveaway not found"));
    }

    public List<Giveaway> findByTitle(String title) {
        return giveawayRepository.findByTitle(title);
    }

    public List<Giveaway> findEndedGiveaways() {
        return giveawayRepository.findEndedGiveaways();
    }

    public void createGiveaway(Giveaway giveaway) {
        giveawayRepository.save(giveaway);
    }

    public Giveaway updateGiveaway(Giveaway giveaway) {
        Optional<Giveaway> optionalGiveaway = giveawayRepository.findById(giveaway.getId());
        if (optionalGiveaway.isPresent()) {
            Giveaway g = optionalGiveaway.get();

            if (g.getWinner() != null) {
                throw new RuntimeException("Giveaway has ended");
            }

            giveaway.setOwner(g.getOwner());
            return giveawayRepository.save(giveaway);
        }

        throw new RuntimeException("Giveaway not found");
    }

    public void deleteGiveaway(String id) {
        giveawayRepository.deleteById(id);
    }

    public JoinGiveawaysResponse joinGiveaway(JoinGiveawaysRequest data) {
        User user = userRepository.findById(data.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        List<Entry> newEntries = new ArrayList<>();

        JoinGiveawaysResponse response = new JoinGiveawaysResponse();
        List<JoinGiveawaysResponse.Item> responseItems = new ArrayList<>();

        for (JoinGiveawaysRequest.Item item : data.getItems()) {
            String giveawayId = item.getGiveawayId();
            int num = item.getNumEntries();

            Giveaway giveaway = giveawayRepository.findById(giveawayId).orElseThrow(() -> new RuntimeException("Giveaway not found"));
            List<Entry> entries = entryRepository.findGiveawayEntries(giveawayId);

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

            for (int i = 0; i < num; i++) {
                newEntries.add(new Entry(giveaway, user, generatedNumbers.get(i)));
            }

            JoinGiveawaysResponse.Item responseItem = new JoinGiveawaysResponse.Item();
            responseItem.setGiveawayId(giveawayId);
            responseItem.setLuckyNumbers(generatedNumbers);
            responseItems.add(responseItem);
        }

        entryRepository.saveAll(newEntries);
        response.setItems(responseItems);

        return response;
    }

    public Giveaway generateWinningNumber(String giveawayId) {
        Giveaway giveaway = giveawayRepository.findById(giveawayId).orElseThrow(() -> new RuntimeException("Giveaway not found"));

        List<Entry> entries = entryRepository.findGiveawayEntries(giveawayId);
        int randomNumber = ThreadLocalRandom.current().nextInt(0, entries.size());
        Entry winningEntry = entries.get(randomNumber);

        giveaway.setWinner(winningEntry.getUser());
        giveaway.setLuckyNumber(winningEntry.getLuckyNumber());
        giveawayRepository.save(giveaway);

        return giveaway;
    }
}

