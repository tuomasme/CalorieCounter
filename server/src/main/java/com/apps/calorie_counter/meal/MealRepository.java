package com.apps.calorie_counter.meal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query(value = "SELECT m.id as id, m.time as time, COALESCE(SUM(i.ingredient_calories),0) as mealCalories FROM meals m JOIN victuals v ON m.id = v.meal_id JOIN ingredients i ON v.id = i.victual_id GROUP BY m.id", nativeQuery = true)
    List<IMealTotalCalories> getMealTotalCalories();

    @Query(value = "SELECT m.id as mealId, m.time as time, v.id as victualId, v.victual_name as victualName, i.id as ingredientId, i.ingredient_name as ingredientName, i.ingredient_weight as ingredientWeight, i.ingredient_calories as ingredientCalories FROM ingredients i JOIN victuals v ON i.victual_id = v.id JOIN meals m ON v.meal_id = m.id WHERE m.id = ?1", nativeQuery = true)
    List<IMeal> getMealWithVictualsAndIngredientsById(Long id);
}
