import NavBar from "./components/NavBar";
import MealTable from "./components/MealTable";
import MealForm from "./components/MealForm";
import { updateMeal } from "./services/MealService";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMealsWithCaloriesQuery } from "./querys/querys";
import { useAtom, useSetAtom } from "jotai";
import {
  isOpenAtom,
  mealDataAtom,
  mealWholeDataAtom,
  modalModeAtom,
  selectedMealIdAtom,
} from "./atoms/atoms";

const REST_API_BASE_URL = "http://localhost:8080/api";

export default function App() {
  const [modalMode, setModalMode] = useAtom(modalModeAtom);
  const [mealData, setMealData] = useAtom(mealDataAtom);
  const setIsOpen = useSetAtom(isOpenAtom);
  const setMealWholeData = useSetAtom(mealWholeDataAtom);
  const queryClient = useQueryClient();
  const setSelectedMealId = useSetAtom(selectedMealIdAtom);

  const handleOpen = (mode, meal) => {
    if (mode == "edit") {
      setMealData(meal);
      axios
        .get(
          REST_API_BASE_URL + `/meals/with-victuals-and-ingredients/` + meal.id
        )
        .then((res) => {
          setMealWholeData(res.data);
          setSelectedMealId(meal.id);
        });
    }
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
      //console.log("modal mode Add");
    } else {
      //console.log("New meal data:", newMealData);
      try {
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
      <MealForm OnSubmit={handleSubmit} />
    </>
  );
}
