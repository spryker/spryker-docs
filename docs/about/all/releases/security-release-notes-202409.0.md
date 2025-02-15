---
title: Security release notes 202409.0
description: Security updates released for version 202409.0
last_updated: Sep 27, 2024
template: concept-topic-template
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Insecure direct object reference in role assignment in B2B Storefront

Because of an access controls vulnerability in the "role assignment" function, it was possible for attackers with access to the vulnerable functionality to assign users to roles created by other customers.

Also, this fix resolves the following vulnerabilities:
* Administrators can assign additional or hidden roles. Because of an access controls vulnerability in the "permission management" function, it was possible for attackers with an admin role to assign users with permissions that don't exist in the UI.
* B2B Marketplace: Customers can change customer details related to a company they don't belong to.

### Affected modules

`spryker-shop/company-page`: 1.0.0 - 2.27.0

### Fix the vulnerability

Update the `spryker-shop/company-page` module to version 2.28.0 or higher:

```bash
composer update spryker-shop/company-page
composer show spryker-shop/company-page # Verify the version
```

## External service interaction (HTTP)

It was possible to induce the application to perform server-side HTTP requests to arbitrary domains by exploiting the "cancel order" functionality.

### Affected modules

`spryker/kernel`: 1.0.0 - 3.72.0

### Fix the vulnerability

Depending on the current version of the `spryker/kernel` module, update it in one of the following ways:

* If 3.72.0, update to 3.72.1:

```bash
composer require spryker/kernel:"~3.72.1"
composer show spryker/kernel # Verify the version
```

* If 3.71.0 or 3.71.1, update to 3.71.2:

```bash
composer require spryker/kernel:"~3.71.2"
composer show spryker/kernel # Verify the version
```

* If 3.70.0, update to 3.70.1:

```bash
composer require spryker/kernel:"~3.70.1"
composer show spryker/kernel # Verify the version
```

* If earlier than 3.69.0, update to 3.68.1:

```bash
composer require spryker/kernel:"~3.68.1"
composer show spryker/kernel # Verify the version
```

## Remember me Functionality

The remember me functionality is considered to be against security best practices. This fix lets you disable this functionality.

### Affected modules

`spryker-shop/customer-page`: 1.0.0 - 2.53.0

### Fix the vulnerability

1. Update the `spryker-shop/customer-page` module to version 2.54.0 or higher:

```bash
composer update spryker-shop/customer-page
composer show spryker-shop/customer-page # Verify the version
```

2. In `src/Pyz/Yves/CustomerPage/CustomerPageConfig.php`, add the following method:

```bash
/**
 * @return bool
 */
public function isRememberMeEnabled(): bool
{
    return false;
}
```

## Vulnerability in Twig third-party dependency

Twig third-party dependency was vulnerable to Protection Mechanism Failure because the incomplete enforcement of sandbox security measures. An attacker could potentially execute arbitrary code or access unauthorized data by crafting malicious templates that exploit this oversight.

### Affected modules

`spryker/twig`: 1.0.0 - 3.23.0

### Fix the vulnerability

In the root `composer.json`, adjust the `twig/twig` module file to version 3.14.0 or higher:

```bash
"twig/twig": "^2.15.3 || ^3.14.0"
```

Upgrade the `spryker/twig` module to version 3.24.0 or higher and the `twig/twig` module:

```bash
composer update spryker/twig twig/twig
composer show spryker/twig # Verify the version
composer show twig/twig # Verify the version
```
