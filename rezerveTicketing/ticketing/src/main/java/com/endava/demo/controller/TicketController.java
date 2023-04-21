package com.endava.demo.controller;

import com.endava.demo.dto.AddTicketToCartRequest;
import com.endava.demo.dto.TicketDTO;
import com.endava.demo.exception.TicketAlreadyExistsException;
import com.endava.demo.exception.TicketDoesNotExistsException;
import com.endava.demo.model.Ticket;
import com.endava.demo.service.TicketService;
import constant.Constant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constant.TICKET_CONTROLLER)
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping(Constant.LIST)
    public List<Ticket> getTickets(){

        return ticketService.getTicketList();
    }


    @PostMapping("/addToCart")
    public ResponseEntity<TicketDTO> addTicketToCart(@RequestBody AddTicketToCartRequest addTicketToCartRequest) {
        TicketDTO ticketDTO = ticketService.addTicketToCart(addTicketToCartRequest);
        return ResponseEntity.ok(ticketDTO);
    }




    @DeleteMapping(Constant.DELETION)
    public void deleteById(@PathVariable int id){
        ticketService.deleteById(id);
    }
    
    @PostMapping("/increment/{id}")
    public ResponseEntity<TicketDTO> incrementTicketQuantity(@PathVariable int id) {
            TicketDTO updatedTicket = ticketService.incrementTicketQuantity(id);
            return ResponseEntity.ok(updatedTicket);

    }

    @PostMapping("/decrement/{id}")
    public ResponseEntity<TicketDTO> decrementTicketQuantity(@PathVariable int id) {
            TicketDTO updatedTicket = ticketService.decrementTicketQuantity(id);
            return ResponseEntity.ok(updatedTicket);
    }





}
