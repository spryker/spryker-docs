---
title: Migration Guide - ShoppingListPage
originalLink: https://documentation.spryker.com/v5/docs/mg-shopping-list-page
redirect_from:
  - /v5/docs/mg-shopping-list-page
  - /v5/docs/en/mg-shopping-list-page
---

## Upgrading from Version 0.* to Version 0.8.0
{% info_block infoBox %}
In order to dismantle the Horizontal Barrier and enable partial module updates on projects, a Technical Release took place. Public API of source and target major versions are equal. No migration efforts are required. Please [contact us](https://support.spryker.com/hc/en-us
{% endinfo_block %} if you have any questions.)

## Upgrading from Version 1.0.0* to Version 2.0.0
From version 2 we have removed the disabled users from the shared list. The ability to enable/disable users was added to the `CompanyUser` module version 2.0.0.

**To upgrade to the new version of the module, do the following:**
1. Upgrade the CompanyUser module to version 2.0.0. See [Migration Guide - CompanyUser](https://documentation.spryker.com/docs/en/mg-companyuser#upgrading-from-version-1-0-0-to-version-2-0-0)  for more details:

```yaml
composer require spryker/company-user: “^2.0.0”
```
2. Regenerate transfer objects:

```yaml
vendor/bin/console transfer:generate
```
*Estimated migration time: 10 minutes*
<!-- Last review date: Feb 4, 2019* --by Sergey Samoylov, Yuliia Boiko--> 
