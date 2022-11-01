package com.endava.demo.repository;

import com.endava.demo.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MovieRepo extends JpaRepository<Movie,Integer> {
    Optional<Movie> findByNameIgnoreCase(String name);

}
