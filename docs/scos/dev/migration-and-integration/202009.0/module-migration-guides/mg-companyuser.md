---
title: Migration Guide - CompanyUser
originalLink: https://documentation.spryker.com/v6/docs/mg-companyuser
redirect_from:
  - /v6/docs/mg-companyuser
  - /v6/docs/en/mg-companyuser
---

## Upgrading from Version 1.0.0 to Version 2.0.0

`CompanyUser` module version 2.0.0 brings one major change - new `is_active` column in `spy_company_user` database table. The main purpose of this field is to store information about company users and make it possible to enable/disable them.
Also, `CompanyUserTransfer` object got a new `isActive` field, since it represents `CompanyUser` from the database (and you aren't allowed to use database entities directly).

**To upgrade to the new version of the module, do the following:**
1. Run database migration:
``` sql
ALTER TABLE "spy_company_user"
ADD "is_active" BOOLEAN DEFAULT 't';
```
As a result, all existing company users will receive a new column `is_active`. By default, the value is `true` and it is `required`.

2. Rebuild `Propel2` models:
`vendor/bin/console propel:model:build`
This command is needed to update `SpyCompanyUser`, `SpyCompanyUserEntityTransfer` and other database-related classes.
So, once this command is executed, CompanyUser-related database classes will have new methods - `getIsActive` and `setIsActive`.

3. Regenerate transfer objects:
`vendor/bin/console transfer:generate`
This command is needed to regenerate `CompanyUserTransfer` object, which will now have a new field - `isActive`.

### New facade methods
Another change is that new methods for enabling and disabling company user were added.
They both return `CompanyUserResponseTransfer` object, that can be used to determine whether the attempt was successful or not.

**Code sample:**
    
```php
/**
 * Specification:
 * - Enables company user.
 * - Uses idCompanyUser from company user transfer to find company user.
 * - Sets company user's 'is_active' flag to true.
 *
 * @api
 *
 * @param \Generated\Shared\Transfer\CompanyUserTransfer $companyUserTransfer
 *
 * @return \Generated\Shared\Transfer\CompanyUserResponseTransfer
 */
public function enableCompanyUser(CompanyUserTransfer $companyUserTransfer): CompanyUserResponseTransfer;
```

**Code sample:**
    
```php/**
 * Specification:
 * - Disables company user.
 * - Uses idCompanyUser from company user transfer to find company user.
 * - Sets company user's 'is_active' flag to false.
 *
 * @api
 *
 * @param \Generated\Shared\Transfer\CompanyUserTransfer $companyUserTransfer
 *
 * @return \Generated\Shared\Transfer\CompanyUserResponseTransfer
 */
public function disableCompanyUser(CompanyUserTransfer $companyUserTransfer): CompanyUserResponseTransfer;
```
    
Disabled company users cannot see the `My Company` page, but they can make orders as customers.
Enabled users can obviously view the `My Company` page, create new company users, company user roles and send invitations.
A newly registered company user `is active` by default. That means, that the user can log in straight after the registration has been completed.
Action that can be performed by each user, are determined by permissions they have. These permissions are set by their roles in the company.
The methods below now have additional checks which verify if company user is active or not.
* `\Spryker\Zed\CompanyUser\Persistence\CompanyUserRepository::findActiveCompanyUserByCustomerId()`
* `\SprykerShop\Yves\CompanyPage\Form\DataProvider\CompanyUserAccountSelectorFormDataProvider::mapCompanyUserCollectionToChoiceArray()`

### Updated Company Role Permissions Management page
Previously, permissions management of specific company role required you to go to the company role deletion page.
On that page, you needed to click `Manage permissions`. After that, you were redirected to the needed page with the list of available permissions for the company role, that you selected.
Quite a long way, isn't it?
With the changes of this Epic, the picture is completely different. Now, you're able to manage permissions directly from the Company Role Edit page.
To achieve this, some some changes have been made. Please take a time to check the list below to make sure that upgrading your CompanyUser module to the new 2.0.0 major won't break any existing code.
The changes are:
* `CompanyRolePermissionController::manageAction()` method has been removed;
        Please replace all usages with `CompanyRoleController::updateAction();`

* `SprykerShop/Yves/CompanyPage/Plugin/Provider/CompanyPageControllerProvider::ROUTE_COMPANY_ROLE_PERMISSION_MANAGE` constant that represented the old _Company Role Permissions Management_ page, has been removed and is no longer available;

Please use `SprykerShop/Yves/CompanyPage/Plugin/Provider/CompanyPageControllerProvider::ROUTE_COMPANY_ROLE_UPDATE` instead;
* Manage permissions button link on Company Role Details page has been changed from `company/company-role-permission/manage` to `company/company-role/update`.

_Estimated migration time: 2,5 to 4 hours. The time may vary depending on project-specific factors_
