package com.jobtracker.exception;

public class ApplicationCreationException extends RuntimeException{
    public ApplicationCreationException(String message) {
        super(message);
    }

    public ApplicationCreationException(String message, Throwable cause) {
        super(message, cause);
    }

    public ApplicationCreationException(Throwable cause) {
        super(cause);
    }
}
