package com.endava.demo.exception;

public class SportDoesNotExistsException extends RuntimeException {

    public SportDoesNotExistsException(String name){

        super("Sport event does not exists: " + name);
    }
}
