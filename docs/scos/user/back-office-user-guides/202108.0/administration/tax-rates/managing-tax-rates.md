---
title: Managing tax rates
description: Use these procedures to create, update, view and/or delete tax rates and tax sets in the Back Office.
last_updated: Aug 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-tax-rates
originalArticleId: 7991b03c-1e31-442d-89fd-e85e4e387360
redirect_from:
  - /2021080/docs/managing-tax-rates
  - /2021080/docs/en/managing-tax-rates
  - /docs/managing-tax-rates
  - /docs/en/managing-tax-rates
---

This document describes how to create, edit, and delete [tax rates](/docs/scos/user/features/{{page.version}}/tax-feature-overview.html).

## Prerequisites

To start working with tax rates, go to **Administration** > **Tax Rates**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating tax rates

To define a rate under which a product, shipment, or threshold is going to be taxed, create a tax rate.

To create a tax rate:

1. On the *Overview of Tax Rates* page, in the top right corner, click **Create Tax Rate**.
2. On the *Create Tax Rate* page, enter and select the attributes.
3. Click **Save**.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Taxes/Managing+Tax+Rates/create-tax-rate.png)

### Reference information: Creating tax rates

The following table describes attributes you view, enter, and select when creating or editing tax rates.

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| Name | Name of your tax rate, e.g., _Germany Standard_. |
| Country | Drop-down list with the countries. You can select only one country for which this tax rate is valid.|
| Percentage | Tax rate percentage. |

## Editing tax rates

To edit a tax rate:

1. In the *List of tax rates* > *Actions* column, click **Edit** for a specific tax rate.
2. On the *Edit Tax Rate* page, change the attributes.
3. Click **Save**. For more details on the reference information of the attributes, see the [Reference information: Creating tax rates](#reference-information-creating-tax-rates) section.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Taxes/Managing+Tax+Rates/editing-tax-rate.png)

## Viewing tax rates

To view details on a specific tax rate,  in the *List of tax rates > Actions* column, click **View**.

The *Tax Rate* details page includes the following information:
* Name
* Tax rate ID
* Country
* Percentage
* Created at
* Updated at

For more details on the reference information of the attributes, see the [Reference information: Creating tax rates](#reference-information-creating-tax-rates) section.

To return back to the list, click **Back to Tax Rates**.

**Tips and tricks**
<br>You can start editing a tax rate while viewing it:
1. On the *View Tax Rate* page, click **Edit** in the top right corner.
2. Go over the [Editing tax rates](#editing-tax-rates) procedure.

## Deleting tax rates

To delete a tax rate:

1. In the *List of tax rates > Actions* column, click **Delete** for a specific tax rate.
2. On the *Delete Tax Rate* page, click **Delete Tax Rate** to confirm the action.
The tax rate is deleted. Remember that it will also be deleted from the [tax set](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-sets/managing-tax-sets.html) to which it has been assigned.

{% info_block warningBox "Note" %}

Even if you delete the only tax rate assigned to a tax set, the tax set itself remains.

{% endinfo_block %}

**Tips and tricks**
<br>You can delete a tax rate while viewing it:
1. On the *View Tax Rate* page, click **Delete** in the top-right corner.
2. On the *Delete Tax Rate* page, confirm your action.

## What's next?

You cannot use the tax rate itself for products, shipment, and threshold taxation. You use tax sets instead.
So you can proceed to the procedure of [creating a tax set and assigning it to the tax rate](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-sets/managing-tax-sets.html).
