  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
---
title: An application is not reachable via http
description: Learn how to fix the issue when an application is not reachable via http
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/an-application-is-not-reachable-via-http
originalArticleId: 2a96637b-d930-436b-908a-62f9ddbd8298
redirect_from:
  - /2021080/docs/an-application-is-not-reachable-via-http
  - /2021080/docs/en/an-application-is-not-reachable-via-http
  - /docs/an-application-is-not-reachable-via-http
  - /docs/en/an-application-is-not-reachable-via-http
  - /v6/docs/an-application-is-not-reachable-via-http
  - /v6/docs/en/an-application-is-not-reachable-via-http
related:
  - title: 413 Request Entity Too Large
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/413-request-entity-too-large.html
  - title: MacOS and Windows - file synchronization issues in Development mode
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/macos-and-windows-file-synchronization-issues-in-development-mode.html
  - title: Mutagen error
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-error.html
  - title: Mutagen synchronization issue
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-synchronization-issue.html
  - title: Nginx welcome page
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/nginx-welcome-page.html
  - title: Port is already occupied on host
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/port-is-already-occupied-on-host.html
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
