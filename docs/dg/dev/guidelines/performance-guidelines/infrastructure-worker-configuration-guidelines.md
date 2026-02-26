---
title: Infrastructure and worker configuration guidelines
description: Learn how to optimize nginx configuration and worker orchestration for Spryker applications, including buffer tuning and multi-store worker strategies.
last_updated: Dec 16, 2025
template: concept-topic-template
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: CDN and traffic management integration
    link: docs/dg/dev/guidelines/performance-guidelines/cdn-and-traffic-management-integration.html
  - title: Jenkins operational best practices
    link: docs/ca/dev/best-practices/jenkins-operational-best-practices.html
  - title: Stable Workers
    link: docs/dg/dev/backend-development/cronjobs/stable-workers.html
  - title: Optimizing Jenkins execution
    link: docs/dg/dev/backend-development/cronjobs/optimizing-jenkins-execution.html
---

Infrastructure configuration significantly impacts application performance. Improperly configured web servers, PHP-FPM, and background worker orchestration can create bottlenecks even when application code is optimized. These guidelines help you configure infrastructure components for optimal Spryker performance.

## nginx configuration

nginx serves as the web server and reverse proxy in Spryker deployments. Default configurations work for small responses but can cause performance issues with larger payloads.

### Avoid proxying external resources through Spryker Cloud

**The anti-pattern:**

Proxying external resources (images, APIs, third-party services) through your Spryker application creates unnecessary load and latency:

```nginx
# ❌ Bad: Proxying external image CDN through Spryker
location /external-images/ {
    proxy_pass https://external-cdn.com/images/;
    proxy_set_header Host external-cdn.com;
}
```

**Problems:**
- **Bandwidth waste**: All traffic flows through your infrastructure
- **Latency overhead**: Adds extra hop and processing time
- **Resource consumption**: Uses nginx worker connections and memory
- **Failure coupling**: External service downtime affects your infrastructure
- **No CDN benefits**: Loses edge caching and geographic distribution

**Solutions:**

**1. Direct client connections:**

```html
<!-- ✅ Good: Direct connection to external CDN -->
<img src="https://external-cdn.com/images/product.jpg" alt="Product">
```

**2. Asynchronous loading:**

For third-party scripts and widgets, load them asynchronously in the browser:

```html
<!-- Third-party analytics loads directly from provider -->
<script async src="https://analytics-provider.com/tracker.js"></script>
```

**When proxying might be necessary:**

- **Security requirements**: Hiding internal services behind reverse proxy
- **Legacy integrations**: Systems that require single origin
- **Authentication injection**: Adding auth headers to external requests

Even in these cases, proxy only specific, necessary endpoints, not entire external services.

### Adjust nginx and PHP-FPM buffers for response size

nginx and PHP-FPM use buffers to handle request/response data. Default buffer sizes (4-8KB) work for small responses but cause performance issues with larger payloads common in e-commerce applications.

### Understanding the buffer problem

**How nginx + PHP-FPM communicate:**

1. nginx receives HTTP request from client
2. nginx forwards request to PHP-FPM via FastCGI
3. PHP-FPM processes request and generates response
4. PHP-FPM sends response back through FastCGI buffers
5. nginx receives buffered response and sends to client

**What happens with undersized buffers:**

When response size exceeds buffer capacity:
- PHP-FPM must write to temporary files on disk (slow I/O)
- nginx reads from disk instead of memory
- Simple `echo $content` operations take excessive time
- Response time increases by 10-100x

**Symptoms of buffer issues:**

- Slow response times for pages with large HTML (>50KB)
- High disk I/O during request processing
- PHP execution time is fast, but total response time is slow
- Performance degrades under load as disk becomes bottleneck

### Buffer configuration with docker-sdk

{% info_block infoBox "Project-level nginx configuration" %}

