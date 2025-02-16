package com.apps.calorie_counter.meal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Meal createMeal(Meal meal) {
        return mealRepository.save(meal);
    }

    public void deleteMeal(Long id) {
        if (mealRepository.existsById(id)) {
            mealRepository.deleteById(id);
        } else {
            throw new RuntimeException("Meal not found with id: " + id);
        }
    }

    public Meal updateMeal(Long id, Meal meal) {
        Meal existingMeal = mealRepository.findById(id).orElseThrow(() -> new RuntimeException("Meal not found"));
        existingMeal.setTime(meal.getTime());
        return mealRepository.save(existingMeal);
    }

    public List<IMealCalories> getMealsWithCalories() {
        return mealRepository.getMealsWithCalories();
    }

}
