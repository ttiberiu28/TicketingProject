package com.endava.demo.exception;

public class KeywordAlreadyExistsException extends RuntimeException{

    public KeywordAlreadyExistsException(String name){

        super("This keyword already exists: " + name);
    }
}
