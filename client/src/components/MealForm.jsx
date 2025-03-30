import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import IngredientFields from "./IngredientFields";
import { useState } from "react";

const defaultValues = {
  victuals: [
    { name: "", ingredients: [{ name: "", weight: 0, calories: 0.0 }] },
  ],
};

const MealForm = ({ isOpen, onClose, mode, OnSubmit }) => {
  const [victualCount, setVictualCount] = useState(1);
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
                      <legend>Meal Victual</legend>
                    </div>
                    <div className="flex mb-4 justify-center">
                      <label className="form-control w-full max-w-xs">
                        <div className="label">
                          <span className="label-text">Victual Name</span>
                        </div>
                        <input
                          className="input input-bordered"
                          {...register(`victuals.${index}.name`)}
                        />
                      </label>
                    </div>
                    <IngredientFields fieldIndex={index} />
                    {victualCount > 1 ? (
                      <section className="mt-4 mb-6 flex justify-center gap-4">
                        <button
                          type="button"
                          className="btn btn-info w-1/3 max-w-xs"
                          onClick={() => {
                            appendVictual({
                              name: "",
                              ingredients: [
                                { name: "", weight: 0, calories: 0.0 },
                              ],
                            });
                            setVictualCount(victualCount + 1);
                          }}
                        >
                          Append Victual
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary w-1/3 max-w-xs"
                          onClick={() => {
                            console.log(index);
                            removeVictual(index);
                            setVictualCount(victualCount - 1);
                          }}
                        >
                          Remove
                        </button>
                      </section>
                    ) : (
                      <section className="mt-4 mb-6 flex justify-center gap-4">
                        <button
                          type="button"
                          className="btn btn-info w-full max-w-xs"
                          onClick={() => {
                            appendVictual({
                              name: "",
                              ingredients: [
                                { name: "", weight: 0, calories: 0.0 },
                              ],
                            });
                            setVictualCount(victualCount + 1);
                          }}
                        >
                          Append Victual
                        </button>
                      </section>
                    )}
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
