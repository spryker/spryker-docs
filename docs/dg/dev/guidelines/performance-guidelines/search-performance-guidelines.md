---
title: Search performance guidelines
description: This guideline explains how to optimize search performance for Elasticsearch and OpenSearch in Spryker-based projects.
last_updated: Dec 15, 2025
template: concept-topic-template
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Architecture performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
  - title: Configure Elasticsearch
    link: docs/pbc/all/search/latest/base-shop/tutorials-and-howtos/configure-elasticsearch.html
  - title: Generic faceted search
    link: docs/pbc/all/search/latest/base-shop/best-practices/generic-faceted-search.html
---

Search is a critical component of e-commerce applications, and improper search configuration can significantly impact performance. These guidelines help you optimize Elasticsearch or OpenSearch performance in your Spryker-based projects.

## Avoid global aggregations

Global aggregations in Elasticsearch/OpenSearch are expensive operations that calculate statistics across all documents in the index, ignoring the current query filters. They can severely impact search performance, especially on large catalogs.

### Why global aggregations are problematic

- **Performance impact**: Global aggregations process all documents in the index, not just the filtered result set. For a catalog with millions of products, this means processing millions of documents on every search request.
- **CPU and memory intensive**: They require significantly more CPU and memory resources compared to filtered aggregations.
- **Scalability issues**: As your product catalog grows, global aggregations become exponentially slower.

### What to avoid

Do not use aggregations that need to calculate across the entire index when displaying facets:

```json
{
  "aggregations": {
    "global_category_count": {
      "global": {},
      "aggregations": {
        "categories": {
          "terms": {
            "field": "category"
          }
        }
      }
    }
  }
}
```

### Recommended approach

Use filtered aggregations that respect the current search context. When users apply filters, aggregations should only calculate on the filtered result set:

```json
{
  "query": {
    "bool": {
      "filter": [
        {"term": {"category": "electronics"}}
      ]
    }
  },
  "aggregations": {
    "filtered_brands": {
      "terms": {
        "field": "brand"
      }
    }
  }
}
```

### When global aggregations might be acceptable

Global aggregations are only acceptable in specific scenarios:

- **Administrative dashboards**: Where performance is less critical and global statistics are genuinely needed.
- **Background jobs**: For generating reports or analytics outside of user-facing requests.
- **Small datasets**: On indices with a limited number of documents (typically under 10,000).

In all cases, consider caching the results and updating them periodically rather than calculating on every request.

## Avoid deep pagination: search is search, not a catalog

Elasticsearch and OpenSearch have a default maximum of 10,000 documents that can be retrieved using the `from` and `size` parameters (offset-based pagination). This limit exists for good performance reasons.

### Why deep pagination is problematic

- **Resource consumption**: To retrieve page 500 (items 10,000-10,020), Elasticsearch must find and sort 10,020 documents, then discard the first 10,000. This is extremely inefficient.
- **Memory pressure**: Deep pagination requires holding large result sets in memory across shards.
- **Distributed search overhead**: In a multi-shard environment, each shard must return `from + size` results to the coordinating node, which then sorts and returns only `size` results.

### What to avoid

Do not allow users to paginate deeply through search results:

```json
{
  "from": 9990,
  "size": 20,
  "query": {...}
}
```

Attempting to exceed the 10,000 document limit results in errors:

```
Result window is too large, from + size must be less than or equal to: [10000]
```

While you can increase `index.max_result_window`, this is strongly discouraged as it degrades performance.

### Search is not a catalog browser

Important principle: **Search should help users find specific products, not browse the entire catalog**.

Users who reach page 50+ of search results are not finding what they need. Instead of enabling deep pagination:

1. **Improve search relevance**: Better search algorithms and ranking help users find products on the first few pages.
2. **Suggest query refinement**: Guide users to apply filters and narrow their search.
3. **Use faceted navigation**: Let users filter by categories, attributes, and price ranges.
4. **Implement sort options**: Allow sorting by relevance, price, rating, or newness.



### Alternative approaches for deep access

If you genuinely need to access results beyond 10,000 documents:

**1. Search After (recommended for sequential access)**

Use the `search_after` parameter for efficient pagination through large result sets:

