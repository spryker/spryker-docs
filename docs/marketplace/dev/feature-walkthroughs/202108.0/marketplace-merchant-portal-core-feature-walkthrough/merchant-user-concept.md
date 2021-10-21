---
title: Merchant User concept
description: Merchant User in Merchant portal.
template: feature-walkthrough-template
---

This article provides a short overview of Merchant User.

## Merchant User structure

`MerchantUser` module is the source of users for Merchant Portal. All the operations on users should be performed using `MerchantUserFacade`, including but not limited to:
- Create/Update/Delete/Disable Merchant Users.
- Getting data about existing Merchant Users.
- Getting data about current logged in Merchant User.
- Authentication Merchant Users.
- Password manipulation (reset, validation).

Merchant Users are activated and deactivated when their Merchant is activated and deactivated respectively. The `SyncMerchantUsersStatusMerchantPostUpdatePlugin` takes cate about it.


## Merchant User Relations

{% info_block errorBox %}

Never use UserFacade directly in Merchant Portal modules in order to avoid technical debt in the future

{% endinfo_block %}

![Merchant User relations](https://confluence-connect.gliffy.net/embed/image/6a8b09b8-f7a0-4f92-8728-6bcd056c1f2e.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| | | |[Merchant users overview](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-feature-overview/merchant-users-overview.html)|
| | | |[Managing merchant users](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/merchants/managing-merchant-users.html)|
| | | |[Merchant Portal user guides](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/)|
| | |[File details: merchant_user.csv](/docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-user.csv.html) | |
