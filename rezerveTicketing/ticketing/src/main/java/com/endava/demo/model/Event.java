package com.endava.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
abstract class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;

    @NotNull
    private int price;
    @NotNull
    protected int lengthMinutes;

    @Size(max = 30)
    @NotEmpty
    protected String name;

    protected Event(int lengthMinutes, String name) {
        this.lengthMinutes = lengthMinutes;
        this.name = name;
    }
}
