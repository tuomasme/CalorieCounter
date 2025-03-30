import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const IngredientFields = ({ fieldIndex }) => {
  const [ingredientCount, setIngredientCount] = useState(1);
  const { register } = useFormContext();
  const {
    fields: ingredients,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: `victuals.${fieldIndex}.ingredients`,
  });

  return (
    <fieldset>
      <div className="flex justify-center">
        <legend>Victual Ingredients</legend>
      </div>
      {ingredients.map((ingredient, index) => (
        <section key={ingredient.id} className="mb-4">
          <div className="flex justify-center">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Ingredient Name</span>
              </div>
              <input
                className="input input-bordered"
                {...register(
                  `victuals.${fieldIndex}.ingredients.${index}.name`
                )}
              />
            </label>
          </div>
          <div className="flex justify-center gap-4">
            <label className="form-control w-1/3 max-w-xs">
              <div className="label">
                <span className="label-text">Ingredient Weight</span>
              </div>
              <input
                type="number"
                min="0.0"
                step="1"
                className="input input-bordered"
                {...register(
                  `victuals.${fieldIndex}.ingredients.${index}.weight`
                )}
              />
            </label>
            <label className="form-control w-1/3 max-w-xs">
              <div className="label">
                <span className="label-text">Ingredient Calories</span>
              </div>
              <input
                type="number"
                min="0.0"
                step=".1"
                className="input input-bordered"
                {...register(
                  `victuals.${fieldIndex}.ingredients.${index}.calories`
                )}
              />
            </label>
          </div>
          {ingredientCount > 1 ? (
            <div className="flex justify-center">
              <button
                type="button"
                className="btn btn-secondary w-full max-w-xs mt-2"
                onClick={() => {
                  removeIngredient(index);
                  setIngredientCount(ingredientCount - 1);
                }}
              >
                Remove
              </button>
            </div>
          ) : null}
        </section>
      ))}
      <div className="flex justify-center">
        <button
          type="button"
          className="btn btn-info w-full max-w-xs"
          onClick={() => {
            appendIngredient({ name: "", weight: 0, calories: 0.0 });
            setIngredientCount(ingredientCount + 1);
          }}
        >
          Append Ingredient
        </button>
      </div>
    </fieldset>
  );
};

export default IngredientFields;
