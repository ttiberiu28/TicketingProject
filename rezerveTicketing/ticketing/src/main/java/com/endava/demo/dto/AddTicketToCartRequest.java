package com.endava.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddTicketToCartRequest {

    private int userId;
    private int movieId;
    private int concertId;
    private String ticketType;
    private LocalDate localDate;
    private int row;
    private int seatNumber;
}
