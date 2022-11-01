package com.endava.demo.exception;

public class StandUpAlreadyExistsException extends RuntimeException{

    public StandUpAlreadyExistsException(String name){

        super("This stand up event already exists: " + name);
    }
}
