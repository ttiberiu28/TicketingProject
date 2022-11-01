package com.endava.demo.controller;

import com.endava.demo.model.Role;
import com.endava.demo.service.RoleService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(Constant.ROLE_CONTROLLER)
@AllArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping(Constant.NEW)
    public void addRole(@RequestBody Role role){
        roleService.addRole(role.getName());
    }
}
