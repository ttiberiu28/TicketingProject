package com.endava.demo.controller;

import com.endava.demo.service.UserPreferenceServer;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(Constant.USER_PREFERENCE_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserPreferenceController {
    private final UserPreferenceServer userPreferenceServer;

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> saveUserPreferences(@RequestParam("userId") int userId, @RequestBody Map<String, Object> userPreferenceData) {
        try {
            userPreferenceServer.saveUserPreferences(userId, userPreferenceData);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping(Constant.DELETEALL)
    public ResponseEntity<?> deleteUserPreferences(@RequestParam("userId") int userId) {
        try {
            userPreferenceServer.deleteUserPreferences(userId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
