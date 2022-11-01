package com.endava.demo.apiintegrationtests;

import com.endava.demo.dto.AssignStandUpLocationRequest;
import com.endava.demo.model.Location;
import com.endava.demo.model.StandUp;
import com.endava.demo.repository.LocationRepo;
import com.endava.demo.repository.StandUpRepo;
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

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AssignStandupEventLocationApiTest {

    @MockBean
    private StandUpRepo standUpRepo;

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
      When PUT/api/standup/locationAssignation is called with a standup event that
      does not exist in the db than the response from the server
      should be 400 BAD_REQUEST
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        int standUpId = 1;
        int locationId = 1;

        AssignStandUpLocationRequest assignStandUpLocationRequest = new AssignStandUpLocationRequest();
        assignStandUpLocationRequest.setStandUpId(standUpId);
        assignStandUpLocationRequest.setLocationId(locationId);

        when(standUpRepo.findById(standUpId)).thenReturn(Optional.empty());
        when(locationRepo.findById(locationId)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/standup/locationAssignation")
                        .content(mapper.writeValueAsString(assignStandUpLocationRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      When PUT/api/standup/locationAssignation is called with a location that
      does not exist in the db than the response from the server
      should be 400 BAD_REQUEST
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test2() throws Exception {
        int standUpId = 1;
        int locationId = 1;

        AssignStandUpLocationRequest assignStandUpLocationRequest = new AssignStandUpLocationRequest();
        assignStandUpLocationRequest.setStandUpId(standUpId);
        assignStandUpLocationRequest.setLocationId(locationId);

        when(standUpRepo.findById(standUpId)).thenReturn(Optional.of(new StandUp()));
        when(locationRepo.findById(locationId)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/movie/locationAssignation")
                        .content(mapper.writeValueAsString(assignStandUpLocationRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      When PUT/api/standup/locationAssignation is called with a location that
      does not exist in the db than the response from the server
      should be 200 OK
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test3() throws Exception {

        int standUpId = 1;
        int locationId = 1;

        AssignStandUpLocationRequest assignStandUpLocationRequest = new AssignStandUpLocationRequest();
        assignStandUpLocationRequest.setStandUpId(standUpId);
        assignStandUpLocationRequest.setLocationId(locationId);

        StandUp standUp = new StandUp();
        standUp.setName("Teo Special");
        standUp.setDescription("interesting open air comedy event");

        Location location = new Location();
        location.setPlace("The fool");
        location.setCapacity(70);

        Set<Location> locations = new HashSet<>();

        List<StandUp> standUps = new ArrayList<>();

        location.setStandUps(standUps);
        standUp.setLocations(locations);

        when(standUpRepo.findById(standUpId)).thenReturn(Optional.of(standUp));
        when(locationRepo.findById(locationId)).thenReturn(Optional.of(location));

        mockMvc.perform(put("/api/standup/locationAssignation")
                        .content(mapper.writeValueAsString(assignStandUpLocationRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        List<Location> castedLocations = new ArrayList<>(standUp.getLocations());

        assertEquals(1,location.getStandUps().size());
        assertEquals(1,standUp.getLocations().size());
        assertEquals(standUp.getName(), location.getStandUps().get(0).getName());
        assertEquals(location.getPlace(), castedLocations.get(0).getPlace());

    }

}
