package com.endava.demo.repository;

import com.endava.demo.model.User;
import com.endava.demo.model.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPreferenceRepo extends JpaRepository<UserPreference, Integer> {
    void deleteByUser(User user);
}
