---
title: RuntimeException- Failed to execute regex- PREG_JIT_STACKLIMIT_ERROR
originalLink: https://documentation.spryker.com/v6/docs/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
redirect_from:
  - /v6/docs/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
  - /v6/docs/en/runtimeexception-failed-to-execute-regex-preg-jit-stacklimit-error
---

## Description
```bash
[RuntimeException]                                  
Failed to execute regex: PREG_JIT_STACKLIMIT_ERROR
```

This error is received when using composer (`composer require`) to add additional modules.

## Cause
The error is thrown if the [backtracking/recursion limit](https://www.php.net/manual/en/pcre.configuration.php){target="_blank"} is not high enough.

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




