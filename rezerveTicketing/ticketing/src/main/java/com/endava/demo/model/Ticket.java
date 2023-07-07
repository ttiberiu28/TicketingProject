package com.endava.demo.model;

import com.endava.demo.dto.TicketDTO;
import com.endava.demo.dto.TicketSeatDTO;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    private int seatNumber;
    @NotNull
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
    @JoinColumn(name = "concert_id")
    @JsonIgnore
    private Concert concert;

    @ManyToOne
    @JoinColumn(name = "sport_id")
    @JsonIgnore
    private Sport sport;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private Cart cart;

    @Enumerated(EnumType.STRING)
    @Column(name = "ticket_type")
    private TicketType ticketType;

    @NotNull
    @Min(1)
    @Column(name = "quantity")
    private int quantity = 1;

    @Column(name = "selected_time", nullable = true, length = 100)
    private String selectedTime;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<TicketSeat> ticketSeats = new ArrayList<>();

    public void addTicketSeat(TicketSeat ticketSeat) {
        ticketSeats.add(ticketSeat);
        ticketSeat.setTicket(this);
    }

    public void removeTicketSeat(TicketSeat ticketSeat) {
        ticketSeats.remove(ticketSeat);
        ticketSeat.setTicket(null);
    }
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

        if (concert != null) {
            Concert concertDTO = new Concert();
            BeanUtils.copyProperties(concert, concertDTO, "tickets", "locations");
            dto.setConcert(concertDTO);
        }

        if(sport != null) {
            Sport sportDTO = new Sport();
            BeanUtils.copyProperties(sport, sportDTO, "tickets", "locations");
            dto.setSport(sportDTO);
        }

        dto.setTicketType(ticketType);
        dto.setQuantity(quantity);
        dto.setSelectedTime(selectedTime);

        List<TicketSeatDTO> ticketSeatDTOs = ticketSeats.stream()
                .map(TicketSeat::toDTO)
                .collect(Collectors.toList());
        dto.setTicketSeats(ticketSeatDTOs);
        return dto;
    }

}
