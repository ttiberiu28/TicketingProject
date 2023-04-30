package com.endava.demo.dto;

import com.endava.demo.model.*;
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
public class TicketDTO {


        private int id;
        private LocalDate date;
        private int seatNumber;
        private int row;
        private Movie movie;
        private Concert concert;
        private Sport sport;
        private TicketType ticketType;
        private int quantity;
        private String selectedTime;
        private List<TicketSeatDTO> ticketSeats;

    }
