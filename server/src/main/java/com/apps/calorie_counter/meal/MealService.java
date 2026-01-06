package com.apps.calorie_counter.meal;

import com.apps.calorie_counter.ingredient.Ingredient;
import com.apps.calorie_counter.ingredient.IngredientRepository;
import com.apps.calorie_counter.victual.Victual;
import com.apps.calorie_counter.victual.VictualRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {

    @Autowired
    private MealRepository mealRepository;
    @Autowired
    private VictualRepository victualRepository;
    @Autowired
    private IngredientRepository ingredientRepository;

    public List<Meal> getAllMeals() {
        return mealRepository.findAll();
    }

    public Optional<Meal> getMealById(Long id) {
        return mealRepository.findById(id);
    }

    public Meal createMeal(@RequestBody Meal meal) {
        meal.addVictuals(meal.getVictuals());
        meal.getVictuals().forEach(v -> v.addIngredients(v.getIngredients()));
        return mealRepository.save(meal);
    }

    public void deleteMeal(Long id) {
        if (mealRepository.existsById(id)) {
            mealRepository.deleteById(id);
        } else {
            throw new RuntimeException("Meal not found with id: " + id);
        }
    }

    public Meal updateMeal(Long id, @RequestBody Meal meal) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();

        List<Victual> newVictualsList = new ArrayList<>();
        List<Ingredient> newAllIngredientsList = new ArrayList<>();
        Meal existingMeal = mealRepository.findById(id).orElseThrow(() -> new RuntimeException("Meal not found"));
        existingMeal.setTime(meal.getTime());
        HashSet<Long> victualsToRetain = new HashSet<>();
        HashSet<Long> ingredientsToRetain = new HashSet<>();

        //String jsonString = objectMapper.writeValueAsString(existingMeal);
        //System.out.println(jsonString);

        // Update victuals
        for(Victual newVictual : meal.getVictuals()) {
            for(Victual existingVictual : existingMeal.getVictuals()) {
                // Check if existing victual has changed
                if(newVictual.getId() != null) {
                    if(newVictual.getId().equals(existingVictual.getId())){
                        victualsToRetain.add(newVictual.getId());
                        existingVictual.setVictualName(newVictual.getVictualName());
                        existingVictual.setIngredients(newVictual.getIngredients());
                        // Check if ingredients of existing victuals have changed
                        for(Ingredient existingIngredient : existingVictual.getIngredients()) {
                            for(Ingredient newIngredient : newVictual.getIngredients()) {
                                // Update existing ingredients of existing victuals
                                if(newIngredient.getId() != null && newIngredient.getId().equals(existingIngredient.getId())) {
                                    ingredientsToRetain.add(newIngredient.getId());
                                    existingIngredient.setIngredientName(newIngredient.getIngredientName());
                                    existingIngredient.setIngredientWeight(newIngredient.getIngredientWeight());
                                    existingIngredient.setIngredientCalories(newIngredient.getIngredientCalories());
                                    existingIngredient.setVictual(victualRepository.findById(existingVictual.getId()).orElseThrow());
                                // Add new ingredients of existing victuals
                                } else if(newIngredient.getId() == null) {
                                    List<Ingredient> newIngredientsList = new ArrayList<>();
                                    newIngredientsList.add(newIngredient);
                                    newAllIngredientsList.add(newIngredient);
                                    existingVictual.addIngredients(newIngredientsList);
                                }
                            }
                        }
                    }
                // Add new victuals to list
                } else {
                    newVictualsList.add(newVictual);
                    newAllIngredientsList.addAll(newVictual.getIngredients());
                }
            }
        }

        mealRepository.save(existingMeal);

        // Add new victuals of existing meal
        for (Victual v : newVictualsList) {
            v.setMeal(existingMeal);
            existingMeal.addVictuals(newVictualsList);
            for (Ingredient i : v.getIngredients()) {
                i.setVictual(v);
            }
        }

        // Delete removed victuals and ingredients of removed victuals
        for(Victual v : existingMeal.getVictuals()) {
            if(!victualsToRetain.contains(v.getId()) && !newVictualsList.contains(v)) {
                for(Ingredient i : v.getIngredients()) {
                    ingredientRepository.deleteRemovedIngredients(i.getId());
                }
                victualRepository.deleteRemovedVictual(v.getId());
            }
        }

        //String jsonString2 = objectMapper.writeValueAsString(existingMeal);
        //System.out.println(jsonString2);

        return mealRepository.save(existingMeal);
    }

    public List<IMealTotalCalories> getMealTotalCalories() {
        return mealRepository.getMealTotalCalories();
    }

    public List<IMeal> getMealWithVictualsAndIngredientsById(Long id) {
        return mealRepository.getMealWithVictualsAndIngredientsById(id);
    }

}
