package com.endava.demo.controller;

import com.endava.demo.dto.AssignMovieLocationRequest;
import com.endava.demo.dto.AssignMovieTicketRequest;
import com.endava.demo.exception.*;
import com.endava.demo.model.Movie;
import com.endava.demo.service.MovieService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(Constant.MOVIE_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;

    @GetMapping(Constant.LIST)
    public List<Movie> getMovies(){
        return movieService.getMovieList();
    }

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addMovie(@RequestBody @Valid Movie movie){

        try{
            movieService.addMovie(movie.getPrice(),movie.getLengthMinutes(),
                    movie.getName(), movie.getImageUrl(),movie.getLanguage(),
                    movie.getImdbRating(),movie.getMovieDescription(),movie.getTrailerUrl(),
                    movie.getAvailableHours());

            return ResponseEntity.ok().build();

        }catch(MovieAlreadyExistsException e){
            return ResponseEntity.badRequest().body("This movie already exists: " + movie.getName());
        }
    }

    @DeleteMapping(Constant.DELETION)
    public void deleteById(@PathVariable int id){
            movieService.deleteById(id);
    }

    @PutMapping(Constant.ASSIGN_TICKET)
    public ResponseEntity<?> assignTicket(@RequestBody AssignMovieTicketRequest assignMovieTicketRequest){

        try{
            movieService.assignTicket(assignMovieTicketRequest.getMovieId(), assignMovieTicketRequest.getTicketId());

            return ResponseEntity
                    .ok()
                    .body("Ticket was assigned successfully");
        }catch(MovieDoesNotExistsException | TicketDoesNotExistsException | TicketAlreadyExistsException e ){

            return ResponseEntity
                    .badRequest()
                    .body("Movie or ticket do not exist or " +
                            "ticket is already assigned for this movie"
                    );
        }
    }

    @PutMapping(Constant.ASSIGN_LOCATION)
    public ResponseEntity<?> assignLocation(@RequestBody AssignMovieLocationRequest assignMovieLocationRequest){

        try{
            movieService.assignLocation(assignMovieLocationRequest.getMovieId(), assignMovieLocationRequest.getLocationId());

            return ResponseEntity
                    .ok()
                    .body("Location was assigned successfully");
        }catch(MovieDoesNotExistsException | LocationDoesNotExistsException | LocationAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("Movie or location do not exist or " +
                            "location is already assigned for this movie");
        }
    }


}
