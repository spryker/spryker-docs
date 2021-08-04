---
title: Migration Guide - Refund
originalLink: https://documentation.spryker.com/v2/docs/mg-refund
redirect_from:
  - /v2/docs/mg-refund
  - /v2/docs/en/mg-refund
---

## Upgrading from Version 4.* to Version 5.*
Version 4 of the Refund module no longer uses `SalesAggregatorFacade` , it was replaced with `SalesFacade`.
The `RefundCalculator` business class must now replace `RefundToSalesAggregatorInterface` with the `RefundToSalesInterface` bridge.
To learn more see [Migration Guide - Calculation](https://docs.demo-spryker.com/v3/docs/mg-calculation). 

## Upgrading from Version 2.* to Version 3.*
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
