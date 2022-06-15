---
title: Manage Unzer standard credentials
last_updated: Jun 9, 2022
description: This document shows how to manage Unzer standard credentials
template: back-office-user-guide-template
---

This topic describes how to create Unzer <!-- standard/Marketplace -->credentials.

## Prerequisites

Review the reference information before you start, or look up the necessary information as you go through the process.

## Add Unzer credentials

1. Add Unzer credentials:
   1. Go to **Back Office&nbsp;<span aria-label="and then">></span> Unzer**.
   2. On the **Overview of Unzer Credentials** page, click **Add Unzer Credentials**. The **Add Unzer Credentials** page opens.
   3. For the new credentials, enter a **NAME** .
   4. Select **CREDENTIALS TYPE**.
   5. Enter **UNZER PUBLIC KEY**.
   6. Enter **UNZER PRIVATE KEY**.
   7. Select **STORE RELATION**.

     {% info_block infoBox "Info" %}

      Select only unused store relations. Otherwise, when you complete adding your credentials, an error message is thrown.

     {% endinfo_block %}

2. If for **STORE RELATION**, you select **Marketplace (main channel)**, then add main merchant credentials:
   1. Select **MERCHANT REFERENCE**.
   2. Enter **PARTICIPANT ID**.
   3. ENETER **UNZER PUBLIC KEY**.
   4. ENETER **UNZER PRIVATE KEY**.
3. Click **Save**. The new credentials appear on the **Overview of Unzer Credentials** page.

### Reference information: Add Unzer credentials

The following table describes attributes you select and enter when adding Unzer credentials:

| ATTRIBUTE | DESCRIPTION |
|-|-|
| NAME | Name of the Unzer credentials. |
| CREDENTIALS TYPE  | Type of the credentials <ul><li>Marketplace (main channel)</li><li>Standard</li></ul>  |
| UNZER PUBLIC KEY  | Public key which Unzer provides to the project to accept payments.<!--where can I get it? -->  |
| UNZER PRIVATE KEY | Private key which Unzer provides to the project to accept payments. <!--where can I get it? --> |
| STORE RELATION | Defines stores to add Unzer for.  |
| MERCHANT REFERENCE | Unique ID of a Spryker merchant. |
| PARTICIPANT ID  | Unique ID of a merchant on the Unzer side, which identifies a merchant who receives money when the order is paid. |
| UNZER PUBLIC KEY   | Public key which Unzer provides to the project to accept payments.  <!-- clarify explanation --> |
| UNZER PRIVATE KEY | Private key which Unzer provides to the project to accept payments. <!-- clarify explanation --> |

## Add external merchant credentials

On the **Overview of Unzer Credentials** page, next the credentials you want to add merchant credentials for, click **Edit**. The **Edit Unzer Credentials** page opens.
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
| NAME | Name of the Unzer credentials. |
| CREDENTIALS TYPE  | Type of the credentials <ul><li>Marketplace (main channel)</li><li>Standard</li></ul>  |
| UNZER PUBLIC KEY  | Public key which Unzer provides to the project to accept payments.<!--where can I get it? -->  |
| UNZER PRIVATE KEY | Private key which Unzer provides to the project to accept payments. <!--where can I get it? --> |
| STORE RELATION | Defines stores to add Unzer for.  |
| MERCHANT REFERENCE | Unique ID of a Spryker merchant. |
| PARTICIPANT ID  | Unique ID of a merchant on the Unzer side, which identifies a merchant who receives money when the order is paid. |
| UNZER PUBLIC KEY   | Public key which Unzer provides to the project to accept payments.  <!-- clarify explanation --> |
| UNZER PRIVATE KEY | Private key which Unzer provides to the project to accept payments. <!-- clarify explanation --> |
