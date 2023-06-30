---
title: Nginx welcome page
description: Learn how to fix the issue when you get Nginx welcome page upon opening an application in browser
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/nginx-welcome-page
originalArticleId: 27e0d295-8262-41c9-affb-f2339556ef1c
redirect_from:
  - /2021080/docs/nginx-welcome-page
  - /2021080/docs/en/nginx-welcome-page
  - /docs/nginx-welcome-page
  - /docs/en/nginx-welcome-page
  - /v6/docs/nginx-welcome-page
  - /v6/docs/en/nginx-welcome-page
related:
  - title: 413 Request Entity Too Large
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/413-request-entity-too-large.html
  - title: An application is not reachable via http
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
  - title: MacOS and Windows - file synchronization issues in Development mode
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/macos-and-windows-file-synchronization-issues-in-development-mode.html
  - title: Mutagen error
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-error.html
  - title: Mutagen synchronization issue
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-synchronization-issue.html
  - title: Port is already occupied on host
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/port-is-already-occupied-on-host.html
---

You get the Nginx welcome page by opening an application in the browser.

1. Update the `nginx:alpine` image:

```bash
docker pull nginx:alpine
```

2. Re-build applications:

```bash
docker/sdk up
```
