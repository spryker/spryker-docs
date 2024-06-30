---
title: Security release notes 202307.0
description: Security release notes for the Spryker Summer 2023 Cross-Product Release
last_updated: Jul 26, 2023
template: concept-topic-template
redirect_from:
- /docs/scos/user/intro-to-spryker/releases/release-notes/release-notes-202307.0/security-release-notes-202307.0.html

---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## Directory traversal in ZED

It was possible to exploit a directory traversal vulnerability affecting the backend function of drawing graphs in order to determine whether a directory or an XML file exists on the file system. This was possible by submitting a malicious value in the process parameter within the URL of the affected function.

**Introduced changes:**
Proper input validation controls have been implemented for the vulnerable parameter.

**Affected modules:**
`spryker/state-machine`: 1.0.0 - 2.17.0

**How to get the fix:**
To implement the fix for this vulnerability, update the `spryker/state-machine` module:

1. If the version of `spryker/state-machine` is 2.16.2 or later, update it to version 2.18.0:

```bash
composer require spryker/state-machine:"^2.18.0"
composer show spryker/state-machine # Verify the version
```

2. If the version of `spryker/state-machine` is 2.15.0 - 2.15.1, update it to version 2.15.2:

```bash
composer require spryker/state-machine:"~2.15.2"
composer show spryker/state-machine # Verify the version
```

3. If the version of `spryker/state-machine` is 2.14.0, update it to version 2.14.1:

```bash
composer require spryker/state-machine:"~2.14.1"
composer show spryker/state-machine # Verify the version
```
