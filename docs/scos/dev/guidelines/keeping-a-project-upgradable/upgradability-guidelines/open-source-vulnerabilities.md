---
title: Open-source vulnerabilities checker
description: Reference information for evaluator tools.
template: howto-guide-template
redirect_from:
---

Open-source vulnerabilities checker is a tool that checks if your PHP application depends on PHP packages with known security vulnerabilities.

## Problem description

A project can sometimes use dependencies that contain known vulnerabilities.. To minimize the security risk for the project, such dependencies should be updated to the version that has the vulnerability fixed.

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

```bash
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
````

## Resolve the error

To resolve the error:
1. Upgrade the package to a version where the vulnerability issue is fixed.
