---
title: Security release notes 202506.0
description: Security updates released for version 202506.0
last_updated: Jun 20, 2025
template: concept-topic-template
redirect_from:
  - /docs/about/all/releases/security-release-notes-202506.0.html
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).


## Authorization Bypass on Cent Amount Parameter

Due to missing authorization controls, it was possible for a user with appropriate privileges to modify the spending limit (cent amount) of a role belonging to a different company.

### Affected modules

* `spryker-shop/company-page`: 1.0.0 - 2.34.0

### Fix the vulnerability

Update the `spryker-shop/company-page` package to version 2.35.0 or higher:

```bash
composer update spryker-shop/company-page # updpate package
composer show spryker-shop/company-page # verify the version
```


## Regular Expression Denial of Service (ReDoS) in cross-spawn

`cross-spawn` third-party dependency was vulnerable to Regular Expression Denial of Service (ReDoS) due to improper input sanitization. An attacker can increase the CPU usage and perform a Denial of Service attack by crafting a very large and well crafted string.

### Fix the vulnerability

Update the `cross-spawn` package to version 7.0.5 or higher:

```bash
npm update cross-spawn@7.0.5
```

In case there is no a `cross-spawn` dependency in your `package.json`file, add an override section into it:

```bash
"overrides": {
    "cross-spawn": "^7.0.5"
}
```
