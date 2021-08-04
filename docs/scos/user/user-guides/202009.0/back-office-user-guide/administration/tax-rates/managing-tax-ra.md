---
title: Managing tax rates
originalLink: https://documentation.spryker.com/v6/docs/managing-tax-rates
redirect_from:
  - /v6/docs/managing-tax-rates
  - /v6/docs/en/managing-tax-rates
---

This document describes how to create, edit, and delete [tax rates](https://documentation.spryker.com/docs/tax).

## Prerequisites
To start working with tax rates, go to **Administration > Tax Rates**.

Some sections contain reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.

## Creating a tax rate
To define a rate under which the product, shipment, or a threshold are going to be taxed, you need to create a tax rate. 

To create a tax rate:

1. On the *Overview of Tax Rates* page, click **Create Tax Rate** in the top right corner.
2. On the *Create Tax Rate* page, enter and select the attributes. See [ Reference information: Creating and editing tax rates](#reference-information--creating-and-editing-tax-rates) for details on the attributes.
3. Click **Save**.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Taxes/Managing+Tax+Rates/create-tax-rate.png){height="" width=""}

## Editing a tax rate
To update a tax rate:

1. In the *List of tax rates > Actions* column, click **Edit** for a specific tax rate.
2. On the *Edit Tax Rate* page, change the attributes.
3. Click **Save**.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Taxes/Managing+Tax+Rates/editing-tax-rate.png){height="" width=""}

### Tips & tricks
You can start editing a tax rate while viewing it:
1. On the *View Tax Rate* page, click **Edit** in the top right corner.
2. Go over the [*Editing a Tax Rate*](#editing-a-tax-rate) procedure.

### Reference information: Creating and editing tax rates

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| **Name** | The name of your tax rate, e.g. _Germany Standard_. |
| **Country** | A drop-down list with the countries. You can select only one country for which this tax rate is valid.|
| **Percentage** | The tax rate percentage. |

## Viewing a tax rate
To view details on a specific tax rate, click **View** in the *List of tax rates > Actions* column.

The *Tax Rate* details page includes the following information:
* Name
* Tax rate ID
* Country	
* Percentage
* Created at
* Updated at

To return back to the list, click **Back to Tax Rates**.

## Deleting tax rates
To delete a tax rate:

1. In the *List of tax rates > Actions* column, click **Delete** for a specific tax rate.
2. On the *Delete Tax Rate* page, click **Delete Tax Rate** to confirm the action.
The tax rate is deleted. Remember that it will also be deleted from the [tax set](https://documentation.spryker.com/docs/managing-tax-sets) to which it has been assigned. 
{% info_block warningBox "Note" %}
Even if this was the only tax rate assigned to a tax set, the tax set itself will remain.
{% endinfo_block %}

### Tips & tricks
You can delete a tax rate while viewing it:
1. On the *View Tax Rate* page, click **Delete** in the top-right corner.
2. On the *Delete Tax Rate* page, confirm your action.

## What's next?
You cannot use the tax rate itself for products, shipment, and threshold taxation. You use tax sets instead. 
So you can proceed to the procedure of [creating a tax set and assigning it to the tax rate](https://documentation.spryker.com/docs/managing-tax-sets). 



