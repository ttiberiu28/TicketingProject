package com.endava.demo.repository;

import com.endava.demo.model.Sport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SportRepo extends JpaRepository<Sport, Integer> {

    Optional<Sport> findByNameIgnoreCase(String name);
}
