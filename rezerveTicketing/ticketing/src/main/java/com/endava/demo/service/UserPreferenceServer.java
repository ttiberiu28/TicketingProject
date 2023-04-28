package com.endava.demo.service;

import com.endava.demo.exception.KeywordDoesNotExistsException;
import com.endava.demo.exception.UserDoesNotExistsException;
import com.endava.demo.model.Keyword;
import com.endava.demo.model.User;
import com.endava.demo.model.UserPreference;
import com.endava.demo.repository.KeywordRepo;
import com.endava.demo.repository.UserPreferenceRepo;
import com.endava.demo.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class UserPreferenceServer {

    private final UserPreferenceRepo userPreferenceRepo;
    private final UserRepo userRepo;
    private final KeywordRepo keywordRepo;


    public void saveUserPreferences(int userId, Map<String, Object> userPreferenceData) {
        User user = userRepo.findById(userId).orElseThrow(() -> new UserDoesNotExistsException("User not found with id: " + userId));

        UserPreference userPreference = new UserPreference();
        userPreference.setUser(user);

        Boolean outside = (Boolean) userPreferenceData.get("outside");
        String genre = (String) userPreferenceData.get("genre");
        Double budgetMin = ((Number) userPreferenceData.get("budgetMin")).doubleValue();
        Double budgetMax = ((Number) userPreferenceData.get("budgetMax")).doubleValue();

        userPreference.setOutside(outside);
        userPreference.setGenre(genre);
        userPreference.setBudgetMin(budgetMin);
        userPreference.setBudgetMax(budgetMax);

        userPreferenceRepo.save(userPreference);
    }


}
