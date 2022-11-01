package com.endava.demo.exception;

public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException(String username){

        super("This user already exists" + username);
    }
}
