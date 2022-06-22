---
title: Migration guide - Refund
description: Use the guide to learn how to update the Refund module to a newer version.
last_updated: Aug 2, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-refund
originalArticleId: 30c8c793-2247-4074-8e0e-9418ee1b0ba5
redirect_from:
  - /2021080/docs/mg-refund
  - /2021080/docs/en/mg-refund
  - /docs/mg-refund
  - /docs/en/mg-refund
  - /v1/docs/mg-refund
  - /v1/docs/en/mg-refund
  - /v2/docs/mg-refund
  - /v2/docs/en/mg-refund
  - /v3/docs/mg-refund
  - /v3/docs/en/mg-refund
  - /v4/docs/mg-refund
  - /v4/docs/en/mg-refund
  - /v5/docs/mg-refund
  - /v5/docs/en/mg-refund
  - /v6/docs/mg-refund
  - /v6/docs/en/mg-refund
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-refund.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-refund.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-refund.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-refund.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-refund.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-refund.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-refund.html
---

## Upgrading from version 4.* to version 5.*

Version 4 of the Refund module no longer uses `SalesAggregatorFacade` , it was replaced with `SalesFacade`.
The `RefundCalculator` business class must now replace `RefundToSalesAggregatorInterface` with the `RefundToSalesInterface` bridge.
To learn more see [Migration Guide - Calculation](/docs/scos/dev/module-migration-guides/migration-guide-calculation.html).

## Upgrading from version 2.* to version 3.*

To migrate the Refund module from version 2 to version 3, follow these steps:
Version 3 of the Refund module was completely rebuilt; the `SalesAggregator` is used to get a calculated `OrderTransfer` and plugins are used to change the refundable amount calculation behaviour.
The `RefundFacade` has completely changed and exposes only two methods.

{% info_block warningBox %}

Check your code and where you make use of the `RefundFacade` change your implementation to use the new methods from the `RefundFacade`.

{% endinfo_block %}

These methods are:
* `RefundFacade::calculateRefund(array $salesOrderItems`, SpySalesOrder $salesOrderEntity)`
* `RefundFacade::saveRefund(RefundTransfer $refundTransfer)`
**You need to:**
1. Rename method `RefundFacade::calculateRefundableAmount()` to `RefundFacade::calculateRefund()` and pass needed arguments to it.
 `calculateRefund()` will return a `RefundTransfer` which holds the refundable amount.
2. When refund process of payment provider is done and accepted, pass the `RefundTransfer` to `RefundFacade::saveRefund()`.
3. Refund view in sales order detail page can be activated by adding `'refund' => '/refund/sales/list'` to `SalesConfig::getSalesDetailExternalBlocksUrls()`.
