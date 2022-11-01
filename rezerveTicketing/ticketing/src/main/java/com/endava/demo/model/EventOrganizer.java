package com.endava.demo.model;

public class EventOrganizer {

    private static EventOrganizer eo;

    private final String name;

    private final String emailAddress;

    private EventOrganizer(){
        this.name = "Tiberiu";
        this.emailAddress = "ttiberiu28@yahoo.com";
    }

    public static EventOrganizer getInstance(){

        if(eo == null) eo = new EventOrganizer();

        return eo;
    }

    @Override
    public String toString() {
        return "name='" + name + '\'' +
                ", email='" + emailAddress + '\'';
    }
}
