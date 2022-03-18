---
title: GUI modules concept
description: Short overview of GUI modules in Merchant portal.
template: concept-topic-template
related:
  - title: How to create a new GUI module
    link: docs/marketplace/dev/howtos/how-to-create-gui-module.html
---

This articles provides a short overview of the GUI (graphical user interface) modules in the Merchant Portal.

## GUI modules structure

GUI modules have the main purpose of providing logic for the functioning of the Merchant Portal pages and components for merchant management. The Core GUI modules can be identified by the suffix `MerchantPortalGui` (`DashboardMerchantPortalGui`, `ProductOfferMerchantPortalGui`).

Typical GUI modules include:
- - Controllers for displaying Merchant Portal pages and corresponding logic (forms, data mappers).
- GUI tables and corresponding logic for configuration, and data provisioning.
- Twig templates.
- Frontend components.
- Plugins for extending existing GUI tables, and forms.
- Other GUI related logic.

GUI modules should not contain any business logic, which should be handled by modules responsible for it. For example, `ProductOfferMerchantPortalGui` module uses `ProductOffer` module to save the product offer data).

![GUI module relations](https://confluence-connect.gliffy.net/embed/image/58cb446e-2bd7-4e34-a9fd-6eb401917d31.png?utm_medium=live&utm_source=custom)

## Mapping to a feature

Merchant Portal GUI modules can be mapped to a feature in two different ways, depending on the feature's purpose:

- As a required module listed in feature's `composer.json`, which means the module must be installed.

{% info_block infoBox "Example" %}

[Marketplace Merchant Portal Core feature](https://github.com/spryker-feature/marketplace-merchantportal-core): `SecurityMerchantPortalGui`, `UserMerchantPortalGui` modules.

{% endinfo_block %}

- As optional module, which means it should be installed as an add-on to the main feature.

{% info_block infoBox "Example" %}

([Marketplace Inventory Management feature](https://github.com/spryker-feature/marketplace-inventory-management): AvailabilityMerchantPortalGui module.

{% endinfo_block %}
