---
title: An application is not reachable via http
description: Learn how to fix the issue when an application is not reachable via http when running your applications in docker with your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Description

<!-- vale off -->
An application like Yves, Backoffice(Zed), GlueStorefront(Glue), GlueBackend or MerchantPortal is not reachable after installation.
<!-- vale on -->


## Solution

In `deploy.*.yml`, ensure that SSL encryption is disabled:

```yaml
docker:
    ssl:
        enabled: false
```
