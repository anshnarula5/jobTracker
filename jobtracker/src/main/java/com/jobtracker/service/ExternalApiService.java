package com.jobtracker.service;

import com.jobtracker.dto.CompanyLogoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExternalApiService {
    private final RestTemplate restTemplate;
    public CompanyLogoResponse[] getCompanyLogo(final String company) {
        final String apiUrl = "https://api.api-ninjas.com/v1/logo?name=" + company;
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", "V7tXaVJKdnGNzFuhGesPIA==pXTTIpqX2MI7AR5u");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<CompanyLogoResponse[]> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, CompanyLogoResponse[].class);
        return  response.getBody();
    }
}
