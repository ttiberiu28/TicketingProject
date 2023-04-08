package com.endava.demo.repository;

import com.endava.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Integer> {

    Optional<User> findUserByUsernameIgnoreCase(String username);

    Optional<User> findUserByUsernameOrEmailIgnoreCase(String username, String email);
}
