---
title: Limit the memory usage of WSL2-based projects
description: Learn how to limit the memory usage of VMmem when running Spryker with Docker on WSL2.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-decrease-the-memory-usage-of-spryker-with-docker-on-wsl2
originalArticleId: e43c2c54-5719-450b-abf9-bdebeb94afa5
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-decrease-the-memory-usage-of-spryker-with-docker-on-wsl2.html
---

When running Spryker on WSL2, the memory usage of VMmem can get significant, even if the memory usage of the instance is small.

This document explains how to limit the memory usage of this process.

## Prerequisites

Ensure that you have the latest versions:
* Windows 10 or Windows 11
* Docker for Windows

## Limit the memory usage of VMmem

1. Create or update `c:\users\USERNAME\.wslconfig` with `memory` and `processors` parameters per your hardware and performance requirements.

The following example suits most use cases.

```text
memory=4GB # Sets the memory limit to 4 GB.
processors=2 # Sets the number of CPU cores WSL2 is allowed to use to 2.
```

2. Restart the *LXSSMANAGER* service:
    1. In the **Start** menu, enter `Services` and press <kbd>Enter</kbd>.
    2. Right-click the **LXSSMANAGER** service and select **Restart**.


![refresh-lxssmanager-service](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+decrease+the+memory+usage+of+Spryker+with+Docker+on+WSL2/refresh-lxssmanager-service.png)

After these steps, the VMmem memory usage does not exceed the specified limit.
