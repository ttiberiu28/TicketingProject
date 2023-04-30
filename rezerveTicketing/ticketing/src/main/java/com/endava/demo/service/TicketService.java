package com.endava.demo.service;

import com.endava.demo.dto.AddTicketToCartRequest;
import com.endava.demo.dto.Seat;
import com.endava.demo.dto.TicketDTO;
import com.endava.demo.exception.*;
import com.endava.demo.model.*;
import com.endava.demo.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class TicketService {

    private final TicketRepo ticketRepo;

    private final CartRepo cartRepo;
    private final UserRepo userRepo;
    private final MovieRepo movieRepo;

    private final ConcertRepo concertRepo;

    private final SportRepo sportRepo;


    public TicketDTO addTicketToCart(AddTicketToCartRequest addTicketToCartRequest) {
        int userId = addTicketToCartRequest.getUserId();
        int movieId = addTicketToCartRequest.getMovieId();
        int concertId = addTicketToCartRequest.getConcertId();
        int sportId = addTicketToCartRequest.getSportId();
        String ticketType = addTicketToCartRequest.getTicketType();
        String selectedTime = addTicketToCartRequest.getSelectedTime();
        LocalDate date = addTicketToCartRequest.getLocalDate();
        List<Seat> seats = addTicketToCartRequest.getSeats();

        if (seats == null) {
            throw new IllegalArgumentException("Seats list cannot be null");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UserDoesNotExistsException(String.valueOf(userId)));

        Cart cart = user.getCart();

        Ticket ticket = new Ticket();
        ticket.setCart(cart);
        ticket.setTicketType(TicketType.valueOf(ticketType));
        ticket.setDate(date);
        ticket.setSelectedTime(selectedTime);

        if (movieId != 0) {
            Movie movie = movieRepo.findById(movieId)
                    .orElseThrow(() -> new MovieDoesNotExistsException(String.valueOf(movieId)));
            ticket.setMovie(movie);
        } else if (concertId != 0) {
            Concert concert = concertRepo.findById(concertId)
                    .orElseThrow(() -> new ConcertDoesNotExistsException(String.valueOf(concertId)));
            ticket.setConcert(concert);
        }else if (sportId != 0) {
            Sport sport = sportRepo.findById(sportId)
                    .orElseThrow(() -> new SportDoesNotExistsException(String.valueOf(sportId)));
            ticket.setSport(sport);
        }

        else {
            throw new IllegalArgumentException("The id's cannot be 0");
        }

        // Check if a ticket with the same type already exists in the cart
        Ticket existingTicket = cart.getTickets().stream()
                .filter(t -> Objects.equals(t.getMovie() != null ? t.getMovie().getId() : null, movieId)
                        && Objects.equals(t.getConcert() != null ? t.getConcert().getId() : null, concertId)
                        && Objects.equals(t.getSport() != null ? t.getSport().getId() : null, sportId)
                        && t.getTicketType().equals(TicketType.valueOf(ticketType)))
                .findFirst()
                .orElse(null);

        if (existingTicket != null) {
            // If a ticket with the same type exists, increment its quantity
            existingTicket.setQuantity(existingTicket.getQuantity() + seats.size());

            // Add the new TicketSeat instances to the existing ticket
            for (Seat seat : seats) {
                TicketSeat ticketSeat = new TicketSeat();
                ticketSeat.setRow(seat.getRow());
                ticketSeat.setSeatNumber(seat.getSeatNumber());
                existingTicket.addTicketSeat(ticketSeat);
            }

            ticketRepo.save(existingTicket);
        } else {
            // If not, create a new ticket with the desired quantity (number of selected seats)
                ticket.setQuantity(seats.size());

            // Add the new TicketSeat instances to the new ticket
                for (Seat seat : seats) {
                    TicketSeat ticketSeat = new TicketSeat();
                    ticketSeat.setRow(seat.getRow());
                    ticketSeat.setSeatNumber(seat.getSeatNumber());
                    ticket.addTicketSeat(ticketSeat);
                }

            ticketRepo.save(ticket);
        }

        return ticket.toDTO(); // Return the first ticket as a DTO
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
