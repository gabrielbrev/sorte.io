package com.sorte.io.apirestful.controller;

import com.sorte.io.apirestful.dto.request.JoinGiveawayRequest;
import com.sorte.io.apirestful.model.Giveaway;
import com.sorte.io.apirestful.service.GiveawayService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("giveaways")
public class GiveawayController {
    @Autowired
    private GiveawayService giveawayService;

    @GetMapping
    public List<Giveaway> findAll() {
        return giveawayService.findAll();
    }

    @GetMapping("/find")
    public Giveaway findById(@RequestParam("id") String id) {
        return giveawayService.findById(id);
    }

    @GetMapping("/search")
    public List<Giveaway> findByTitle(@RequestParam("title") String title) {
        return giveawayService.findByTitle(title);
    }

    @PostMapping("/new")
    public void createGiveaway(@RequestBody Giveaway giveaway) {
        giveawayService.createGiveaway(giveaway);
    }

    @PostMapping("/join")
    public List<Integer> joinGiveaways(@RequestBody JoinGiveawayRequest request) {
        return giveawayService.joinGiveaway(request.getGiveawayId(), request.getUserId(), request.getNumEntries());
    }

    @PutMapping("/draw")
    public Giveaway drawGiveaway(@RequestBody Giveaway giveaway) {
        return giveawayService.generateWinningNumber(giveaway.getId());
    }
}
