package com.endava.demo.integrationtests;

import com.endava.demo.model.SpecialGuest;
import com.endava.demo.repository.SpecialGuestRepo;
import com.endava.demo.service.SpecialGuestService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class GetSpecialGuestListIntegrationTest {

    @MockBean
    private SpecialGuestRepo specialGuestRepo;

    @Autowired
    private SpecialGuestService specialGuestService;

    @Test
    @DisplayName("""
      When we call the method it returns a list
      of all the special guests in the database
      """)
    void test1(){


        SpecialGuest s1 = new SpecialGuest();
        s1.setId(1);
        s1.setName("Vio");
        s1.setAge(30);

        SpecialGuest s2 = new SpecialGuest();
        s2.setId(2);
        s2.setName("Teo");
        s2.setAge(31);

        SpecialGuest s3 = new SpecialGuest();
        s3.setId(3);
        s3.setName("Costel");
        s3.setAge(32);

        List<SpecialGuest> specialGuestList = List.of(s1,s2,s3);

        when(specialGuestRepo.findAll().stream()
                .sorted(Comparator.comparing(SpecialGuest::getAge))
                .collect(Collectors.toList())).thenReturn(specialGuestList);

        List<SpecialGuest> result = specialGuestService.getGuests();
        assertEquals(specialGuestList,result);
    }
}
