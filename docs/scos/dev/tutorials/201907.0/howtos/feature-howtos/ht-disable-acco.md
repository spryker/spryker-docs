---
title: HowTo - Disable Accounts Switch for Business on Behalf
originalLink: https://documentation.spryker.com/v3/docs/ht-disable-accounts-switch-for-bob-201907
redirect_from:
  - /v3/docs/ht-disable-accounts-switch-for-bob-201907
  - /v3/docs/en/ht-disable-accounts-switch-for-bob-201907
---

We have implemented the functionality that allows you to disable switching between the Business-on-Behalf accounts. E.g., if the user logs in to the pre-defined company account that has Business-on-Behalf feature integrated, the shop owner can disable the ability to switch between the accounts. In case the Business-on-Behalf is disabled, the company user will log in to the default account and will not be able to switch between the company users within their company account.

To disable switching between Business-on-Behalf accounts:
- Introduce a plugin that implements this interface - `CompanyUserChangeAllowedCheckPluginInterface`:
```php
public function check(CustomerTransfer $customerTransfer): bool
{
    return false;
}
```
- Add the introduced plugin to `Pyz\Client\BusinessOnBehalf\BusinessOnBehalfDependencyProvider::getCompanyUserChangeAllowedCheckPlugins()`:
```php
protected function getCompanyUserChangeAllowedCheckPlugins(): array
{
    return [
        new ...Plugin(),
    ];
}
```

<!-- Last review date: Jul 04, 2019 by Dmitriy Aseev, Oksana Karasyova-->
