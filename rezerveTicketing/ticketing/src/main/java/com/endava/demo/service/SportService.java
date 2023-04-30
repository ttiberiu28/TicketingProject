package com.endava.demo.service;

import com.endava.demo.exception.*;
import com.endava.demo.model.Sport;
import com.endava.demo.repository.KeywordRepo;
import com.endava.demo.repository.LocationRepo;
import com.endava.demo.repository.SportRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class SportService {

    private final SportRepo sportRepo;
    private final LocationRepo locationRepo;
    private final KeywordRepo keywordRepo;

    public void addSport(int price, int lengthMinutes,String name,
                         String imageUrl,
                         String bannerUrl, String sportDescription,
                         String availableHours, String availableDates)
    {

        var c = sportRepo.findByNameIgnoreCase(name);

        c.ifPresentOrElse(x ->{

            throw new SportAlreadyExistsException(x.getName());
        }, () -> {

            Sport x = new Sport();

            x.setPrice(price);
            x.setLengthMinutes(lengthMinutes);
            x.setName(name);
            x.setImageUrl(imageUrl);
            x.setBannerUrl(bannerUrl);
            x.setSportDescription(sportDescription);
            x.setAvailableHours(availableHours);
            x.setAvailableDates(availableDates);

            sportRepo.save(x);
        });
    }

    public List<Sport> getSportList() {return sportRepo.findAll();}

    public void assignLocation(int sportId, int locationId){
        var sport = sportRepo.findById(sportId).orElseThrow(() -> new SportDoesNotExistsException(String.valueOf(sportId)));
        var location = locationRepo.findById(locationId).orElseThrow(() -> new LocationDoesNotExistsException(String.valueOf(locationId)));

        if(sport.getLocations().contains(location)){
            throw new LocationAlreadyExistsException(location.getPlace());
        }else{
            sport.getLocations().add(location);
        }

        location.getSports().add(sport);
    }

    public void assignKeyword(int sportId, int keywordId) {
        var sport = sportRepo.findById(sportId).orElseThrow(() -> new SportDoesNotExistsException(String.valueOf(sportId)));
        var keyword = keywordRepo.findById(keywordId).orElseThrow(() -> new KeywordDoesNotExistsException(String.valueOf(keywordId)));

        if (sport.getKeywords().contains(keyword)) {
            throw new KeywordAlreadyExistsException(keyword.getName());
        } else {
            sport.getKeywords().add(keyword);
        }

        keyword.getSports().add(sport);

        // Save the updated entities
        sportRepo.save(sport);
        keywordRepo.save(keyword);
    }
}
