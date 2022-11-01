package com.endava.demo.repository;

import com.endava.demo.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepo extends JpaRepository<Location, Integer> {
    Optional<Location> findByPlace(String place);
}
