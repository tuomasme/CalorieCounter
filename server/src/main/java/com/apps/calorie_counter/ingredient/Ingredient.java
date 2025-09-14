package com.apps.calorie_counter.ingredient;

import com.apps.calorie_counter.victual.Victual;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ingredients")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "ingredient_name")
    private String ingredientName;
    @Column(name = "ingredient_weight")
    private Integer ingredientWeight;
    @Column(name = "ingredient_calories")
    private Double ingredientCalories;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="victual_id", referencedColumnName = "id")
    private Victual victual;
}
