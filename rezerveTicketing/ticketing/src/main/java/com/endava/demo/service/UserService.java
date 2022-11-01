package com.endava.demo.service;
import com.endava.demo.exception.*;
import com.endava.demo.model.User;
import com.endava.demo.repository.RoleRepo;
import com.endava.demo.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class UserService {

    private final UserRepo userRepo;
    private final RoleRepo roleRepo;

    private final PasswordEncoder passwordEncoder;

    public void addUser(String username, String password){

        var u = userRepo.findUserByUsernameIgnoreCase(username);

        u.ifPresentOrElse(x -> {

            throw new UserAlreadyExistsException(x.getUsername());
        }, () -> {

            User x = new User();

            x.setUsername(username);
            x.setPassword(passwordEncoder.encode(password));

            userRepo.save(x);

        });
    }

    public List<User> getUserList(){

        return userRepo.findAll().stream()
                .sorted(Comparator.comparing(User::getUsername))
                .collect(Collectors.toList());
    }

    public void deleteById(int id){
        userRepo.deleteById(id);
    }

    public void assignRole(int userId, int roleId){
        var user = userRepo.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistsException(String.valueOf(userId)));
        var role = roleRepo.findById(roleId)
                .orElseThrow(() -> new RoleDoesNotExistsException(String.valueOf(roleId)));

        if(user.getRoles().contains(role)){
            throw new RoleAlreadyExistsException(role.getName());
        }else{
            user.getRoles().add(role);
        }

        role.getUsers().add(user);
    }
}
