package com.endava.demo.exception;

public class MovieDoesNotExistsException extends RuntimeException {

    public MovieDoesNotExistsException(String name){

        super("Movie does not exists: " + name);
    }
}
