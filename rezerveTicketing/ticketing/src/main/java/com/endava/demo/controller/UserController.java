package com.endava.demo.controller;

import com.endava.demo.dto.AssignUserRoleRequest;
import com.endava.demo.dto.UserDto;
import com.endava.demo.exception.*;
import com.endava.demo.model.User;
import com.endava.demo.service.UserService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.naming.AuthenticationException;
import java.util.List;

@RestController
@RequestMapping(Constant.USER_CONTROLLER)
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> registerUser(@RequestBody User user){

        try{
            userService.addUser(user.getUsername(), user.getPassword(), user.getConfirmPassword(),
                    user.getEmail(),user.getFirstName(),user.getLastName());
            return ResponseEntity
                    .ok()
                    .body("Successful signup");
        }catch(PasswordDoesNotMatchException | WrongEmailFormatException e){
            return ResponseEntity
                    .badRequest()
                    .body("Password does not match or wrong format for email.");
        }

    }

    @PostMapping(Constant.LOGIN)
    public ResponseEntity<?> login(@RequestBody User user){
        User authenticatedUser = userService.login(user.getUsername(), user.getPassword());

        UserDto userDto = new UserDto(authenticatedUser.getId(), authenticatedUser.getUsername());
        return ResponseEntity.ok(userDto);
    }
    @GetMapping(Constant.LIST)
    public List<User> getUsers(){
        return userService.getUserList();
    }

    @DeleteMapping(Constant.DELETION)
    public void deleteUserById(User user){
        userService.deleteById(user.getId());
    }

    @PutMapping(Constant.ASSIGN_ROLE)
    public ResponseEntity<?> assignRole(@RequestBody AssignUserRoleRequest assignUserRoleRequest){

        try{

            userService.assignRole(assignUserRoleRequest.getUserId(), assignUserRoleRequest.getRoleId());
            return ResponseEntity
                    .ok()
                    .body("Role was assigned successfully");

        }catch (UserDoesNotExistsException | RoleDoesNotExistsException | RoleAlreadyExistsException e){
            return ResponseEntity
                    .badRequest()
                    .body("User or role do not exist or " +
                            "role is already assigned for this user");
        }
    }
}
