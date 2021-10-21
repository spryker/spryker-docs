---
title: Merchant User concept
description: Short overview of Merchant User in Merchant portal.
template: feature-walkthrough-template
---

This articles provides a short overview of Merchant User concept in Merchant portal.

## Merchant User structure

The main concept to use own entry point for managing users in Merchant Portal. 
All modules of Merchant Portal can reach out fo users by `MerchantUser` module which contains all needed for it:

- Create/Update/Delete/Disable Merchant Users.
- Getting data about existing users.
- Getting data about current logged in Merchant User.
- Authentication Merchant Users.
- Password manipulation(reset, validation).

Any Merchant User can't be added to the system without Merchant.
So for syncing status of user with merchant status, has been implemented `SyncMerchantUsersStatusMerchantPostUpdatePlugin`.
This plugin updates the status of user based on data about merchant, after updating it.

## Merchant User Relations

{% info_block errorBox %}

Please never use UserFacade directly in Merchant Portal modules.

{% endinfo_block %}

![Merchant User relations](https://confluence-connect.gliffy.net/embed/image/6a8b09b8-f7a0-4f92-8728-6bcd056c1f2e.png?utm_medium=live&utm_source=confluence)

## Related Developer articles

|INTEGRATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  | REFERENCES  |
|---------|---------|---------|--------|
| | | |[Merchant users overview](/docs/marketplace/user/features/{{page.version}}/marketplace-merchant-feature-overview/merchant-users-overview.html)|
| | | |[Managing merchant users](/docs/marketplace/user/back-office-user-guides/{{page.version}}/marketplace/merchants/managing-merchant-users.html)|
| | | |[Merchant Portal user guides](/docs/marketplace/user/merchant-portal-user-guides/{{page.version}}/)|
| | |[File details: merchant_user.csv](docs/marketplace/dev/data-import/{{page.version}}/file-details-merchant-user.csv.html) | |
