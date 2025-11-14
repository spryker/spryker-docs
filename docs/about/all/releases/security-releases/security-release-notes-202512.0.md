---
title: Security release notes 202512.0
description: Security updates released for version 202512.0
last_updated: Nov 14, 2025
template: concept-topic-template
publish_date: "2025-11-14"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).


## Password Brute-force Was Possible in Self-Service Portal (SSP)

A brute-force vulnerability was detected in the Self-Service Portal (SSP). The login endpoint lacked rate-limiting and other protective controls, which could have allowed an attacker to submit numerous password attempts to gain unauthorized access.

### Affected modules

`spryker-shop/security-blocker-page`: 1.0.0 -  1.2.0

### Fix the vulnerability

Update the `spryker-shop/security-blocker-page` package to version 1.3.0 or higher:

```bash
composer update spryker-shop/security-blocker-page:"^1.3.0"
composer show spryker-shop/security-blocker-page # Verify the version
```