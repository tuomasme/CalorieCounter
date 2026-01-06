package com.apps.calorie_counter.ingredient;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM ingredients i WHERE i.id = ?1", nativeQuery = true)
    void deleteRemovedIngredientById(Long ingredientId);
}
