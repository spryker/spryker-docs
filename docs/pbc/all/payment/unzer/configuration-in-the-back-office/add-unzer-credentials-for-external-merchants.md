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

1. On the **Overview of Unzer Credentials** page, against credentials you want to add external merchant credentials for, click **Edit**.
  The **Edit Unzer Credentials** page opens.
1. On the **External Merchant Credentials** tab, click **Add Merchant Unzer Credentials**.
2. For the new merchant Unzer credentials, enter a **NAME** <!--the field must be removed from UI-->.
3. Enter **UNZER PUBLIC KEY**.
4. Enter **UNZER PRIVATE KEY**.
5. Select **MERCHANT REFERENCE**.
6. Enter **PARTICIPANT ID**.
7. Click **Save**.

### Reference information: Add external Unzer credentials

| ATTRIBUTE | DESCRIPTION |
|-|-|
| NAME | Name of the Unzer credentials. <!--the field must be removed from UI-->. |
| UNZER PUBLIC KEY | Unique public key which Unzer provides for each merchant to accept payments. The key is merchant-specific. |
| UNZER PRIVATE KEY | Unique private key which Unzer provides for each merchant to accept payments. The key is merchant-specific |
| MERCHANT REFERENCE | Unique ID of a Spryker merchant. |
| PARTICIPANT ID | Unique ID of a merchant on the Unzer side, which identifies a merchant who receives money when the order is paid and has the status `payment completed`. |
