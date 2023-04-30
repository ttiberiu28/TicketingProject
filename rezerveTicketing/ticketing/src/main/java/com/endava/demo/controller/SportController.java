package com.endava.demo.controller;
import com.endava.demo.dto.*;
import com.endava.demo.exception.*;
import com.endava.demo.model.Sport;
import com.endava.demo.service.SportService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(Constant.SPORT_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class SportController {

    private final SportService sportService;

    @GetMapping(Constant.LIST)
    public List<Sport> getSports(){
        return sportService.getSportList();
    }

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addSport(@RequestBody @Valid SportDto sportDto){

        try{
            sportService.addSport(sportDto.getPrice(),sportDto.getLengthMinutes(),
                    sportDto.getName(), sportDto.getImageUrl(),
                    sportDto.getBannerUrl(),
                    sportDto.getSportDescription(),
                    sportDto.getAvailableHours(), sportDto.getAvailableDates());

            return ResponseEntity.ok().build();

        }catch(ConcertAlreadyExistsException e){
            return ResponseEntity.badRequest().body("This sport already exists: " + sportDto.getName());
        }
    }

    @PutMapping(Constant.ASSIGN_LOCATION)
    public ResponseEntity<?> assignLocation(@RequestBody AssignSportLocationRequest assignSportLocationRequest){

        try{
            sportService.assignLocation(assignSportLocationRequest.getSportId(), assignSportLocationRequest.getLocationId());

            return ResponseEntity
                    .ok()
                    .body("Location was assigned successfully");
        }catch(SportDoesNotExistsException | LocationDoesNotExistsException | LocationAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("Sport or location do not exist or " +
                            "location is already assigned for this sport");
        }
    }

    @PutMapping(Constant.ASSIGN_KEYWORD)
    public ResponseEntity<?> assignKeyword(@RequestBody AssignSportKeywordRequest assignSportKeywordRequest){

        try{
            sportService.assignKeyword(assignSportKeywordRequest.getSportId(), assignSportKeywordRequest.getKeywordId());

            return ResponseEntity
                    .ok()
                    .body("Keyword was assigned successfully");
        }catch(ConcertDoesNotExistsException | KeywordDoesNotExistsException | KeywordAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("Sport or keyword do not exist or " +
                            "keyword is already assigned for this sport");
        }
    }
}
