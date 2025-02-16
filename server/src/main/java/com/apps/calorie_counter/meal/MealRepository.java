package com.apps.calorie_counter.meal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends JpaRepository<Meal, Long> {

    @Query(value = "SELECT m.id as mealId, m.time as mealTime, SUM(i.calories) as mealCalories FROM meals m JOIN victuals v ON m.id = v.meal_id JOIN ingredients i ON v.id = i.victual_id GROUP BY m.id", nativeQuery = true)
    List<IMealCalories> getMealsWithCalories();

}
