package com.endava.demo.service;

import com.endava.demo.exception.SpecialGuestAlreadyExistsException;
import com.endava.demo.model.SpecialGuest;
import com.endava.demo.repository.SpecialGuestRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class SpecialGuestService {

    private final SpecialGuestRepo specialGuestRepo;

    public void addSpecialGuest(String name, int age){

        var sg = specialGuestRepo.findByNameIgnoreCase(name);

        sg.ifPresentOrElse(x -> {
            throw new SpecialGuestAlreadyExistsException(x.getName());

        }, () -> {

            SpecialGuest x = new SpecialGuest();

            x.setName(name);
            x.setAge(age);

            specialGuestRepo.save(x);

        });
    }

    public List<SpecialGuest> getGuests(){

        return specialGuestRepo.findAll().stream()
                .sorted(Comparator.comparing(SpecialGuest::getAge))
                .collect(Collectors.toList());
    }
    public void deleteById(int id){
        specialGuestRepo.deleteById(id);
    }

}
