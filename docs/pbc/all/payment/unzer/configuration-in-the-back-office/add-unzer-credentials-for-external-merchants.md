---
title: Add Unzer credentials for external merchants
last_updated: Jun 9, 2022
description: This document shows how to add Unzer credentials
template: back-office-user-guide-template
---

If you have multiple merchants in your shop, you need to add credentials for each of them.

This topic describes how to add Unzer <!-- standard/Marketplace -->credentials for a basic shop and marketplace.

## Prerequisites

Review the reference information before you start, or look up the necessary information as you go through the process.

## Add credentials for external merchants
1. Go to Back Office > Unzer.
2. On the **Overview of Unzer Credentials** page, against credentials you want to add external merchant credentials for, click **Edit**.
  The **Edit Unzer Credentials** page opens.
3. On the **External Merchant Credentials** tab, click **Add Merchant Unzer Credentials**.
4. For the new merchant Unzer credentials, enter a **NAME** <!--the field must be removed from UI-->.
5. Enter **UNZER PUBLIC KEY**.
6. Enter **UNZER PRIVATE KEY**.
7. Select **MERCHANT REFERENCE**.
8. Enter **PARTICIPANT ID**.
9. Click **Save**.

### Reference information: Add external Unzer credentials

| ATTRIBUTE | DESCRIPTION |
|-|-|
| NAME | Name of the Unzer credentials. <!--the field must be removed from UI-->. |
| UNZER PUBLIC KEY | Unique public key which Unzer provides for each merchant to accept payments. The key is merchant-specific. |
| UNZER PRIVATE KEY | Unique private key which Unzer provides for each merchant to accept payments. The key is merchant-specific |
| MERCHANT REFERENCE | Unique ID of a Spryker merchant. |
| PARTICIPANT ID | Unique ID of a merchant on the Unzer side, which identifies a merchant who receives money when the order gets the [status](/docs/scos/user/back-office-user-guides/{{site.version}}/sales/orders/changing-the-state-of-order-items.html#reference-information-changing-the-state-of-order-items) `payment completed`. |
