---
title: PHPStan memory issues
originalLink: https://documentation.spryker.com/v6/docs/phpstan-memory-issues
redirect_from:
  - /v6/docs/phpstan-memory-issues
  - /v6/docs/en/phpstan-memory-issues
---

## Cause
PHPStan needs to parse all files and due to Spryker's magic with resolving classes, e.g., `$this->getFacade()`, PHPStan needs to look up this class on its own when the `@method` annotation is missing.

## Solution
Run PHPStan in debug mode `--debug` on the module where it needs too much memory. In the debug mode, PHPStan will display the file name currently being analyzed. If PHPStan gets stuck at a specific file, look into this file and check if all `@method` annotations are present.
