package com.endava.demo.exception;

public class TicketDoesNotExistsException extends RuntimeException {

    public TicketDoesNotExistsException(String name){

        super("Ticket does not exists: " + name);
    }
}
