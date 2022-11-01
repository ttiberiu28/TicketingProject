package com.endava.demo.controller;

import com.endava.demo.exception.SpecialGuestAlreadyExistsException;
import com.endava.demo.model.SpecialGuest;
import com.endava.demo.service.SpecialGuestService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constant.SPECIAL_GUEST_CONTROLLER)
@AllArgsConstructor
public class SpecialGuestController {

    private SpecialGuestService specialGuestService;

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addSpecialGuest(@RequestBody SpecialGuest specialGuest){

        try{

            specialGuestService.addSpecialGuest(specialGuest.getName(), specialGuest.getAge());
            return ResponseEntity
                    .ok()
                    .body("Special guest was added successfully");
        }catch (SpecialGuestAlreadyExistsException e) {

            return ResponseEntity
                    .badRequest()
                    .body("Special guest already exists: " + specialGuest.getName());

        }
    }

    @GetMapping(Constant.LIST)
    public List<SpecialGuest> getSpecialGuests(){

        return specialGuestService.getGuests();
    }

    @DeleteMapping(Constant.DELETION)
    public void deleteById(@PathVariable int id){
        specialGuestService.deleteById(id);
    }
}
