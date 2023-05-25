---
title: Security checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

Security Checker is a tool that checks if your PHP application depends on PHP packages with known security vulnerabilities.

## Problem description

Some packages were released with security issues. When the issues are identified, they are saved to the Advisories Database.

## Example of code that causes an upgradability error

Your `composer.lock` file contains package versions that have security issues:

```bash
...
{
            "name": "guzzlehttp/psr7",
            "version": "2.4.1",
            "source": {
                "type": "git",
                "url": "https://github.com/guzzle/psr7.git",
...
````


### Related error in the Evaluator output:

```bash
================
SECURITY CHECKER
================

+---+---------------------------------------------------------------------------------------------------------------------+------------------------+
| # | Message                                                                                                             | Target                 |
+---+---------------------------------------------------------------------------------------------------------------------+------------------------+
| 1 | Improper header validation (CVE-2023-29197): https://github.com/guzzle/psr7/security/advisories/GHSA-wxmh-65f7-jcvw | guzzlehttp/psr7: 2.4.1 |
+---+---------------------------------------------------------------------------------------------------------------------+------------------------+
```

### Resolving the error

To resolve the error provided in the example, try the following in the provided order:
1. Try to avoid using a package with the current version.
2. Upgrade the package to a new version.
