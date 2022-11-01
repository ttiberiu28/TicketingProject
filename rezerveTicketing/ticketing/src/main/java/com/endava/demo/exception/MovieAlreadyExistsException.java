package com.endava.demo.exception;

public class MovieAlreadyExistsException extends RuntimeException{

    public MovieAlreadyExistsException(String name){

        super("This movie already exists: " + name);
    }
}
