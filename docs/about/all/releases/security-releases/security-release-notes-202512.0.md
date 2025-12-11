---
title: Security release notes 202512.0
description: Security updates released for version 202512.0
last_updated: Dec 11, 2025
template: concept-topic-template
publish_date: "2025-12-11"
redirect_from:
- /docs/about/all/releases/security-releases/security-release-notes-202511.0.html
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

## MFA Code Remains Valid After Logout

An issue was identified in which multi-factor authentication (MFA) codes remained valid for their full time window even after a user logged out. This behavior has been corrected. MFA codes are now invalidated immediately upon logout, ensuring that a new code is required for any subsequent login attempt.

### Affected modules

- `spryker-shop/agent-page`: < 1.22.0
- `spryker-shop/agent-page-extension`: < 1.2.0
- `spryker-shop/customer-page`: < 2.72.0
- `spryker-shop/customer-page-extension`: < 1.8.0
- `spryker/agent-security-merchant-portal-gui`: < 1.5.0
- `spryker/multi-factor-auth-merchant-portal`: < 1.2.0
- `spryker/security-merchant-portal-gui`: < 3.8.0
- `spryker/security-merchant-portal-gui-extension`: < 1.3.0
- `spryker/multi-factor-auth`: < 1.6.0 | 2.1.0
- `spryker/security-gui`: < 2.1.0
- `spryker/security-gui-extension`: < 1.4.0

### Fix the vulnerability

Upgrade the following modules to the corresponding versions or higher:

```bash
composer update spryker-shop/agent-page:"^1.22.0"
composer update spryker-shop/agent-page-extension:"^1.2.0"
composer update spryker-shop/customer-page:"^2.72.0"
composer update spryker-shop/customer-page-extension:"^1.8.0"
#Use spryker/multi-factor-auth:"^1.6.0" if you haven't upgraded the MFA module version to "^2.*"
composer update spryker/multi-factor-auth:"^2.1.0" 
composer update spryker/security-gui:"^2.1.0"
composer update spryker/security-gui-extension:"^1.4.0"

#Verify the versions
composer show spryker-shop/agent-page
composer show spryker-shop/agent-page-extension
composer show spryker-shop/customer-page
composer show spryker-shop/customer-page-extension
composer show spryker/multi-factor-auth
composer show spryker/security-gui
composer show spryker/security-gui-extension 
```

In case the Merchant Portal is installed, also upgrade the following modules :

```bash
composer update spryker/agent-security-merchant-portal-gui:"^1.5.0"
composer update spryker/multi-factor-auth-merchant-portal:"^1.2.0"
composer update spryker/security-merchant-portal-gui:"^3.8.0"
composer update spryker/security-merchant-portal-gui-extension:"^1.3.0"

#Verify the versions
composer show spryker/agent-security-merchant-portal-gui
composer show spryker/multi-factor-auth-merchant-portal
composer show spryker/security-merchant-portal-gui
composer show spryker/security-merchant-portal-gui-extension
```

## Vulnerability in symfony/http-foundation third-party dependency

The version of symfony/http-foundation package was found to be affected by a publicly known vulnerability related to a potential authorization bypass.

### Affected modules

`spryker/symfony`: < 3.19.2

### Fix the vulnerability

Update the `spryker/symfony` package to version 3.19.2 or higher:

```bash
composer update spryker/symfony:"^3.19.2"
composer show spryker/symfony # Verify the version
```

## Potential SQL Injection Instances in Codebase

Spryker's static code analysis tooling identified potential SQL injection risks caused by string-based query concatenation. These issues have been addressed and the affected code paths have been updated to use secure, parameterized query practices.

### Affected modules

`spryker/session`: < 4.19.2

### Fix the vulnerability

Update the `spryker/session` package to version 4.19.2 or higher:

```bash
composer update spryker/session:"^4.19.2"
composer show spryker/session # Verify the version
```
