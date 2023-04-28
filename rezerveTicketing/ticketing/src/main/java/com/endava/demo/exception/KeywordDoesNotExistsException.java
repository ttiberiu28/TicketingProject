package com.endava.demo.exception;

public class KeywordDoesNotExistsException extends RuntimeException {

    public KeywordDoesNotExistsException(String name){

        super("Keyword does not exists: " + name);
    }
}
