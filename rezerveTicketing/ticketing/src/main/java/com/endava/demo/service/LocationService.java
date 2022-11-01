package com.endava.demo.service;

import com.endava.demo.exception.LocationAlreadyExistsException;
import com.endava.demo.model.Location;
import com.endava.demo.repository.LocationRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class LocationService {

    public final LocationRepo locationRepo;

    public List<Location> getAllLocations(){
        return locationRepo.findAll();
    }

    public void addLocation(String place, int capacity){

        var l = locationRepo.findByPlace(place);

        l.ifPresentOrElse(x -> {
            throw new LocationAlreadyExistsException(x.getPlace());

        }, () -> {

            Location x = new Location();

            x.setPlace(place);
            x.setCapacity(capacity);

            locationRepo.save(x);

        }
        );
    }
    public void deleteById(int id){
        locationRepo.deleteById(id);
    }



}
