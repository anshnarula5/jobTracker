package com.jobtracker.service;

import com.jobtracker.dao.UserDao;
import com.jobtracker.entity.AuthenticationRequest;
import com.jobtracker.entity.AuthenticationResponse;
import com.jobtracker.entity.RegisterRequest;
import com.jobtracker.entity.User;
import com.jobtracker.exception.UserAlreadyExistsException;
import com.jobtracker.exception.UserNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDao userDao;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request){
        Optional<User> userOptional = userDao.findByEmail(request.getEmail());
        if(userOptional.isPresent()){
            throw new UserAlreadyExistsException("User with given email already exists.");
        }
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        userDao.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .id(user.getId())
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request){
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e){
            throw new UserNotFoundException("Wrong password");
        }
        Optional<User> userOptional = userDao.findByEmail(request.getEmail());
        if(userOptional.isEmpty()){
            throw new UserNotFoundException("No user exists for this email id.");
        }
        User user = userOptional.get();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .id(user.getId())
                .build();
    }

    public User getLoggedInUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

}
