package com.portfolio.api_gateway.filter;

import com.portfolio.api_gateway.model.GatewayEvent;
import com.portfolio.api_gateway.repository.GatewayEventRepository;
import com.portfolio.api_gateway.service.SseService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;

@Component
@Order(2)
public class RequestLoggingFilter extends OncePerRequestFilter {

    private final GatewayEventRepository eventRepository;
    private final SseService sseService;

    public RequestLoggingFilter(GatewayEventRepository eventRepository, SseService sseService) {
        this.eventRepository = eventRepository;
        this.sseService = sseService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/api/auth/") || path.startsWith("/api/stream");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        long start = System.currentTimeMillis();

        filterChain.doFilter(request, response);

        long latency = System.currentTimeMillis() - start;

        String userId = (String) request.getAttribute("userId");
        String path = request.getRequestURI();

        // Determine which "service" this route maps to
        String routedTo = resolveService(path);

        GatewayEvent event = GatewayEvent.builder()
                .method(request.getMethod())
                .path(path)
                .statusCode(response.getStatus())
                .latencyMs(latency)
                .clientIp(request.getRemoteAddr())
                .userId(userId)
                .routedTo(routedTo)
                .timestamp(Instant.now())
                .build();

        eventRepository.save(event);
        sseService.broadcast(event);
    }

    private String resolveService(String path) {
        if (path.contains("/users")) return "user-svc";
        if (path.contains("/orders")) return "order-svc";
        if (path.contains("/products")) return "product-svc";
        if (path.contains("/inventory")) return "inventory-svc";
        return "default-svc";
    }
}