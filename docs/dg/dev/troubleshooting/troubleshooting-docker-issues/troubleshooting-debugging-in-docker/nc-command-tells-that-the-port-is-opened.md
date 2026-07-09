---
title: nc command tells that the port is opened
description: Learn how to fix the issue when nc command tells that the port is opened when troubleshooting your Spryker project.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/nc-command-tells-that-the-port-is-opened.html
related:
  - title: nc command does not give any output
    link: docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-debugging-in-docker/nc-command-does-not-give-any-output.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Description

`nc` command tells that the port is opened.

## Solution

1. Check what process occupies the port 9000 by running the command on the host:

```bash
sudo lsof -nPi:9000 | grep LISTEN
```

2. If it's not your IDE, free up the port to be used by the IDE.
