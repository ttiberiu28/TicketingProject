package com.endava.demo.repository;

import com.endava.demo.model.StandUp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StandUpRepo extends JpaRepository<StandUp, Integer> {
    Optional<StandUp> findByNameIgnoreCase(String name);

}

