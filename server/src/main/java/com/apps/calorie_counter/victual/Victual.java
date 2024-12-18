package com.apps.calorie_counter.victual;

import com.apps.calorie_counter.ingredient.Ingredient;
import com.apps.calorie_counter.meal.Meal;
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
    @Column(name = "weight")
    private Integer weight;
    @OneToMany(mappedBy = "victual", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients;
    @ManyToOne
    @JoinColumn(name="meal_id", nullable=false)
    private Meal meal;

}
