package com.endava.demo.controller;

import com.endava.demo.exception.TicketAlreadyExistsException;
import com.endava.demo.model.Ticket;
import com.endava.demo.service.TicketService;
import constant.Constant;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constant.TICKET_CONTROLLER)
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping(Constant.LIST)
    public List<Ticket> getTickets(){

        return ticketService.getTicketList();
    }

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addTicket(@RequestBody Ticket ticket){

        try{
            ticketService.addTicket(ticket.getDate(),
                    ticket.getSeatNumber(),ticket.getRow());

            return ResponseEntity.ok().build();

        }catch(TicketAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("This ticket already exists: " +
                        "seatNumber: " + ticket.getSeatNumber() +
                            " -- row: " + ticket.getRow());
        }
    }

    @DeleteMapping(Constant.DELETION)
    public void deleteById(@PathVariable int id){
        ticketService.deleteById(id);
    }
}
