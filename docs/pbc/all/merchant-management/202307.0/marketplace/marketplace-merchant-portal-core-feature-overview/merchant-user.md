---
title: Merchant User
description: Merchant User in Merchant Portal.
template: concept-topic-template
last_updated: Oct 20, 2023
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202307.0/marketplace-merchant-portal-core-feature-walkthrough/merchant-user-concept.html
---

This document provides a short overview of Merchant User concept in the Spryker Marketplace.

## Merchant User structure

`MerchantUser` module is the source of users for the Merchant Portal. `MerchantUserFacade` should be used to perform all operations on users, including but not limited to:
- Create, update, delete, and disable merchant users.
- Obtaining information about existing merchant users.
- Obtaining data about the current logged in merchant user.
- Authentication of merchant users.
- Manipulation of passwords (reset, validation).

Merchant users are activated and deactivated when their Merchant is activated or deactivated. `SyncMerchantUsersStatusMerchantPostUpdatePlugin` takes care of it.


## Merchant User relations

{% info_block errorBox %}

To avoid technical debt in the future, never use `UserFacade` directly in Merchant Portal modules.

{% endinfo_block %}

The following diagram illustrates merchant user relations:

![Merchant User relations](https://confluence-connect.gliffy.net/embed/image/6a8b09b8-f7a0-4f92-8728-6bcd056c1f2e.png?utm_medium=live&utm_source=confluence)

## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| | |[File details: merchant_user.csv](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-merchant-user.csv.html) |[Merchant users overview](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/merchant-users-overview.html)|
| | | |[Managing merchant users](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-users.html)|
