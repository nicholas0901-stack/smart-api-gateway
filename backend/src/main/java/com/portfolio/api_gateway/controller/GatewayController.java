package com.portfolio.api_gateway.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/gateway")
public class GatewayController {

    @RequestMapping(value = "/**", method = {
        RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE
    })
    public ResponseEntity<Map<String, Object>> proxy(HttpServletRequest request) {
        // Simulate downstream routing — in a real app this would forward to another service
        String userId = (String) request.getAttribute("userId");

        return ResponseEntity.ok(Map.of(
            "message", "Request routed successfully",
            "method", request.getMethod(),
            "path", request.getRequestURI(),
            "user", userId != null ? userId : "unknown",
            "downstream", "stub-service"
        ));
    }
}