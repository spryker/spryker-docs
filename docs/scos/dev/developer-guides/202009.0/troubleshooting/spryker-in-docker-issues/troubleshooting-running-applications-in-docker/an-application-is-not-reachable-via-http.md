---
title: An application is not reachable via http
description: Learn how to fix the issue when an application is not reachable via http
originalLink: https://documentation.spryker.com/v6/docs/an-application-is-not-reachable-via-http
originalArticleId: 78018e6d-dfa4-4ce6-9431-f5eac83590f9
redirect_from:
  - /v6/docs/an-application-is-not-reachable-via-http
  - /v6/docs/en/an-application-is-not-reachable-via-http
---

## Description
An application like Yves, BackOffice(Zed), or Glue is not reachable after installation.


## Solution
In `deploy.*.yml`, ensure that SSL encryption is disabled:
```yaml
docker:
    ssl:
        enabled: false
```
