import moment from "moment";
import { useEffect, useState } from "react";
import { getMealsWithCalories } from "../api/MealService";

const MealTable = () => {
  const [mealsWithCalories, setmealsWithCalories] = useState([]);

  useEffect(() => {
    getMealsWithCalories()
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setmealsWithCalories(d);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {mealsWithCalories ? (
        <div className="overflow-x-auto mt-10">
          <table className="table">
            <thead>
              <tr>
                <th>Meal time</th>
                <th>Meal calories</th>
              </tr>
            </thead>
            <tbody>
              {mealsWithCalories.map((meal) => (
                <tr key={meal.mealId} className="hover">
                  <td>{moment(meal.mealTime).format("DD.MM.YYYY hh:mm")}</td>
                  <td>{meal.mealCalories}</td>
                  <td>
                    <button className="btn btn-info">Update</button>
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
