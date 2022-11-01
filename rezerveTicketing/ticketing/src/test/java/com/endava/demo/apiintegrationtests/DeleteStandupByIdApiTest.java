package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.StandUp;
import com.endava.demo.repository.StandUpRepo;
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
class DeleteStandupByIdApiTest {

    @MockBean
    private StandUpRepo standUpRepo;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("""
            If the endpoint DELETE/api/standup/deletion/{value}
            is called and it exists in the database
            then the response should be 200 OK""")
    @WithMockUser(username = "name1", authorities = "admin")
    void test1() throws Exception {

        int id = 1;
        String name = "Adrian Nicolae Special";

        when(standUpRepo.findByNameIgnoreCase(name)).thenReturn(Optional.of(new StandUp()));

        mockMvc.perform(delete("/api/standup/deletion/"+ id))
                .andExpect(status().isOk());
    }
}
