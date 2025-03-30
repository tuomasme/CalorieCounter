import { useFieldArray, useFormContext } from "react-hook-form";

const IngredientFields = ({ fieldIndex }) => {
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
        <legend>Ingredients</legend>
      </div>
      {ingredients.map((ingredient, index) => (
        <section key={ingredient.id} className="flex justify-center gap-4">
          <input
            className="input input-bordered"
            {...register(`victuals.${fieldIndex}.ingredients.${index}.name`)}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => removeIngredient(index)}
          >
            Remove
          </button>
        </section>
      ))}
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className="btn btn-success"
          onClick={() => appendIngredient({ name: "" })}
        >
          Append Ingredient
        </button>
      </div>
    </fieldset>
  );
};

export default IngredientFields;
