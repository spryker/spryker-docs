---
title: Managing company units
description: Use the procedures to create, edit, and delete company units in the Back Office after a company has been created.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-company-units
originalArticleId: 6a9bb3d9-ef8f-444e-b5f7-7d6f964792c5
redirect_from:
  - /2021080/docs/managing-company-units
  - /2021080/docs/en/managing-company-units
  - /docs/managing-company-units
  - /docs/en/managing-company-units
related:
  - title: Managing Company Users
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-users.html
  - title: Managing Company Unit Addresses
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-unit-addresses.html
  - title: Managing Company Roles
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-roles.html
---

This article describes how to manage company units.

## Prerequisites

To start managing company units, go to  **Customers** > **Company Units**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Creating company business units

To create a company business unit:
1. In the top right corner of the *Overview of Company Business Units* page, click **Create Company Business Unit**.
2. On the *Create Company Business Unit* page, populate all required information: select company from the drop-down list and enter the name of the business unit.
*Parent*, *IBAN*, and *BIC* fields are optional and can be populated later.
3. Click **Save**.
    The new created business unit will appear in the _Company Business Units_ table on the *Company Units* page.

The business units can be managed by triggering certain actions in the _Actions_ column in the **Company Business Units** table. Specifically, business units can be **Edited** and **Deleted**.

### Reference information: Creating company business units

The following table describes the attributes you see, select, or enter while creating a company business unit.

| ATTRIBUTE | DESCRIPTION  |
| --- | --- |
| Company | Drop-down list with the companies. On the *Create* page, all companies form the *Companies* section are available for selection. The company selected during the business unit creation cannot be changed. |
| Parent | Parent business unit. The values available for selection depend on the selected companies. |
| Name | Name of the business unit you create.|
| IBAN |  International Bank Account Number. |
|BIC| Bank Identifier Code. |

## Editing business units

To edit a business unit:
1. Click **Edit** in the _Actions_ column if you want to change the details for a business unit such as Parent BU, Name, IBAN, and BIC.

{% info_block infoBox "Info" %}

Once the company business unit address is created, you can attach it to a business unit on the *Edit Company Business Unit* page. See [Managing company unit addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-unit-addresses.html) for more details.

{% endinfo_block %}

2. Once done, click **Save**.

### Reference information: Editing business units

The following table describes the attributes you see, select, or enter while editing a company business unit.

| ATTRIBUTE | DESCRIPTION  |
| --- | --- |
| Company | Company name. The field is not editable. |
| Parent | Parent business unit. The values available for selection depends on the selected company. |
| Name | Name of the business unit you create.|
| IBAN |  International Bank Account Number. |
|BIC| Bank Identifier Code. |
| Addresses |This is a multi-select list that includes the values from the *Company Unit Addresses* section but only those assigned to a company, meaning the values available for selection are defined by the selected company.|

## Deleting business units

If you want to delete an existing business unit, click **Delete** in the *Actions* column.

**What's next?**
<br>You need to create a company unit address so that you can attach it to your business unit. See [Managing company unit addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-unit-addresses.html) for more details.
