---
title: Add Unzer marketplace credentials
last_updated: Aug 11, 2022
description: Learn how to add Unzer Marketplace credentials in the Spryker Cloud Commerce OS Back Office to enable secure and seamless payments for your online store.
template: back-office-user-guide-template
redirect_from:
  - /docs/pbc/all/payment-service-providers/unzer/configuration-in-the-back-office/add-unzer-marketplace-credentials.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/unzer/configure-in-the-back-office/add-unzer-marketplace-credentials.html
---

This document shows how to add Unzer marketplace credentials.

## Prerequisites

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

To add Unzer marketplace credentials, take the steps in the following sections.

{% info_block infoBox "Note" %}

All merchants allowed to sell their products in your stores must have Unzer credentials in the Back Office. Otherwise, your customers cannot buy their products; they will not be able to start the checkout process.

{% endinfo_block %}

## Add Unzer merketplace credentials

1. Add Unzer credentials:
   1. Go to **Back Office > Unzer**.
   2. On the **Overview of Unzer Credentials** page, click **Add Unzer Credentials**.
      The **Add Unzer Credentials** page opens.
   3. For the new credentials, enter a **NAME**.
   4. For **CREDENTIALS TYPE**, select **Marketplace (main channel)**.
   5. Enter **UNZER PUBLIC KEY**.
   6. Enter **UNZER PRIVATE KEY**.
   7. Select **STORE RELATIONS**.

     {% info_block infoBox "Note" %}

      Select only unused store relations. Otherwise, when you complete adding your credentials, an error message is thrown.

     {% endinfo_block %}

2. Add main merchant credentials:
   1. Optional: if the operator is a merchant, select **MERCHANT REFERENCE**.
   2. Enter **PARTICIPANT ID**.
   3. Enter **UNZER PUBLIC KEY**.
   4. Enter **UNZER PRIVATE KEY**.
3. Click **Save**. The new credentials appear on the **Overview of Unzer Credentials** page.
4. Click **Sync payment methods** for needed credentials to sync payment methods.
5. Go to **Back Office > Administration > Payment Methods**.
6. On the **Payment Methods** page, click **Edit** next to the needed payment method.
7. On the **Edit Payment Method** page, open the **Store Relation** tab and map the payment method to the needed stores.

### Reference information: Add Unzer marketplace credentials

| ATTRIBUTE | DESCRIPTION |
|-|-|
| NAME | Name of the Unzer marketplace credentials. |
| CREDENTIALS TYPE | Type of the credentials <ul><li>*Marketplace (main channel)*—the credentials type for the marketplace with multiple merchants</li><li>*Standard*—the credentials type for a basic store without merchants. </li></ul> |
| UNZER PUBLIC KEY | Unique public key which Unzer provides to a project to accept payments. The key is store-specific. |
| UNZER PRIVATE KEY | Unique private key which Unzer provides to a project to accept payments. The key is store-specific. |
| UNZER PUBLIC KEY (MAIN MERCHANT CREDENTIALS) | Unique public key which Unzer provides to each merchant to accept payments. The key is merchant-specific. |
| UNZER PRIVATE KEY (MAIN MERCHANT CREDENTIALS) | Unique private key which Unzer provides to each merchant to accept payments. The key is merchant-specific. |
| STORE RELATION | Defines [stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) the Unzer payment method will be available in. |
| MERCHANT REFERENCE | Merchant ID on the Spryker side. |
| PARTICIPANT ID | Merchant reference on the Unzer side, which identifies a merchant who receives money when the order is paid and gets the status `payment completed`. |

## Add credentials for external merchants

1. Go to **Back Office&nbsp;<span aria-label="and then">></span> Unzer**.
2. On the **Overview of Unzer Credentials** page, against credentials you want to add external merchant credentials for, click **Edit**.
  The **Edit Unzer Credentials** page opens.
3. On the **External Merchant Credentials** tab, click **Add Merchant Unzer Credentials**.
4. For the new merchant Unzer credentials, enter a **NAME** <!--the field must be removed from UI-->.
5. Enter **UNZER PUBLIC KEY**.
6. Enter **UNZER PRIVATE KEY**.
7. Select **MERCHANT REFERENCE**.
8. Enter **PARTICIPANT ID**.
9. Click **Save**.

### Reference information: Add credentials for external merchants

The following table describes the attributes you select and enter when adding Unzer credentials:

| ATTRIBUTE | DESCRIPTION |
|-|-|
| UNZER PUBLIC KEY | Unique public key which Unzer provides to each external merchant to accept payments. The key is store-specific. |
| UNZER PRIVATE KEY | Unique private key which Unzer provides to each external merchant to accept payments. The key is store-specific. |
| MERCHANT REFERENCE | Merchant ID on the Spryker side. |
| PARTICIPANT ID | Merchant reference on the Unzer side, which identifies a merchant who receives money when the order is paid and gets the [status](/docs/pbc/all/order-management-system/latest/base-shop/manage-in-the-back-office/orders/change-the-state-of-order-items.html#reference-information-changing-the-state-of-order-items) `payment completed`. |
