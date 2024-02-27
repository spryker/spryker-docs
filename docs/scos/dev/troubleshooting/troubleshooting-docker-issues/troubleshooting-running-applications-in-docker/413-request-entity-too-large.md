---
title: 413 Request Entity Too Large
description: Learn how to fix the issue 413 Request Entity Too Large
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/413-request-entity-too-large
originalArticleId: 5cfeaaf5-441d-4e75-92c8-215c2db21af5
redirect_from:
  - /2021080/docs/413-request-entity-too-large
  - /2021080/docs/en/413-request-entity-too-large
  - /docs/413-request-entity-too-large
  - /docs/en/413-request-entity-too-large
  - /v6/docs/413-request-entity-too-large
  - /v6/docs/en/413-request-entity-too-large
related:
  - title: An application is not reachable via http
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/an-application-is-not-reachable-via-http.html
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

You get the `413 Request Entity Too Large` error.

## Solution

1. Increase the maximum request body size for the related application. See [Deploy file reference](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html) to learn how to do that.
2. Fetch the update:

```bash
docker/sdk bootstrap
```

3. Re-build applications:

```bash
docker/sdk up
```
