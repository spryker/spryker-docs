---
title: HowTo - Decrease the memory usage of Spryker with Docker on WSL2
originalLink: https://documentation.spryker.com/v6/docs/howto-decrease-the-memory-usage-of-spryker-with-docker-on-wsl2
redirect_from:
  - /v6/docs/howto-decrease-the-memory-usage-of-spryker-with-docker-on-wsl2
  - /v6/docs/en/howto-decrease-the-memory-usage-of-spryker-with-docker-on-wsl2
---

When running Spryker with Docker on WSL2, the memory usage of VMmem can get significant, even if the memory usage of the instance is small. 

This HowTo explains how you can limit the memory usage of this process.

## Prerequisites

Ensure that you are running the latest versions of:

* Windows 10
* Docker for Windows

## Limiting the memory usage of VMmem
To limit the memory usage of VMmem:

1. Create or update `c:\users\USERNAME\.wslconfig` with `memory` and `processors` parameters per your hardware and performance requirements. The following example should suit most use cases.


```text
memory=4GB # Sets the memory limit to 4 GB.
processors=2 # Sets the number of CPU cores WSL2 is allowed to use to 2.
```

2. Restart the *LXSSMANAGER* service:

    1. In the Start menu, enter *Services* and press *Enter*.
    2. Right-click the *LXSSMANAGER* service and select **Restart**.
    

![refresh-lxssmanager-service](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+-+decrease+the+memory+usage+of+Spryker+with+Docker+on+WSL2/refresh-lxssmanager-service.png){height="" width=""}

Now the VMmem memory usage should not exceed the specified limit.


