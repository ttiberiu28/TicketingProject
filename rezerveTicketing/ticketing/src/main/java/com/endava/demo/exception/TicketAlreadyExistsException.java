package com.endava.demo.exception;

public class TicketAlreadyExistsException extends RuntimeException{

    public TicketAlreadyExistsException(int seatNumber, int row){

        super("This ticket already exists: " +
                "seatNumber: " + seatNumber + "/ row: " + row);
    }
}
