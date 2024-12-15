package com.apps.calorie_counter.meal;

import com.apps.calorie_counter.victual.Victual;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meals")
public class Meal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meal_id")
    private Long mealId;
    @Column(name = "meal_time")
    private LocalDateTime mealTime;
    @OneToMany(mappedBy="meal", cascade = CascadeType.ALL)
    private List<Victual> victuals;

}
