package com.jobtracker.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class StatusDistributionResponse{
    private final String status;
    private final long count;

}
