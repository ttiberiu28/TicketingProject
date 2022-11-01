package com.endava.demo.exception;

public class SpecialGuestAlreadyExistsException extends RuntimeException{

    public SpecialGuestAlreadyExistsException(String name){

        super("This special guest already exists: " + name);
    }
}
