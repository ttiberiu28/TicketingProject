package com.endava.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MovieDto {

        private int price;
        private int lengthMinutes;
        private String name;
        private String imageUrl;
        private String language;
        private Double imdbRating;
        private String movieDescription;
        private String trailerUrl;
        private String availableHours;
        private String availableDates;
}
