---
title: CDN and traffic management integration
description: Learn how to configure CDN and traffic management solutions like Akamai or Cloudflare to work correctly with Spryker's nginx compression, and how to avoid unnecessary data transfer overhead.
last_updated: Feb 11, 2026
template: concept-topic-template
related:
  - title: Deploy file reference
    link: docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html
  - title: Infrastructure and worker configuration guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/infrastructure-worker-configuration-guidelines.html
  - title: Frontend performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html
  - title: Bot control
    link: docs/dg/dev/guidelines/performance-guidelines/bot-control.html
---

When a CDN or traffic management solution (for example, Akamai, Cloudflare, or Fastly) sits in front of a Spryker application, HTTP response compression must be correctly coordinated between the CDN and the Spryker frontend container. Misconfiguration can result in responses leaving the infrastructure uncompressed, which significantly increases data transfer volume, response latency, and infrastructure overhead.

This document explains the request flow, how compression negotiation works, common pitfalls, and how to configure both sides for optimal performance.

## Request flow with a CDN

When a CDN is deployed in front of a Spryker application, the request flow is as follows:

```text
Client browser ──► CDN (Akamai/Cloudflare/...) ──► Load Balancer (ALB/NLB) ──► Frontend (Nginx) ──► Application (PHP-FPM)
```

1. The **client browser** sends a request with `Accept-Encoding: gzip, deflate, br`, indicating supported compression encodings.
2. The **CDN** terminates the client connection and makes an *origin pull* request to the load balancer. The `Accept-Encoding` header the CDN sends on origin pulls depends on the CDN configuration and may differ from the client's original header.
3. The **load balancer** (AWS ALB/NLB) passes the request through to the frontend container. Load balancers do not compress responses.
4. The **Frontend (Nginx)** container either serves a static asset or proxies the request to an application container (Yves, Zed, Glue, or others) through FastCGI. Based on the `Accept-Encoding` header received, the frontend container compresses the response before sending it back.

{% info_block warningBox "The frontend container is the compression point" %}

The frontend (Nginx) container configured through the `assets:` section in the deploy file is responsible for compressing both static assets and dynamic application responses. This is the only compression point within the Spryker infrastructure. Load balancers (AWS ALB/NLB) do not compress responses. If the frontend container does not compress, all responses leave the infrastructure uncompressed, increasing data transfer volume over the public network between the origin and the CDN.

{% endinfo_block %}

## How compression negotiation works

HTTP compression relies on content negotiation between the client and the server using two headers:

- **`Accept-Encoding`** (request header): the client tells the server which compression encodings it supports (for example, `gzip`, `br`, `deflate`).
- **`Content-Encoding`** (response header): the server tells the client which encoding was applied to the response body.

When a CDN sits between the client and the origin, there are two separate negotiation cycles:

1. **Client to CDN**: the browser sends `Accept-Encoding: gzip, deflate, br`. The CDN may serve a cached compressed response directly.
2. **CDN to origin (origin pull)**: the CDN sends its own `Accept-Encoding` header to the origin. This header depends on the CDN's configuration, not the client's request.

### Common pitfall: CDN does not request compression from origin

Many CDNs, by default, do not forward the client's `Accept-Encoding` header to the origin, or they send a limited version. For example:

- A CDN might send `Accept-Encoding: gzip` but not include `br` (Brotli).
- A CDN might strip the `Accept-Encoding` header entirely on origin pulls.

In these scenarios, even if the Spryker frontend container has Brotli enabled, it never activates because no origin request asks for it. The CDN then receives an uncompressed response, compresses it itself (using gzip), and delivers it to the client. While the client receives a compressed response, the data between the origin and the CDN flows uncompressed, which means:

- All data flows uncompressed over the public network between the origin and the CDN edge, increasing data transfer volume and response latency.
- For typical e-commerce HTML pages, uncompressed responses can be 10-30x larger than compressed ones, significantly increasing infrastructure overhead.
- The CDN must spend CPU resources compressing every origin response.

