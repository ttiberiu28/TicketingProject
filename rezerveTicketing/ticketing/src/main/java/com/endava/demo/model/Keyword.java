// Keyword.java

package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "keyword")
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "keywords")
    @JsonBackReference
    private Set<Movie> movies = new HashSet<>();

    @ManyToMany(mappedBy = "keywords")
    @JsonBackReference
    private Set<StandUp> standUps = new HashSet<>();

    @ManyToMany(mappedBy = "keywords")
    @JsonBackReference
    private Set<Concert> concerts = new HashSet<>();

    @ManyToMany(mappedBy = "preferredKeywords")
    @JsonBackReference
    private Set<UserPreference> userPreferences = new HashSet<>();

}
