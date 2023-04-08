package com.endava.demo.exception;

public class UserAlreadyExistsException extends RuntimeException{

    public UserAlreadyExistsException(String username,String email){

        super("This user or email already exists: " + username + " / " + email);
    }
}
