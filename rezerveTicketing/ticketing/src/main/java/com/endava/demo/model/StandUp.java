package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "stand_up_event")
@Getter
@Setter
@NoArgsConstructor
public class StandUp extends Event{

    @NotNull
    private String description;

    @Column(name = "event_organizer")
    private String eventOrganizer = EventOrganizer.getInstance().toString();

    @OneToMany(mappedBy = "standUp", cascade = CascadeType.ALL)
    private List<Ticket> tickets;

    @ManyToMany(mappedBy = "standUps")
    private Set<Location> locations;

    @ManyToMany(mappedBy = "standUpEvents")
    private Set<SpecialGuest> specialGuests;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "standUp_keyword",
            joinColumns = @JoinColumn(name = "standUp_keyword"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
    )
    @JsonManagedReference
    private Set<Keyword> keywords = new HashSet<>();




}
