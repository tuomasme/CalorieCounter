import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import IngredientFields from "./IngredientFields";

const defaultValues = {
  victuals: [{ name: "", ingredients: [{ name: "" }] }],
};

const MealForm = ({ isOpen, onClose, mode, OnSubmit }) => {
  const form = useForm({
    defaultValues,
  });
  const { control, handleSubmit, register } = form;
  const {
    fields,
    append: appendVictual,
    remove: removeVictual,
  } = useFieldArray({
    control,
    name: "victuals",
  });

  const onSubmit = (data) => {
    console.log(data);
    OnSubmit();
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal" open={isOpen}>
        <div className="modal-box">
          <div className="flex justify-center">
            <h3 className="font-bold text-lg py-4">
              {mode === "edit" ? "Edit meal" : "Add meal"}
            </h3>
          </div>
          <FormProvider {...form}>
            <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
              <div className="flex mb-4 justify-center">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Meal Time</span>
                  </div>
                  <input
                    {...register("mealTime", {
                      required: "Meal time is required",
                    })}
                    type="datetime-local"
                    className="input input-bordered flex items-center gap-2"
                  />
                </label>
              </div>
              <div>
                {fields.map((field, index) => (
                  <fieldset key={field.id}>
                    <div className="flex justify-center">
                      <legend>Victual {index + 1}</legend>
                    </div>
                    <div className="flex mb-4 justify-center">
                      <input
                        className="input input-bordered"
                        {...register(`victuals.${index}.name`)}
                      />
                    </div>
                    <IngredientFields fieldIndex={index} />
                    <section className="mt-4 mb-6 flex justify-center gap-4">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() =>
                          appendVictual({ name: "", ingredients: [] })
                        }
                      >
                        Append Victual
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => removeVictual(index)}
                      >
                        Remove
                      </button>
                    </section>
                  </fieldset>
                ))}
              </div>
              <div className="flex justify-end">
                <button type="submit" className="btn btn-success">
                  {mode === "edit" ? "Save changes" : "Add meal"}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </dialog>
    </>
  );
};

export default MealForm;
