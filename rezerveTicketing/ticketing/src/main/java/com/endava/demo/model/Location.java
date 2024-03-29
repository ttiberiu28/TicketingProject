package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "location")
@NoArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Size(max = 25)
    @NotEmpty
    private String place;

    private int capacity;
    @ManyToMany
    @JoinTable(name = "movie_locations",
        joinColumns = @JoinColumn(name = "location_id"),
        inverseJoinColumns = @JoinColumn(name = "movie_id"))
    @JsonIgnore
    private List<Movie> movies;

    @ManyToMany
    @JoinTable(name = "stand_up_locations",
        joinColumns = @JoinColumn(name = "location_id"),
        inverseJoinColumns = @JoinColumn(name = "stand_up_id"))
    @JsonIgnore
    private List<StandUp> standUps;

    @ManyToMany
    @JoinTable(name = "concert_locations",
            joinColumns = @JoinColumn(name = "location_id"),
            inverseJoinColumns = @JoinColumn(name = "concert_id"))
    @JsonIgnore
    private List<Concert> concerts;

    @ManyToMany
    @JoinTable(name = "sport_locations",
            joinColumns = @JoinColumn(name = "location_id"),
            inverseJoinColumns = @JoinColumn(name = "sport_id"))
    @JsonIgnore
    private List<Sport> sports;


    @NotEmpty
    private String imageUrl;

    @NotEmpty
    private String address;

    private String city;

    @Column(name = "seats_layout", length = 2048)
    private String seatsLayout;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Location location = (Location) o;
        return getId() == location.getId() && getCapacity() == location.getCapacity() && getPlace().equals(location.getPlace()) && getMovies().equals(location.getMovies());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getPlace(), getCapacity(), getMovies());
    }

    @Override
    public String toString() {
        return "Location{" +
                "id=" + id +
                ", place='" + place + '\'' +
                ", capacity=" + capacity +
                ", movies=" + movies +
                '}';
    }
}
