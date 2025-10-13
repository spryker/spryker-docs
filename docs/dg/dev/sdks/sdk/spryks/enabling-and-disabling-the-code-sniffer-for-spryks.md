---
title: Enabling and disabling the Code Sniffer for Spryks
description: Find out how you can enable or disable the Code Sniffer when running Spryks within your spryker projects.
template: howto-guide-template
redirect_from:
- /docs/sdk/dev/spryks/enabling-and-disabling-the-code-sniffer-for-spryks.html

last_updated: Nov 8, 2022
---

Before writing files into a project, the [Code Sniffer](https://docs.spryker.com/docs/scos/dev/sdk/development-tools/code-sniffer.html) fixes all the code style issues and imports the missing namespaces. For this reason, use FQCNs everywhere (templates, arguments, etc.).
However, we recommend checking the raw generated code without any post-processing first. Commands are also executed much faster with such code.
To check how the generated files look without running the Code Sniffer, disable the Code Sniffer by prefixing the console command with `TESTING=true`:

```shell
TESTING=true php vendor/spryker-sdk/spryk-src/bin/spryk <Spryk name> <Spryk arguments>
```
