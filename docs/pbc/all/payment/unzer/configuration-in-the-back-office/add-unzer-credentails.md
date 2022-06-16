---
title: Add Unzer credentials
last_updated: Jun 9, 2022
description: This document shows how to add standard and marketplace Unzer credentials
template: back-office-user-guide-template
---

This document describes how to add standard and marketplace Unzer credentials.

## Prerequisites

Review the reference information before you start, or look up the necessary information as you go through the process.

## Add Unzer credentials

1. Add Unzer credentials:
   1. Go to **Back Office&nbsp;<span aria-label="and then">></span> Unzer**.
   2. On the **Overview of Unzer Credentials** page, click **Add Unzer Credentials**.
      The **Add Unzer Credentials** page opens.
   3. For the new credentials, enter a **NAME** .
   4. Select **CREDENTIALS TYPE**.
   5. Enter **UNZER PUBLIC KEY**.
   6. Enter **UNZER PRIVATE KEY**.
   7. Select **STORE RELATION**.

     {% info_block infoBox "Info" %}

      Select only unused store relations. Otherwise, when you complete adding your credentials, an error message is thrown.

     {% endinfo_block %}

2. If for **STORE RELATION**, you select **Marketplace (main channel)**, then add main merchant credentials:
   1. Optional: if the main seller is a merchant, select **MERCHANT REFERENCE**.
   2. Enter **PARTICIPANT ID**.
   3. ENETER **UNZER PUBLIC KEY**.
   4. ENETER **UNZER PRIVATE KEY**.
3. Click **Save**. The new credentials appear on the **Overview of Unzer Credentials** page.

### Reference information: Add Unzer credentials

The following table describes attributes you select and enter when adding Unzer credentials:

| ATTRIBUTE | DESCRIPTION |
|-|-|
| NAME | Name of the Unzer credentials. |
| CREDENTIALS TYPE | Type of the credentials <ul><li>*Marketplace (main channel)*—the credentials type for the marketplace with multiple merchants</li><li>*Standard*—the credentials type for a basic store without merchants. </li></ul> |
| UNZER PUBLIC KEY | Unique public key which Unzer provides for a project to accept payments. The key is store-specific. |
| UNZER PRIVATE KEY | Unique private key which Unzer provides for a project to accept payments. The key is store-specific. |
| UNZER PUBLIC KEY (MAIN MERCHANT CREDENTIALS) | Unique public key which Unzer provides to each merchant to accept payments. The key is merchant-specific. |
| UNZER PRIVATE KEY (MAIN MERCHANT CREDENTIALS) | Unique private key which Unzer provides to each merchant to accept payments. The key is merchant-specific. |
| STORE RELATION | Defines stores to add Unzer for. |
| MERCHANT REFERENCE | Merchant ID on the Spryker side. |
| PARTICIPANT ID | Merchant ID on the Unzer side, which identifies a merchant who receives money when the order is paid and has the [status](/docs/scos/user/back-office-user-guides/{{site.version}}/sales/orders/changing-the-state-of-order-items.html#reference-information-changing-the-state-of-order-items) `payment completed`. |

## Next steps

[Add Unzer credentials for external merchants](/docs/pbc/all/payment/unzer/configuration-in-the-back-office/add-unzer-credentials-for-external-merchants.html)  
