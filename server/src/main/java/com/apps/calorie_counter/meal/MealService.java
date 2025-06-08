package com.apps.calorie_counter.meal;

import com.apps.calorie_counter.ingredient.Ingredient;
import com.apps.calorie_counter.victual.Victual;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public Optional<Meal> getMealById(Long id) {
        return mealRepository.findById(id);
    }

    public Meal createMeal(@RequestBody Meal meal) {
        meal.addVictuals(meal.getVictuals());
        meal.getVictuals().forEach(v -> v.addIngredients(v.getIngredients()));
        return mealRepository.save(meal);
    }

    public void deleteMeal(Long id) {
        if (mealRepository.existsById(id)) {
            mealRepository.deleteById(id);
        } else {
            throw new RuntimeException("Meal not found with id: " + id);
        }
    }

    public Meal updateMeal(Long id, @RequestBody Meal meal) {
        Meal existingMeal = mealRepository.findById(id).orElseThrow(() -> new RuntimeException("Meal not found"));
        existingMeal.setTime(meal.getTime());
        existingMeal.getVictuals().forEach(v -> v.getIngredients().clear());
        existingMeal.getVictuals().clear();

        List<Victual> updatedVictuals = new ArrayList<>(meal.getVictuals());
        List<Ingredient> updatedIngredients = new ArrayList<>();
        updatedVictuals.forEach(v -> updatedIngredients.addAll(v.getIngredients()));
        updatedVictuals.forEach(v -> v.setMeal(existingMeal));

        existingMeal.getVictuals().addAll(updatedVictuals);
        existingMeal.getVictuals().forEach(v -> v.addIngredients(updatedIngredients));
        return mealRepository.save(existingMeal);
    }

    public List<IMealTotalCalories> getMealTotalCalories() {
        return mealRepository.getMealTotalCalories();
    }

    public List<IMeal> getMealWithVictualsAndIngredientsById(Long id) {
        return mealRepository.getMealWithVictualsAndIngredientsById(id);
    }

}
