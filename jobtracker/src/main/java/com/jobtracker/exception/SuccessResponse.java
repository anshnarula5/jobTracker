package com.jobtracker.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class SuccessResponse<T> {
    private int statusCode;
    private String message;
    private long timestamp;
    private T data;
}
