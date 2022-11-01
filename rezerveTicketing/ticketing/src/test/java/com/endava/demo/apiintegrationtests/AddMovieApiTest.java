package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.Location;
import com.endava.demo.model.Movie;
import com.endava.demo.repository.LocationRepo;
import com.endava.demo.repository.MovieRepo;
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
public class AddMovieApiTest {

    @MockBean
    private MovieRepo movieRepo;

    @Autowired
    private MockMvc mockMvc;

    private static ObjectMapper mapper;

    @BeforeAll
    public static void beforeAll() {
        mapper = new ObjectMapper();
    }

    @Test
    @DisplayName("""
      If the following endpoint POST /api/movie/new is called for a movie
      that already exists in the db then HTTP response status should be 400 bad request
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        String name = "The Hobbit";


        when(movieRepo.findByNameIgnoreCase(name))
                .thenReturn(Optional.of(new Movie()));

        mockMvc.perform(post("/api/movie/new")).andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      If the following endpoint POST /api/movie/new is called for a movie
      that does not exist in the db then HTTP response status should be 200 ok
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test2() throws Exception {
        int price = 20;
        int lengthMinutes = 100;
        String name = "LOTR";
        String language = "English";
        Double imbdRating = 9.1;
        String movieDescription = "blablabla";

        Movie movie = new Movie();

        movie.setPrice(price);
        movie.setLengthMinutes(lengthMinutes);
        movie.setName(name);
        movie.setLanguage(language);
        movie.setImdbRating(imbdRating);
        movie.setMovieDescription(movieDescription);

        when(movieRepo.findByNameIgnoreCase(name))
                .thenReturn(Optional.empty());

        mockMvc.perform(post("/api/movie/new")
                        .content(mapper.writeValueAsString(movie))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
