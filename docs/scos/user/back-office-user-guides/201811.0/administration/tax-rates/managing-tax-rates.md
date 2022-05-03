---
title: Managing Tax Rates
description: Use these procedures to create, update, view and/or delete tax rates in the Back Office.
last_updated: May 19, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v1/docs/managing-tax-rates-sets
originalArticleId: c40e2c6d-0402-4d8f-aa62-1b60b6fd15b9
redirect_from:
  - /v1/docs/managing-tax-rates-sets
  - /v1/docs/en/managing-tax-rates-sets
related:
  - title: Taxes Rates - Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/administration/tax-rates/references/tax-rates-reference-information.html
---

This topic describes the procedures that you need to perform to create, edit, and delete tax rates.
***

## Managing Tax Rates

To start working with tax rates, navigate to the **Taxes > Tax Rates** section.
***
### Creating a Tax Rate

To define a rate under which the product, shipment, or a threshold are going to be taxed, you need to create a tax rate.
***

**To create a tax rate:**
1. On the **Overview of Tax Rates** page, click **Create Tax Rate** in the top right corner.
2. On the **Create Tax Rate** page, enter and select the attributes. See [Taxes: Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-rates/references/tax-rates-reference-information.html) for more details.
3. Click **Save**.
***
### Editing a Tax Rate

In the ever-changing business world, there is a chance that the taxation policies can change too.

**To update the tax rate**:
1. In the **List of tax rates > Actions** column, click **Edit** for a specific tax rate.
2. On the **Edit Tax Rate** page, change the attributes. See [Taxes: Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-rates/references/tax-rates-reference-information.html) for more details.
3. Click **Save**.
***

**Tips and tricks**

You can start editing a tax rate while viewing it:
1. On the **View Tax Rate** page, click **Edit** in the top right corner.
2. Go over the _Editing a Tax Rate_ procedure.
***

### Viewing a Tax Rate

You can review a specific Tax Rate details by clicking **View** in the **List of tax rates > Actions** column.

The **Tax Rate** details page includes the following information:
* Name
* Tax rate ID
* Country
* Percentage
* Created at
* Updated at

To return back to the list, click **Back to Tax Rates**.
***

### Deleting Tax Rates

It may happen that the tax rate that has been created some time ago is no longer valid.
You can permanently delete it from the system.
***

**To delete a tax rate:**
1. In the **List of tax rates > Actions** column, click **Delete** for a specific tax rate.
2. On the **Delete Tax Rate** page, click **Delete Tax Rate** to confirm the action.
The tax rate is deleted. Remember that it will also be deleted from the Tax Set to which it has been assigned.

  {% info_block warningBox "Note" %}
  
  Even if this was the only tax rate assigned to a tax set, the tax set itself will remain.
  
  {% endinfo_block %}

***

**Tips and tricks**

You can delete a tax rate while viewing it:
1. On the **View Tax Rate** page, click **Delete** in the top-right corner.
2. On the **Delete Tax Rate** page, confirm your action.
***

**What's next?**

You cannot use the tax rate itself for Products, Shipment, and Threshold taxation. You use tax sets instead.
So you can proceed to the procedure of creating a tax set and assigning it to the tax rate.
***
