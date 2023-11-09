---
title: Discouraged packages checker
description: Reference information for evaluator tools.
template: howto-guide-template
redirect_from:
---

This is a tool that checks that project installed packages contains no discouraged packages.

## Problem description

The Spryker has own internal list of the not recommended or prohibited packages.
The installation of such packages should be avoided. The reason why this package is discouraged you can find in the checker output.

## Example of an evaluator error message

Below is an example of violation when discouraged package is installed

```bash
============================
DISCOURAGED PACKAGES CHECKER
============================

Message: This package is deprecated.
Target: sllh/composer-versions-check

```

## Example of code that causes an evaluator error

The package found in `composer.lock` file.

composer.lock
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

To resolve an issue need to remove discouraged package or to follow instructions in violation message.

## Run only this checker

To run only this checker, include `DISCOURAGED_PACKAGES_CHECKER` into the checkers list. Example:
```bash
vendor/bin/evaluator evaluate --checkers=DISCOURAGED_PACKAGES_CHECKER
```

