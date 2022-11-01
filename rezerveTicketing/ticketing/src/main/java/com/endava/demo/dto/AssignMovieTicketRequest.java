package com.endava.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignMovieTicketRequest {

    private int movieId;
    private int ticketId;
}
