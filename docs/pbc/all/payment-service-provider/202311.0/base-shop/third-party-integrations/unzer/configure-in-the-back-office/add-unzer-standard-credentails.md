---
title: Add Unzer standard credentials
last_updated: Aug 11, 2022
description: This document shows how to add Unzer standard credentials
template: back-office-user-guide-template
redirect_from:
  - /docs/pbc/all/payment/unzer/configuration-in-the-back-office/add-unzer-standard-credentails.html
  - /docs/pbc/all/payment-service-providers/unzer/configuration-in-the-back-office/add-unzer-standard-credentails.html
---

This document shows how to add Unzer standard credentials.

## Prerequisites

Review the reference information before you start, or look up the necessary information as you go through the process.

## Add Unzer standard credentials

   1. Go to **Back Office > Unzer**.
   2. On the **Overview of Unzer Credentials** page, click **Add Unzer Credentials**.
      The **Add Unzer Credentials** page opens.
   3. For the new credentials, enter a **NAME**.
   4. For **CREDENTIALS TYPE**, select **Standard**.
   5. Enter **UNZER PUBLIC KEY**.
   6. Enter **UNZER PRIVATE KEY**.
   7. Select **STORE RELATIONS**.

      {% info_block infoBox "Note" %}

      Select only unused store relations. Otherwise, when you complete adding your credentials, an error message is thrown.

      {% endinfo_block %}

   8. Click **Save**. The new credentials appear on the **Overview of Unzer Credentials** page.
   9. To sync payment method, click **Sync payment methods** for the needed credentials.
   10. Go to **Back Office > Administration > Payment Methods**.
   11. On the **Payment Methods** page, click **Edit** next to the needed payment method.
   12. On the **Edit Payment Method** page, open the **Store Relation** tab and map the payment method to the needed stores.

### Reference information: Add Unzer credentials

The following table describes attributes you select and enter when adding Unzer standard credentials:

| ATTRIBUTE | DESCRIPTION |
|-|-|
| NAME | Name of the Unzer standard credentials. |
| CREDENTIALS TYPE | Type of the credentials <ul><li>*Marketplace (main channel)*—the credentials type for the marketplace with multiple merchants</li><li>*Standard*—the credentials type for a basic store without merchants.</li></ul> |
| UNZER PUBLIC KEY | Unique public key which Unzer provides for a project to accept payments. The key is store-specific. |
| UNZER PRIVATE KEY | Unique private key which Unzer provides for a project to accept payments. The key is store-specific. |
| STORE RELATION | Defines [stores](/docs/dg/dev/internationalization-and-multi-store/set-up-multiple-stores.html) the Unzer payment method will be available in.  |
| MERCHANT REFERENCE | Merchant ID on the Spryker side. |
| PARTICIPANT ID | Merchant ID on the Unzer side, which will identifies a merchant who receives money when the order is paid and has the status `payment completed`. |
