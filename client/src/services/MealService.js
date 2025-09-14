import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api";

export const getMeals = () => {
  return axios.get(REST_API_BASE_URL + "/meals");
};

export const createMeal = (meal) => {
  return axios.post(REST_API_BASE_URL + "/meals", meal);
};

export const getMealsWithCalories = () => {
  return axios.get(REST_API_BASE_URL + `/meals/total-calories`);
};

export const getMealWithVictualsAndIngredients = (mealId) => {
  return axios.get(
    REST_API_BASE_URL + `/meals/with-victuals-and-ingredients/` + mealId
  );
};

export const deleteMeal = (id) => {
  return axios.delete(REST_API_BASE_URL + `/meals/${id}`);
};

export const updateMeal = async (meal, mealId) => {
  return axios.put(REST_API_BASE_URL + `/meals/${mealId}`, meal);
};
