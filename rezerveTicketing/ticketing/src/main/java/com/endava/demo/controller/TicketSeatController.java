package com.endava.demo.controller;

import com.endava.demo.service.TicketSeatService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constant.TICKET_SEAT_CONTROLLER)
@CrossOrigin(origins = "*", allowedHeaders = "*")
@AllArgsConstructor
public class TicketSeatController {

    private final TicketSeatService ticketSeatService;

    @DeleteMapping(Constant.DELETION)
    public void deleteById(@PathVariable int id){
        ticketSeatService.deleteById(id);
    }
}
