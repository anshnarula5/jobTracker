package com.jobtracker.rest;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@Getter
@Setter
public class ApplicationErrorResponse {
    private int StatusCode;
    private String message;
    private long timestamp;
}
