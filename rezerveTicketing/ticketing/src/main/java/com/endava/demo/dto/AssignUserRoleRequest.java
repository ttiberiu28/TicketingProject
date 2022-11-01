package com.endava.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignUserRoleRequest {

    private int userId;
    private int roleId;
}
