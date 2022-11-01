package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.User;
import com.endava.demo.repository.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


/*
    TEST PASS BUT COVERAGE RUN FAILS !!!
 */
@SpringBootTest
@AutoConfigureMockMvc
//@ImportResource({"classpath*:application-context.xml"})
public class AddUserApiTest {

    @MockBean
    private UserRepo userRepo;

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper;

    @BeforeAll
    public static void beforeAll() {
        mapper = new ObjectMapper();
    }

    @Test
    @DisplayName("""
      If the following endpoint POST/api/user/new is called for an user
      that already exists in the db then HTTP response status should be 400 bad request
      """)
    @WithMockUser(username = "alin", authorities = {"user", "admin"})
    void test1() throws Exception {
        String username = "johnny";


        when(userRepo.findUserByUsernameIgnoreCase(username))
                .thenReturn(Optional.of(new User()));

        mockMvc.perform(post("/api/user/new")).andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      If the following endpoint POST/api/user/new is called for an user
      that does not exist in the db then HTTP response status should be 200 ok
      """)
    @WithMockUser(username = "alin", authorities = {"user", "admin"})
    void test2() throws Exception {
        String username = "johnny";
        String password = "12345";

        User user = new User();

        user.setUsername(username);
        user.setPassword(password);

        when(userRepo.findUserByUsernameIgnoreCase(username))
                .thenReturn(Optional.empty());

        mockMvc.perform(post("/api/user/new")
                        .content(mapper.writeValueAsString(user))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
