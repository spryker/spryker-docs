---
title: Managing Tax Sets
description: Use these procedures to create, update, view and/or delete tax sets in the Back Office.
last_updated: Sep 15, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v5/docs/managing-tax-rates-sets
originalArticleId: 8e2ab836-79e9-4738-93a7-c92b16b79de4
redirect_from:

related:
  - title: Taxes Rates - Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/administration/tax-rates/references/tax-rates-reference-information.html
---

This topic describes the procedures that you need to perform to create, edit, and delete tax sets.
***

## Managing Tax Sets

To start working with tax sets, navigate to the **Taxes > Tax Sets** section.

### Creating a Tax Set
Remember how you created the tax rate? To be able to use this taxation rule for products, threshold, or shipment methods, you need to create a tax set and assign the tax rate to it.
***
**To create a tax set:**
1. On the **Overview of Tax Sets** page, click **Create Tax Set** in the top right corner of the page.
2. On the **Create Tax Set** page, enter the tax set name and select one or several tax rates to assign. See [Taxes: Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-rates/references/tax-rates-reference-information.html) for more details.
3. Click **Save**.
***
### Editing a Tax Set
In case you need to change the tax set:
1. In the **List of tax sets > Actions** column, click **Edit** for a specific tax set.
2. On the **Edit Tax Set** page, change the attributes. See [Taxes: Reference information](/docs/scos/user/back-office-user-guides/{{page.version}}/administration/tax-rates/references/tax-rates-reference-information.html) for more details.
3. Click **Save**.

***
**Tips and tricks**
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
**Tips and tricks**
You can delete a tax set while viewing it:
1. On the **View Tax Set** page, click **Delete** in the top right corner.
2. On the **Delete Tax Set** page, confirm your action.
