package com.endava.demo.controller;

import com.endava.demo.exception.TicketAlreadyExistsException;
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
public class LocationController {

    private final LocationService locationService;

    @GetMapping(Constant.LIST)
    public List<Location> getLocations(){
        return locationService.getAllLocations();
    }

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addLocation(@RequestBody Location location){

        try{
            locationService.addLocation(location.getPlace(), location.getCapacity());

            return ResponseEntity.ok().build();

        }catch(TicketAlreadyExistsException e){

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
