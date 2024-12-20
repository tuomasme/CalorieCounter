package com.apps.calorie_counter.victual;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VictualService {

    @Autowired
    private VictualRepository victualRepository;

    public List<Victual> getAllVictuals() {
        return victualRepository.findAll();
    }

    public Optional<Victual> getVictualById(Long id) {
        return victualRepository.findById(id);
    }

    public Victual createVictual(Victual victual) {
        return victualRepository.save(victual);
    }

    public void deleteVictual(Long id) {
        if (victualRepository.existsById(id)) {
            victualRepository.deleteById(id);
        } else {
            throw new RuntimeException("Victual not found with id: " + id);
        }
    }

    public Victual updateVictual(Long id, Victual victual) {
        Victual existingVictual = victualRepository.findById(id).orElseThrow(() -> new RuntimeException("Victual not found"));
        existingVictual.setName(victual.getName());
        existingVictual.setWeight(victual.getWeight());
        existingVictual.setIngredients(victual.getIngredients());
        existingVictual.setMeal(victual.getMeal());
        return victualRepository.save(existingVictual);
    }
}
