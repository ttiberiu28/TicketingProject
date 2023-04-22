package com.endava.demo.controller;

import com.endava.demo.dto.AssignConcertLocationRequest;
import com.endava.demo.dto.AssignMovieLocationRequest;
import com.endava.demo.exception.ConcertAlreadyExistsException;
import com.endava.demo.exception.LocationAlreadyExistsException;
import com.endava.demo.exception.LocationDoesNotExistsException;
import com.endava.demo.exception.MovieDoesNotExistsException;
import com.endava.demo.model.Concert;
import com.endava.demo.service.ConcertService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(Constant.CONCERT_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class ConcertController {

    private final ConcertService concertService;

    @GetMapping(Constant.LIST)
    public List<Concert> getConcerts(){
        return concertService.getConcertList();
    }

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addConcert(@RequestBody @Valid Concert concert){

        try{
            concertService.addConcert(concert.getPrice(),concert.getLengthMinutes(),
                    concert.getName(), concert.getImageUrl(),concert.getArtistName(),
                    concert.getTrailerUrl(),concert.getConcertDescription());

            return ResponseEntity.ok().build();

        }catch(ConcertAlreadyExistsException e){
            return ResponseEntity.badRequest().body("This concert already exists: " + concert.getName());
        }
    }

    @PutMapping(Constant.ASSIGN_LOCATION)
    public ResponseEntity<?> assignLocation(@RequestBody AssignConcertLocationRequest assignConcertLocationRequest){

        try{
            concertService.assignLocation(assignConcertLocationRequest.getConcertId(), assignConcertLocationRequest.getLocationId());

            return ResponseEntity
                    .ok()
                    .body("Location was assigned successfully");
        }catch(MovieDoesNotExistsException | LocationDoesNotExistsException | LocationAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("Concert or location do not exist or " +
                            "location is already assigned for this concert");
        }
    }
}
