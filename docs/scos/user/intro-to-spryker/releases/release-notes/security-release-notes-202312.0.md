---
title: Security release notes 202312.0
description: Security release notes for 202312.0
last_updated: Dec 5, 2023
template: concept-topic-template
---

The following information pertains to security-related issues that have been recently resolved. All issues are listed by description and affected modules.

If you need any additional support with this content, [contact our support](https://support.spryker.com/). If you found a new security vulnerability, inform us through [security@spryker.com](mailto:security@spryker.com).

## Insecure password reset workflow

The password reset functionality missed security-related controls that could lead to manipulation by attackers. The security flaws related to fixing this issue included the following:
* Reusable password reset tokens: Upon successful completion of a password reset, the same link containing a token could be reused to reset the password again.<br> 
Affected applications: BackOffice, Merchant Portal.
* Extended expiration time for password reset tokens:  The password reset token expiration time was too long.<br>
Affected applications: Storefront, Back Office, Merchant Portal.
* No rate limiting the password reset attempts: It was possible to make an infinite number of attempts to reset any account using any email address.<br>
Affected applications: Storefront, Back Office, Merchant Portal.
* Non-invalidation of old password reset tokens: When a new password reset was requested, old password reset tokens were not invalidated and could be reused.<br>
Affected applications: Back Office, Merchant Portal.
* Insufficient length of password reset tokens: The password reset token, consisting of 8 characters, was too short to ensure robust security.<br>
Affected applications: Back Office, Merchant Portal.


### Affected modules

* `sspryker/customer`: 1.0.0 - 7.52.0
* `spryker/security-gui`: 1.0.0 - 1.4.0
* `spryker/security-merchant-portal-gui`: 1.0.0 - 2.1.0
* `spryker/user-password-reset`: 1.0.0 - 1.4.0
* `spryker-shop/customer-page`: 1.0.0 - 2.48.0

### Introduced changes

All the security-related flaws in the password reset functionality have been addressed.

### How to get the fix

{% info_block infoBox "No support for security-related fixed in PHP 8.0." %}

PHP 8.0 does not receive security fixes anymore. For this reason, the support of PHP 8.0 was discontinued by Spryker. Newer versions of the modules now require PHP 8.1 instead of 8.0. To ignore the PHP version change, you can try to run composer with the `--ignore-platform-reqs` option. Most modules should still work with 8.0. Anyway, we discourage you from continuing to use PHP 8.0 and recommend updating at least to PHP 8.1.

{% endinfo_block %}

1. Update `spryker/customer`.

* If your version of `spryker/customer` is earlier than or equal to 7.52.0, update to version 7.53.0:

```bash
composer require spryker/customer:"~7.53.0"
composer show spryker/customer # Verify the version
```

* If your platform is based on PHP 8.0, you can use version 7.51.6 of the `spryker/customer` module:

```bash
composer require spryker/customer:"~7.51.6"
composer show spryker/customer # Verify the version
```

2. Update `spryker/security-gui`.

* If your version of `spryker/security-gui` is earlier than or equal to 1.4.0, update to version 1.5.0:

```bash
composer require spryker/security-gui:"~1.5.0"
composer show spryker/security-gui # Verify the version
```

* If your platform is based on PHP 8.0, you can use version 1.3.1 of the `security-gui` module:

```bash
composer require spryker/security-gui:"~1.3.1"
composer show spryker/security-gui # Verify the version
```

In `src/Pyz/Zed/SecurityGui/SecurityGuiConfig.php`, enable the blocker. If the file does not exist yet, create it.

```bash
namespace Pyz\Zed\SecurityGui;

use Spryker\Zed\SecurityGui\SecurityGuiConfig as SprykerSecurityGuiConfig;

class SecurityGuiConfig extends SprykerSecurityGuiConfig
{
    // Add this line, set it to true
    protected const IS_BACKOFFICE_USER_SECURITY_BLOCKER_ENABLED = true;
}
```

3. Update `spryker/security-merchant-portal-gui`.

* If your version of `spryker/security-merchant-portal-gui` is earlier than or equal to 2.1.0, update to version 2.2.0:

```bash
composer require spryker/security-merchant-portal-gui:"~2.2.0"
composer show spryker/security-merchant-portal-gui # Verify the version
```

* If your platform is based on PHP 8.0, you can use version 2.1.1 of the `security-merchant-portal-gui` module:

```bash
composer require spryker/security-merchant-portal-gui:"~2.1.1"
composer show spryker/security-merchant-portal-gui # Verify the version
```

{% info_block infoBox "Info" %}

Depending on your project setup, you might need to upgrade those two modules as well:

{% endinfo_block %}

```bash
composer require spryker/zed-gui:"^2.0.0"
composer require spryker/gui-table:"^2.0.0"
composer show spryker/zed-gui # Verify the version
composer show spryker/gui-table # Verify the version
```

In `src/Pyz/Zed/SecurityMerchantPortalGui/SecurityMerchantPortalGuiConfig.php`, add the following configuration. If the file does not exist yet, create it.

```bash
namespace Pyz\Zed\SecurityMerchantPortalGui;

use Spryker\Zed\SecurityMerchantPortalGui\SecurityMerchantPortalGuiConfig as SprykerSecurityMerchantPortalGui;

class SecurityMerchantPortalGuiConfig extends SprykerSecurityMerchantPortalGui
{
    // Add this line, set it to true
    protected const MERCHANT_PORTAL_SECURITY_BLOCKER_ENABLED = true;
}
```

{% info_block infoBox "Info" %}

Depending on your project setup, you might need to run updates of additional modules!

{% endinfo_block %}

Other modules that belong to the merchant context might require an update as well. But this is highly dependent on the actual project setup. Since we can’t predict every variation, be advised that there are likely to be additional dependencies requiring an update.

4. Update `spryker/user-password-reset`.

* If your version of `spryker/user-password-reset` is earlier than or equal to 1.4.0, update to version 1.5.0:

```bash
composer require spryker/user-password-reset:"~1.5.0"
composer show spryker/user-password- # Verify the version
```

* If your platform is based on PHP 8.0, you can use version 1.4.1 of the `user-password-reset` module:

```bash
composer require spryker/user-password-reset:"~1.4.1"
composer show spryker/user-password-reset # Verify the version
```

5. Update `spryker-shop/customer-page`.

* If your version of `spryker-shop/customer-page` is earlier than or equal to 2.48.0, update to version 2.49.0:

```bash
composer require spryker-shop/customer-page:"~2.49.0"
composer show spryker-shop/customer-page # Verify the version
```

* If your platform is based on PHP 8.0 you can use version 2.46.2 of the `customer-page` module:

```bash
composer require spryker-shop/customer-page:"~2.46.2"
composer show spryker-shop/customer-page # Verify the version
```

In `src/Pyz/Yves/CustomerPage/CustomerPageConfig.php`, enable the blocker. If the file does not exist yet, create it.

```bash
namespace Pyz\Yves\CustomerPage;

use Spryker\Yves\CustomerPage\CustomerPageConfig as SprykerCustomerPageConfig;

class CustomerPageConfig extends SprykerCustomerPageConfig
{
    // Add this line, set it to true
    protected const CUSTOMER_SECURITY_BLOCKER_ENABLED = true;
}
```

## Cross-Site Request Forgery (CSRF) in permission system - B2B Storefront

The company role permissions configuration page allowed administrators to configure the enabled permissions for a selected role. The IDs of the actual permission and groups were passed as URL parameters. Thus, it was possible for attackers to trick authenticated administrators into changing the permissions of a role by exploiting the CSRF attack.

### Affected modules

* `spryker-shop/company-page`: 1.0.0 - 2.23.0

### Introduced changes

The CSRF attack has been addressed by implementing security controls to prevent it.

### How to get the fix

To implement the fix for this vulnerability, update the CompanyPage module as follows:

1. Upgrade the `spryker-shop/company-page` module version to 2.24.0

```bash
composer require spryker-shop/company-page:"~2.24.0"
composer show spryker-shop/company-page # Verify the version
```

2. Define new data properties in `CompanyPage/Theme/default/views/role-update/role-update.twig`:

```bash
{% raw %}
{% define data = {
    ...
    companyRolePermissionAssignFormCloner: _view.companyRolePermissionAssignFormCloner,
    companyRolePermissionUnassignFormCloner: _view.companyRolePermissionUnassignFormCloner,
    ...
} %}
{% endraw %}
```

Add these properties to the data config of the `permission-table` molecule: 

```bash
{% include molecule('permission-table', 'CompanyPage') with {
    data: {
        ...
        companyRolePermissionAssignFormCloner: data.companyRolePermissionAssignFormCloner,
        companyRolePermissionUnassignFormCloner: data.companyRolePermissionUnassignFormCloner,
        ...
    }
} only %}
```

3. Define new data properties in `CompanyPage/Theme/default/components/molecules/permission-table/permission-table.twig`:

```bash
{% raw %}
{% define data = {
    ...
    companyRolePermissionAssignFormCloner: null,
    companyRolePermissionUnassignFormCloner: null,
    ...
} %}
{% endraw %}
```

Replace static `unassign / assign` links with Symfony forms: 

```bash
// unassing 

{% set companyRolePermissionUnassignForm = data.companyRolePermissionUnassignFormCloner.getForm.createView ?? null %}
{% set formAction = path('company/company-role-permission/unassign', {
    'id-permission': permission.idPermission,
    'id-company-role': data.idCompanyRole,
}) %}
{% set linkText = 'company.account.company_role.permission.unassign' | trans %}

{{ form_start(companyRolePermissionUnassignForm, { action: formAction }) }}
    <button class="link" data-init-single-click>{{ linkText }}</button>
{{ form_end(companyRolePermissionUnassignForm) }}
```

```bash
// assing

{% set companyRolePermissionAssignForm = data.companyRolePermissionAssignFormCloner.getForm.createView ?? null %}
{% set formAction = path('company/company-role-permission/assign', {
    'id-permission': permission.idPermission,
    'id-company-role': data.idCompanyRole,
}) %}
{% set linkText = 'company.account.company_role.permission.assign' | trans %}

{{ form_start(companyRolePermissionAssignForm, { action: formAction }) }}
    <button class="link" data-init-single-click>{{ linkText }}</button>
{{ form_end(companyRolePermissionAssignForm) }}
```

If you are using a standard `b2b/b2b-mp` demo-shop design, apply the following approach: 

```bash
{% set formAssign = data.companyRolePermissionAssignFormCloner.getForm.createView ?? null %}
{% set formUnassign = data.companyRolePermissionUnassignFormCloner.getForm.createView ?? null %}
{% set actionAssign = path('company/company-role-permission/assign', {
    'id-permission': permission.idPermission, 
    'id-company-role': data.idCompanyRole,
}) %}
{% set actionUnassign = path('company/company-role-permission/unassign', {
    'id-permission': permission.idPermission, 
    'id-company-role': data.idCompanyRole,
}) %}
{% set titleAssign = 'company.account.company_role.permission.assign' | trans %}
{% set titleUnassign = 'company.account.company_role.permission.unassign' | trans %}
{% set form = isAssigned ? formUnassign : formAssign %}
{% set formAction = isAssigned ? actionUnassign : actionAssign %}

{{ form_start(form, { action: formAction }) }}
    {% include atom('switch') with {
         modifiers: isAssigned ? ['active'] : [],
         config: {
             tag: 'button',
         },
         attributes: {
             title: isAssigned ? titleUnassign : titleAssign,
         },
    } only %}
{{ form_end(form) }}
```