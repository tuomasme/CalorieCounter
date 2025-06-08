import { useState } from "react";
import NavBar from "./components/NavBar";
import MealTable from "./components/MealTable";
import MealForm from "./components/MealForm";
import { updateMeal } from "./services/MealService";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMealsWithCaloriesQuery } from "./querys/querys";
const REST_API_BASE_URL = "http://localhost:8080/api";
export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [mealData, setMealData] = useState([]);
  const queryClient = useQueryClient();

  const handleOpen = (mode, meal) => {
    setMealData(meal);
    console.log("Meal to be updated: ", meal);
    setModalMode(mode);
    setIsOpen(true);
  };

  const { mutate: updateMealMutate } = useMutation({
    mutationFn: ({ data, id }) => updateMeal(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries([getMealsWithCaloriesQuery]);
    },
  });

  const handleSubmit = (newMealData) => {
    if (modalMode === "add") {
      console.log("modal mode Add");
    } else {
      console.log("New meal data:", newMealData);
      try {
        console.log(mealData.id);
        updateMealMutate({ data: newMealData, id: mealData.id });
      } catch (error) {
        console.error("Error updating meal:", error);
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <MealTable handleOpen={handleOpen} />
      <MealForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        mealData={mealData}
      />
    </>
  );
}
