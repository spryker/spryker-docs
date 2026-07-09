---
title: Xdebug does not work
description: Learn how to fix the issue with a non-working Xdebug when troubleshooting your Spryker project.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/xdebug-does-not-work.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


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
