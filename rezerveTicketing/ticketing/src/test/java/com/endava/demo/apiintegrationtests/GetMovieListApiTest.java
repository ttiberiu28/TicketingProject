package com.endava.demo.apiintegrationtests;

import com.endava.demo.model.Movie;
import com.endava.demo.repository.LocationRepo;
import com.endava.demo.repository.MovieRepo;
import com.endava.demo.repository.TicketRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
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
class GetMovieListApiTest {

    @MockBean
    private MovieRepo movieRepo;

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("""
      When we call the endpoint GET/api/movie/list then we will
      return a list of all movies existent in the db""")
    @WithMockUser(username = "alin", authorities = {"admin", "user"})
    void test1() throws Exception {
        int price1 = 20;
        int lengthMinutes1 = 100;
        String name1 = "LOTR";
        String language1 = "English";
        Double imbdRating1 = 9.1;
        String movieDescription1 = "blablabla";

        int price2 = 22;
        int lengthMinutes2 = 101;
        String name2 = "LOTR2";
        String language2 = "English";
        Double imbdRating2 = 9.1;
        String movieDescription2 = "whatever";

        Movie m1 = new Movie();

        m1.setId(1);
        m1.setPrice(price1);
        m1.setLengthMinutes(lengthMinutes1);
        m1.setName(name1);
        m1.setLanguage(language1);
        m1.setImdbRating(imbdRating1);
        m1.setMovieDescription(movieDescription1);

        Movie m2 = new Movie();

        m2.setId(1);
        m2.setPrice(price2);
        m2.setLengthMinutes(lengthMinutes2);
        m2.setName(name2);
        m2.setLanguage(language2);
        m2.setImdbRating(imbdRating2);
        m2.setMovieDescription(movieDescription2);

        List<Movie> movieList = List.of(m1,m2);

        ObjectMapper mapper = new ObjectMapper();

        when(movieRepo.findAll()).thenReturn(movieList);

        mockMvc.perform(get("/api/movie/list"))
                .andExpect(content().json(mapper.writeValueAsString(movieList)));

    }

}
