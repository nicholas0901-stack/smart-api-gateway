package com.portfolio.api_gateway.controller;

import com.portfolio.api_gateway.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/token")
    public ResponseEntity<Map<String, Object>> generateToken(@RequestBody Map<String, String> body) {
        String userId = body.getOrDefault("userId", "anonymous");
        String role = body.getOrDefault("role", "viewer");

        String token = jwtService.generateToken(userId, role);

        return ResponseEntity.ok(Map.of(
            "token", token,
            "expiresIn", jwtService.getExpirationMs() / 1000
        ));
    }
}