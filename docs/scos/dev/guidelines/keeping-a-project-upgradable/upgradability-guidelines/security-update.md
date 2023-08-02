---
title: Security update checker
description: Reference information for evaluator tools.
template: howto-guide-template
---

Security Update Checker is a tool that checks if security fixes exists for Spryker modules that presented in your project.

## Problem description

A project can sometimes use dependencies that contain known vulnerabilities. To minimize the security risk for the project, such dependencies should be updated to the version that has the vulnerability fixed.

## Example of an evaluator error message

```bash
=======================
SECURITY UPDATE CHECKER
=======================

Message: Security update available for the module spryker/price-product-merchant-relationship-storage, actual version 1.14.0
Target:  spryker/price-product-merchant-relationship-storage:1.15.0
```

## Example of code that causes an evaluator error

Your `composer.lock` file contains package versions that have security issues:

```bash
...
{
    "name": "spryker/price-product-merchant-relationship-storage",
    "version": "1.14.0",
    "source": {
        "type": "git",
        "url": "https://github.com/spryker/price-product-merchant-relationship-storage.git",
        ...
    },
    ...
````

### Resolving the error

To resolve the error:
1. Upgrade the package to a version where the vulnerability issue is fixed.
