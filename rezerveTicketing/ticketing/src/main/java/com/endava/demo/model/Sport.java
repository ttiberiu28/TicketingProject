package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "sport")
public class Sport extends Event{


    @NotEmpty
    @Column(name = "banner_url")
    private String bannerUrl;

    @NotEmpty
    @Column(name = "sport_description")
    private String sportDescription;

    @Column(name = "available_hours", length = 255)
    private String availableHours;

    @Column(name = "available_dates", length = 255)
    private String availableDates;


    @OneToMany(mappedBy = "sport", cascade = CascadeType.ALL)
    private List<Ticket> tickets;

    @ManyToMany(mappedBy = "sports")
    private Set<Location> locations;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "sport_keyword",
            joinColumns = @JoinColumn(name = "sport_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
    )
    @JsonManagedReference
    private Set<Keyword> keywords = new HashSet<>();

    @Override
    public String toString() {
        return "Sport{" +
                "bannerUrl='" + bannerUrl + '\'' +
                ", sportDescription='" + sportDescription + '\'' +
                ", availableHours='" + availableHours + '\'' +
                ", availableDates='" + availableDates + '\'' +
                ", tickets=" + tickets +
                ", locations=" + locations +
                ", keywords=" + keywords +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sport sport = (Sport) o;
        return Objects.equals(bannerUrl, sport.bannerUrl) && Objects.equals(sportDescription, sport.sportDescription) && Objects.equals(availableHours, sport.availableHours) && Objects.equals(availableDates, sport.availableDates) && Objects.equals(tickets, sport.tickets) && Objects.equals(locations, sport.locations) && Objects.equals(keywords, sport.keywords);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bannerUrl, sportDescription, availableHours, availableDates, tickets, locations, keywords);
    }
}
