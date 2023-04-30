package com.endava.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SportDto {

    private int price;
    private int lengthMinutes;
    private String name;
    private String imageUrl;
    private String bannerUrl;
    private String sportDescription;
    private String availableHours;
    private String availableDates;
}
