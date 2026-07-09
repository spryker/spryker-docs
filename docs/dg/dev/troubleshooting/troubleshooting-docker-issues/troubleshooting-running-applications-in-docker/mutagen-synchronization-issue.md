---
title: Mutagen synchronization issue
description: Learn how to fix the Mutagen synchronization issue when running applications in docker with your Spryker projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-docker-issues/troubleshooting-running-applications-in-docker/mutagen-synchronization-issue.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Description

There is a synchronization issue.

## Solution

- Restart your OS.
- Run the commands:

```bash
docker/sdk trouble
mutagen sync list
mutagen sync terminate <all sessions in the list>
docker/sdk up
```
