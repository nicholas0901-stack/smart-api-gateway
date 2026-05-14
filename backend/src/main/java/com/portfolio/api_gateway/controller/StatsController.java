package com.portfolio.api_gateway.controller;

import com.portfolio.api_gateway.service.StatsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;

    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(statsService.getStats());
    }

    @GetMapping("/routes")
    public ResponseEntity<List<Map>> getTopRoutes() {
        return ResponseEntity.ok(statsService.getTopRoutes());
    }
}