package com.apps.calorie_counter.victual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/victuals")
public class VictualController {

    @Autowired
    private VictualService victualService;

    @GetMapping
    public ResponseEntity<List<Victual>> getAllVictuals() {
        List<Victual> victuals = victualService.getAllVictuals();
        return ResponseEntity.ok(victuals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Victual> getVictualById(@PathVariable Long id) {
        Optional<Victual> victual = victualService.getVictualById(id);
        return victual.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Victual createVictual(@RequestBody Victual victual) {
        return victualService.createVictual(victual);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVictual(@PathVariable Long id) {
        victualService.deleteVictual(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Victual> updateVictual(@PathVariable Long id, @RequestBody Victual victual) {
        Victual updatedVictual = victualService.updateVictual(id, victual);
        return ResponseEntity.ok(updatedVictual);
    }
}
