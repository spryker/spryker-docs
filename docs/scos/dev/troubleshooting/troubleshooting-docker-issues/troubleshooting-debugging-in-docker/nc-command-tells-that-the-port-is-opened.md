---
title: nc command tells that the port is opened
description: Learn how to fix the issue when nc command tells that the port is opened
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/nc-command-tells-that-the-port-is-opened
originalArticleId: 4a169ffc-dd56-4026-b17f-44981617e0fe
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/nc-command-tells-that-the-port-is-opened.html
related:
  - title: nc command does not give any output
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/nc-command-does-not-give-any-output.html
---

## Description

`nc` command tells that the port is opened.

## Solution

1. Check what process occupies the port 9000 by running the command on the host:

```bash
sudo lsof -nPi:9000 | grep LISTEN
```

2. If it's not your IDE, free up the port to be used by the IDE.
