import { queryOptions } from "@tanstack/react-query";
import { getMealsWithCalories } from "../services/MealService";

export const getMealsWithCaloriesQuery = () => {
  return queryOptions({
    queryKey: ["mealswithcalories"],
    queryFn: getMealsWithCalories,
  });
};
