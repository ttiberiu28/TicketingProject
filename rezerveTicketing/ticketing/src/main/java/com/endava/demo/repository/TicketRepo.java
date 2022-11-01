package com.endava.demo.repository;

import com.endava.demo.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepo extends JpaRepository<Ticket, Integer> {
    Optional<Ticket> findBySeatNumberAndRow(int seatNumber, int row);
}
