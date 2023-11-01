package com.jobtracker.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class CompanyDistributionResponse {
    private final String companyName;
    private final Long count;
}
