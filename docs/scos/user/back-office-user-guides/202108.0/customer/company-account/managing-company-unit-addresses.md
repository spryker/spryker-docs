---
title: Managing company unit addresses
description: Use the procedures to create and update company unit addresses after company units have been created in the Back Office.
last_updated: Aug 10, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-company-unit-addresses
originalArticleId: b3bbc8db-3448-4aa1-8d93-eb435113d36c
redirect_from:
  - /2021080/docs/managing-company-unit-addresses
  - /2021080/docs/en/managing-company-unit-addresses
  - /docs/managing-company-unit-addresses
  - /docs/en/managing-company-unit-addresses
related:
  - title: Managing Company Units
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-units.html
---

This page describes the procedure of creating and managing company unit addresses. The address is created to be assigned to a company business unit.

## Prerequistes

To start working with company unit addresses, go to **Customers** > **Company Unit Addresses**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating company unit addresses

To create a company business unit:
1. On the **Overview of Business Unit Addresses** page, click **Create Company Unit Address** in the top right corner.
2. On the **Create Company Unit Address** page:
    * Select _company_ and _country_ from the respective drop-down lists (the company values are taken from **Customers** > **Companies**).
    * Enter the City, Zip Code, and Street values to complete the address. Number, Addition to address, Comment, and Labels fields are optional.
3. Once done, click **Save**.

## Editing company unit addresses

To edit a company unit address:
1. On the *Overview of Business Unit Addresses* page, in the *Actions* column, click **Edit Company Unit Address** if you want to change address details such as the Company the address belongs to, country, City, Zip Code, Street, Number of the building, Additional Information for the address, Comments, and Address labels.
2. Click **Save**.

Once the address is created, you can assign it to the business unit.
To assign an address:
1. Navigate to **Customers** > **Company Units** .
2. On the *List of company business units* page,  in the _Actions_ column, click **Edit** for a business unit you want to update with an address.
3. On the *Edit Company Business Unit* page, click the **Addresses** field. You can select from one to many values. The list of values available for selection is limited to those addresses assigned to the company the same as the business unit is assigned to.
4. Click **Save**.

## Reference information

The following table describes the attributes you see, select, or enter while creating or editing a company unit address.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Company | Drop-down list with the values from **Customers** > **Company**. |
| Country | Drop-down list with the countries available for selection. |
| City | Text field where you enter the city name. |
| Zip Code | Text field where you enter the zip code value. |
| Street | Text field where you enter the street name. |
| Number | A text field where you enter the street number. |
|Addition to address|Text field where you enter any additions to the address that you create.|
|Comment|Text field where you enter any comment regarding the customer address.|
|Labels| Multi-select field with the labels for selection.|

**What's next?**
<br>The next step in the company account setup is to created company roles and users. See the [Managing company roles](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-roles.html) and [Managing company users](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-users.html) articles.
