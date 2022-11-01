package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.Ticket;
import com.endava.demo.repository.TicketRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AddTicketApiTest {

    @MockBean
    private TicketRepo ticketRepo;

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper;

    @BeforeAll
    public static void beforeAll() {
        mapper = new ObjectMapper();
    }

    @Test
    @DisplayName("""
      If the following endpoint POST /api/ticket/new is called for a ticket
      that already exists in the db then HTTP response status should be 400 bad request
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        int seatNumber = 6;
        int row = 5;

        when(ticketRepo.findBySeatNumberAndRow(seatNumber,row))
                .thenReturn(Optional.of(new Ticket()));

        mockMvc.perform(post("/api/ticket/new")).andExpect(status().isBadRequest());
    }

    //TODO: MODIFICA LA test1() ca la test2()

    @Test
    @DisplayName("""
      If the following endpoint POST /api/ticket/new is called for a ticket
      that does not exist in the db then HTTP response status should be 200 ok
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test2() throws Exception {
        int seatNumber = 1;
        int row = 1;

        Ticket ticket = new Ticket();

        ticket.setSeatNumber(seatNumber);
        ticket.setRow(row);

        when(ticketRepo.findBySeatNumberAndRow(seatNumber,row))
                .thenReturn(Optional.empty());

        mockMvc.perform(post("/api/ticket/new")
                .content(mapper.writeValueAsString(ticket))
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
