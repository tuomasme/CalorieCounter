import { queryOptions } from "@tanstack/react-query";
import {
  getMealsWithCalories,
  getMealWithVictualsAndIngredients,
} from "../services/MealService";

export const getMealsWithCaloriesQuery = () => {
  return queryOptions({
    queryKey: ["mealswithcalories"],
    queryFn: getMealsWithCalories,
  });
};

export const getMealWithVictualsAndIngredientsQuery = () => {
  return queryOptions({
    queryKey: ["mealwithvictualsandingredients"],
    queryFn: getMealWithVictualsAndIngredients,
  });
};
