package com.jobtracker.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Data
public class ReferralRequestAnalysisResponse {
    private final Long successfulCount;
    private final Long unsuccessfulCount;
}
