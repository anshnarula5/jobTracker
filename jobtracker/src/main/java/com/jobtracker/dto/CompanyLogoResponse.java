package com.jobtracker.dto;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CompanyLogoResponse {
    private final String name;
    private final String ticker;
    private final String image;
}
