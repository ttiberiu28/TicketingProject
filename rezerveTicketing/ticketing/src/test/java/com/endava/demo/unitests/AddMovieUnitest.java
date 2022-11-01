package com.endava.demo.unitests;

import com.endava.demo.exception.MovieAlreadyExistsException;
import com.endava.demo.model.Movie;
import com.endava.demo.repository.LocationRepo;
import com.endava.demo.repository.MovieRepo;
import com.endava.demo.repository.TicketRepo;
import com.endava.demo.service.MovieService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.never;

@SpringBootTest
public class AddMovieUnitest {

    @Test
    @DisplayName("""
            If we call the method with a movie that has the same
            name(ignoring cases) and already exists in the db,
              then the method throws MovieAlreadyExistsException""")
    void test1(){
        MovieRepo movieRepo = mock(MovieRepo.class);
        TicketRepo ticketRepo = mock(TicketRepo.class);
        LocationRepo locationRepo = mock(LocationRepo.class);

        MovieService movieService = new MovieService(movieRepo,ticketRepo,locationRepo);

        int price = 50;
        int lengthMinutes = 100;
        String name = "The Hobbit";
        String language = "English";
        Double rating = 7.8;
        String movieDescription = "A movie about hobbits and a ring";

        when(movieRepo.findByNameIgnoreCase(name)).thenReturn(Optional.of(new Movie()));

        assertThrows(MovieAlreadyExistsException.class, () -> movieService.addMovie(price,lengthMinutes,name,language,rating,movieDescription));

        verify(movieRepo, never()).save(any());
    }

    @Test
    @DisplayName("""
            If we call the method with a movie that does not exist in the db,
              then the movie will be added in the db""")
    void test2(){

        MovieRepo movieRepo = mock(MovieRepo.class);
        TicketRepo ticketRepo = mock(TicketRepo.class);
        LocationRepo locationRepo = mock(LocationRepo.class);

        MovieService movieService = new MovieService(movieRepo,ticketRepo,locationRepo);

        int price = 50;
        int lengthMinutes = 100;
        String name = "The Hobbit";
        String language = "English";
        Double rating = 7.8;
        String movieDescription = "A movie about hobbits and a ring";

        when(movieRepo.findByNameIgnoreCase(name)).thenReturn(Optional.empty());


        movieService.addMovie(price,lengthMinutes,name,language,rating,movieDescription);

        //4.verificam asumptiile
        Movie movie = new Movie();
        movie.setPrice(price);
        movie.setLengthMinutes(lengthMinutes);
        movie.setName(name);
        movie.setLanguage(language);
        movie.setImdbRating(rating);
        movie.setMovieDescription(movieDescription);

        verify(movieRepo, times(1)).save(any());
    }
}
