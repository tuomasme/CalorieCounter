package com.apps.calorie_counter.ingredient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    IngredientRepository ingredientRepository;

    public Optional<Ingredient> getIngredientById(Long id) {
        return ingredientRepository.findById(id);
    }

    public Ingredient createIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public void deleteIngredient(Long id) {
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
        } else {
            throw new RuntimeException("Ingredient not found with id: " + id);
        }
    }

    public Ingredient updateIngredient(Long id, Ingredient ingredient) {
        Ingredient existingIngredient = ingredientRepository.findById(id).orElseThrow(() -> new RuntimeException("Ingredient not found"));
        existingIngredient.setIngredientName(ingredient.getIngredientName());
        existingIngredient.setIngredientWeight(ingredient.getIngredientWeight());
        existingIngredient.setIngredientCalories(ingredient.getIngredientCalories());
        existingIngredient.setVictual(ingredient.getVictual());
        return ingredientRepository.save(existingIngredient);
    }
}
