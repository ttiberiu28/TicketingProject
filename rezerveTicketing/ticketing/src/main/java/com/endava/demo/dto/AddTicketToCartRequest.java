package com.endava.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AddTicketToCartRequest {

    private int userId;
    private int movieId;
    private String ticketType;
    private LocalDate localDate;
    private int row;
    private int seatNumber;
}
