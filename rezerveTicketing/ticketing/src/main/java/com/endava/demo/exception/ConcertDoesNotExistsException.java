package com.endava.demo.exception;

public class ConcertDoesNotExistsException extends RuntimeException {

    public ConcertDoesNotExistsException(String name){

        super("Concert does not exists: " + name);
    }
}
