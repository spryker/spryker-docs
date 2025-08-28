---
title: Security release notes 202506.0
description: Security updates released for version 202506.0
last_updated: Jun 20, 2025
template: concept-topic-template
redirect_from:
  - /docs/about/all/releases/security-release-notes-202506.0.html
publish_date: 2025-06-20
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).


## Authorization bypass on cent amount parameter

Because of missing authorization controls, it was possible for a user with appropriate privileges to change the spending limit (cent amount) of a role belonging to a different company.

### Affected modules

`spryker-shop/company-page`: 1.0.0 - 2.34.0

### Fix the vulnerability

Update the `spryker-shop/company-page` package to version 2.35.0 or higher:

```bash
composer update spryker-shop/company-page # updpate package
composer show spryker-shop/company-page # verify the version
```


## Regular expression denial of service (ReDoS) in cross-spawn

The `cross-spawn` third-party dependency was vulnerable to regular expression denial of service (ReDoS) because of improper input sanitization. An attacker could increase the CPU usage and perform a denial of service attack by crafting a very large and complicated string.

### Fix the vulnerability

Update the `cross-spawn` package to version 7.0.5 or higher:

```bash
npm update cross-spawn@7.0.5
```

If your `package.json` doesn't have a `cross-spawn` dependency, add an override section:

```bash
"overrides": {
    "cross-spawn": "^7.0.5"
}
```











































