package com.endava.demo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "stand_up_event")
@Getter
@Setter
@NoArgsConstructor
public class StandUp extends Event{

    @Size(max = 100)
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

}
