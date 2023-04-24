package com.endava.demo.service;

import com.endava.demo.model.Ticket;
import com.endava.demo.model.TicketSeat;
import com.endava.demo.repository.TicketRepo;
import com.endava.demo.repository.TicketSeatRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class TicketSeatService {

    private final TicketSeatRepo ticketSeatRepo;
    private final TicketRepo ticketRepo;

    public void deleteById(int id) {
        // Get the ticket seat
        TicketSeat ticketSeat = ticketSeatRepo.findById(id)
                .orElseThrow(() -> new IllegalStateException("Ticket seat not found"));

        // Get the related ticket
        Ticket ticket = ticketSeat.getTicket();

        // Decrement the ticket quantity
        ticket.setQuantity(ticket.getQuantity() - 1);

        // Save the updated ticket
        ticketRepo.save(ticket);

        // Delete the ticket seat
        ticketSeatRepo.deleteById(id);
    }
}
