---
title: An application is not reachable via http
description: Learn how to fix the issue when an application is not reachable via http
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/an-application-is-not-reachable-via-http
originalArticleId: 2a96637b-d930-436b-908a-62f9ddbd8298
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
---

## Description

An application like Yves, BackOffice(Zed), GlueStorefront(Glue), GlueBackend or MerchantPortal is not reachable after installation.

## Solution

In `deploy.*.yml`, ensure that SSL encryption is disabled:

```yaml
docker:
    ssl:
        enabled: false
```
