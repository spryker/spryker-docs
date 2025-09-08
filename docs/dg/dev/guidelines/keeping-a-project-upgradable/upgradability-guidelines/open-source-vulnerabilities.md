---
title: Open-source vulnerabilities checker
description: Open source vulnerabilities checker and how it checks if your PHP application depends on PHP packages with known security issues for your Spryker project.
template: howto-guide-template
last_updated: Oct 24, 2023
redirect_from:
  - /docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/open-source-vulnerabilities.html
---

The Open-source vulnerabilities checker is a tool that uses the `composer audit` command to check if your PHP application depends on packages with known security vulnerabilities.

## Problem description

A project can use dependencies that contain known vulnerabilities. To minimize security risks, such dependencies should be updated to a version where the vulnerability is fixed.

## Prerequisites

This checker requires Composer version 2.7.0 or later. To check your Composer version, run the following command:

```bash
composer --version
```

If your version is lower than 2.7.0, upgrade Composer:

```bash
composer self-update
```

## Example of an evaluator error message

When a vulnerability is detected, the evaluator displays an error message similar to the following:

```bash
===================================
OPEN SOURCE VULNERABILITIES CHECKER
===================================

Message: Improper header validation (CVE-2023-29197): https://github.com/guzzle/psr7/security/advisories/GHSA-wxmh-65f7-jcvw
Subject: guzzlehttp/psr7 (1 advisories)
```

This message indicates that the `guzzlehttp/psr7` package has a known security issue.

## Example of code that causes an evaluator error

The error is caused by a package version with a known vulnerability defined in your `composer.lock` file:

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

To resolve the error, upgrade the package to a version where the vulnerability is fixed:

1.  Identify the package with the vulnerability from the error message (for example, `guzzlehttp/psr7`).
2.  Update the package to a secure version:

    ```bash
    composer update guzzlehttp/psr7
    ```

3.  After updating, you can run `composer audit` to confirm that the vulnerability has been resolved.

## Run only this checker

To run only this checker, include `OPEN_SOURCE_VULNERABILITIES_CHECKER` in the checkers list:

```bash
vendor/bin/evaluator evaluate --checkers=OPEN_SOURCE_VULNERABILITIES_CHECKER
```
