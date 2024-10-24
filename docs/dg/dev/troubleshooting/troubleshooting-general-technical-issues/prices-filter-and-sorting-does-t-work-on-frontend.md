---
title: Prices filter and sorting doesn't work on Frontend
description: Explanation why these filters might not work.
last_updated: Oct 6, 2023
template: troubleshooting-guide-template
---

Prices filter and sorting doesn't work on Frontend.

## Solution

1. Most probably, you have enabled the [Customer Access feature](/docs/pbc/all/customer-relationship-management/{{site,version}}/base-shop/customer-access-feature-overview.html) and the configuration was reset.
Go to the Back Office and adjust the configuration.
2. If you don't want to use this feature, then it's recommended to remove plugin `SeePricePermissionPlugin`.

For more technical details, see[\SprykerShop\Yves\CatalogPage\Controller\CatalogController::reduceRestrictedParameters](https://github.com/spryker-shop/catalog-page/blob/master/src/SprykerShop/Yves/CatalogPage/Controller/CatalogController.php#L317).
