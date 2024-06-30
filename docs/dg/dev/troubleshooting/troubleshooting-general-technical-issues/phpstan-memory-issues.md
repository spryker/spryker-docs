---
title: PHPStan memory issues
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/phpstan-memory-issues
originalArticleId: c234b12e-5260-4f86-97b4-44c7ef5c8dbf
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/phpstan-memory-issues.html
---

## Cause

PHPStan needs to parse all files and due to Spryker's magic with resolving classes, e.g., `$this->getFacade()`, PHPStan needs to look up this class on its own when the `@method` annotation is missing.

## Solution

Run PHPStan in debug mode `--debug` on the module where it needs too much memory. In the debug mode, PHPStan will display the file name currently being analyzed. If PHPStan gets stuck at a specific file, look into this file and check if all `@method` annotations are present.
