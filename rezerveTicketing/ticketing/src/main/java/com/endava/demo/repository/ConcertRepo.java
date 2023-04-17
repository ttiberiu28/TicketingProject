package com.endava.demo.repository;

import com.endava.demo.model.Concert;
import com.endava.demo.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConcertRepo extends JpaRepository<Concert, Integer> {

    Optional<Concert> findByNameIgnoreCase(String name);
}
