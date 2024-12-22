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
    @Column(name = "id")
    private Long id;
    @Column(name = "time")
    private LocalDateTime time;
    @OneToMany(mappedBy="meal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Victual> victuals;

}
