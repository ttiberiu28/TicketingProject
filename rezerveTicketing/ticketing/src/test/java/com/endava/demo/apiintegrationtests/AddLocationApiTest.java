package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.Location;
import com.endava.demo.repository.LocationRepo;
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
public class AddLocationApiTest {

    @MockBean
    private LocationRepo locationRepo;

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper;

    @BeforeAll
    public static void beforeAll() {
        mapper = new ObjectMapper();
    }


    @Test
    @DisplayName("""
      If the following endpoint POST /api/location/new is called for a location
      that does not exist in the db then HTTP response status should be 200 ok
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        String place = "AFI CINEMA";
        int capacity = 50;

        Location location = new Location();

        location.setPlace(place);
        location.setCapacity(capacity);

        when(locationRepo.findByPlace(place))
                .thenReturn(Optional.empty());

        mockMvc.perform(post("/api/location/new")
                        .content(mapper.writeValueAsString(location))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
