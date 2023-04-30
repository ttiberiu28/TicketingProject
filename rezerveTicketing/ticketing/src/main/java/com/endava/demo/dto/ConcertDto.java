package com.endava.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConcertDto {
    private int price;
    private int lengthMinutes;
    private String name;
    private String imageUrl;
    private String artistName;
    private String trailerUrl;
    private String concertDescription;
    private String availableHours;
    private String availableDates;
}
