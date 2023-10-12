package com.jobtracker.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public class ReferralDataResponse {
    private final String companyName;
    private final Long requestedReferrals;
    private final Long receivedReferrals;
}
