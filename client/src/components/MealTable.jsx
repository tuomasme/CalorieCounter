import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMealsWithCaloriesQuery } from "../querys/querys";
import { useState } from "react";
import { deleteMeal } from "../services/MealService";

const MealTable = ({ handleOpen }) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(getMealsWithCaloriesQuery());
  const [setError, error] = useState(null);
  const [mealData, setMealData] = useState([]); //
  const { mutate: deleteMealMutate } = useMutation({
    mutationFn: deleteMeal,
    onSuccess: () => {
      queryClient.invalidateQueries([getMealsWithCaloriesQuery]);
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meal?"
    );
    if (confirmDelete) {
      try {
        deleteMealMutate(id);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {data ? (
        <div className="overflow-x-auto mt-10">
          <table className="table">
            <thead>
              <tr>
                <th>Meal time</th>
                <th>Meal calories</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((meal) => (
                <tr key={meal.id} className="hover">
                  <td>{moment(meal.time).format("DD.MM.YYYY hh:mm")}</td>
                  <td>{meal.mealCalories}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleOpen("edit", meal)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDelete(meal.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-row min-h-screen justify-center items-center">
          <p>Meals not found.</p>
        </div>
      )}
    </>
  );
};

export default MealTable;
