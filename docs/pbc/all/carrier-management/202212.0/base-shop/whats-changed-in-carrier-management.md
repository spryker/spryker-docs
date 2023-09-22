---
title: What's changed in Carrier Management
last_updated: Jul 29, 2022
description: This document lists latest Carrier Management releases
template: concept-topic-template
---


## Feb 22, 2022

This release contains one module, [Shipment](https://github.com/spryker/shipment/releases/tag/8.10.0).

[Public release details](https://api.release.spryker.com/release-group/3877).

**Improvements**

* Adjusted `ShipmentSaver::saveShipment()` so it updates shipments for all items by one DB request.
* Impacted `ShipmentFacade::saveShipment()` with `ShipmentSaver` changes.