{% info_block infoBox "CDN caching and bot filtering reduce the impact" %}

A properly configured CDN mitigates the impact of uncompressed origin responses through two mechanisms:

- **Caching**: The CDN caches responses at the edge. Subsequent requests for the same page are served from the cache without an origin pull, so the uncompressed transfer only happens on cache misses or cache refreshes.
- **Bot filtering**: CDN-level bot management reduces the volume of origin pulls by filtering out unwanted bot traffic before it reaches the origin.

However, if the CDN is not configured to cache effectively (for example, low cache hit rates for dynamic pages) or does not filter bot traffic, the origin handles a high volume of requests. In this case, every origin pull transmits uncompressed data over the public network, which has the same effect as having no CDN at all for data transfer volume and latency. Properly configuring both compression *and* CDN caching and bot filtering is essential for optimal performance.

{% endinfo_block %}

## Configuring the CDN for optimal compression

### Required: forward Accept-Encoding to origin

Configure the CDN to send `Accept-Encoding: br, gzip, deflate` on all origin pull requests. This lets the Spryker frontend container compress responses at the origin, reducing data transfer through the load balancer.

#### Akamai

In the Akamai Property Manager, configure the origin server behavior:

1. In the **Origin Server** behavior, verify that the **Allow Clients To Send** setting includes `Accept-Encoding`.
2. Add a **Modify Outgoing Request Header** rule that sets or appends the `Accept-Encoding` header:
   - **Action**: Modify
   - **Header Name**: `Accept-Encoding`
   - **Header Value**: `br, gzip, deflate`
3. In the **Content Compression** behavior, set **Enable Compression** to *on* and verify **Brotli Support** is enabled.

{% info_block infoBox "Akamai and Brotli" %}

By default, Akamai may not include `br` in the `Accept-Encoding` header on origin pulls. This means Brotli compression configured in the Spryker frontend container does not activate, even though it is available. Explicitly configuring Akamai to request Brotli from the origin can improve compression ratios significantly compared to gzip alone.

{% endinfo_block %}

#### Cloudflare

Cloudflare automatically handles compression between the client and Cloudflare's edge. For origin-to-edge compression:

1. In the **Speed** > **Optimization** settings, verify that compression is enabled.
2. Cloudflare respects the origin's `Content-Encoding` header. Make sure the Spryker frontend container has compression enabled (both gzip and Brotli) so that Cloudflare receives pre-compressed responses.
3. Under **Network**, review the request headers Cloudflare sends to the origin and confirm `Accept-Encoding` includes `br, gzip`.

#### Other CDN providers

For other CDN or traffic management solutions, verify the following in the provider's configuration:

- The `Accept-Encoding` header on origin requests includes `br, gzip, deflate`.
- The CDN does not strip or modify the `Content-Encoding` response header from the origin.
- The CDN does not re-compress already-compressed responses (double compression).

### Required: configure Spryker compression

In the deploy file, enable both gzip and Brotli compression with `static: true` to compress both static assets and dynamic responses:

```yaml
assets:
    image: spryker/nginx-brotli:latest
    mode: production
    compression:
        gzip:
            static: true
            level: 5
        brotli:
            static: true
            level: 5
```

{% info_block warningBox "Avoid static: only for dynamic content" %}

Setting `static: only` disables on-the-fly compression. With this setting, only pre-compressed static files (`.gz`, `.br`) are served compressed. Dynamic responses from PHP applications (HTML pages, API responses, JSON) are sent uncompressed. If a CDN is in front of the application, this means all dynamic content leaves the infrastructure uncompressed, increasing data transfer volume and response latency.

Use `static: true` to enable compression for both static and dynamic content.

{% endinfo_block %}

For details on all compression options, see [Deploy file reference - assets](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html).

## Verifying compression is working

### Test origin compression directly

To verify that the Spryker frontend container compresses responses correctly, send requests directly to the load balancer, bypassing the CDN:

**Test Brotli compression:**

