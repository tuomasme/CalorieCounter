package com.apps.calorie_counter.meal;

import com.apps.calorie_counter.ingredient.Ingredient;
import com.apps.calorie_counter.ingredient.IngredientRepository;
import com.apps.calorie_counter.victual.Victual;
import com.apps.calorie_counter.victual.VictualRepository;
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

        //ObjectMapper objectMapper = new ObjectMapper();
        //objectMapper.findAndRegisterModules();
        //String jsonString = objectMapper.writeValueAsString(existingMeal);
        //System.out.println(jsonString);

        List<Victual> newVictuals = new ArrayList<>();
        HashSet<Long> victualsToRetain = new HashSet<>();
        HashSet<Long> oldIngredients = new HashSet<>();
        HashSet<Long> ingredientsToRetain = new HashSet<>();

        Meal existingMeal = mealRepository.findById(id).orElseThrow(() -> new RuntimeException("Meal not found"));

        // Add old ingredients of meal to HashSet
        for(Victual v : existingMeal.getVictuals()) {
            for(Ingredient i : v.getIngredients()) {
                oldIngredients.add(i.getId());
            }
        }

        // Update time of meal
        existingMeal.setTime(meal.getTime());

        // Update existing victuals of meal
        for(Victual newVictual : meal.getVictuals()) {
            for(Victual existingVictual : existingMeal.getVictuals()) {
                if(newVictual.getId() != null) {
                    if(newVictual.getId().equals(existingVictual.getId())){
                        victualsToRetain.add(newVictual.getId());
                        existingVictual.setVictualName(newVictual.getVictualName());
                        existingVictual.setIngredients(newVictual.getIngredients());
                        // Check if the ingredients of the victual have changed
                        for(Ingredient existingIngredient : existingVictual.getIngredients()) {
                            for(Ingredient newIngredient : newVictual.getIngredients()) {
                                // Update existing ingredients of victual
                                if(newIngredient.getId() != null && newIngredient.getId().equals(existingIngredient.getId())) {
                                    ingredientsToRetain.add(newIngredient.getId());
                                    existingIngredient.setIngredientName(newIngredient.getIngredientName());
                                    existingIngredient.setIngredientWeight(newIngredient.getIngredientWeight());
                                    existingIngredient.setIngredientCalories(newIngredient.getIngredientCalories());
                                    existingIngredient.setVictual(victualRepository.findById(existingVictual.getId()).orElseThrow());
                                // Add new ingredients of victual
                                } else if(newIngredient.getId() == null) {
                                    List<Ingredient> newIngredients = new ArrayList<>();
                                    newIngredients.add(newIngredient);
                                    existingVictual.addIngredients(newIngredients);
                                }
                            }
                        }
                    }
                // Add new victuals to list
                } else {
                    newVictuals.add(newVictual);
                }
            }
        }

        mealRepository.save(existingMeal);

        // Add new victuals of existing meal
        for (Victual v : newVictuals) {
            v.setMeal(existingMeal);
            existingMeal.addVictuals(newVictuals);
            for (Ingredient i : v.getIngredients()) {
                i.setVictual(v);
            }
        }

        // Delete removed victuals and their ingredients
        for(Victual v : existingMeal.getVictuals()) {
            if(!victualsToRetain.contains(v.getId()) && !newVictuals.contains(v)) {
                for(Ingredient i : v.getIngredients()) {
                    ingredientRepository.deleteRemovedIngredientById(i.getId());
                }
                victualRepository.deleteRemovedVictualById(v.getId());
            }
        }

        // Delete removed ingredients of retained victuals
        for(Long ingredientId : oldIngredients) {
            if(!ingredientsToRetain.contains(ingredientId)) {
                ingredientRepository.deleteRemovedIngredientById(ingredientId);
            }
        }

        return mealRepository.save(existingMeal);
    }

    public List<IMealTotalCalories> getMealTotalCalories() {
        return mealRepository.getMealTotalCalories();
    }

    public List<IMeal> getMealWithVictualsAndIngredientsById(Long id) {
        return mealRepository.getMealWithVictualsAndIngredientsById(id);
    }

}
