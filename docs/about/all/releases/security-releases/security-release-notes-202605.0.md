---
title: Security release notes 202605.0
description: Security updates released for version 202605.0
last_updated: May 18, 2026
template: concept-topic-template
publish_date: "2026-05-18"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Information disclosure via phpinfo() method

{% info_block warningBox "Prerequisite" %}

This security update requires [Spryker 202604.0](/docs/about/all/releases/release-notes-202604.0.html) or later. Ensure your project is upgraded to this version before applying the fix.

{% endinfo_block %}

Instances of phpinfo() were identified in the codebase, which could potentially expose sensitive configuration details and environment variables to unauthorized parties. Such an instance was found to be part of the default Back Office setup.

### Affected modules

- `spryker/setup`: < 4.8.0
- `spryker/maintenance`: < 3.6.0

### Fix the vulnerability

Update the `spryker/setup` package to version 4.8.0 or higher:

```bash
composer update spryker/setup:"^4.8.0"
composer show spryker/setup # Verify the version
```

Update the `spryker/maintenance` package to version 4.0.0 or higher:

```bash
composer update spryker/maintenance:"^4.0.0"
composer show spryker/maintenance # Verify the version
```