```bash
curl -s -o /dev/null -w "Size: %{size_download} bytes\nContent-Encoding: " \
  -H "Accept-Encoding: br" \
  -H "Host: www.your-shop.com" \
  -D - https://your-alb-endpoint.region.elb.amazonaws.com/your-page | grep -i content-encoding
```

**Test gzip compression:**

```bash
curl -s -o /dev/null -w "Size: %{size_download} bytes\nContent-Encoding: " \
  -H "Accept-Encoding: gzip" \
  -H "Host: www.your-shop.com" \
  -D - https://your-alb-endpoint.region.elb.amazonaws.com/your-page | grep -i content-encoding
```

**Test without compression:**

```bash
curl -s -o /dev/null -w "Size: %{size_download} bytes\n" \
  -H "Accept-Encoding: identity" \
  -H "Host: www.your-shop.com" \
  https://your-alb-endpoint.region.elb.amazonaws.com/your-page
```

**Expected results:**

- With `Accept-Encoding: br`, the response should include `Content-Encoding: br` and be significantly smaller (typically 20-40x compression for HTML).
- With `Accept-Encoding: gzip`, the response should include `Content-Encoding: gzip` and be approximately 7-10x smaller.
- Without compression, the response is the full uncompressed size.

If the Brotli or gzip test returns the same size as the uncompressed test, compression is not active and needs to be configured.

### Verify CDN-to-origin compression

Check your CDN's analytics or logs to verify what `Accept-Encoding` header is sent on origin pulls and what `Content-Encoding` is received from the origin:

- **Akamai**: Use the Akamai Diagnostic Tools or enable origin debug headers.
- **Cloudflare**: Check the `cf-cache-status` and origin response headers in the dashboard.

## Understanding compression impact on different response types

Not all response types benefit equally from compression. Understanding the traffic composition helps prioritize optimization:

| Response type | Typical compression ratio (gzip) | Typical compression ratio (Brotli) | Notes |
| --- | --- | --- | --- |
| HTML pages | 7-10x | 20-40x | Largest impact. HTML pages from Yves (product pages, category pages, search results) are typically the biggest contributor to data transfer volume. |
| JSON/API responses | 5-10x | 10-20x | Glue API responses and AJAX calls benefit significantly. |
| CSS/JS (pre-built) | 3-5x | 4-7x | Usually served from pre-compressed files with `static: true` or `static: only`. |
| Images (JPEG, PNG, WebP) | 1x (no benefit) | 1x (no benefit) | Already compressed formats. Do not apply HTTP compression to images. |
| SVG | 3-5x | 5-10x | XML-based, compresses well. |

{% info_block infoBox "Dynamic responses dominate data transfer" %}

In typical e-commerce deployments, dynamically generated HTML pages account for the vast majority of response data volume, while static assets (JS, CSS, images) contribute a relatively small share. This is because static assets are often cached by the CDN after the first request, while HTML pages are generated on each origin pull. Ensuring compression is active for dynamic responses is critical for reducing data transfer overhead and response latency.

{% endinfo_block %}

## Best practices summary

| Practice | Description |
| --- | --- |
| Enable both gzip and Brotli | Configure both engines with `static: true` in the deploy file. Use `spryker/nginx-brotli:latest` image. |
| Use `static: true`, not `static: only` | Ensure dynamic responses are compressed on the fly, not only pre-compressed static files. |
| Configure CDN to send `Accept-Encoding: br, gzip, deflate` | Verify the CDN sends compression headers on origin pulls. Do not assume the client's headers are forwarded. |
| Verify compression with direct ALB tests | Bypass the CDN and test compression directly against the load balancer to confirm nginx is compressing. |
| Prefer Brotli over gzip when possible | Brotli provides significantly better compression ratios, especially for HTML content, reducing data transfer volume further. |
| Review CDN cache behavior | Ensure the CDN caches compressed variants correctly. The `Vary: Accept-Encoding` header (automatically added by nginx) is required for correct caching. |
