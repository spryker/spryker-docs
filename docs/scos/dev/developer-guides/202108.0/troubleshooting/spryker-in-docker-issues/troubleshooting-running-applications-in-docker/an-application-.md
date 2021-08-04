---
title: An application is not reachable via http
originalLink: https://documentation.spryker.com/2021080/docs/an-application-is-not-reachable-via-http
redirect_from:
  - /2021080/docs/an-application-is-not-reachable-via-http
  - /2021080/docs/en/an-application-is-not-reachable-via-http
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
