package com.endava.demo.service;

import com.endava.demo.exception.TicketAlreadyExistsException;
import com.endava.demo.model.Ticket;
import com.endava.demo.repository.TicketRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class TicketService {

    private final TicketRepo ticketRepo;
    public void addTicket(LocalDate date,
                          int seatNumber, int row){

        var t = ticketRepo.findBySeatNumberAndRow(seatNumber, row);

        t.ifPresentOrElse(x -> {
            throw new TicketAlreadyExistsException(x.getSeatNumber(), x.getRow());

        },() -> {
            Ticket x = new Ticket();

            x.setDate(date);
            x.setSeatNumber(seatNumber);
            x.setRow(row);

            ticketRepo.save(x);

        });
    }
    public List<Ticket> getTicketList(){

        return ticketRepo.findAll().stream()
                .sorted(Comparator.comparing(Ticket::getRow))
                .collect(Collectors.toList());
    }

    public void deleteById(int id){
        ticketRepo.deleteById(id);
    }


}
