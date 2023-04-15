package com.endava.demo.model;

import com.endava.demo.dto.TicketDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id")
    @JsonIgnore
    private Movie movie;

    @ManyToOne
    @JoinColumn(name = "stand_up_id")
    @JsonIgnore
    private StandUp standUp;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;

    @Enumerated(EnumType.STRING)
    @Column(name = "ticket_type")
    private TicketType ticketType;

    public TicketDTO toDTO() {
        TicketDTO dto = new TicketDTO();
        dto.setId(id);
        dto.setDate(date);
        dto.setSeatNumber(seatNumber);
        dto.setRow(row);

        if (movie != null) {
            Movie movieDTO = new Movie();
            BeanUtils.copyProperties(movie, movieDTO, "tickets", "locations");
            dto.setMovie(movieDTO);
        }
        dto.setStandUp(standUp);//may need to change this after implementing standup
        dto.setTicketType(ticketType);
        return dto;
    }


}
