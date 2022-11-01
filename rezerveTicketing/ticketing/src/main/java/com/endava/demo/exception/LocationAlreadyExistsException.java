package com.endava.demo.exception;
public class LocationAlreadyExistsException extends RuntimeException{

    public LocationAlreadyExistsException(String place){

        super("This location already exist: " + place);
    }
}
