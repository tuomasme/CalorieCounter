package com.apps.calorie_counter.victual;

import com.apps.calorie_counter.ingredient.Ingredient;
import com.apps.calorie_counter.meal.Meal;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "victuals")
public class Victual {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "victual", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Ingredient> ingredients;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="meal_id", referencedColumnName = "id")
    private Meal meal;

    public void addIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
        this.ingredients.forEach(i -> i.setVictual(this));
    }

}
