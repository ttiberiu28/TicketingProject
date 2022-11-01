package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
@Entity
@Getter
@Setter
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")
    private LocalDate date;

    @Column(name = "seat_number")
    @NotNull
    @Min(1)
    @Max(20)
    private int seatNumber;
    @NotNull
    @Min(1)
    @Max(12)
    private int row;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    @JsonIgnore
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "stand_up_id")
    @JsonIgnore
    private StandUp standUp;

    public Ticket() {
    }

}
