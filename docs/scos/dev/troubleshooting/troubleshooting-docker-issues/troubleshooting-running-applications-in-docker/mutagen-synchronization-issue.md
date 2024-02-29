  - /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-synchronization-issue.html
---
title: Mutagen synchronization issue
description: Learn how to fix the Mutagen synchronization issue
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mutagen-synchronization-issue
originalArticleId: c02d26b0-4cfd-4274-8253-c6ff27aa3b3d
redirect_from:
  - /2021080/docs/mutagen-synchronization-issue
  - /2021080/docs/en/mutagen-synchronization-issue
  - /docs/mutagen-synchronization-issue
  - /docs/en/mutagen-synchronization-issue
  - /v6/docs/mutagen-synchronization-issue
  - /v6/docs/en/mutagen-synchronization-issue
related:
  - title: 413 Request Entity Too Large
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/413-request-entity-too-large.html
  - title: An application is not reachable via http
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
  - title: MacOS and Windows - file synchronization issues in Development mode
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/macos-and-windows-file-synchronization-issues-in-development-mode.html
  - title: Mutagen error
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-error.html
  - title: Nginx welcome page
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/nginx-welcome-page.html
  - title: Port is already occupied on host
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/port-is-already-occupied-on-host.html
---

## Description

There is a synchronization issue.

## Solution

* Restart your OS.
* Run the commands:

```
docker/sdk trouble
mutagen sync list
mutagen sync terminate <all sessions in the list>
docker/sdk up
```
