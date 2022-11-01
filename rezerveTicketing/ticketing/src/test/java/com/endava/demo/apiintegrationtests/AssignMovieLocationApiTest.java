package com.endava.demo.apiintegrationtests;

import com.endava.demo.dto.AssignMovieLocationRequest;
import com.endava.demo.exception.LocationAlreadyExistsException;
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

import java.util.*;

import static org.hibernate.validator.internal.util.Contracts.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AssignMovieLocationApiTest {

    @MockBean
    private MovieRepo movieRepo;

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
      When PUT/api/movie/locationAssignation is called with a movie that
      does not exist in the db than the response from the server
      should be 400 BAD_REQUEST
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test1() throws Exception {
        int movieId = 1;
        int locationId = 1;

        AssignMovieLocationRequest assignMovieLocationRequest = new AssignMovieLocationRequest();
        assignMovieLocationRequest.setMovieId(movieId);
        assignMovieLocationRequest.setLocationId(locationId);

        when(movieRepo.findById(movieId)).thenReturn(Optional.empty());
        when(locationRepo.findById(locationId)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/movie/locationAssignation")
                        .content(mapper.writeValueAsString(assignMovieLocationRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      When PUT/api/movie/locationAssignation is called with a location that
      does not exist in the db than the response from the server
      should be 400 BAD_REQUEST
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test2() throws Exception {
        int movieId = 1;
        int locationId = 1;

        AssignMovieLocationRequest assignMovieLocationRequest = new AssignMovieLocationRequest();
        assignMovieLocationRequest.setMovieId(movieId);
        assignMovieLocationRequest.setLocationId(locationId);

        when(movieRepo.findById(movieId)).thenReturn(Optional.of(new Movie()));
        when(locationRepo.findById(locationId)).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/movie/locationAssignation")
                        .content(mapper.writeValueAsString(assignMovieLocationRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("""
      When PUT/api/movie/locationAssignation is called with a movie
      and location in the db than the response from the server
      should be 200 OK
      """)
    @WithMockUser(username = "alin", authorities = "admin")
    void test3() throws Exception {
        int movieId = 1;
        int locationId = 1;

        AssignMovieLocationRequest assignMovieLocationRequest = new AssignMovieLocationRequest();
        assignMovieLocationRequest.setMovieId(movieId);
        assignMovieLocationRequest.setLocationId(locationId);

        Movie movie = new Movie();
        movie.setName("Hobbit 1");
        movie.setLanguage("English");

        Location location = new Location();
        location.setPlace("Afi Cinema");
        location.setCapacity(120);

        Set<Location> locations = new HashSet<>();

        List<Movie> movies = new ArrayList<>();

        location.setMovies(movies);
        movie.setLocations(locations);

        when(movieRepo.findById(movieId)).thenReturn(Optional.of(movie));
        when(locationRepo.findById(locationId)).thenReturn(Optional.of(location));

        mockMvc.perform(put("/api/movie/locationAssignation")
                        .content(mapper.writeValueAsString(assignMovieLocationRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        List<Location> castedLocations = new ArrayList<>(movie.getLocations());

        assertEquals(1,location.getMovies().size());
        assertEquals(1,movie.getLocations().size());
        assertEquals(movie.getName(), location.getMovies().get(0).getName());
        assertEquals(location.getPlace(), castedLocations.get(0).getPlace());

    }
}
