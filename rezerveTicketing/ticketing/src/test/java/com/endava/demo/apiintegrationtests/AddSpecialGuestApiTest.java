package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.SpecialGuest;
import com.endava.demo.repository.SpecialGuestRepo;
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
class AddSpecialGuestApiTest {

    @MockBean
    private SpecialGuestRepo specialGuestRepo;

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper;

    @BeforeAll
    public static void beforeAll() {
        mapper = new ObjectMapper();
    }

    @Test
    @DisplayName("""
      If the following endpoint POST /api/specialGuest/new is called for a guest
      that already exists in the db then HTTP response status should be 400 bad request
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        String name = "Vio";
        int age = 30;


        when(specialGuestRepo.findByNameIgnoreCase(name))
                .thenReturn(Optional.of(new SpecialGuest()));

        mockMvc.perform(post("/api/specialGuest/new")).andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      If the following endpoint POST /api/specialGuest/new is called for a guest
      that does not exist in the db then HTTP response status should be 200 ok
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test2() throws Exception {
        String name = "Vio";
        int age = 30;

        SpecialGuest specialGuest = new SpecialGuest();

        specialGuest.setName(name);
        specialGuest.setAge(age);

        when(specialGuestRepo.findByNameIgnoreCase(name))
                .thenReturn(Optional.empty());

        mockMvc.perform(post("/api/specialGuest/new")
                        .content(mapper.writeValueAsString(specialGuest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
