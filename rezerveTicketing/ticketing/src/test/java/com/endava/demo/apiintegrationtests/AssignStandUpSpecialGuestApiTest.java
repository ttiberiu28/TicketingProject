package com.endava.demo.apiintegrationtests;

import com.endava.demo.dto.AssignStandUpSpecialGuestRequest;
import com.endava.demo.model.SpecialGuest;
import com.endava.demo.model.StandUp;
import com.endava.demo.repository.SpecialGuestRepo;
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
class AssignStandUpSpecialGuestApiTest {

    @MockBean
    private StandUpRepo standUpRepo;

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
      When PUT/api/standup/specialGuestAssignation is called with a standup that
      does not exist in the db than the response from the server
      should be 400 BAD_REQUEST
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        int standUpId = 1;
        int specialGuestId = 1;

        AssignStandUpSpecialGuestRequest assignStandUpSpecialGuestRequest = new AssignStandUpSpecialGuestRequest();
        assignStandUpSpecialGuestRequest.setStandUpId(standUpId);
        assignStandUpSpecialGuestRequest.setSpecialGuestId(specialGuestId);

        when(standUpRepo.findById(standUpId)).thenReturn(Optional.empty());
        when(specialGuestRepo.findById(specialGuestId)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/standup/specialGuestAssignation")
                        .content(mapper.writeValueAsString(assignStandUpSpecialGuestRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      When PUT/api/standup/specialGuestAssignation is called with a special guest that
      does not exist in the db than the response from the server
      should be 400 BAD_REQUEST
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test2() throws Exception {
        int standUpId = 1;
        int specialGuestId = 1;

        AssignStandUpSpecialGuestRequest assignStandUpSpecialGuestRequest = new AssignStandUpSpecialGuestRequest();
        assignStandUpSpecialGuestRequest.setStandUpId(standUpId);
        assignStandUpSpecialGuestRequest.setSpecialGuestId(specialGuestId);

        when(standUpRepo.findById(standUpId)).thenReturn(Optional.empty());
        when(specialGuestRepo.findById(specialGuestId)).thenReturn(Optional.of(new SpecialGuest()));

        mockMvc.perform(put("/api/standup/specialGuestAssignation")
                        .content(mapper.writeValueAsString(assignStandUpSpecialGuestRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

}
