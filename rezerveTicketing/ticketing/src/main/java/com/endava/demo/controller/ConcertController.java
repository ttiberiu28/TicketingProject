package com.endava.demo.controller;

import com.endava.demo.dto.*;
import com.endava.demo.exception.*;
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
    public ResponseEntity<?> addConcert(@RequestBody @Valid ConcertDto concertDto){

        try{
            concertService.addConcert(concertDto.getPrice(),concertDto.getLengthMinutes(),
                    concertDto.getName(), concertDto.getImageUrl(),
                    concertDto.getArtistName(),
                    concertDto.getTrailerUrl(),concertDto.getConcertDescription(),
                    concertDto.getAvailableHours(), concertDto.getAvailableDates());

            return ResponseEntity.ok().build();

        }catch(ConcertAlreadyExistsException e){
            return ResponseEntity.badRequest().body("This concert already exists: " + concertDto.getName());
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

    @PutMapping(Constant.ASSIGN_KEYWORD)
    public ResponseEntity<?> assignKeyword(@RequestBody AssignConcertKeywordRequest assignConcertKeywordRequest){

        try{
            concertService.assignKeyword(assignConcertKeywordRequest.getConcertId(), assignConcertKeywordRequest.getKeywordId());

            return ResponseEntity
                    .ok()
                    .body("Keyword was assigned successfully");
        }catch(ConcertDoesNotExistsException | KeywordDoesNotExistsException | KeywordAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("Movie or keyword do not exist or " +
                            "keyword is already assigned for this movie");
        }
    }
}
