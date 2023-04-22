package com.endava.demo.controller;

import com.endava.demo.exception.LocationAlreadyExistsException;
import com.endava.demo.exception.LocationDoesNotExistsException;
import com.endava.demo.model.Location;
import com.endava.demo.service.LocationService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(Constant.LOCATION_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class LocationController {

    private final LocationService locationService;

    @GetMapping(value = Constant.LIST, produces = "application/json")
    public ResponseEntity<?> getLocations(){

        return ResponseEntity.ok().body(locationService.getAllLocations());
    }

    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<?> getById(@PathVariable int id){
        try {
            locationService.getById(id);

            return ResponseEntity.ok().body(locationService.getById(id));
        }catch(LocationDoesNotExistsException e) {
            return ResponseEntity
                    .badRequest()
                    .body("This location does not exist");
        }

    }

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addLocation(@RequestBody Location location){

        try{
            locationService.addLocation(location.getPlace(), location.getCapacity(), location.getImageUrl());

            return ResponseEntity.ok().build();

        }catch(LocationAlreadyExistsException e){

            return ResponseEntity
                    .badRequest()
                    .body("This location already exists: " + location.getPlace());
        }
    }

    @DeleteMapping(Constant.DELETION)
    public void deleteById(@PathVariable int id){
        locationService.deleteById(id);
    }
}
