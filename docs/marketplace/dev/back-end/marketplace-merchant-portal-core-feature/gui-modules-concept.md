---
title: GUI modules concept
description: Short overview of GUI modules in Merchant portal.
template: feature-walkthrough-template
---

This articles provides a short overview of GUI (graphical user interface) modules in Merchant portal.

## GUI modules structure

The main function of GUI modules is providing logic for the functioning of the Merchant portal pages 
and components for merchant related management. The Core GUI modules can be recognised by having the corresponding 
``MerchantPortalGui`` suffix (DashboardMerchantPortalGui, ProductOfferMerchantPortalGui).

The typical GUI module can consist of:
- Controllers to display Merchant portal pages and corresponding logic (forms, data mappers etc.);
- GUI tables and corresponding logic for configuration, data providing etc.;
- Twig templates;
- Frontend components;
- Plugins for extending existing GUI tables, forms etc.;
- Other GUI related logic.

GUI modules should not contain any business logic which should be provided by responsible modules 
(Example: ``ProductOfferMerchantPortalGui`` module uses ``ProductOffer`` module to save product offer data). 
Note: repositories for getting data from DB are allowed. 

![GUI module relations](https://confluence-connect.gliffy.net/embed/image/58cb446e-2bd7-4e34-a9fd-6eb401917d31.png?utm_medium=live&utm_source=custom)

## Mapping to a feature

Merchant Portal GUI modules can be mapped to a feature in 2 ways depending on a feature purposes:
- as required module listed in feature's composer.json that means the module 
will be installed with a feature which it is attached to 
([Marketplace Merchant Portal Core feature](https://github.com/spryker-feature/marketplace-merchantportal-core):
SecurityMerchantPortalGui, UserMerchantPortalGui modules);
- as optional module that means it should be installed as an add-on of the main feature 
([Marketplace Inventory Management feature](https://github.com/spryker-feature/marketplace-inventory-management): 
AvailabilityMerchantPortalGui module).

## Learn more

- [How to create a new GUI module](/docs/marketplace/dev/howtos/how-to-create-gui-module.html)
