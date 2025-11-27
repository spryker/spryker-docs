---
title: "Performance guidelines: External HTTP requests"
description: Learn about performance guidelines for external HTTP requests.
last_updated: Nov 03, 2025
template: concept-topic-template
keywords: performance, external HTTP requests, external call, SAP, ERP, Concurrent, WebProfiler, NewRelic
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: External calls take a lot of time
    link: docs/dg/dev/troubleshooting/troubleshooting-performance-issues/external-calls-take-a-lot-of-time.html
  - title: Session locking issues
    link: docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/session-locking-issues.html
  - title: New Relic APM
    link: docs/dg/dev/troubleshooting/troubleshooting-performance-issues/troubleshooting-performance-issues.html#new-relic
  - title: Web Profiler Widget
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html
---

## Purpose of external HTTP calls

External calls occur to retrieve data from third-party systems (for example, SAP, ERP, PIM, pricing, stock, personalization) that are not yet replicated into internal Storage or Elasticsearch.
These calls are sometimes unavoidable to maintain real-time accuracy (for example, live stock, dynamic pricing, real-time personalization).

## Impact of external HTTP calls on performance

- In background jobs (such as Jenkins Queue workers), external calls are decoupled from the customer flow and have minimal direct impact.
- During Yves or Glue requests, they add latency, increase tail response times, and can cause [session lock prolongation](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/session-locking-issues) (for example, a long "add to cart" request can block other requests in the same customer session, creating a cascading slowdown).
- Slow external dependencies reduce horizontal scalability because threads must wait, which consumes connection pools.

## Mitigation

{% info_block infoBox %} 
Prefer pre-ingestion: import, transform, and persist the required data into Storage or Elasticsearch ahead of runtime.
Minimize the synchronous dependency surface: make only the calls that must occur in real time.
{% endinfo_block %}

### Caching GET requests

Discuss with business stakeholders which data can tolerate minor staleness. Add a caching decorator around the HTTP client:
- **Short-term cache** (minutes): for prices or availability.
- **Long-term cache** (hours or days): for rarely changing reference data (for example, attributes or catalog metadata).

### Replace N+1 with collection endpoints

A common performance issue is the **N+1 Problem**, where a collection of entities (for example, 20 products on a listing page) causes **N** external calls.

**Scenario**: expanding product widgets on a product listing page often leads to this, as each product individually calls an external service for a small piece of data (for example, a special price).

**Solution**: restructure the communication to make a single batch call for the entire collection. Send all entity IDs (**Entity_1**, **Entity_2**, **Entity_N**) in one request to the external service. The external service should be able to return an array of data, one entry for each entity. This reduces $N$ synchronous network round-trips to just 1, drastically improving latency.

### Concurrent HTTP calls

When multiple independent external calls remain, execute them concurrently by using [Guzzle concurrent requests](https://docs.guzzlephp.org/en/stable/quickstart.html#concurrent-requests) to shorten total execution time.
Set appropriate per-request timeouts and limit concurrency to prevent system overload.

```php
use GuzzleHttp\Client;
use GuzzleHttp\Promise;

$client = new Client();

$promises = [
    'stocks'  => $client->getAsync('http://service-a/stocks'),
    'prices'  => $client->getAsync('http://service-b/prices'),
    'ratings' => $client->getAsync('http://service-c/ratings'),
];

$responses = Promise\Utils::unwrap($promises);
```

### WebProfiler Widget monitoring of external HTTP calls

To effectively monitor external service integrations, use the [WebProfiler](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves).
Log external HTTP requests with `Spryker\Shared\Http\Logger\ExternalHttpInMemoryLoggerTrait`, so that you can easily see the request details in the WebProfiler Widget.

WebProfiler Widget is available for local development only.

```php
<?php

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Spryker\Shared\Http\Logger\ExternalHttpInMemoryLoggerTrait;

class MyApiClient
{
    use ExternalHttpInMemoryLoggerTrait;

    public function __construct(
        private Client $httpClient,
    ){}

    public function sendSomeData(string $url, array $data): ?array
    {
        $method = 'POST';
        $requestData = $data;
        $responseData = null;

        try {
            $response = $this->httpClient->request($method, $url, [
                'json' => $requestData,
            ]);
            $responseData = json_decode($response->getBody()->getContents(), true);

        } catch (RequestException $e) {
            $responseData = ['error' => $e->getMessage()];
            if ($e->hasResponse()) {
                $responseData['response_body'] = $e->getResponse()?->getBody()->getContents();
            }
        } catch (\Throwable $e) {
            $responseData = ['error' => 'An unexpected error occurred: ' . $e->getMessage()];
        } finally {
            $this->getExternalHttpInMemoryLogger()->log(
                $method,
                $this->httpClient->getConfig('base_uri') . $url,
                $requestData,
                $responseData
            );
        }

        return $responseData;
    }
}
```

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/guidelines/performance-guidelines/WebProfilerWidget-ExternalHttp.png)

### New Relic APM monitoring of external HTTP calls

Additionally, you can use [New Relic APM](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/troubleshooting-performance-issues#new-relic) transaction traces and external dependency data to identify bottlenecks and measure the impact of third-party latency.