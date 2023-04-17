package com.endava.demo.exception;

public class ConcertAlreadyExistsException extends RuntimeException{

    public ConcertAlreadyExistsException(String name){

        super("This concert already exists: " + name);
    }
}
