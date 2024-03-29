package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "movie")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Movie extends Event {
    @NotEmpty
    private String language;
    @Min(1)
    @Max(10)
    @Column(name = "imdb_rating")
    private Double imdbRating;

    @Column(name = "movie_description")
    @NotEmpty
    private String movieDescription;

    @NotEmpty
    @Column(name = "trailer_url")
    private String trailerUrl;

    @Column(name = "available_hours", length = 255)
    private String availableHours;

    @Column(name = "available_dates", length = 255)
    private String availableDates;



    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Ticket> tickets;

    @ManyToMany(mappedBy = "movies")
    private Set<Location> locations;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "movie_keyword",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
    )
    @JsonManagedReference
    private Set<Keyword> keywords = new HashSet<>();



    public Movie() {}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Movie movie = (Movie) o;
        return getLanguage().equals(movie.getLanguage()) && getImdbRating().equals(movie.getImdbRating()) && getMovieDescription().equals(movie.getMovieDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getLanguage(), getImdbRating(), getMovieDescription());
    }

    @Override
    public String toString() {
        return "Movie{" +
                "language='" + language + '\'' +
                ", rating=" + imdbRating +
                ", movieDescription='" + movieDescription + '\'' +
                ", id=" + id +
                ", lengthMinutes=" + lengthMinutes +
                ", name='" + name + '\'' +
                '}';
    }
}
