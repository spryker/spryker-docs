---
title: Merchant Portal architecture overview
description: This document explains how a Spryker Marketplace MerchantPortal is designed. 
template: concept-topic-template
---
This document explains how a Spryker Marketplace MerchantPortal is designed. 

The following diagrams outline the relation between Zed, MerchantPortal, Back Office, and DB. To learn more about MerchantPortal, see [Marketplace MerchantPortal Core feature here](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-portal-core-feature-walkthrough/marketplace-merchant-portal-core-feature-walkthrough.html).

![MerchantPortal Architecture overview](https://confluence-connect.gliffy.net/embed/image/4b06167a-3c9a-483c-8b57-32544b211fc5.png?utm_medium=live&utm_source=custom)

## Zed and MerchantPortal
Zed is an application layer at Spryker (next to Yves, Glue, Client, Service, and Shared). 

This layer serves as a base for some back-end-oriented applications such as MerchantPortal, Back Office, Gateway, Console (DataImport, Pub&Sync). That means that the MerchantPortal shares the codebase with these applications, and the internal Zed infrastructure is available within the MerchantPortal runtime. It allows faster development and easier customizations of your Spryker Marketplace project. 

## Security
While addressing different concerns, both MerchantPortal and Back Office have direct access to the main database where all the application transactions are stored.
The Marketplace Operator Back Office application is hidden behind the VPN secure connection, but MerchantPortal needs to be exposed to WAN directly.
That raises security risks (such as Unauthorized Data Access) and imposes higher requirements on both Application and Infrastructure layers.

### Security of the Spryker Marketplace System Infrastructure

Make sure to fulfill [Spryker Marketplace System Infrastructure requirements](/docs/marketplace/dev/setup/system-infrastructure-requirements.html) to keep your Spryker Marketplace system safe from on infrastructure level.


### Security of the Spryker Marketplace MerchantPortal Application

The main database contains all the data of your system. It consists of the Merchant-specific data (MerchantOrders, MerchantOffers, and MerchantProducts) that should never be available to other Merchants in the system.
Keep this in mind while developing custom functionality for the MerchantPortal. See [How to add a custom page on MerchantPortal here](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-portal-core-feature-walkthrough/marketplace-merchant-portal-how-to-add-a-page.html) for more details.

To provide an additional layer of protection for sensitive data, we have developed Persistence ACL for MerchantPortal. It filters all the data coming from the database on query level. 
Check [MerchantPortal ACL](/docs/marketplace/dev/feature-walkthroughs/{{page.version}}/marketplace-merchant-portal-core-feature-walkthrough/marketplace-merchant-portal-acl.html) to learn more about Persistence ACL for the MerchantPortal.
