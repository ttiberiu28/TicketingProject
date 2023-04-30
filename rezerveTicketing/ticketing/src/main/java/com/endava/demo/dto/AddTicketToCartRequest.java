package com.endava.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddTicketToCartRequest {

    private int userId;
    private int movieId;
    private int concertId;
    private int sportId;
    private String ticketType;
    private LocalDate localDate;
    private int row;
    private int seatNumber;
    private String selectedTime;
    private List<Seat> seats;
}
