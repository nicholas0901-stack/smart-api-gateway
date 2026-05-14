package com.portfolio.api_gateway.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "gateway_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GatewayEvent {

    @Id
    private String id;

    private String method;
    private String path;
    private int statusCode;
    private long latencyMs;
    private String clientIp;
    private String userId;
    private String routedTo;
    private String errorMessage;

    @CreatedDate
    private Instant timestamp;
}