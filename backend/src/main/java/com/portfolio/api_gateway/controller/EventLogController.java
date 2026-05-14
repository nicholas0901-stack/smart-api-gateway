package com.portfolio.api_gateway.controller;

import com.portfolio.api_gateway.model.GatewayEvent;
import com.portfolio.api_gateway.repository.GatewayEventRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/logs")
public class EventLogController {

    private final GatewayEventRepository eventRepository;

    public EventLogController(GatewayEventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @GetMapping
    public ResponseEntity<Page<GatewayEvent>> getLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size,
            @RequestParam(required = false) String path) {

        PageRequest pageable = PageRequest.of(page, size);

        Page<GatewayEvent> events = (path != null && !path.isBlank())
            ? eventRepository.findByPathContainingOrderByTimestampDesc(path, pageable)
            : eventRepository.findAllByOrderByTimestampDesc(pageable);

        return ResponseEntity.ok(events);
    }
}