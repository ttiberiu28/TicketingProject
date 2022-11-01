package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.Role;
import com.endava.demo.repository.RoleRepo;
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
class AddRoleApiTest {

    @MockBean
    private RoleRepo roleRepo;

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper;

    @BeforeAll
    public static void beforeAll() {
        mapper = new ObjectMapper();
    }

     /*
        Imi trece testul , in schimb daca dau cu coverage imi pica
      */
    @Test
    @DisplayName("""
      If the following endpoint POST /api/role/new is called for a new role
      then HTTP response status should be 200 ok
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        String name = "manager";

        Role role = new Role();

        role.setName(name);

        when(roleRepo.findByNameIgnoreCase(name))
                .thenReturn(Optional.empty());

        mockMvc.perform(post("/api/role/new")
                        .content(mapper.writeValueAsString(role))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
