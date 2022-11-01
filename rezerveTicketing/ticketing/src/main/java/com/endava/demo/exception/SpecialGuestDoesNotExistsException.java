package com.endava.demo.exception;

public class SpecialGuestDoesNotExistsException extends RuntimeException {

    public SpecialGuestDoesNotExistsException(String name){

        super("Special guest does not exists: " + name);
    }
}
