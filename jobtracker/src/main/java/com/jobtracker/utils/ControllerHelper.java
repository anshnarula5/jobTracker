package com.jobtracker.utils;

import com.jobtracker.exception.SuccessResponse;
import jakarta.validation.ValidationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;

import java.util.List;

@Component
public class ControllerHelper {
    public void validateInput(final BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> validationErrors = bindingResult.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .toList();
            throw new ValidationException(validationErrors.toString());
        }
    }

    public <T> ResponseEntity<SuccessResponse<T>> buildSuccessResponse(final T data) {
        final SuccessResponse<T> successResponse = new SuccessResponse<>();
        successResponse.setStatusCode(HttpStatus.OK.value());
        successResponse.setMessage("Success");
        successResponse.setData(data);
        return ResponseEntity.ok(successResponse);
    }
}

