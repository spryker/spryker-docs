---
title: Managing slots
originalLink: https://documentation.spryker.com/v6/docs/managing-slots
redirect_from:
  - /v6/docs/managing-slots
  - /v6/docs/en/managing-slots
---

This topic describes how to manage slots.

To start managing slots, go to **Content Management > Slots**.

You can:

* activate or deactivate (depending on the current status) slots by clicking respective buttons in the *Actions* column in the **List of Slots for [name] Template**;
* assign CMS blocks to slots by selecting them from the drop-down menu in the **List of assigned Blocks for [name] Slot**;
* move up, move down, delete (remove the block assignment) and view CMS blocks by clicking respective buttons in **the List of assigned Blocks for [name] Slot**;
* select the Storefront pages in which a CMS blocks will be displayed in the **List of assigned Blocks for [name] Slot**;
***
## Activating and Deactivating Slots
You can activate or deactivate a slot.  The embedded content will either be visible or invisible in the Storefront pages.

To activate a slot, click **Activate** in the *Actions* column in the **List of Slots for [name] Template** section. This will change the status to **Active**. The content of this slot will be displayed in the corresponding Storefront page(s).

To deactivate a slot, click **Deactivate** in the *Actions* column in the **List of Slots for [name] Template** section. This will change the status to **Inactive**. The content of this slot will be removed from the corresponding Storefront page(s).

## Assigning CMS Blocks to Slots
You can assign CMS blocks to a slot selected in the **List of Slots for [name] Template**. The content of assigned CMS blocks is displayed in the the corresponding Storefront page(s). If there are no CMS blocks with content that you can assign, see [Creating a CMS Block](https://documentation.spryker.com/docs/creating-cms-block).

To assign a CMS block to a slot:

1. In the **List of Slots for [name] Template**, click on the row of the slot you wish to assign CMS blocks to;
2. Open the drop-down menu in the **List of assigned Blocks for [name] Slot**;
3. Select a CMS block and click **+Add**;
:::(Warning) 
Repeat Step 2 for each CMS block that you want to assign.
:::
:::(Info) 
* The **+Add** button is not active until a CMS block is selected.
* In the drop-down menu, start typing the name of a CMS block to filter the list.
* You can only add one CMS block at a time. When you click on a CMS block in the drop-down menu to select it, the drop-down menu closes with the selected CMS Block shown in the drop-down field. If you do not click  **+Add** and select another CMS Block, the previous CMS Block is replaced with the new one. If you click **+Add** after replacing one CMS block with another, only the last selected CMS block is added.
* Newly added CMS blocks are placed on top of the **List of assigned Blocks for [name] Slot**.
* You can add an inactive CMS block to a slot. The content of the inactive CMS block won't be displayed until the CMS block is activated. 
:::
4. Click **Save** to assign all the selected CMS blocks to the slot.

The order of the assigned CMS blocks in the **List of assigned Blocks for [name] Slot** reflects the order of CMS blocks displayed in the corresponding Storefront page(s). See Changing the Position of CMS Blocks to define the desired order.

## Changing the Order of CMS Blocks
You can change the position of a CMS block in relation to the other CMS blocks in a slot. This is done by moving the respective CMS block up and down.

To move a CMS block:

1. In the **List of Slots for [name] Template**, click on the row of the slot the CMS block of which you wish to move.

2. In the *Actions* column of the **List of assigned Blocks for [name] Slot**,
    - to move a CMS block one position up, click **Move Up**. This will swap this slot with the one located above. The content of the CMS blocks will be swapped respectively in the corresponding page(s).
    - to move a CMS block one position down, click **Move Down**. This will swap this slot with the one located below. The content of the CMS blocks will be swapped respectively in the corresponding page(s).

:::(Info) 
If there is only one CMS block assigned to a slot, Move Up and Move Down actions are not available.
:::

## Viewing CMS Blocks
To view a CMS block, click **View Block** in the *Actions* column in the **List of assigned Blocks for [name] Slot** section.

See *CMS Block: Reference Information* to learn about attributes on this page.

## Deleting CMS Block Assignments
You can delete the assignment of a CMS block to a slot removing its content from the in the corresponding Storefront page.

To delete an assignment, click **Delete** in the *Actions* column in the **List of assigned Blocks for [name] Slot**. This will remove the content of the CMS block from the corresponding Storefront page.
:::(Info) 
Deleting an assignment does not delete the CMS block itself.
:::

## Selecting Pages
You can select the Storefront pages in which a CMS blocks will be displayed. This defines particular pages in which the content of the selected CMS block is rendered. Otherwise, a CMS block is rendered in all the pages to which the corresponding template with slots is applied.

To select pages:
<details open>
<summary>Category pages</summary>

1. In the **List of assigned Blocks for [name] Slot**, click on the row of the CMS block you wish to select pages for.
2. Select:
    a. **All Categories Pages** radio button, if you want the CMS block content to be displayed in all the category pages to which the corresponding template is applied.
    b. **Specific Category Pages** radio button, if you want the CMS block content to be displayed in a specific category page or in a selection of the category pages to which the corresponding template is applied. 

:::(Info)
The **All Category Pages** radio button is selected by default with the CMS block content displayed in all the pages to which the corresponding template is applied.
:::

If you selected the **Specific Category Pages** radio button:

3. In the **Category Pages** field, select the category pages on which the CMS block content will be displayed.
4. Click **Save** to apply the changes.
<br>
</details>

<details open>
<summary>CMS Pages</summary>

1. In the **List of assigned Blocks for [name] Slot**, click on the row of the CMS block you wish to select pages for.
2. In the **List of assigned Blocks for [name] Slot**, select:
    a. **All CMS Pages** radio button, if you want the CMS block content to be displayed in all the CMS Pages to which the corresponding template is applied.
    b. **Specific CMS Pages** radio button, if you want the CMS block content to be displayed in a specific CMS page or in a selection of the CMS pages to which the corresponding template is applied.
:::(Info) 
The All CMS Pages radio button is selected by default with the CMS block content displayed in all the CMS Pages to which the corresponding template is applied.
:::
If you selected the **Specific CMS Pages** radio button:
3. In the **CMS Pages** field, select the CMS Pages in which the CMS block content will be displayed.
4. Click **Save** to apply the changes.
<br>
</details>

<details open>
<summary>Product details pages</summary>

1. In the **List of assigned Blocks for [name] Slot**, click on the row of the CMS block you wish to select pages for.
2. In the **List of assigned Blocks for [name] Slot**, select:
    a. All Product Pages radio button, if you want the CMS block content to be displayed in all the product details pages to which the corresponding template is applied.
    b. Specific Product Pages radio button, if you want the CMS block content to be displayed in a specific product details page or in a selection of the product details pages to which the corresponding template is applied.
:::(Info) 
The All Product Pages radio button is selected by default with the CMS block content displayed in all the product details pages to which the corresponding template is applied.
:::
If you selected the **Specific Product Pages** radio button:

3. In the **Product Pages** field, select the product details pages on which the CMS block content will be displayed.
4. In the **Product Pages per Category** field, select the categories for the products assigned to these categories to show the CMS block content.
:::(Info) 
Selecting a product both as a part of a category in the **Product Pages per Category** field and separately in the **Product Pages** field still defines that the CMS block content should only appear once in the page of that product. Thus, if a product is included into a category which you select in the **Product Pages per Category** field, there is no reason to select the product in the Product Pages field.
:::
5. Click **Save** to apply the changes.
<br>
</details>
***
**What's next?**
To know more about the attributes you see, see the [Slots: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/slots/references/slots-reference) article.
