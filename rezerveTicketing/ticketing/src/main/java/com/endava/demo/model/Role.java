package com.endava.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToMany
    @JoinTable(name = "users_roles",
        joinColumns = @JoinColumn(name = "id_role"),
        inverseJoinColumns = @JoinColumn(name = "id_user"))
    @JsonIgnore
    private Set<User> users;
}