```json
{
  "size": 20,
  "query": {...},
  "sort": [
    {"price": "asc"},
    {"_id": "asc"}
  ],
  "search_after": [299.99, "product_12345"]
}
```

**2. Scroll API (for batch processing)**

Use the Scroll API for batch processing or exporting large datasets, but never for user-facing pagination:

```json
POST /products/_search?scroll=1m
{
  "size": 1000,
  "query": {...}
}
```

{% info_block warningBox "Warning" %}

The Scroll API is designed for batch operations, not real-time user requests. Use it only for background jobs, exports, or administrative tasks.

{% endinfo_block %}

## Optimize query structure

The way you structure search queries significantly impacts performance.

### Use filters over queries when possible

Filters are cacheable and faster than queries because they don't calculate relevance scores:

**Inefficient:**
```json
{
  "query": {
    "bool": {
      "must": [
        {"match": {"search_text": "laptop"}},
        {"match": {"category": "electronics"}},
        {"match": {"brand": "Dell"}},
        {"range": {"price": {"gte": 500, "lte": 1000}}}
      ]
    }
  }
}
```

**Optimized:**
```json
{
  "query": {
    "bool": {
      "must": [
        {"match": {"search_text": "laptop"}}
      ],
      "filter": [
        {"term": {"category": "electronics"}},
        {"term": {"brand": "Dell"}},
        {"range": {"price": {"gte": 500, "lte": 1000}}}
      ]
    }
  }
}
```

### Limit the number of returned fields

Only fetch fields you actually need using `_source` filtering:

```json
{
  "query": {...},
  "_source": ["id", "name", "price", "image_url"]
}
```

### Avoid wildcard queries at the beginning

Leading wildcard queries (`*term`) cannot use the index and require scanning all documents:

**Avoid:**
```json
{"wildcard": {"name": "*phone"}}
```

**Better:**
```json
{"wildcard": {"name": "phone*"}}
```

**Best:**
```json
{"match": {"name": "phone"}}
```

## Optimize aggregation performance

Aggregations are powerful but can be expensive. Follow these guidelines:

### Limit aggregation bucket size

Use the `size` parameter to limit the number of buckets returned:

```json
{
  "aggregations": {
    "brands": {
      "terms": {
        "field": "brand",
        "size": 20
      }
    }
  }
}
```

In Spryker, you can configure aggregation sizes by extending `\Spryker\Client\SearchElasticsearch\SearchElasticsearchConfig`:

```php
// src/Pyz/Client/SearchElasticsearch/SearchElasticsearchConfig.php

namespace Pyz\Client\SearchElasticsearch;

use Spryker\Client\SearchElasticsearch\SearchElasticsearchConfig as SprykerSearchElasticsearchConfig;

class SearchElasticsearchConfig extends SprykerSearchElasticsearchConfig
{
    /**
     * @var int
     */
    public const FACET_NAME_AGGREGATION_SIZE = 20; // Increased from default 10

    /**
     * @var int
     */
    protected const FACET_VALUE_AGGREGATION_SIZE = 15; // Increased from default 10
}
```

The constants control:
  1. `FACET_NAME_AGGREGATION_SIZE` - Maximum number of facet names returned (default: 10)
  2. `FACET_VALUE_AGGREGATION_SIZE` - Maximum number of values per facet (default: 10)

### Use appropriate aggregation types

Choose the right aggregation type for your use case:

- **Terms aggregation**: For categorical data (brands, colors). Limit to top N terms.
- **Stats aggregation**: For numeric ranges (price min/max).
- **Histogram**: For price ranges or date distributions.

### Avoid nested aggregations on high-cardinality fields

Nested aggregations multiply the number of calculations. Be cautious with aggregations on fields with many unique values:

```json
{
  "aggregations": {
    "categories": {
      "terms": {"field": "category", "size": 10},
      "aggregations": {
        "brands": {
          "terms": {"field": "brand", "size": 5}
        }
      }
    }
  }
}
```

This creates up to 10 × 5 = 50 buckets, which is acceptable. Avoid creating thousands of buckets.

## Implement proper caching

Caching is critical for search performance optimization.

### Query result caching

Cache search results for common queries, especially for:
- Category pages
- Popular search terms
- Filter combinations

