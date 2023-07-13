---
title: MacOS and Windows - file synchronization issues in Development mode
description: Learn how to deal with file synchronization issues in Development mode on MacOS and Windows.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/macos-and-windows-file-synchronization-issues-in-development-mode
originalArticleId: 1c53083e-003e-4fda-b23e-3d926adcd08b
redirect_from:
  - /2021080/docs/macos-and-windows-file-synchronization-issues-in-development-mode
  - /2021080/docs/en/macos-and-windows-file-synchronization-issues-in-development-mode
  - /docs/macos-and-windows-file-synchronization-issues-in-development-mode
  - /docs/en/macos-and-windows-file-synchronization-issues-in-development-mode
  - /v6/docs/macos-and-windows-file-synchronization-issues-in-development-mode
  - /v6/docs/en/macos-and-windows-file-synchronization-issues-in-development-mode
related:
  - title: 413 Request Entity Too Large
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/413-request-entity-too-large.html
  - title: An application is not reachable via http
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
  - title: Mutagen error
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-error.html
  - title: Mutagen synchronization issue
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-synchronization-issue.html
  - title: Nginx welcome page
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/nginx-welcome-page.html
  - title: Port is already occupied on host
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/port-is-already-occupied-on-host.html
---

A project has file synchronization issues in Development mode.

## Solution

1. Follow sync logs:

```bash
docker/sdk sync logs
```

2. Hard reset:

```bash
docker/sdk trouble && rm -rf vendor && rm -rf src/Generated && docker/sdk sync && docker/sdk up
```
