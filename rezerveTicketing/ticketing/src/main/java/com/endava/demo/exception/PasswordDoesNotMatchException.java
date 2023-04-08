package com.endava.demo.exception;

public class PasswordDoesNotMatchException extends RuntimeException{

    public PasswordDoesNotMatchException(){

        super("The password does not match");
    }
}
