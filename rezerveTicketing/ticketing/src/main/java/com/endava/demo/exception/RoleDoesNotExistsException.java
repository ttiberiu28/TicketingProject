package com.endava.demo.exception;

public class RoleDoesNotExistsException extends RuntimeException {

    public RoleDoesNotExistsException(String name){

        super("Role does not exists: " + name);
    }
}
