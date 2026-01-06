package com.apps.calorie_counter.victual;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface VictualRepository extends JpaRepository<Victual, Long> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM victuals v WHERE v.id = ?1", nativeQuery = true)
    void deleteRemovedVictual(Long aLong);
}
