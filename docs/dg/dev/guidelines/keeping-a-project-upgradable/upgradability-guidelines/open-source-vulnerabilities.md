---
title: Open-source vulnerabilities checker
description: Reference information for evaluator tools.
template: howto-guide-template
last_updated: Oct 24, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/open-source-vulnerabilities.html
---

Open-source vulnerabilities checker is a tool that checks if your PHP application depends on PHP packages with known security vulnerabilities.

## Problem description

A project can sometimes use dependencies that contain known vulnerabilities. To minimize the security risk for the project, such dependencies should be updated to the version that has the vulnerability fixed.

## Example of an evaluator error message

```bash
===================================
OPEN SOURCE VULNERABILITIES CHECKER
===================================

Message: Improper header validation (CVE-2023-29197): https://github.com/guzzle/psr7/security/advisories/GHSA-wxmh-65f7-jcvw
Target:  guzzlehttp/psr7:2.4.1
```

## Example of code that causes an evaluator error

Your `composer.lock` file contains package versions that have security issues:

```json
...
    {
    "name": "guzzlehttp/psr7",
    "version": "2.4.1",
    "source": {
        "type": "git",
        "url": "https://github.com/guzzle/psr7.git",
        ...
    },
...
```

## Resolve the error

To resolve the error:
1. Upgrade the package to a version where the vulnerability issue is fixed.


## Run only this checker
To run only this checker, include `OPEN_SOURCE_VULNERABILITIES_CHECKER` into the checkers list. Example:
```bash
vendor/bin/evaluator evaluate --checkers=OPEN_SOURCE_VULNERABILITIES_CHECKER
```
