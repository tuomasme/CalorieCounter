package com.apps.calorie_counter.ingredient;

import com.apps.calorie_counter.victual.Victual;
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
    @Column(name = "ingredient_id")
    private Long ingredientId;
    @Column(name = "ingredient_name")
    private String ingredientName;
    @Column(name = "ingredient_weight")
    private Integer ingredientWeight;
    private Double ingredientCalories;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="victual_id", nullable=false)
    private Victual victual;
}
