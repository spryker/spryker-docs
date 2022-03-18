---
title: Managing tax sets
last_updated: Jun 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-tax-sets
originalArticleId: 4ee82610-73b3-41c8-a3b8-6d360813b064
redirect_from:
  - /v6/docs/managing-tax-sets
  - /v6/docs/en/managing-tax-sets
---

This document describes how to create, edit, and delete [tax sets](/docs/scos/user/features/{{page.version}}/tax-feature-overview.html).

## Prerequisites
Before you can create tax sets, make sure you have [tax rates](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-rates/managing-tax-rates.html).  

To start working with tax sets, go to **Administration > Tax Sets**.

Some sections contain reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Creating a tax set
To be able to use this taxes for products, threshold, or shipment methods, you need to create a tax set and assign the tax rate to it.

To create a tax set:
1. On the *Overview of Tax Sets* page, click **Create Tax Set** in the top right corner of the page.
2. On the *Create Tax Set* page, enter the tax set name and select one or several tax rates to assign. See [Reference information: Creating and editing tax sets](#reference-information-creating-and-editing-tax-sets).
3. Click **Save**.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Taxes/Managing+Tax+Rates/create-tax-set.png) 


## Editing a tax set
In case you need to change the tax set: 
1. In the *List of tax sets > Actions* column, click **Edit** for a specific tax set.
2. On the *Edit Tax Set* page, change the attributes. 
3. Click **Save**.

### Tips and tricks

You can start editing a tax set while viewing it:
1. On the *View Tax Rate* page, click **Edit** in the top right corner.
2. Go over the [*Editing a tax set*](#editing-a-tax-set) procedure.

### Reference information: Creating and editing tax sets

The following table describes the attributes that are used when creating or updating a tax set.

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| **Name** | The name of your tax set, e.g. _Shipment Taxes_. |
| **Tax rates** |A list of tax rates available in the Taxes > Tax Rates section. You can assign from one to many values by selecting the checkboxes next. |

## Viewing a tax set
You can review a specific Tax Set details by clicking **View** in the *List of tax sets > Actions* column.
The *Tax set details* page includes the following information:
* Name
* Tax set ID
* Tax rates
* Created at
* Updated at

To return back to the list, click **Back to Tax Sets**.

## Deleting a tax set
To delete a tax set:

1. In the *List of tax sets > Actions* column, click **Delete** for a specific tax set.
2. On the *Delete Tax Set** page, click **Delete Tax Set** to confirm the action.
The tax set is deleted. 
{% info_block warningBox "Note" %}
Remember that the tax rates assigned to the deleted tax set will become unassigned, but not deleted. 
{% endinfo_block %}

### Tips and tricks
You can delete a tax set while viewing it:
1. On the *View Tax Set* page, click **Delete** in the top right corner.
2. On the *Delete Tax Set* page, confirm your action.

