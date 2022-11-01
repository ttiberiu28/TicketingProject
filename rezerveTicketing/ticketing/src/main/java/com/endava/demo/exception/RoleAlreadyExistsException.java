package com.endava.demo.exception;
public class RoleAlreadyExistsException extends RuntimeException{

    public RoleAlreadyExistsException(String name){

        super("This role already exists: " + name);
    }
}