nginx configuration is managed by [docker-sdk](https://github.com/spryker/docker-sdk) and cannot be directly edited at the project level. Configuration is controlled through deploy files (`deploy.yml`, `deploy.dev.yml`) with options exposed by docker-sdk.

Buffer optimizations described below are already implemented in recent docker-sdk versions.

{% endinfo_block %}

**Optimized buffer settings (implemented in docker-sdk):**

Recent versions of docker-sdk include optimized FastCGI buffer configuration with the following default values. These parameters can be customized through the deploy file configuration. For more details about configuring these parameters, see [Deploy file reference - buffer configuration](https://github.com/spryker/docker-sdk/blob/master/docs/07-deploy-file/02-deploy.file.reference.v1.md?plain=1#L508).

- **fastcgi_buffers**: `16 16k` (256KB total)
- **fastcgi_buffer_size**: `16k`
- **fastcgi_max_temp_file_size**: `1m`

These settings provide:
- 256KB buffer capacity (sufficient for most Spryker responses)
- Prevention of disk writes for responses up to 1MB
- Significant performance improvement for large HTML pages

{% info_block infoBox "Compression reduces buffer pressure" %}

Enabling HTTP response compression in the deploy file (`assets: compression:`) is complementary to buffer tuning. When compression is active, the frontend container compresses responses before buffering, which reduces the effective size that passes through FastCGI buffers and the load balancer. For details on configuring compression, see [Deploy file reference - assets](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) and [CDN and traffic management integration](/docs/dg/dev/guidelines/performance-guidelines/cdn-and-traffic-management-integration.html).

{% endinfo_block %}

**Verify your docker-sdk version:**

```bash
# Check docker-sdk version in your project
cat docker/deployment/default/Dockerfile | grep "FROM spryker/php" | head -1
```

Update to the latest docker-sdk to benefit from buffer optimizations:

```bash
# Update docker-sdk
git clone https://github.com/spryker/docker-sdk.git ./docker
```

**Deploy file configuration:**

While FastCGI buffer sizes are handled by docker-sdk, you can configure related HTTP settings:

```yaml
# deploy.dev.yml - Configure HTTP timeout and request body size
groups:
  applications:
    yves_eu:
      application: yves
      http:
        timeout: 2m                    # FastCGI timeout (default: 1m)
        max-request-body-size: 10m     # Maximum request body size (default: 1m for Yves)
      endpoints:
        yves.eu.spryker.local:
          store: DE
```

**Configurable HTTP settings:**
- `timeout`: Affects `proxy_read_timeout`, `proxy_send_timeout`, `fastcgi_read_timeout`, `fastcgi_send_timeout`
- `max-request-body-size`: Maps to nginx `client_max_body_size`

**Advanced: Buffer configuration (rarely needed)**

If you need custom buffer settings (only after measuring response sizes), you can configure them at the endpoint level. Contact Spryker Cloud support before using these settings:

```yaml
# Only use after confirming need with performance testing
endpoints:
  yves.eu.spryker.local:
    http:
      buffer:
        buffer_size: 16k           # fastcgi_buffer_size
        buffers: 128 128k          # fastcgi_buffers
        busy_buffers_size: 256k    # fastcgi_busy_buffers_size
```

For complete deploy file options, see:
- [Deploy file reference - Version 1.0](https://github.com/spryker/docker-sdk/blob/master/docs/07-deploy-file/02-deploy.file.reference.v1.md)
- [Deploy file reference (Spryker docs)](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html)
- [docker-sdk documentation](https://github.com/spryker/docker-sdk/tree/master/docs)
- [Deploy file examples](https://github.com/spryker-shop/b2b-demo-shop/blob/master/deploy.dev.yml)

### Measuring response sizes

To determine if current buffer settings are adequate for your project:

**1. Measure average response size:**

```bash
# Sample 100 requests to catalog page
for i in {1..100}; do
    curl -s -w "%{size_download}\n" -o /dev/null https://your-shop.com/catalog
done | awk '{sum+=$1; count++} END {print "Average:", sum/count, "bytes"}'
```

**2. Interpret results:**

- **<100KB**: Default buffer configuration (256KB) is sufficient
- **100-500KB**: Consider requesting increased buffers via Spryker Cloud support
- **>500KB**: Investigate response size optimization opportunities (reduce HTML/JSON payload)

**3. Monitor for buffer pressure:**

Look for symptoms indicating buffer exhaustion:
- Inconsistent response times for identical requests
- Slow responses during peak traffic
- High disk I/O on web servers

### PHP configuration

PHP extensions and runtime settings are configured through the `image` section of deploy files:

```yaml
# deploy.yml - Enable PHP extensions
image:
  tag: spryker/php:8.4
  php:
    enabled-extensions:
      - blackfire
      - newrelic
```

For PHP runtime settings like memory limits and execution timeouts, these are typically pre-configured in the docker-sdk PHP images. If you need custom PHP configuration:
1. **For local development**: You can modify PHP configuration in the docker containers
2. **For Spryker Cloud**: Contact Spryker Cloud support to request specific PHP configuration changes

For more details on service configuration, see [Configure services](/docs/dg/dev/integrate-and-configure/configure-services.html).

## Worker orchestration for multi-store setups

In multi-store Spryker projects, background job orchestration becomes complex. Each store often duplicates jobs, leading to resource contention and instability.

### The multi-store worker problem

**Typical multi-store setup:**

- 3 stores: DE, FR, UK
- Each store has queue worker: `queue:worker:start`
- Jenkins tries to run all workers in parallel, but have limited number of executors configured, to limit resources utilisation, which may lead to some store's Worker waiting on other stores.
- In case all Workers running at the same time - resource utilisation (memory and CPU) quickly becomes a limited resource.

**Problems:**

- **Memory exhaustion**: Each worker consumes PHP memory limit
- **CPU contention**: Multiple workers compete for CPU cycles
- **Database pressure**: Parallel workers query same database
- **Job pile-up**: With only 2 executors, jobs queue excessively

See [Jenkins operational best practices](/docs/ca/dev/best-practices/jenkins-operational-best-practices.html) for detailed memory and resource management strategies.

### Solution 1: Stable Workers (Recommended)

Spryker's **Stable Workers** architecture provides isolated worker contexts with better resource management:

**Key benefits:**

- **Process isolation**: Each worker runs in dedicated PHP process
- **Resource distribution**: Intelligent workload balancing across stores
- **Configurable capacity**: Control worker count and memory per worker
- **Reduced Jenkins load**: Workers run outside Jenkins executors
- **Better P&S stability**: Isolated failures don't affect other stores

**Implementation:**

Stable Workers is a Spryker feature that requires configuration and deployment. For comprehensive setup instructions, see [Stable Workers](/docs/dg/dev/backend-development/cronjobs/stable-workers.html).

**When to use Stable Workers:**

- Multi-store projects (3+ stores)
- High Publish & Sync volume
- Frequent Jenkins stability issues
- Need for better resource isolation

### Solution 2: Unified worker processing

Alternative Worker (single Worker for all stores) process queues for all stores with a single worker:

**Configuration approach:**

```php
// config/Zed/cronjobs/jenkins.php
$jobs[] = [
    'name' => 'queue-worker-all-stores',
    'command' => '$PHP_BIN vendor/bin/console queue:worker:start',
    'schedule' => '* * * * *',
    'enable' => true,
    'stores' => ['DE'], // Default store name
];
```

**How it works:**

- Single worker processes messages from all store queues
- Spryker automatically routes messages to correct store context
- Reduces parallel execution and resource contention

**Benefits:**

- **Reduced memory usage**: 1 worker instead of N workers
- **Fewer executor slots**: Frees Jenkins resources for other jobs
- **Simplified monitoring**: Single worker to track
- **Better queue processing**: No store-specific delays

**Considerations:**

- Requires messages to be store-independent or properly tagged
- May need queue prioritization for critical stores
- Monitor processing lag per store

For implementation details, see [Optimizing Jenkins execution](/docs/dg/dev/backend-development/cronjobs/optimizing-jenkins-execution.html).

## Best practices summary

### nginx configuration

1. **Avoid proxying external resources**: Let clients connect directly to external services
2. **Tune fastcgi buffers**: Set to 2-3× average response size
3. **Configure buffer limits**: Prevent disk writes for typical responses
4. **Monitor buffer usage**: Watch for buffer exhaustion warnings
5. **Test under load**: Verify configuration with realistic traffic patterns

### Worker orchestration

1. **Use Stable Workers**: Recommended for multi-store setups
2. **Limit concurrent workers**: Maximum 2 workers per queue
3. **Set memory limits**: Keep under 2GB per worker
4. **Process all stores together**: Consider unified worker approach
5. **Monitor resource usage**: Track memory, CPU, and queue lag
6. **Follow Jenkins best practices**: See [operational guidelines](/docs/ca/dev/best-practices/jenkins-operational-best-practices.html)
7. **Consider external orchestration**: For complex or high-scale scenarios

## Additional resources

- [Jenkins operational best practices](/docs/ca/dev/best-practices/jenkins-operational-best-practices.html)
- [Best practices: Jenkins stability](/docs/ca/dev/best-practices/best-practises-jenkins-stability.html)
- [Stable Workers](/docs/dg/dev/backend-development/cronjobs/stable-workers.html)
- [Optimizing Jenkins execution](/docs/dg/dev/backend-development/cronjobs/optimizing-jenkins-execution.html)
- [Integrate elastic computing](/docs/dg/dev/integrate-and-configure/integrate-elastic-computing.html)
- [nginx FastCGI Module Documentation](https://nginx.org/en/docs/http/ngx_http_fastcgi_module.html)
