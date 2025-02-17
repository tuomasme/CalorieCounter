const REST_API_BASE_URL = "http://localhost:8080/api";

export const getMeals = () => {
  return fetch(REST_API_BASE_URL + "/meals", {
    method: "GET",
  });
};

export const getMealsWithCalories = () => {
  return fetch(REST_API_BASE_URL + `/meals/calories`, {
    method: "GET",
  });
};
