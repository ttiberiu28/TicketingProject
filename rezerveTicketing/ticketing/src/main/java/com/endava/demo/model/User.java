package com.endava.demo.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String username;

    private String password;

    @ManyToMany(mappedBy = "users", fetch = FetchType.EAGER)
    private Set<Role> roles;
}
