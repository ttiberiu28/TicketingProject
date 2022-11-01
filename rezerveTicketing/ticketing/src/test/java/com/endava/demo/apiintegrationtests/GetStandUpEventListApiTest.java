package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.Movie;
import com.endava.demo.model.StandUp;
import com.endava.demo.repository.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
class GetStandUpEventListApiTest {

    @MockBean
    private StandUpRepo standUpRepo;

    @MockBean
    private TicketRepo ticketRepo;

    @MockBean
    private LocationRepo locationRepo;

    private SpecialGuestRepo specialGuestRepo;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("""
      When we call the endpoint GET/api/standup/list then we will
      return a list of all standups existent in the db""")
    @WithMockUser(username = "alin", authorities = {"admin", "user"})
    void test1() throws Exception {
        int price1 = 20;
        int lengthMinutes1 = 100;
        String name1 = "LOTR";
        String description1 = "blablabla";


        int price2 = 22;
        int lengthMinutes2 = 101;
        String name2 = "LOTR2";
        String description2 = "whatever";

        StandUp s1 = new StandUp();

        s1.setId(1);
        s1.setPrice(price1);
        s1.setLengthMinutes(lengthMinutes1);
        s1.setName(name1);
        s1.setDescription(description1);

        StandUp s2 = new StandUp();

        s2.setId(1);
        s2.setPrice(price2);
        s2.setLengthMinutes(lengthMinutes2);
        s2.setName(name2);
        s2.setDescription(description2);

        List<StandUp> standUps = List.of(s1,s2);

        ObjectMapper mapper = new ObjectMapper();

        when(standUpRepo.findAll()).thenReturn(standUps);

        mockMvc.perform(get("/api/standup/list"))
                .andExpect(content().json(mapper.writeValueAsString(standUps)));

    }
}
