package com.endava.demo.service;

import com.endava.demo.exception.RoleAlreadyExistsException;
import com.endava.demo.model.Role;
import com.endava.demo.repository.RoleRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class RoleService {

    private final RoleRepo roleRepo;

    public void addRole(String name){

        var r = roleRepo.findByNameIgnoreCase(name);

        r.ifPresentOrElse(x -> {

            throw new RoleAlreadyExistsException(x.getName());
        }, () -> {

            Role x = new Role();

            x.setName(name);

            roleRepo.save(x);

        });
    }
}
