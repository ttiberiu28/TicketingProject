package com.endava.demo.controller;

import com.endava.demo.dto.AssignStandUpLocationRequest;
import com.endava.demo.dto.AssignStandUpSpecialGuestRequest;
import com.endava.demo.dto.AssignStandUpTicketRequest;
import com.endava.demo.exception.*;
import com.endava.demo.model.StandUp;
import com.endava.demo.service.StandUpService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(Constant.STAND_UP_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class StandUpController {

    private final StandUpService standUpService;

    @PostMapping(Constant.NEW)//conteaza daca e PostMapping sau GetMapping in postman
    public ResponseEntity<?> addStandUp(@RequestBody @Valid StandUp standUp){

        try{
            standUpService.addStandUpEvent(standUp.getPrice(),standUp.getLengthMinutes(),
                    standUp.getName(),standUp.getImageUrl(),standUp.getDescription());

            return ResponseEntity.ok().build();

        }catch(StandUpAlreadyExistsException e){
            return ResponseEntity.badRequest().body("This stand up event" +
                    " already exists: " + standUp.getName());
        }
    }

    @GetMapping(Constant.LIST)
    public List<StandUp> getStandUpEvents(){
        return standUpService.getStandUpEventsList();
    }


    @PutMapping(Constant.ASSIGN_LOCATION)
    public ResponseEntity<?> assignLocation(@RequestBody AssignStandUpLocationRequest assignStandUpLocationRequest){

        try{
            standUpService.assignLocation(assignStandUpLocationRequest.getStandUpId(),
                    assignStandUpLocationRequest.getLocationId());

            return ResponseEntity
                    .ok()
                    .body("Location was assigned successfully");
        }catch (StandUpDoesNotExistsException | LocationDoesNotExistsException | LocationAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("Stand up event or location do not exist or " +
                            "location is already assigned for this stand-up event");
        }
    }

    @PutMapping(Constant.ASSIGN_SPECIAL_GUEST)
    public ResponseEntity<?> assignSpecialGuest(@RequestBody AssignStandUpSpecialGuestRequest assignStandUpSpecialGuestRequest){

        try{
            standUpService.assignSpecialGuest(assignStandUpSpecialGuestRequest.getStandUpId(),
                    assignStandUpSpecialGuestRequest.getSpecialGuestId());

            return ResponseEntity
                    .ok()
                    .body("Special guest was assigned successfully");
        }catch (StandUpDoesNotExistsException | SpecialGuestDoesNotExistsException | SpecialGuestAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("Stand up event or special guest do not exist or " +
                            "special guest is already assigned for this stand-up event");
        }
    }

    @DeleteMapping(Constant.DELETION)
    public void deleteById(@PathVariable int id){
        standUpService.deleteById(id);
    }
}
