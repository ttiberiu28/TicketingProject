package com.endava.demo.repository;

import com.endava.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role, Integer> {

    Optional<Role> findByNameIgnoreCase(String name);
}
