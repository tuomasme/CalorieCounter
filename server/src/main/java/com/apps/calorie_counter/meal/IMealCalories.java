package com.apps.calorie_counter.meal;

import java.time.LocalDateTime;

public interface IMealCalories {
    Long getMealId();
    LocalDateTime getMealTime();
    Double getMealCalories();
}
