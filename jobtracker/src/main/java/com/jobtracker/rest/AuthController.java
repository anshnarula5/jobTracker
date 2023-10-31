package com.jobtracker.rest;

import com.jobtracker.entity.*;
import com.jobtracker.exception.ApplicationCreationException;
import com.jobtracker.exception.SuccessResponse;
import com.jobtracker.exception.UserNotFoundException;
import com.jobtracker.service.AuthService;
import com.jobtracker.utils.ControllerHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = {"Requester-Type", "Authorization"}, exposedHeaders = {"Access-Control-Allow-Origin","Access-Control-Allow-Credentials, X-Get-Header"})
public class AuthController {

    private final AuthService authService;
    private final ControllerHelper controllerHelper;

    @PostMapping("/register")
    public ResponseEntity<SuccessResponse<AuthenticationResponse>> register(@RequestBody RegisterRequest request){
        System.out.println(request + "Inside register");
        try {
            AuthenticationResponse authenticationResponse = authService.register(request);
            return controllerHelper.buildSuccessResponse(authenticationResponse);
        }
        catch (Exception e){
            System.out.println("User register failed");
            throw new UserNotFoundException(e);
        }
    }

    @PostMapping("/authenticate")
    public  ResponseEntity<SuccessResponse<AuthenticationResponse>>register(@RequestBody AuthenticationRequest request){
        System.out.println("INSIDE LOGIN API");
        try {
            AuthenticationResponse authenticationResponse = authService.authenticate(request);
            return controllerHelper.buildSuccessResponse(authenticationResponse);
        }
        catch (Exception e){
            System.out.println("User auth failed");
            throw new UserNotFoundException(e);
        }
    }
}
