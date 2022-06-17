---
title: What's changed
last_updated: Jun 9, 2022
description: This document lists all the Unzer releases
template: concept-topic-template
---

# What's changed in Unzer

This page list all the Unzer releases.

## June 14th 2022

This release contains one module

* [Unzer](https://github.com/spryker-eco/unzer/releases/tag/1.0.1)

[Public release details](https://api.release.spryker.com/release-group/4208)


### Breaking Changes

Added new required transfer fields for `UnzerFacade::executeChargeOmsCommand()`. Impacted `UnzerChargeCommandByOrderPlugin` with facade changes.
Added new required transfer fields for `UnzerFacade::executeRefundOmsCommand()`. Impacted `UnzerRefundCommandByOrderPlugin` with facade changes.
Introduced `spy_payment_unzer_shipment_charge` table.

### Improvements

Adjusted `UnzerFacade::executeChargeOmsCommand()` so shipment costs are correctly calculated while charge. Impacted `UnzerChargeCommandByOrderPlugin` with facade changes.
Adjusted `UnzerFacade::executeRefundOmsCommand()` so shipment costs are correctly calculated while refund. Impacted `UnzerRefundCommandByOrderPlugin` with facade changes.
Introduced `PaymentUnzerShipmentCharge` transfer object.
Introduced `UnzerCharge.chargedSalesShipmentIds` transfer field.


## June 6th 2022

Initial release of the Unzer integration. This release contains four modules.

* [Unzer](https://github.com/spryker-eco/unzer/releases/tag/1.0.0)
* [Unzer GUI](https://github.com/spryker-eco/unzer-gui/releases/tag/1.0.0)
* [Unzer REST API](https://github.com/spryker-eco/unzer-rest-api/releases/tag/0.1.0)
* [Unzer API](https://github.com/spryker-eco/unzer-api/releases/tag/1.0.0)

[Public release details](https://api.release.spryker.com/release-group/4066)