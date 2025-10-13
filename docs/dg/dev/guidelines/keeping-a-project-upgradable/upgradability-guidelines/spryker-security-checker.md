---
title: Spryker security checker
description: Learn how the Spryker security checker and how it checks if security fixes exist for modules present within your spryker projects.
template: howto-guide-template
last_updated: Oct 24, 2023
redirect_from:
     - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/security.html
     - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/spryker-security-checker.html
---

Security Update Checker is a tool that checks if security fixes exist for Spryker modules that are present in your project.

## Problem description

A project can sometimes use dependencies that contain known vulnerabilities. To minimize the security risk for the project, these dependencies should be updated to the version that has the vulnerability fixed.

## Example of an evaluator error message

```bash
========================
SPRYKER SECURITY CHECKER
========================

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

## Resolve the error

To resolve the error, upgrade the package to a version where the vulnerability issue is fixed.

## Run only this checker

To run only this checker, include `SPRYKER_SECURITY_CHECKER` into the checkers list. Example:

```bash
vendor/bin/evaluator evaluate --checkers=SPRYKER_SECURITY_CHECKER
```
