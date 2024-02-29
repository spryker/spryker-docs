  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-error.html
---
title: Mutagen error
description: Learn how to fix the Mutagen error
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mutagen-error
originalArticleId: b1896a64-b124-48a9-9fc5-33c950a620ad
redirect_from:
  - /2021080/docs/mutagen-error
  - /2021080/docs/en/mutagen-error
  - /docs/mutagen-error
  - /docs/en/mutagen-error
  - /v6/docs/mutagen-error
  - /v6/docs/en/mutagen-error
related:
  - title: 413 Request Entity Too Large
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/413-request-entity-too-large.html
  - title: An application is not reachable via http
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
  - title: MacOS and Windows - file synchronization issues in Development mode
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/macos-and-windows-file-synchronization-issues-in-development-mode.html
  - title: Mutagen synchronization issue
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-synchronization-issue.html
  - title: Nginx welcome page
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/nginx-welcome-page.html
  - title: Port is already occupied on host
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/port-is-already-occupied-on-host.html
---

## Description

You get the error:

```bash
unable to reconcile Mutagen sessions: unable to create synchronization session (spryker-dev-codebase): unable to connect to beta: unable to connect to endpoint: unable to dial agent endpoint: unable to create agent command: unable to probe container: container probing failed under POSIX hypothesis (signal: killed) and Windows hypothesis (signal: killed)
```

## Solution

1. Restart your OS.
2. If the error persists: Check [Mutagen documentation](https://mutagen.io/documentation/introduction).
