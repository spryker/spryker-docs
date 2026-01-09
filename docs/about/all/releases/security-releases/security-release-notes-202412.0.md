---
title: Security release notes 202412.0
description: Security updates released for version 202412.0
last_updated: Dec 20, 2024
template: concept-topic-template
redirect_from:
  - /docs/about/all/releases/security-release-notes-202412.0.html
publish_date: "2024-12-20"
---

This document describes the security-related issues that have been recently resolved.

For additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, contact us at [security@spryker.com](mailto:security@spryker.com).

## B2B demo shop: Account takeover from a different company

Because of a misconfiguration in the access controls of the application, it was possible to modify the email of a customer belonging to a different company by manipulating the `id_customer` parameter of a submitted form.

Also, this fix resolves the following vulnerabilities:
- Unrestricted address addition (BFLA) exposes organizations to manipulation. Because of an access controls vulnerability, it was possible to add new addresses to any organization within an application.
- Unrestricted business unit modification (BFLA). Because of an access controls vulnerability, it was possible to manipulate business unit assignments for other users.

### Affected modules

`spryker-shop/company-page`: 1.0.0 - 2.29.0

### Fix the vulnerability

Update the `spryker-shop/company-page` module to version 2.30.0 or higher:

```bash
composer update spryker-shop/company-page
composer show spryker-shop/company-page # Verify the version
```

## Unauthenticated access to backend gateway and API exposure

The backend gateway endpoint was found to be accessible externally without any form of authentication.

### Affected modules

`spryker/security-system-user`: 1.0.0

### Fix the vulnerability

Update the `spryker/security-system-user` module to version 1.1.0 or higher:

```bash
composer update spryker/security-system-user
composer show spryker/security-system-user # Verify the version
```

## Strict transport security misconfiguration

The HTTP Strict-Transport-Security header was found to be missing from some static pages, such as CSS and JS files, of web applications.

### Fix the vulnerability

1. Update the `spryker/docker-sdk` module to version 1.63.0 or higher:

```bash
composer update spryker/docker-sdk
composer show spryker/docker-sdk # Verify the version
```

2. Update `.git.docker` with the following or later hash commit: `ac17ea980d151c6b4dd83b7093c0c05a9205c244`.

## Unauthorized user enable and disable capability in company menu

A user with the buyer role was able to enable and disable other users even if the user didn't have a permissions for this action.

### Affected modules

- `spryker-shop/company-page`: 1.0.0 - 2.28.0
- `spryker/company-user` : 1.0.0 - 2.18.0
- `spryker/company-role` : 1.0.0 - 1.8.0

### Fix the vulnerability

1. Update the modules to the specified version or higher:

| MODULE | VERSION |
| - | - |
| `spryker-shop/company-page`| 2.29.0 |
| `spryker/company-user` | 2.19.0 |
| `spryker/company-role` |  1.9.0 |

```bash
composer update spryker-shop/company-page spryker/company-user spryker/company-role
```

2. In the `Pyz\Client\Permission\PermissionDependencyProvider::getPermissionPlugins()` method, register the following plugins:
- Spryker\Client\CompanyRole\Plugin\Permission\CreateCompanyRolesPermissionPlugin
- Spryker\Client\CompanyRole\Plugin\Permission\DeleteCompanyRolesPermissionPlugin
- Spryker\Client\CompanyRole\Plugin\Permission\EditCompanyRolesPermissionPlugin
- Spryker\Client\CompanyRole\Plugin\Permission\SeeCompanyRolesPermissionPlugin
- Spryker\Client\CompanyUser\Plugin\CompanyUserStatusChangePermissionPlugin
- Spryker\Client\CompanyUser\Plugin\Permission\DeleteCompanyUsersPermissionPlugin
- Spryker\Client\CompanyUser\Plugin\Permission\EditCompanyUsersPermissionPlugin
- Spryker\Shared\CompanyUser\Plugin\AddCompanyUserPermissionPlugin
- Spryker\Shared\CompanyUserInvitation\Plugin\ManageCompanyUserInvitationPermissionPlugin

3. Update the data import file. Make sure to replace `test-company_Admin` with your company admin name. If you have multiple company admins, duplicate the provided permission set per admin.

**data/import/common/common/company_role_permission.csv**

```csv
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

{% info_block warningBox %}

This CSV import is only an example and will work exclusively for `test-company_Admin` and `trial-company_Admin`. For a real project, you will need to add these plugins to all company admin accounts, and make sure that a new admin account have those permissions.

{% endinfo_block %}

Alternatively, you can assign permissions directly to customers on the company permission management page.

## Vulnerability in Summernote third-party dependency

Summernote third-party dependency was vulnerable to cross-site scripting (XSS) via the insert link function in the editor component. An attacker could execute arbitrary code by injecting a crafted script.

### Affected modules

`spryker/gui`: 1.0.0 - 3.55.2

### Fix the vulnerability

1. In the root `composer.json`, adjust the `spryker/gui` module to version 3.55.3 or higher:

```bash
"spryker/gui": "^3.55.3"
```

2. Update the `spryker/gui` module to version 3.55.3 or higher:

```bash
composer update spryker/gui
composer show spryker/gui # Verify the version
```

## Vulnerability in symfony/security-http third-party dependency

Symfony/security-http third-party dependency was vulnerable to authentication bypass via the `consumeRememberMeCookie` function because of improper validation between the username persisted in the database and the username attached to the cookie.

### Fix the vulnerability

1. Update the `spryker/symfony` package to version 3.18.1 or higher.

2. In `composer.json`, change the version of `symfony/security-http`:

```bash
"symfony/security-http": "^5.4.47 || ^6.4.15",
```

3. Update the `symfony/security-http` module:

```bash
composer update symfony/security-http
```
