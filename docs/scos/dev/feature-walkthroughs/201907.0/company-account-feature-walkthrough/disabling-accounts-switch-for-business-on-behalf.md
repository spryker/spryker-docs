---
title: Disabling accounts switch for Business on Behalf
description: Use the guide to disable accounts switch for Business on Behalf
last_updated: Nov 9, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-disable-accounts-switch-for-bob-201907
originalArticleId: 00b4a173-5124-4286-ac28-2bbc8204d610
redirect_from:
  - /v3/docs/ht-disable-accounts-switch-for-bob-201907
  - /v3/docs/en/ht-disable-accounts-switch-for-bob-201907
---

The functionality that allows you to disable switching between the Business-on-Behalf accounts. E.g., if the user logs in to the pre-defined company account that has the [Business on Behalf](/docs/scos/user/features/{{site.version}}/company-account-feature-overview/business-on-behalf-overview.html) feature integrated, the shop owner can disable the ability to switch between the accounts. In case Business on Behalf is disabled, the company user logs in to the default account and is unable to switch between the company users within their company account.

To disable switching between Business-on-Behalf accounts
* Introduce a plugin that implements this interface—`CompanyUserChangeAllowedCheckPluginInterface`:

```php
public function check(CustomerTransfer $customerTransfer): bool
{
    return false;
}
```

* Add the introduced plugin to `Pyz\Client\BusinessOnBehalf\BusinessOnBehalfDependencyProvider::getCompanyUserChangeAllowedCheckPlugins()`:

```php
protected function getCompanyUserChangeAllowedCheckPlugins(): array
{
    return [
        new ...Plugin(),
    ];
}
```

<!-- Last review date: Jul 04, 2019 by Dmitriy Aseev, Oksana Karasyova-->