Implement caching at the application level using Redis or your configured cache backend. There is no out-of-the-box query caching plugin in Spryker's SearchElasticsearch module, so you need to implement caching in your project layer.

### Filter caching

Elasticsearch automatically caches filters. Ensure you use filters (in `bool.filter` clause) rather than queries for filterable attributes.

### Aggregation caching

For expensive aggregations, consider caching results at the application level:

```php
// example code, not a ready-to-use solution
$cacheKey = sprintf('search_aggregations_%s_%s', $categoryId, $locale);
$aggregations = $this->cache->get($cacheKey);

if ($aggregations === null) {
    $aggregations = $this->searchClient->getAggregations($query);
    $this->cache->set($cacheKey, $aggregations, 3600); // Cache for 1 hour
}
```

## Index optimization

Proper index configuration is fundamental for search performance.

### Use appropriate field types

Choose the correct field type for each attribute:

```json
{
  "mappings": {
    "properties": {
      "name": {
        "type": "text",
        "fields": {
          "keyword": {"type": "keyword"}
        }
      },
      "sku": {"type": "keyword"},
      "price": {"type": "float"},
      "in_stock": {"type": "boolean"},
      "created_at": {"type": "date"}
    }
  }
}
```

### Disable unnecessary features

If you don't need certain features, disable them to save space and improve performance:

```json
{
  "mappings": {
    "properties": {
      "internal_id": {
        "type": "keyword",
        "index": false,
        "doc_values": false
      }
    }
  }
}
```

### Use appropriate analyzers

Configure analyzers based on your language and search requirements:

```json
{
  "settings": {
    "analysis": {
      "analyzer": {
        "product_name_analyzer": {
          "type": "custom",
          "tokenizer": "standard",
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  }
}
```

## Monitor search performance

Effective monitoring helps identify and resolve performance issues.

### Use APM tools

Configure your APM tool (NewRelic, OpenTelemetry) to track search query performance:

- Monitor slow queries (queries taking > 500ms)
- Track query frequency and patterns
- Identify expensive aggregations

### Enable slow query logging

Configure Elasticsearch/OpenSearch to log slow queries:

```yaml
# opensearch.yml or elasticsearch.yml
index.search.slowlog.threshold.query.warn: 10s
index.search.slowlog.threshold.query.info: 5s
index.search.slowlog.threshold.query.debug: 2s
index.search.slowlog.threshold.fetch.warn: 1s
```

### Monitor cluster health

Regularly check:
- Cluster status (green/yellow/red)
- Shard allocation
- Memory usage
- CPU utilization
- Query throughput

## Common performance anti-patterns

Avoid these common mistakes:

### 1. Using search for real-time inventory checks

Don't query search for real-time stock availability. Use Redis or the database for real-time data.

### 2. Over-fetching data

Don't retrieve all product data when you only need IDs and basic information for a listing page.

### 3. Unbounded searches

Always set reasonable limits on:
- Number of results returned
- Aggregation bucket sizes
- Query timeout values

### 4. Ignoring search relevance

Poor search relevance leads to users applying many filters or paginating deeply. Invest time in improving search quality and ranking.

## Best practices summary

1. **Never use global aggregations** in user-facing search requests.
2. **Limit pagination** to a reasonable number of pages (typically 20-50 pages maximum).
3. **Use filters over queries** for exact-match criteria.
4. **Cache aggressively**: Cache common queries, aggregations, and filter results.
5. **Monitor and optimize**: Use APM tools to identify slow queries and optimize them.
6. **Design for search, not catalog browsing**: Help users find products quickly through better search relevance and faceted navigation.
7. **Set query timeouts**: Prevent runaway queries from consuming resources.
8. **Use appropriate field types and analyzers** in your index mappings.
9. **Limit returned fields** to only what's needed for the current view.
10. **Regular index maintenance**: Monitor index health and optimize when necessary.

## Additional resources

- [Elasticsearch Performance Tuning Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-search-speed.html)
- [OpenSearch Performance Tuning](https://opensearch.org/docs/latest/tuning-your-cluster/)
- [Spryker Search Best Practices](/docs/pbc/all/search/latest/base-shop/best-practices/search-best-practices.html)
