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
    @Column(name = "victual_id")
    private Long victualId;
    @Column(name = "victual_name")
    private String victualName;
    @Column(name = "victual_weight")
    private Integer victualWeight;
    @OneToMany(mappedBy = "victual", cascade = CascadeType.ALL)
    private List<Ingredient> ingredients;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="meal_id", nullable=false)
    private Meal meal;

}
