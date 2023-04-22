package com.endava.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignConcertLocationRequest {
    private int concertId;
    private int locationId;
}
