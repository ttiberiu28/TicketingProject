package com.endava.demo.integrationtests;

import com.endava.demo.model.Location;
import com.endava.demo.repository.LocationRepo;
import com.endava.demo.service.LocationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class GetLocationListIntegrationTest {

    @MockBean
    private LocationRepo locationRepo;

    @Autowired
    private LocationService locationService;

    @Test
    @DisplayName("""
      When we call the method it returns a list
      of all the locations in the database
      """)
    void test1(){


        Location l1 = new Location();
        l1.setId(1);
        l1.setPlace("The fool");
        l1.setCapacity(100);

        Location l2 = new Location();
        l2.setId(2);
        l2.setPlace("The fool 2");
        l2.setCapacity(101);

        Location l3 = new Location();
        l3.setId(3);
        l3.setPlace("The fool 3");
        l3.setCapacity(102);

        List<Location> locationList = List.of(l1,l2,l3);

        when(locationRepo.findAll()).thenReturn(locationList);

        List<Location> result = locationService.getAllLocations();
        assertEquals(locationList,result);
    }
}
