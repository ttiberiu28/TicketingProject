package com.endava.demo.service;

import com.endava.demo.exception.*;
import com.endava.demo.model.StandUp;
import com.endava.demo.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@AllArgsConstructor
public class StandUpService {

    private final StandUpRepo standUpRepo;

    private final TicketRepo ticketRepo;
    private final LocationRepo locationRepo;
    private final SpecialGuestRepo specialGuestRepo;

    private final KeywordRepo  keywordRepo;


    public void addStandUpEvent(int price,int lengthMinutes, String name,
                                String imageUrl,
                                String description){

        var su = standUpRepo.findByNameIgnoreCase(name);

        su.ifPresentOrElse(x -> {

            throw new StandUpAlreadyExistsException(x.getName());

        }, () -> {

            StandUp x = new StandUp();

            x.setPrice(price);
            x.setLengthMinutes(lengthMinutes);
            x.setName(name);
            x.setImageUrl(imageUrl);
            x.setDescription(description);

            standUpRepo.save(x);

        });
    }

    public List<StandUp> getStandUpEventsList(){
        return standUpRepo.findAll();
    }



    public void assignLocation(int standUpId, int locationId){
        var standUp = standUpRepo.findById(standUpId)
                .orElseThrow(() -> new StandUpDoesNotExistsException(String.valueOf(standUpId)));
        var location = locationRepo.findById(locationId)
                .orElseThrow(() -> new LocationDoesNotExistsException(String.valueOf(locationId)));

        if(standUp.getLocations().contains(location)){
            throw new LocationAlreadyExistsException(location.getPlace());
        }else{
            standUp.getLocations().add(location);
        }

        location.getStandUps().add(standUp);
    }

    public void assignSpecialGuest(int standUpId, int specialGuestId){
        var standUp = standUpRepo.findById(standUpId)
                .orElseThrow(() -> new StandUpDoesNotExistsException(String.valueOf(standUpId)));
        var specialGuest = specialGuestRepo.findById(specialGuestId)
                .orElseThrow(() -> new SpecialGuestDoesNotExistsException(String.valueOf(specialGuestId)));


        if(standUp.getSpecialGuests().contains(specialGuest)){
            throw new LocationAlreadyExistsException(specialGuest.getName());
        }else{
            standUp.getSpecialGuests().add(specialGuest);
        }

        specialGuest.getStandUpEvents().add(standUp);

    }

    public void deleteById(int id){
        standUpRepo.deleteById(id);
    }

    public void assignKeyword(int standUpId, int keywordId) {
        var standUp = standUpRepo.findById(standUpId).orElseThrow(() -> new StandUpDoesNotExistsException(String.valueOf(standUpId)));
        var keyword = keywordRepo.findById(keywordId).orElseThrow(() -> new KeywordDoesNotExistsException(String.valueOf(keywordId)));

        if (standUp.getKeywords().contains(keyword)) {
            throw new KeywordAlreadyExistsException(keyword.getName());
        } else {
            standUp.getKeywords().add(keyword);
        }

        keyword.getStandUps().add(standUp);

        // Save the updated entities
        standUpRepo.save(standUp);
        keywordRepo.save(keyword);
    }

}
