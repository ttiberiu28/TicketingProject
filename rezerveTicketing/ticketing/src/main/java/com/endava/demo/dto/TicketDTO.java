package com.endava.demo.dto;

import com.endava.demo.model.Movie;
import com.endava.demo.model.StandUp;
import com.endava.demo.model.TicketType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

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
        private StandUp standUp;
        private TicketType ticketType;

    }
