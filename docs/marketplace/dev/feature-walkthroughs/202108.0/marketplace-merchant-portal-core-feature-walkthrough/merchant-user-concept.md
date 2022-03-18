---
title: Merchant User concept
description: Merchant User in Merchant portal.
template: concept-topic-template
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

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| | |[File details: merchant_user.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-user.csv.html) |[Merchant users overview](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-feature-overview/merchant-users-overview.html)|
| | | |[Managing merchant users](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/merchants/managing-merchant-users.html)|
| | | |[Merchant Portal user guides](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/)|
