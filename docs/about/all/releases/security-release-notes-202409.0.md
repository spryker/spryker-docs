---
title: Security release notes 202409.0
description: Security updates released for version 202409.0
last_updated: Sep 20, 2024
template: concept-topic-template
---

The following information describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Insecure direct object reference in role assignment in B2B Storefront

Because of an access controls vulnerability in the "role assignment" function, it was possible for attackers with access to the vulnerable functionality to assign users to roles created by other customers.

By fixing this vulnerability and updating the `spryker-shop/company-page` module to its latest version, the below two vulnerabilities are also resolved:
* Administrators can assign additional or hidden roles: Due to an access controls vulnerability in the "permission management" function, it was possible for attackers with an admin role to assign permissions that don't exist in the UI to user roles.
* B2B Marketplace: Customers from one company can change customer details related to another company.

### Affected modules

`spryker-shop/company-page`: 1.0.0 - 2.27.0

### Fix the vulnerability

Upgrade the `spryker-shop/company-page` module to version 2.28.0 or higher:

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

## “Remember Me” Functionality

The "remember me" functionality is considered to be against security best practices. With this fix we provide our customers with the ability to disable this functionality.

### Affected modules

`spryker-shop/customer-page`: 1.0.0 - 2.53.0

### Fix the vulnerability

Upgrade the `spryker-shop/customer-page` module to version 2.54.0 or higher:

```bash
composer update spryker-shop/customer-page
composer show spryker-shop/customer-page # Verify the version
```

In order to disable the ‘remember me’ functionality, update the `src/Pyz/Zed/Product/ProductConfig.php` configuation file by adding the following method:

```bash
/**
 * @return bool
 */
public function isRememberMeEnabled(): bool
{
    return false;
}
```
