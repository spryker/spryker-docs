---
title: Merchant Portal Architecture overview
description:
template: concept-topic-template
---
This document depicts how a Spryker Marketplace MerchantPortal is designed in general. 

The following diagrams outlines the relation between Zed, MerchantPortal, Backoffice and DB. Learn more about [Marketplace MerchantPortal Core feature here](/docs/marketplace/dev/feature-walkthroughs/202108.0/marketplace-merchant-portal-core-feature-walkthrough/marketplace-merchant-portal-core-feature-walkthrough.html).

![MerchantPortal Architecture overview](https://confluence-connect.gliffy.net/embed/image/4b06167a-3c9a-483c-8b57-32544b211fc5.png?utm_medium=live&utm_source=custom)

### Zed and MerchantPortal
Zed is an application layer at Spryker (next to Yves, Glue, Client, Service, and Shared). 

This layer serves as a base for quite some of backend-oriented applications such as MerchantPortal, Backoffice, Gateway, Console (DataImport, Pub&Sync). That means that MerchantPortal shares the codebase with these applications and all the internal Zed infrastructure is available withing MerchantPortal runtime. This allows faster development and easier customizations of your Spryker Marketplace project.  

### Security
While addressing different concerns, both MerchantPortal and Backoffice has direct access the main database where all the application transactions are stored.
While Backoffice application is hidden behind VPN secure connection, MerchantPortal needs to be exposed to WAN directly. That raises security risks (such as Unauthorized Data Access) and imposes higher requirements on both Application and Infrastructure layers.

#### Security of Spryker Marketplace System Infrastructure

Make sure to fulfill [Spryker Marketplace System Infrastrcture requirements](/docs/marketplace/dev/setup/system-infrastructure-requirements.html) in order to keep your Spryker Marketplace system safe from on infrastructure level.


#### Security of Spryker Marketplace MerchantPortal Application

The main database contains all the data of your system, and it also contains Merchant specific data (MerchantOrders, MerchantOffers, and MerchantProducts) that should never be available for other Merchants on the system.
Keep this in mind while developing custom functionality for MerchantPortal (learn more on [How to add a custom page on MerchantPortal here](/docs/marketplace/dev/feature-walkthroughs/202108.0/marketplace-merchant-portal-core-feature-walkthrough/marketplace-merchant-portal-how-to-add-a-page.html)).

In order to provide additional layer of protection for the sensitive data, we have developed Persistence ACL for MerchantPortal. It filters all the data coming from database on query level. 
Visit a dedicated documentation page about [MerchantPortal ACL](/docs/marketplace/dev/feature-walkthroughs/202108.0/marketplace-merchant-portal-core-feature-walkthrough/marketplace-merchant-portal-acl.html) to learn more.

