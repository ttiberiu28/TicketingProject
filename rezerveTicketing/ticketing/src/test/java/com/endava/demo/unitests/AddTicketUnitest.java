package com.endava.demo.unitests;

import com.endava.demo.exception.TicketAlreadyExistsException;
import com.endava.demo.model.Ticket;
import com.endava.demo.repository.TicketRepo;
import com.endava.demo.service.TicketService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
class AddTicketUnitest {

    @Test
    @DisplayName("""
            If we call the method with a ticket that has the same
             seat number or row and already exists in the db,
              then the method throws TicketAlreadyExistsException""")
    void test1(){

        TicketRepo ticketRepo = mock(TicketRepo.class);
        TicketService ticketService = new TicketService(ticketRepo);

        LocalDate localDate = LocalDate.of(2000,1,8);
        int seatNumber = 1;
        int row = 1;

        when(ticketRepo.findBySeatNumberAndRow(seatNumber,row)).thenReturn(Optional.of(new Ticket()));

        assertThrows(TicketAlreadyExistsException.class, () -> ticketService.addTicket(localDate,seatNumber,row));

        verify(ticketRepo, never()).save(any());

    }

    @Test
    @DisplayName("""
            If we call the method with a ticket that does not exist in the db,
              then the ticket will be added in the db""")
    void test2(){

        TicketRepo ticketRepo = mock(TicketRepo.class);
        TicketService ticketService = new TicketService(ticketRepo);

        LocalDate localDate = LocalDate.of(2000,1,8);
        int seatNumber = 1;
        int row = 1;

        when(ticketRepo.findBySeatNumberAndRow(seatNumber,row)).thenReturn(Optional.empty());

        ticketService.addTicket(localDate,seatNumber,row);

        Ticket ticket = new Ticket();
        ticket.setDate(localDate);
        ticket.setSeatNumber(seatNumber);
        ticket.setRow(row);

        verify(ticketRepo, times(1)).save(any());
    }
}
