package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "concert")
public class Concert extends Event{

    @NotEmpty
    @Column(name = "artist_name")
    private String artistName;

    @NotEmpty
    @Column(name = "trailer_url")
    private String trailerUrl;

    @NotEmpty
    @Column(name = "concert_description")
    private String concertDescription;

    @OneToMany(mappedBy = "concert", cascade = CascadeType.ALL)
    private List<Ticket> tickets;

    @ManyToMany(mappedBy = "concerts")
    private Set<Location> locations;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Concert concert = (Concert) o;
        return Objects.equals(artistName, concert.artistName) && Objects.equals(trailerUrl, concert.trailerUrl) && Objects.equals(concertDescription, concert.concertDescription) && Objects.equals(tickets, concert.tickets) && Objects.equals(locations, concert.locations);
    }

    @Override
    public int hashCode() {
        return Objects.hash(artistName, trailerUrl, concertDescription, tickets, locations);
    }

    @Override
    public String toString() {
        return "Concert{" +
                "artistName='" + artistName + '\'' +
                ", trailerUrl='" + trailerUrl + '\'' +
                ", concertDescription='" + concertDescription + '\'' +
                ", tickets=" + tickets +
                ", locations=" + locations +
                '}';
    }
}
