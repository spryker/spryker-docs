---
title: Managing Tax Rates and Sets
originalLink: https://documentation.spryker.com/v4/docs/managing-tax-rates-sets
redirect_from:
  - /v4/docs/managing-tax-rates-sets
  - /v4/docs/en/managing-tax-rates-sets
---

This topic describes the procedures that you need to perform to create, edit, and delete tax rates and sets.
***
## Managing Tax Rates
To start working with tax rates, navigate to the **Taxes > Tax Rates** section.
***
### Creating a Tax Rate
To define a rate under which the product, shipment, or a threshold are going to be taxed, you need to create a tax rate. 
***
**To create a tax rate:**
1. On the **Overview of Tax Rates** page, click **Create Tax Rate** in the top right corner.
2. On the **Create Tax Rate** page, enter and select the attributes. See [Taxes: Reference information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/taxes/tax-rates-and-tax-sets/references/taxes-reference) for more details.
3. Click **Save**.
***
### Editing a Tax Rate
In the ever-changing business world, there is a chance that the taxation policies can change too. 

**To update the tax rate**: 
1. In the **List of tax rates > Actions** column, click **Edit** for a specific tax rate.
2. On the **Edit Tax Rate** page, change the attributes. See [Taxes: Reference information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/taxes/tax-rates-and-tax-sets/references/taxes-reference) for more details.
3. Click **Save**.
***
**Tips & Tricks**
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
**Tips & Tricks**
You can delete a tax rate while viewing it:
1. On the **View Tax Rate** page, click **Delete** in the top-right corner.
2. On the **Delete Tax Rate** page, confirm your action.
***
**What's next?**
You cannot use the tax rate itself for Products, Shipment, and Threshold taxation. You use tax sets instead. 
So you can proceed to the procedure of creating a tax set and assigning it to the tax rate. 
***
## Managing Tax Sets

To start working with tax sets, navigate to the **Taxes > Tax Sets** section.

### Creating a Tax Set
Remember how you created the tax rate? To be able to use this taxation rule for products, threshold, or shipment methods, you need to create a tax set and assign the tax rate to it.
***
**To create a tax set:**
1. On the **Overview of Tax Sets** page, click **Create Tax Set** in the top right corner of the page.
2. On the **Create Tax Set** page, enter the tax set name and select one or several tax rates to assign. See [Taxes: Reference information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/taxes/tax-rates-and-tax-sets/references/taxes-reference) for more details.
3. Click **Save**.
***
### Editing a Tax Set
In case you need to change the tax set: 
1. In the **List of tax sets > Actions** column, click **Edit** for a specific tax set.
2. On the **Edit Tax Set** page, change the attributes. See [Taxes: Reference information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/taxes/tax-rates-and-tax-sets/references/taxes-reference) for more details.
3. Click **Save**.

***
**Tips & Tricks**
You can start editing a tax set while viewing it:
1. On the **View Tax Rate** page, click **Edit** in the top right corner.
2. Go over the _Editing a Tax Set_ procedure.
***
### Viewing a Tax Set
You can review a specific Tax Set details by clicking **View** in the **List of tax sets > Actions** column.
The **Tax set details** page includes the following information:
* Name
* Tax set ID
* Tax rates
* Created at
* Updated at

To return back to the list, click **Back to Tax Sets**.
***
### Deleting Tax Set
You can permanently delete a tax set from the system.
***
**To delete a tax set:**
1. In the **List of tax sets > Actions** column, click **Delete** for a specific tax set.
2. On the **Delete Tax Set** page, click **Delete Tax Set** to confirm the action.
The tax set is deleted. 
{% info_block warningBox "Note" %}
Remember that the tax rates assigned to the deleted tax set will become unassigned, but not deleted. 
{% endinfo_block %}
 ***
**Tips & Tricks**
You can delete a tax set while viewing it:
1. On the **View Tax Set** page, click **Delete** in the top right corner.
2. On the **Delete Tax Set** page, confirm your action.
