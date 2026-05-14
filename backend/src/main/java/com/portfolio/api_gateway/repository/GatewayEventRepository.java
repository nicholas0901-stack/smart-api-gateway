package com.portfolio.api_gateway.repository;

import com.portfolio.api_gateway.model.GatewayEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GatewayEventRepository extends MongoRepository<GatewayEvent, String> {

    Page<GatewayEvent> findAllByOrderByTimestampDesc(Pageable pageable);

    Page<GatewayEvent> findByPathContainingOrderByTimestampDesc(String path, Pageable pageable);
}