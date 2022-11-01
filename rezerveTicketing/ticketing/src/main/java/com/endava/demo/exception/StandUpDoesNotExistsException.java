package com.endava.demo.exception;

public class StandUpDoesNotExistsException extends RuntimeException {

    public StandUpDoesNotExistsException(String name){

        super("Stand up event does not exists: " + name);
    }
}
