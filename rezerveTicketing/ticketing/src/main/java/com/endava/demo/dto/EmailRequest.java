package com.endava.demo.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmailRequest {

    private String userEmail;
    private String cartContents;
    private String ticket;

}
