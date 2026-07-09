---
title: PHPStan memory issues
description: Learn how to troubleshoot and resolve PHPStan memory issues that you may come across in your Spryker based projects.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/phpstan-memory-issues.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Cause

PHPStan needs to parse all files and because of Spryker's magic with resolving classes–for example, `$this->getFacade()`, PHPStan needs to look up this class on its own when the `@method` annotation is missing.

## Solution

Run PHPStan in debug mode `--debug` on the module where it needs too much memory. In the debug mode, PHPStan will display the file name currently being analyzed. If PHPStan gets stuck at a specific file, look into this file and check if all `@method` annotations are present.
