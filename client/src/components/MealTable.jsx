import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { getMealsWithCaloriesQuery } from "../querys/querys";

const MealTable = ({ handleOpen, setMealsWithCalories }) => {
  const { data } = useQuery(getMealsWithCaloriesQuery());

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
                <tr key={meal.mealId} className="hover">
                  <td>{moment(meal.mealTime).format("DD.MM.YYYY hh:mm")}</td>
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
                    <button className="btn btn-secondary">Delete</button>
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
