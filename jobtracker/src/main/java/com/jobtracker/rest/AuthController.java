package com.jobtracker.rest;

import com.jobtracker.entity.AuthenticationRequest;
import com.jobtracker.entity.AuthenticationResponse;
import com.jobtracker.entity.RegisterRequest;
import com.jobtracker.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = {"Requester-Type", "Authorization"}, exposedHeaders = {"Access-Control-Allow-Origin","Access-Control-Allow-Credentials, X-Get-Header"})
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request){
        System.out.println("INSIDE LOGIN API");
        return ResponseEntity.ok(authService.authenticate(request));
    }
}
