package com.endava.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLoginDto {
    private int id;
    private String username;
    private String email;
}

