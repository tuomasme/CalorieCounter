import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api";

export const getMeals = () => {
  return axios.get(REST_API_BASE_URL + "/meals");
};

export const createMeal = () => {
  return axios.post(REST_API_BASE_URL + "/meals");
};

export const getMealsWithCalories = () => {
  return axios.get(REST_API_BASE_URL + `/meals/total-calories`);
};

export const getMealWithVictualsAndIngredients = (mealId) => {
  return axios.get(
    REST_API_BASE_URL + `/meals/with-victuals-and-ingredients/` + mealId
  );
};
