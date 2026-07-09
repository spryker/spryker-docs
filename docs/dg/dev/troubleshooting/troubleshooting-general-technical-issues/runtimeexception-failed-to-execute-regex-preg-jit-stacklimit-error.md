---
title: RuntimeException- Failed to execute regex- PREG_JIT_STACKLIMIT_ERROR
description: This troubleshooting guide will help you to fix the error `RuntimeException- Failed to execute regex- PREG_JIT_STACKLIMIT_ERROR`.
last_updated: Jun 16, 2021
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-general-technical-issues/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


## Description

```bash
[RuntimeException]                                  
Failed to execute regex: PREG_JIT_STACKLIMIT_ERROR
```

This error is received when using composer (`composer require`) to add additional modules.

## Cause

The error is thrown if the [backtracking/recursion limit](https://www.php.net/manual/en/pcre.configuration.php) is not high enough.

## Solution

Either increase the limits to your requirements or switch off PCRE's just-in-time compilation in your php.ini:

```bash
pcre.jit=0
```

You can also switch off PCRE just in time compilation using your `deploy.yml`.

```bash
image:
  tag: ...
  php:
    ini:
      'pcre.jit': 0
```
