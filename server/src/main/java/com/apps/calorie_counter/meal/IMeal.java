package com.apps.calorie_counter.meal;

import java.time.LocalDateTime;

public interface IMeal {
    LocalDateTime getTime();
    String getVictualName();
    Long getIngredientId();
    String getIngredientName();
    Integer getIngredientWeight();
    Double getIngredientCalories();
    Long getVictualId();
    Long getMealId();
}
