package com.portfolio.api_gateway.service;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class StatsService {

    private final MongoTemplate mongoTemplate;

    public StatsService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Map<String, Object> getStats() {
        Aggregation agg = newAggregation(
            group()
                .count().as("totalRequests")
                .avg("latencyMs").as("avgLatency")
                .sum(ConditionalOperators
                    .when(Criteria.where("statusCode").gte(400))
                    .then(1).otherwise(0)).as("errorCount")
        );

        AggregationResults<Map> results =
            mongoTemplate.aggregate(agg, "gateway_events", Map.class);

        Map<String, Object> stats = results.getUniqueMappedResult();
        if (stats == null) {
            stats = new HashMap<>();
            stats.put("totalRequests", 0);
            stats.put("avgLatency", 0.0);
            stats.put("errorCount", 0);
        }

        int total = ((Number) stats.get("totalRequests")).intValue();
        int errors = ((Number) stats.get("errorCount")).intValue();
        double errorRate = total > 0 ? Math.round(errors * 1000.0 / total) / 10.0 : 0.0;
        stats.put("errorRate", errorRate);

        return stats;
    }

    @SuppressWarnings("unchecked")
    public List<Map> getTopRoutes() {
        Aggregation agg = newAggregation(
            group("path").count().as("hits"),
            sort(Sort.Direction.DESC, "hits"),
            limit(5)
        );
        return mongoTemplate
            .aggregate(agg, "gateway_events", Map.class)
            .getMappedResults();
    }
}