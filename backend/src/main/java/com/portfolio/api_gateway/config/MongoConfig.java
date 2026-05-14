package com.portfolio.api_gateway.config;

import com.portfolio.api_gateway.model.GatewayEvent;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexOperations;
import org.springframework.data.domain.Sort;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableMongoAuditing
public class MongoConfig {

    private final MongoTemplate mongoTemplate;

    public MongoConfig(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void createTtlIndex() {
        IndexOperations indexOps = mongoTemplate.indexOps(GatewayEvent.class);
        indexOps.ensureIndex(
            new Index().on("timestamp", Sort.Direction.ASC)
                       .expire(7, TimeUnit.DAYS)
        );
    }
}