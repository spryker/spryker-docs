---
title: Prices filter and sorting doesn't work in Yves
description: Explanation why these filters might not work.
last_updated: Oct 6, 2023
template: troubleshooting-guide-template
---

Prices filter and sorting doesn't work in Yves

## Solution

1. Most probably you have enabled (Customer Access Feature)[https://docs.spryker.com/docs/pbc/all/customer-relationship-management/202307.0/base-shop/customer-access-feature-overview.html] and the configuration was reset.
   Please open Back Office and adjust the configuration.
2. If you don't want to use this feature, then it's recommended to remove plugin `SeePricePermissionPlugin` in this case.

For more technical details, see here (\SprykerShop\Yves\CatalogPage\Controller\CatalogController::reduceRestrictedParameters)[https://github.com/spryker-shop/catalog-page/blob/master/src/SprykerShop/Yves/CatalogPage/Controller/CatalogController.php#L317]. 
