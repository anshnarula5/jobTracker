package com.jobtracker.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JWTService {
    private static final String SECRET_KEY = "F29D475214E519C6CEE13214E519C6CEE1316A2F6E1F29D475214E519C6CEE13214E519C6CEE1316A2F6E1";
    public String extractUserEmail(final String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }
    public Claims extractAllClaims(final String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    public <T> T extractClaim(final String token, final Function<Claims, T> claimResolver){
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }
    private Key getSigningKey() {
        byte[] bytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(bytes);
    }
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails
    ){
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*24*60))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(), userDetails);
    }

    public Boolean isTokenValid(final String token, final UserDetails userDetails){
        final String userEmail = extractUserEmail(token);
        return userEmail.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
    public Boolean isTokenExpired(final String token){
        return extractExpiration(token).before(new Date());
    }
    public Date extractExpiration(final String token){
        return extractClaim(token, Claims::getExpiration);
    }
}
