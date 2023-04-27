package com.endava.demo.service;

import com.endava.demo.exception.*;
import com.endava.demo.model.Concert;
import com.endava.demo.model.Movie;
import com.endava.demo.repository.ConcertRepo;
import com.endava.demo.repository.LocationRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class ConcertService {

    private final ConcertRepo concertRepo;

    private final LocationRepo locationRepo;

    public void addConcert(int price, int lengthMinutes,String name,
                         String imageUrl,
                         String artistName, String trailerUrl,
                         String concertDescription,
                         String availableHours, String availableDates)
    {

        var c = concertRepo.findByNameIgnoreCase(name);

        c.ifPresentOrElse(x ->{

            throw new MovieAlreadyExistsException(x.getName());
        }, () -> {

            Concert x = new Concert();

            x.setPrice(price);
            x.setLengthMinutes(lengthMinutes);
            x.setName(name);
            x.setImageUrl(imageUrl);
            x.setArtistName(artistName);
            x.setTrailerUrl(trailerUrl);
            x.setConcertDescription(concertDescription);
            x.setAvailableHours(availableHours);
            x.setAvailableDates(availableDates);

            concertRepo.save(x);


        });
    }

    public List<Concert> getConcertList() {
        return concertRepo.findAll();
    }

    public void assignLocation(int concertId, int locationId){
        var concert = concertRepo.findById(concertId).orElseThrow(() -> new ConcertDoesNotExistsException(String.valueOf(concertId)));
        var location = locationRepo.findById(locationId).orElseThrow(() -> new LocationDoesNotExistsException(String.valueOf(locationId)));

        if(concert.getLocations().contains(location)){
            throw new LocationAlreadyExistsException(location.getPlace());
        }else{
            concert.getLocations().add(location);
        }

        location.getConcerts().add(concert);
    }



}
