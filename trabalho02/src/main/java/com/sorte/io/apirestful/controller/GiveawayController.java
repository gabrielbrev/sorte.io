package com.sorte.io.apirestful.controller;

import com.sorte.io.apirestful.dto.request.JoinGiveawaysRequest;
import com.sorte.io.apirestful.dto.response.JoinGiveawaysResponse;
import com.sorte.io.apirestful.model.Giveaway;
import com.sorte.io.apirestful.service.GiveawayService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("giveaways")
@CrossOrigin("http://localhost:5173")
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

    @GetMapping("/find-ended")
    public List<Giveaway> findEnded() { return giveawayService.findEndedGiveaways();}

    @GetMapping("/search")
    public List<Giveaway> findByTitle(@RequestParam("title") String title) {
        return giveawayService.findByTitle(title);
    }

    @PostMapping()
    public void createGiveaway(@RequestBody Giveaway giveaway) {
        giveawayService.createGiveaway(giveaway);
    }

    @PutMapping()
    public Giveaway updateGiveaway(@RequestBody Giveaway giveaway) { return giveawayService.updateGiveaway(giveaway); }

    @DeleteMapping
    public void deleteGiveaway(@RequestParam("id") String id) { giveawayService.deleteGiveaway(id); }

    @PostMapping("/join")
    public JoinGiveawaysResponse joinGiveaways(@RequestBody JoinGiveawaysRequest request) {
        return giveawayService.joinGiveaway(request);
    }

    @PutMapping("/draw")
    public Giveaway drawGiveaway(@RequestParam("id") String id) {
        return giveawayService.generateWinningNumber(id);
    }
}
