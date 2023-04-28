package com.endava.demo.repository;

import com.endava.demo.model.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KeywordRepo extends JpaRepository<Keyword, Integer> {

    Optional<Keyword> findByNameIgnoreCase(String name);
}
