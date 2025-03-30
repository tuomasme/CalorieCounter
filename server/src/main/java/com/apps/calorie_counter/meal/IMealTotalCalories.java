package com.apps.calorie_counter.meal;

import java.time.LocalDateTime;

public interface IMealTotalCalories {
    Long getMealId();
    LocalDateTime getMealTime();
    Double getMealCalories();
}
