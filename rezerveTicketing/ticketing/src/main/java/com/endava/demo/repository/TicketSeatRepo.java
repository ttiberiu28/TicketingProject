package com.endava.demo.repository;

import com.endava.demo.model.TicketSeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketSeatRepo extends JpaRepository<TicketSeat, Integer> {
}
