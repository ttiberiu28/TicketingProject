package com.endava.demo.exception;

public class UserDoesNotExistsException extends RuntimeException {

    public UserDoesNotExistsException(String name){

        super("User does not exists: " + name);
    }
}
