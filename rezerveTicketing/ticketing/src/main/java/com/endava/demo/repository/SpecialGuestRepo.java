package com.endava.demo.repository;

import com.endava.demo.model.SpecialGuest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpecialGuestRepo extends JpaRepository<SpecialGuest, Integer> {

    Optional<SpecialGuest> findByNameIgnoreCase(String name);
}
