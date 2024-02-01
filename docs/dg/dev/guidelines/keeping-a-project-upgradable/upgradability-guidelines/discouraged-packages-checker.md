---
title: Discouraged packages checker
description: Reference information for evaluator tools.
template: howto-guide-template
last_updated: Nov 10, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/discouraged-packages-checker.html
---

This checker checks if discouraged packages are installed.

## Problem description

Some packages are prohibited or not recommended because they are deprecated or contain security vulnerabilities. The evaluator tool provides the reason for each checker to be prohibited in the output.

## Example of an evaluator error message

```bash
============================
DISCOURAGED PACKAGES CHECKER
============================

Message: This package is deprecated.
Target: sllh/composer-versions-check

```

## Example of code that causes an evaluator error

**composer.lock**
```json
{
  "_readme": [
    "This file locks the dependencies of your project to a known state",
    "Read more about it at https://getcomposer.org/doc/01-basic-usage.md#installing-dependencies",
    "This file is @generated automatically"
  ],
  "content-hash": "4b225b22405e27a7b8dbf374c4e01a41",
  "packages": [
    {
      "name": "sllh/composer-versions-check",
      "version": "1.1.0",
      ...
```


## Resolve the error

To resolve the issue, remove the discouraged package or follow the instructions in the output.

## Run only this checker

To run only this checker, include `DISCOURAGED_PACKAGES_CHECKER` into the checkers list. Example:
```bash
vendor/bin/evaluator evaluate --checkers=DISCOURAGED_PACKAGES_CHECKER
```
