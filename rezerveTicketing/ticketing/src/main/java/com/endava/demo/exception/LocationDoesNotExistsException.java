package com.endava.demo.exception;
public class LocationDoesNotExistsException extends RuntimeException {

    public LocationDoesNotExistsException(String name){

        super("Location does not exists: " + name);
    }
}
