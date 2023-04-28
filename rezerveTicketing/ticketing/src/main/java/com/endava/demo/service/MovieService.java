package com.endava.demo.service;

import com.endava.demo.exception.*;
import com.endava.demo.model.Movie;
import com.endava.demo.repository.KeywordRepo;
import com.endava.demo.repository.LocationRepo;
import com.endava.demo.repository.MovieRepo;
import com.endava.demo.repository.TicketRepo;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class MovieService {

    private final MovieRepo movieRepo;
    private final TicketRepo ticketRepo;
    private final LocationRepo locationRepo;
    private final KeywordRepo keywordRepo;



    public static final Logger LOGGER = LoggerFactory.getLogger(MovieService.class);

    public void addMovie(int price, int lengthMinutes,String name,
                         String imageUrl,
                         String language, Double rating,
                         String movieDescription,
                         String trailerUrl,
                         String availableHours, String availableDates){

        var m = movieRepo.findByNameIgnoreCase(name);

        m.ifPresentOrElse(x ->{

            LOGGER.info("This movie already exists: " + x.getName());

            throw new MovieAlreadyExistsException(x.getName());
        }, () -> {

            Movie x = new Movie();

            x.setPrice(price);
            x.setLengthMinutes(lengthMinutes);
            x.setName(name);
            x.setImageUrl(imageUrl);
            x.setLanguage(language);
            x.setImdbRating(rating);
            x.setMovieDescription(movieDescription);
            x.setTrailerUrl(trailerUrl);
            x.setAvailableHours(availableHours);
            x.setAvailableDates(availableDates);
            movieRepo.save(x);

            LOGGER.info("Movie added successfully");

        });
    }
    public List<Movie> getMovieList() {
        return movieRepo.findAll();
    }
    public void deleteById(int id){
            movieRepo.deleteById(id);
    }

    public void assignLocation(int movieId, int locationId){
        var movie = movieRepo.findById(movieId).orElseThrow(() -> new MovieDoesNotExistsException(String.valueOf(movieId)));
        var location = locationRepo.findById(locationId).orElseThrow(() -> new LocationDoesNotExistsException(String.valueOf(locationId)));

        if(movie.getLocations().contains(location)){
            throw new LocationAlreadyExistsException(location.getPlace());
        }else{
            movie.getLocations().add(location);
        }

        location.getMovies().add(movie);
    }

    public void assignKeyword(int movieId, int keywordId) {
        var movie = movieRepo.findById(movieId).orElseThrow(() -> new MovieDoesNotExistsException(String.valueOf(movieId)));
        var keyword = keywordRepo.findById(keywordId).orElseThrow(() -> new KeywordDoesNotExistsException(String.valueOf(keywordId)));

        if (movie.getKeywords().contains(keyword)) {
            throw new KeywordAlreadyExistsException(keyword.getName());
        } else {
            movie.getKeywords().add(keyword);
        }

        keyword.getMovies().add(movie);

        // Save the updated entities
        movieRepo.save(movie);
        keywordRepo.save(keyword);
    }
}
