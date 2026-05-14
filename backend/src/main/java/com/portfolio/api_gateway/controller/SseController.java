package com.portfolio.api_gateway.controller;

import com.portfolio.api_gateway.service.SseService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/stream")
public class SseController {

    private final SseService sseService;

    public SseController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping
    public SseEmitter stream() {
        return sseService.createEmitter();
    }
}