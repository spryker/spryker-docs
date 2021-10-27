---
title: Marketplace in Backoffice
description: This document explains how Marketplace functionality is presented in Backoffice. 
template: concept-topic-template
related:
  - title: Merchant Portal architecture overview
    link: docs/marketplace/dev/architecture-overview/marketplace-merchant-portal-architecture-overview.html
---
This document explains how Marketplace functionality is presented in Backoffice. 

Marketplace in Backoffice is presented as a marketplace owner-oriented application or admin-centric application. 
Here the operator of the Marketplace manages the whole Marketplace, including global Product list, Merchant management, Category management, and others.
Backoffice also has some facilities oriented to Operator-As-A-Merchant case such as Offers and Orders management.
The base Backoffice functionality is provided by [Spryker Core Back Office feature](https://github.com/spryker-feature/spryker-core-back-office)
which is a prerequisite of Backoffice related features.

Marketplace related UI is provided by specific GUI (graphical user interface) modules which usually work in the same way as 
Core GUI modules which can be identified by the suffix GUI (`MerchantProfileGui`, `MerchantProductGui`) and provide new user interfaces 
for management of related entities or extend existing ones. 
GUI modules should not contain any business logic, which should be handled by modules responsible for it. 

{% info_block infoBox "Example" %}

`MerchantProductGui` module uses `MerchantProduct` module to obtain merchant related products and then to show them in the corresponding place).

{% endinfo_block %}

Marketplace related GUI modules are usually mapped to Marketplace feature as a required module listed in feature’s composer.json, that means the module must be installed.

{% info_block infoBox "Example" %}

[Marketplace Product feature](https://github.com/spryker-feature/marketplace-product): `MerchantProductGui` module.

{% endinfo_block %}

The following diagram illustrates the possible GUI module dependencies.

![GUI module relations](https://confluence-connect.gliffy.net/embed/image/7bc2ccf2-c85a-4bd2-842e-d8a5f9768d29.png?utm_medium=live&utm_source=custom)
