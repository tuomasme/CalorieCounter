package com.apps.calorie_counter.meal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/meals")
public class MealController {

    @Autowired
    private MealService mealService;

    @GetMapping
    public ResponseEntity<List<Meal>> getAllMeals() {
        List<Meal> meals = mealService.getAllMeals();
        return ResponseEntity.ok(meals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Meal> getMealById(@PathVariable Long id) {
        Optional<Meal> meal = mealService.getMealById(id);
        return meal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Meal createMeal(@RequestBody Meal meal) {
        return mealService.createMeal(meal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Meal> updateMeal(@PathVariable Long id, @RequestBody Meal meal) throws IOException {
        Meal updatedMeal = mealService.updateMeal(id, meal);
        return ResponseEntity.ok(updatedMeal);
    }

    @GetMapping("/total-calories")
    public List<IMealTotalCalories> getMealTotalCalories() {
        return mealService.getMealTotalCalories();
    }

    @GetMapping("/with-victuals-and-ingredients/{id}")
    public List<IMeal> getMealWithVictualsAndIngredientsById(@PathVariable Long id) {
        return mealService.getMealWithVictualsAndIngredientsById(id);
    }
}
