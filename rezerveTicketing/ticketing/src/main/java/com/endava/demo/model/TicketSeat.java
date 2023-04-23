package com.endava.demo.model;

import com.endava.demo.dto.TicketSeatDTO;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "ticket_seat")
public class TicketSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    @JsonBackReference
    private Ticket ticket;

    private int row;
    private int seatNumber;

    public TicketSeatDTO toDTO() {
        TicketSeatDTO dto = new TicketSeatDTO();
        dto.setId(id);
        dto.setRow(row);
        dto.setSeatNumber(seatNumber);
        return dto;
    }
}
