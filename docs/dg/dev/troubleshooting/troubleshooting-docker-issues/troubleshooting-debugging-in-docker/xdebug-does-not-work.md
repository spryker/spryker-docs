---
title: Xdebug does not work
description: Learn how to fix the issue with a non-working Xdebug
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/xdebug-does-not-work
originalArticleId: 8169faa4-1c53-4812-bbba-6e34c72cb77c
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/xdebug-does-not-work.html
---

## Description

Xdebug does not work.

## Solution

1. Ensure that Xdebug is enabled in `deploy.*.yml`:

```yaml
docker:
...
    debug:
      xdebug:
        enabled: true
```

2. Ensure that IDE is listening to the port 9000.
3. Check if the host is accessible from the container:

```bash
docker/sdk cli -x bash -c 'nc -zv ${SPRYKER_XDEBUG_HOST_IP} 9000'
```
