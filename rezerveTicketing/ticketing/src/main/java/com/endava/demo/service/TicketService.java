package com.endava.demo.service;

import com.endava.demo.dto.TicketDTO;
import com.endava.demo.exception.MovieDoesNotExistsException;
import com.endava.demo.exception.TicketAlreadyExistsException;
import com.endava.demo.exception.TicketDoesNotExistsException;
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

    //this method will be deleted
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

//    public TicketDTO addTicketToCart(int userId, int movieId, String ticketType, LocalDate date, int row, int seatNumber) {
//        User user = userRepo.findById(userId)
//                .orElseThrow(() -> new UserDoesNotExistsException(String.valueOf(userId)));
//        Movie movie = movieRepo.findById(movieId)
//                .orElseThrow(() -> new MovieDoesNotExistsException(String.valueOf(movieId)));
//
//        Cart cart = user.getCart();
//
//        Ticket ticket = new Ticket();
//        ticket.setCart(cart);
//        ticket.setMovie(movie);
//        ticket.setTicketType(TicketType.valueOf(ticketType));
//        ticket.setDate(date);
//        ticket.setRow(row);
//        ticket.setSeatNumber(seatNumber);
//
//        ticketRepo.save(ticket);
//
//        return ticket.toDTO();
//    }

    public TicketDTO addTicketToCart(int userId, int movieId, String ticketType, LocalDate date, int row, int seatNumber) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistsException(String.valueOf(userId)));
        Movie movie = movieRepo.findById(movieId)
                .orElseThrow(() -> new MovieDoesNotExistsException(String.valueOf(movieId)));

        Cart cart = user.getCart();

        // Check if a ticket with the same type already exists in the cart
        Ticket existingTicket = cart.getTickets().stream()
                .filter(ticket -> ticket.getMovie().getId() == movieId
                        && ticket.getTicketType().equals(TicketType.valueOf(ticketType)))
                .findFirst()
                .orElse(null);

        if (existingTicket != null) {
            // If a ticket with the same type exists, increment its quantity
            existingTicket.setQuantity(existingTicket.getQuantity() + 1);
            ticketRepo.save(existingTicket);
            return existingTicket.toDTO();
        } else {
            // If not, create a new ticket
            Ticket ticket = new Ticket();
            ticket.setCart(cart);
            ticket.setMovie(movie);
            ticket.setTicketType(TicketType.valueOf(ticketType));
            ticket.setDate(date);
            ticket.setRow(row);
            ticket.setSeatNumber(seatNumber);

            ticketRepo.save(ticket);

            return ticket.toDTO();
        }
    }




    public List<Ticket> getTicketList(){

        return ticketRepo.findAll().stream()
                .sorted(Comparator.comparing(Ticket::getRow))
                .collect(Collectors.toList());
    }

    public void deleteById(int id){
        ticketRepo.deleteById(id);
    }

    public TicketDTO incrementTicketQuantity(int id) {
        Ticket ticket = ticketRepo.findById(id).orElseThrow(() -> new TicketDoesNotExistsException("Ticket not found with ID: " + id));
        ticket.setQuantity(ticket.getQuantity() + 1);
        ticketRepo.save(ticket);
        return ticket.toDTO(); // Return the updated ticket as a DTO
    }

    public TicketDTO decrementTicketQuantity(int id) {
        Ticket ticket = ticketRepo.findById(id).orElseThrow(() -> new TicketDoesNotExistsException("Ticket not found with ID: " + id));
        int updatedQuantity = ticket.getQuantity() - 1;
        if (updatedQuantity < 1) {
            throw new IllegalStateException("Ticket quantity cannot be less than 1");
        }
        ticket.setQuantity(updatedQuantity);
        ticketRepo.save(ticket);
        return ticket.toDTO(); // Return the updated ticket as a DTO
    }



}
