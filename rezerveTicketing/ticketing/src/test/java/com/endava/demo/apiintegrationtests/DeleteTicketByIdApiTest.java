package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.Ticket;
import com.endava.demo.repository.TicketRepo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DeleteTicketByIdApiTest {

    @MockBean
    private TicketRepo ticketRepo;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("""
            If the endpoint DELETE/api/ticket/deletion/{value}
            is called and it exists in the database
            then the response should be 200 OK""")
    @WithMockUser(username = "name1", authorities = "admin")
    void test1() throws Exception {

        int id = 1;
        int seatNumber = 1;
        int row = 1;

        when(ticketRepo.findBySeatNumberAndRow(seatNumber,row)).thenReturn(Optional.of(new Ticket()));

        mockMvc.perform(delete("/api/ticket/deletion/"+ id))
                .andExpect(status().isOk());
    }
}
