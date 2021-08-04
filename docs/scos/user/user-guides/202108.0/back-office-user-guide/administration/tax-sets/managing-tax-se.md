---
title: Managing tax sets
originalLink: https://documentation.spryker.com/2021080/docs/managing-tax-sets
redirect_from:
  - /2021080/docs/managing-tax-sets
  - /2021080/docs/en/managing-tax-sets
---

This document describes how to create, edit, and delete [tax sets](https://documentation.spryker.com/docs/tax).

## Prerequisites
Before you can create tax sets, make sure you have [tax rates](https://documentation.spryker.com/docs/managing-tax-rates).  

To start working with tax sets, go to **Administration > Tax Sets**.

Some sections contain reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Creating a tax set
To be able to use this taxes for products, threshold, or shipment methods, you need to create a tax set and assign the tax rate to it.

To create a tax set:
1. On the *Overview of Tax Sets* page, click **Create Tax Set** in the top right corner of the page.
2. On the *Create Tax Set* page, enter the tax set name and select one or several tax rates to assign. See [Reference information: Creating and editing tax sets](#reference-information--creating-and-editing-tax-sets).
3. Click **Save**.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Taxes/Managing+Tax+Rates/create-tax-set.png){height="" width=""}


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

### Tips & tricks
You can delete a tax set while viewing it:
1. On the *View Tax Set* page, click **Delete** in the top right corner.
2. On the *Delete Tax Set* page, confirm your action.

