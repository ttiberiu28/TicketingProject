package com.endava.demo.service;

import com.endava.demo.exception.MovieDoesNotExistsException;
import com.endava.demo.exception.TicketAlreadyExistsException;
import com.endava.demo.exception.UserDoesNotExistsException;
import com.endava.demo.model.*;
import com.endava.demo.repository.CartRepo;
import com.endava.demo.repository.MovieRepo;
import com.endava.demo.repository.TicketRepo;
import com.endava.demo.repository.UserRepo;
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
    private final CartRepo cartRepo;
    private final UserRepo userRepo;
    private final MovieRepo movieRepo;
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

    public void addTicketToCart(int userId, int movieId, String ticketType, LocalDate date, int row, int seatNumber) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistsException(String.valueOf(userId)));
        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new MovieDoesNotExistsException(String.valueOf(movieId)));

        Cart cart = user.getCart();

        Ticket ticket = new Ticket();
        ticket.setMovie(movie);
        ticket.setTicketType(TicketType.valueOf(ticketType));
        ticket.setDate(date);
        ticket.setRow(row);
        ticket.setSeatNumber(seatNumber);

        cart.getTickets().add(ticket);
        ticketRepo.save(ticket);
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
