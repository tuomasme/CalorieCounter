import { useEffect, useState } from "react";
import { getMeals } from "../api/MealService";

const TableList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    getMeals()
      .then((res) => res.json())
      .then((d) => {
        setMeals(d);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="overflow-x-auto mt-10">
        <table className="table">
          <thead>
            <tr>
              <th>Meal time</th>
            </tr>
          </thead>
          <tbody>
            {meals
              ? meals.map((meal) => (
                  <tr key={meal.id} className="hover">
                    <td>{meal.time}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableList;
