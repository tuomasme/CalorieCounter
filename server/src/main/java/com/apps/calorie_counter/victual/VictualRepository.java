package com.apps.calorie_counter.victual;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface VictualRepository extends JpaRepository<Victual, Long> {
}
