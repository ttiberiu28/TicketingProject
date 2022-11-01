package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "special_guests")
@Getter
@Setter
public class SpecialGuest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotEmpty
    @Size(max = 25)
    private String name;

    @Min(18)
    @NotNull
    private int age;

    @ManyToMany
    @JoinTable(name = "stand_up_special_guests",
        joinColumns = @JoinColumn(name = "special_guest_id"),
        inverseJoinColumns = @JoinColumn(name = "stand_up_id"))
    @JsonIgnore
    private List<StandUp> standUpEvents;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SpecialGuest that = (SpecialGuest) o;
        return getId() == that.getId() && getAge() == that.getAge() && getName().equals(that.getName()) && getStandUpEvents().equals(that.getStandUpEvents());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getAge(), getStandUpEvents());
    }

    @Override
    public String toString() {
        return "SpecialGuest{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", standUpEvents=" + standUpEvents +
                '}';
    }
}
