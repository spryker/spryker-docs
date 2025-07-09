---
title: Endpoint Security
description: Learn about endpoint security features and best practices for securing integration endpoints in Spryker, including authentication, IP whitelisting, HTTPS enforcement, and monitoring.
last_updated: July 9, 2025
layout: custom_new
---

## Out-of-the-Box Security Features in Spryker

### Basic Authentication
Spryker offers built-in support for Basic Auth on both REST and Glue APIs. You can configure it to restrict access to sensitive endpoints or entire services.  

<a class="fl_cont" href="/docs/scos/dev/howtos/htaccess-authentication.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Configure basic .htaccess authentication</div>
</a>


### IP Whitelisting
Spryker allows you to set up IP allowlists at the web server (e.g., Nginx) or infrastructure level (e.g., AWS Security Groups, Cloudflare rules) to limit access to known, trusted sources.  

<a class="fl_cont" href="/docs/scos/dev/operations/maintenance-mode.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Configure access to applications in maintenance mode</div>
</a>

### HTTPS Enforcement
While not specific to Spryker, it is recommended (and often defaulted via infrastructure) to serve all APIs over HTTPS to encrypt data in transit.


## Best Practices for Secure Integration Endpoints

### Use Token-Based Authentication
Prefer OAuth2 or API keys with expiration and rotation over Basic Auth for better control and traceability. Glue APIs can be extended to support token-based schemes.  

<a class="fl_cont" href="/docs/pbc/all/api-management/glue-api/glue-api-authentication-and-authorization.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> Glue API authentication and authorization</div>
</a>

### Limit Access Scope
Apply the principle of least privilege: expose only the endpoints and data required for the specific integration.  
- Create custom API roles for partners with fine-grained access control.

### Logging and Monitoring
- Log all API access errors with details (timestamp, IP, headers, payload).
- Monitor unusual patterns and set up alerts for suspicious behavior.

<a class="fl_cont" href="/docs/scos/dev/operations/monitoring/new-relic.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> New Relic transactions grouping by queue names</div>
</a>

<a class="fl_cont" href="/docs/scos/dev/operations/monitoring/open-telemetry.html">
  <div class="fl_icon">
    <i class="icon-article"></i>
  </div>
  <div class="fl_text"><strong>Further Reading:</strong> OpenTelemetry instrumentation</div>
</a>

### Input Validation and Sanitization
Ensure all incoming data is strictly validated to prevent injection attacks or malformed payloads.
