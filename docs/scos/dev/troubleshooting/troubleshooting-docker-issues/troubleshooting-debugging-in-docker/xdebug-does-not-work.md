  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/xdebug-does-not-work.html
---
title: Xdebug does not work
description: Learn how to fix the issue with a non-working Xdebug
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/xdebug-does-not-work
originalArticleId: 8169faa4-1c53-4812-bbba-6e34c72cb77c
redirect_from:
  - /2021080/docs/xdebug-does-not-work
  - /2021080/docs/en/xdebug-does-not-work
  - /docs/xdebug-does-not-work
  - /docs/en/xdebug-does-not-work
  - /v6/docs/xdebug-does-not-work
  - /v6/docs/en/xdebug-does-not-work
related:
  - title: nc command does not give any output
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/nc-command-does-not-give-any-output.html
  - title: nc command tells that the port is opened
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/nc-command-tells-that-the-port-is-opened.html
  - title: PHP `xdebug` extension is not active in CLI
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/php-xdebug-extension-is-not-active-in-cli.html
  - title: PHP `xdebug` extension is not active when accessing the website via a browser or curl
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/php-xdebug-extension-is-not-active-when-accessing-the-website-via-a-browser-or-curl.html
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
