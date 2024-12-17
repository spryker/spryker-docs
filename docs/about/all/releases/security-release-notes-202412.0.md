---
title: Security release notes 202412.0
description: Security updates released for version 202412.0
last_updated: Dec 20, 2024
template: concept-topic-template
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## Account takeover from a different company (B2B demo-shop)

Due to a misconfiguration in the access controls of the application, it was possible to modify the email of a customer belonging to a different company by manipulating the `id_customer` parameter of the submitted form.

Also, this fix resolves the following vulnerabilities:
* Unrestricted Address Addition (BFLA) Exposes Organizations to Manipulation. Because of an access controls vulnerability it was possible to add new addresses to any organization within the application.
* Unrestricted Business Unit Modification (BFLA). Because of an access controls vulnerability it was possible to manipulate business unit assignments for other users.

### Affected modules

`spryker-shop/company-page`: 1.0.0 - 2.29.0

### Fix the vulnerability

Update the `spryker-shop/company-page` module to version 2.30.0 or higher:

```bash
composer update spryker-shop/company-page
composer show spryker-shop/company-page # Verify the version
```

## Unauthenticated Access to Backend Gateway and API Exposure

The backend gateway endpoint was found to be accessible externally without any form of authentication.

### Affected modules

`spryker/security-system-user`: 1.0.0

### Fix the vulnerability

Update the `spryker/security-system-user` module to version 1.1.0 or higher:

```bash
composer update spryker/security-system-user
composer show spryker/security-system-user # Verify the version
```

## Strict Transport Security Misconfiguration

The HTTP Strict-Transport-Security header was found to be missing from certain static pages (.css, .js files) of the web applications.

### Fix the vulnerability

Update the `spryker/docker-sdk` module to version 1.63.0 or higher:

Update `.git.docker` with hash commit `ac17ea980d151c6b4dd83b7093c0c05a9205c244` or higher.

## Unauthorized User Enable/Disable Capability in Company Menu

A user with the buyer role was able to enable or disable other users even if the specific permission for this action was turned off.

### Affected modules

* `spryker-shop/company-page`: 1.0.0 - 2.28.0
* `spryker/company-user` : 1.0.0 - 2.18.0
* `spryker/company-role` : 1.0.0 - 1.8.0

### Fix the vulnerability

1. Update the `spryker-shop/company-page` (version 2.29.0 or higher), `spryker/company-user` (version 2.19.0 or higher), `spryker/company-role`(version 1.9.0 or higher)

```bash
composer update spryker-shop/company-page spryker/company-user spryker/company-role
```

2. Register the following plugins in the `Pyz\Client\Permission\PermissionDependencyProvider::getPermissionPlugins()` method :
* Spryker\Client\CompanyRole\Plugin\Permission\CreateCompanyRolesPermissionPlugin
* Spryker\Client\CompanyRole\Plugin\Permission\DeleteCompanyRolesPermissionPlugin
* Spryker\Client\CompanyRole\Plugin\Permission\EditCompanyRolesPermissionPlugin
* Spryker\Client\CompanyRole\Plugin\Permission\SeeCompanyRolesPermissionPlugin
* Spryker\Client\CompanyUser\Plugin\CompanyUserStatusChangePermissionPlugin
* Spryker\Client\CompanyUser\Plugin\Permission\DeleteCompanyUsersPermissionPlugin
* Spryker\Client\CompanyUser\Plugin\Permission\EditCompanyUsersPermissionPlugin
* Spryker\Shared\CompanyUser\Plugin\AddCompanyUserPermissionPlugin
* Spryker\Shared\CompanyUserInvitation\Plugin\ManageCompanyUserInvitationPermissionPlugin

3. Update data import files (or, assign permissions directly to customers from the company permission management page) `data/import/common/common/company_role_permission.csv`

Make sure that test-company_Admin is replaced by your company admin name. (If you have several company admins, please duplicate the provided below permission set for each admin)

```bash
Spryker_Admin,DeleteCompanyUsersPermissionPlugin,
test-company_Admin,DeleteCompanyUsersPermissionPlugin,
test-company_Admin,AddCompanyUserPermissionPlugin,
test-company_Admin,AddCompanyUserPermissionPlugin,
test-company_Admin,EditCompanyUsersPermissionPlugin,
test-company_Admin,SeeCompanyRolesPermissionPlugin,
test-company_Admin,DeleteCompanyRolesPermissionPlugin,
trial-company_Admin,CreateCompanyRolesPermissionPlugin,
trial-company_Admin,EditCompanyRolesPermissionPlugin,
trial-company_Admin,ManageCompanyUserInvitationPermissionPlugin,
trial-company_Admin,CompanyUserStatusChangePermissionPlugin,
```

## Vulnerability in Summernote third-party dependency

Summernote third-party dependency was vulnerable to Cross-site Scripting (XSS) via the insert link function in the editor component. An attacker could potentially execute arbitrary code by injecting a crafted script. 

### Affected modules

`spryker/gui`: 1.0.0 - 3.55.2

### Fix the vulnerability

In the root `composer.json`, adjust the `spryker/gui` module to version 3.55.3 or higher:

```bash
"spryker/gui": "^3.55.3"
```

Upgrade the `spryker/gui` module to version 3.55.3 or higher:

```bash
composer update spryker/gui
composer show spryker/gui # Verify the version
```

## Vulnerability in symfony/security-http third-party dependency

Symfony/security-http third-party dependency was vulnerable to Authentication Bypass via the consumeRememberMeCookie function due to improper validation between the username persisted in the database and the username attached to the cookie.

### Fix the vulnerability

Update `spryker/symfony` package to version 3.18.1 or higher

Adjust `composer. json` in the following manner:

```bash
"symfony/security-http": "^5.4.47 || ^6.4.15",
```

Run the following command:

```bash
composer update symfony/security-http
```