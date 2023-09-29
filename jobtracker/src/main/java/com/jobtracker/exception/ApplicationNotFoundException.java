package com.jobtracker.exception;

public class ApplicationNotFoundException extends RuntimeException{
    public ApplicationNotFoundException(String message) {
        super(message);
    }
    public ApplicationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    public ApplicationNotFoundException(Throwable cause) {
        super(cause);
    }
}
