package com.jobtracker.exception;

import com.jobtracker.rest.ApplicationErrorResponse;
import jakarta.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(ApplicationNotFoundException.class)
    public ResponseEntity<ApplicationErrorResponse> handleException(ApplicationNotFoundException e){
        ApplicationErrorResponse errorResponse = new ApplicationErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setStatusCode(HttpStatus.NOT_FOUND.value());
        errorResponse.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ApplicationErrorResponse> handleValidationException(ValidationException e){
        ApplicationErrorResponse errorResponse = new ApplicationErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setStatusCode(HttpStatus.BAD_REQUEST.value());
        errorResponse.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler
    public ResponseEntity<ApplicationErrorResponse> handleGenericException(Exception e){
        ApplicationErrorResponse errorResponse = new ApplicationErrorResponse();
        errorResponse.setMessage(e.getMessage());
        errorResponse.setStatusCode(HttpStatus.BAD_REQUEST.value());
        errorResponse.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
