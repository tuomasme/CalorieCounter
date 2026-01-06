import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import IngredientFields from "./IngredientFields";
import { useState } from "react";
import { createMeal } from "../services/MealService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMealsWithCaloriesQuery } from "../querys/querys";
import { useAtom, useAtomValue } from "jotai";
import {
  isOpenAtom,
  mealWholeDataAtom,
  modalModeAtom,
  selectedMealIdAtom,
} from "../atoms/atoms";

const MealForm = ({ OnSubmit }) => {
  const queryClient = useQueryClient();
  const [victualCount, setVictualCount] = useState(1);
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const mealDataW = useAtomValue(mealWholeDataAtom);
  const mode = useAtomValue(modalModeAtom);
  const selectedMealId = useAtomValue(selectedMealIdAtom);

  // Merge objects
  function merge(obj1, obj2) {
    let merged = {
      ...obj1,
      ...obj2,
    };
    Object.keys(obj1)
      .filter((k) => obj2.hasOwnProperty(k))
      .forEach((k) => {
        merged[k] = obj1[k] + "," + obj2[k];
      });
    return merged;
  }

  // Set existing victual names as default values for victual name fields
  function handleVictualName() {
    let intialdefaultValues = [];
    let vName = {};
    //var iName = { ingredients: [] };
    var viName = [{}];
    var victualDefaultValues = [];

    if (mealDataW) {
      // Iterate through object of objects
      Object.entries(mealDataW).forEach(([key, val]) => {
        vName = {};
        // key = the name of the current key
        // val = the value of the current key

        let object = {
          id: val.victualId,
          victualName: val.victualName,
          mealId: selectedMealId,
          ingredients: [
            {
              id: val.ingredientId,
              ingredientName: val.ingredientName,
              ingredientWeight: val.ingredientWeight,
              ingredientCalories: val.ingredientCalories,
            },
          ],
        };

        // Check if object with same victual exists
        const i = intialdefaultValues.findIndex(
          (e) => e.victualName === val.victualName
        );
        if (i > -1) {
          // We found at least one object that we're looking for!
          intialdefaultValues[i].ingredients.push({
            id: val.ingredientId,
            ingredientName: val.ingredientName,
            ingredientWeight: val.ingredientWeight,
            ingredientCalories: val.ingredientCalories,
          });
        } else {
          intialdefaultValues.push(object);
        }
      });
    }
    // Remove duplicate victuals
    victualDefaultValues = Array.from(
      new Set(intialdefaultValues.map((o) => JSON.stringify(o)))
    ).map((str) => JSON.parse(str));

    return victualDefaultValues;
  }

  const form = useForm({
    values: {
      time: mode == "edit" && mealDataW[0]?.time ? mealDataW[0]?.time : "",
      victuals:
        mode == "edit"
          ? handleVictualName()
          : [
              {
                victualName: "",
                ingredients: [
                  {
                    ingredientName: "",
                    ingredientWeight: 0,
                    ingredientCalories: 0.0,
                  },
                ],
              },
            ],
    },
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = form;

  const {
    fields,
    append: appendVictual,
    remove: removeVictual,
  } = useFieldArray({
    control,
    name: "victuals",
  });

  const { mutate: createMealMutate } = useMutation({
    mutationFn: createMeal,
    onSuccess: () => {
      queryClient.invalidateQueries([getMealsWithCaloriesQuery]);
    },
  });

  const onSubmit = (data) => {
    if (mode == "add") {
      console.log(mode);
      createMealMutate(data);
    } else {
      console.log(mode);
    }
    OnSubmit(data);
    reset();
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
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
              <div className="flex mb-4 justify-center">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Meal Time</span>
                  </div>
                  <input
                    {...register("time", {
                      required: "Meal time is required",
                    })}
                    type="datetime-local"
                    className="input input-bordered flex items-center gap-2"
                  />
                </label>
              </div>
              {errors.time && (
                <div className="flex mb-4 justify-center text-red-500">
                  {errors.time.message}
                </div>
              )}
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
                          {...register(`victuals.${index}.victualName`)}
                        />
                      </label>
                    </div>
                    <input
                      type="hidden"
                      value={selectedMealId}
                      {...register(`victuals.${index}.mealId`)}
                    />
                    <input
                      type="hidden"
                      {...register(`victuals.${index}.id`)}
                    />
                    <IngredientFields fieldIndex={index} />
                    {/* {victualCount > 1 ? (
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
                    )} */}

                    <section className="mt-4 mb-6 flex justify-center gap-4">
                      <button
                        type="button"
                        className="btn btn-info w-1/3 max-w-xs"
                        onClick={() => {
                          appendVictual({
                            victualName: "",
                            ingredients: [
                              {
                                ingredientName: "",
                                ingredientWeight: 0,
                                ingredientCalories: 0.0,
                                mealId: selectedMealId,
                              },
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
