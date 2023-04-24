---
title: What's changed in Unzer
last_updated: Jun 20, 2022
description: This document lists all the Unzer releases
template: concept-topic-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/unzer/whats-changed-in-unzer.html
---

## June 14th, 2022

This release contains one module, [Unzer](https://github.com/spryker-eco/unzer/releases/tag/1.0.1)

[Public release details](https://api.release.spryker.com/release-group/4208)


**Breaking changes**

The following changes have been made:
* Added new required transfer fields for `UnzerFacade::executeChargeOmsCommand()`. Impacted `UnzerChargeCommandByOrderPlugin` with facade changes.
* Added new required transfer fields for `UnzerFacade::executeRefundOmsCommand()`. Impacted `UnzerRefundCommandByOrderPlugin` with facade changes.
* Introduced the `spy_payment_unzer_shipment_charge` table.

**Improvements**

The following improvements have been made:
* Adjusted `UnzerFacade::executeChargeOmsCommand()` so shipment costs are correctly calculated while charge. Impacted `UnzerChargeCommandByOrderPlugin` with facade changes.
* Adjusted `UnzerFacade::executeRefundOmsCommand()` so shipment costs are correctly calculated while refund. Impacted `UnzerRefundCommandByOrderPlugin` with facade changes.
* Introduced `PaymentUnzerShipmentCharge` transfer object.
* Introduced `UnzerCharge.chargedSalesShipmentIds` transfer field.


## June 6th, 2022

The initial release of the Unzer integration. This release contains four modules:
* [Unzer](https://github.com/spryker-eco/unzer/releases/tag/1.0.0)
* [Unzer GUI](https://github.com/spryker-eco/unzer-gui/releases/tag/1.0.0)
* [Unzer REST API](https://github.com/spryker-eco/unzer-rest-api/releases/tag/0.1.0)
* [Unzer API](https://github.com/spryker-eco/unzer-api/releases/tag/1.0.0)

[Public release details](https://api.release.spryker.com/release-group/4066)
