package com.endava.demo.exception;

public class SportAlreadyExistsException extends RuntimeException{

    public SportAlreadyExistsException(String name){

        super("This sport event already exists: " + name);
    }
}
