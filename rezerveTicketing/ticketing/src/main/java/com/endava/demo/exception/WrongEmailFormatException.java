package com.endava.demo.exception;

public class WrongEmailFormatException extends RuntimeException{

    public WrongEmailFormatException(){
        super("Wrong email format, try using @");
    }
}
