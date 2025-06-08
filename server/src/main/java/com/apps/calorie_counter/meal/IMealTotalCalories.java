package com.apps.calorie_counter.meal;

import java.time.LocalDateTime;

public interface IMealTotalCalories {
    Long getId();
    LocalDateTime getTime();
    Double getMealCalories();
}
