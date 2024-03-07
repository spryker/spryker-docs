---
title: Manage slots
description: Learn about slot management in the Back Office.
last_updated: Jun 18, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-slots
originalArticleId: 06d8bf64-4aee-4959-abae-f3fb849ccaa0
redirect_from:
  - /docs/scos/user/back-office-user-guides/202001.0/content/slots/slots.html
  - /docs/scos/user/back-office-user-guides/202108.0/content/slots/managing-slots.html
  - /docs/pbc/all/content-management-system/202311.0/manage-in-the-back-office/manage-slots.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/manage-slots.html
related:
  - title: Templates & Slots feature overview
    link: docs/scos/user/features/page.version/cms-feature-overview/templates-and-slots-overview.html
---

This topic describes how to manage slots.

You can:
* Activate or deactivate (depending on the current status) slots by clicking respective buttons in the *Actions* column in *List of Slots for [Name] Template*.
* Assign CMS blocks to slots by selecting them from the drop-down menu in *List of Blocks for [Name] Slot*.
* Move up, move down, delete (remove the block assignment) and view CMS blocks by clicking respective buttons in *List of Blocks for [Name] Slot*.
* Select the Storefront pages in which CMS blocks will be displayed in *List of Blocks for [Name] Slot*.

## Prerequisites

To start managing slots, go to **Content&nbsp;<span aria-label="and then">></span> Slots**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Activating and deactivating slots

You can activate or deactivate a slot.  The embedded content will either be visible or invisible on the Storefront pages.

To activate a slot, click **Activate** in the *Actions* column in the *List of Slots for [Name] Template* section. This will change the status to *Active*. The content of this slot will be displayed on the corresponding Storefront page(s).

To deactivate a slot, click **Deactivate** in the *Actions* column in the *List of Slots for [Name] Template* section. This will change the status to *Inactive*. The content of this slot will be removed from the corresponding Storefront page(s).

### Reference information: Activating and deactivating slots:

In the *List of Slots for [name] Template* section, you see the following:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ID | Sequence number. |
| Name | Alphabetic identifier of the slot fetched from the database. |
| Description | Description of the slot fetched from the database. |
| Content Provider | Source from which Slot Widget fetches content for this slot. |
| Status | Slot status that can be active (visible on the store page) or inactive (invisible on the store page). |
| Actions | Set of actions that can be performed with a slot. |

## Assigning CMS blocks to slots

You can assign CMS blocks to a slot selected in *List of Slots for [Name] Template*. The content of assigned CMS blocks is displayed on the corresponding Storefront page(s). If there are no CMS blocks with content that you can assign, see [Create a CMS block](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html).

To assign a CMS block to a slot:
1. In *List of Slots for [Name] Template*, click on the row of the slot you wish to assign CMS blocks to.
2. Open the drop-down menu in *List of Blocks for [Name] Slot*.
3. Select a CMS block and click **+Add**.

{% info_block warningBox %}

Repeat step 2 for each CMS block that you want to assign.

{% endinfo_block %}

{% info_block infoBox %}

* The **+Add** button is not active until a CMS block is selected.
* In the drop-down menu, start typing the name of a CMS block to filter the list.
* You can only add one CMS block at a time. When you click on a CMS block in the drop-down menu to select it, the drop-down menu closes with the selected CMS Block shown in the drop-down field. If you do not click  **+Add** and select another CMS block, the previous CMS Block is replaced with the new one. If you click **+Add** after replacing one CMS block with another, only the last selected CMS block is added.
* Newly added CMS blocks are placed on top of *List of Blocks for [Name] Slot*.
* You can add an inactive CMS block to a slot. The content of the inactive CMS block won't be displayed until the CMS block is activated.

{% endinfo_block %}

4. Click **Save** to assign all the selected CMS blocks to the slot.

The order of the assigned CMS blocks in the *List of Blocks for [Name] Slot* reflects the order of CMS blocks displayed on the corresponding Storefront page(s). See Changing the position of CMS blocks to define the desired order.

### Reference information: Assigning CMS blocks to slots

In the *List of Templates* section, you see the following:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ID | Sequence number. |
| Name | Alphabetic identifier of the template fetched from the database. |
| Description | Description of the template fetched from the database. |
| Number of Slots | Number of slots in this template. |

In this section, you can:
* Sort templates by ID and Name.
* Filter templates by ID, Name, and Description.
* Filter slots displayed in the *List of Slots for [name] Template* section by templates.

In the *List of Slots for [Name] Template* section, you see the following:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ID | Sequence number. |
| Name | Alphabetic identifier of the slot fetched from the database. |
| Description | Description of the slot fetched from the database. |
| Content Provider | Source from which Slot Widget fetches content for this slot. <br>This column is displayed only when a project has more than one content provider.|
| Status | Slot status that can be active (visible on the store page) or inactive (invisible on the store page). By default, all the slots have the *Active* status.|
| Actions | Set of actions that can be performed with a Slot. |

In this section, you can:
* Sort slots by ID, Name, Content Provider and Status.
* Filter slots by ID, Name, Description, and Content Provider.
* Filter CMS blocks displayed in the *List of Blocks for [name] Slot* section by slots.

{% info_block infoBox "Info" %}

The search only applies to the slots displayed for the chosen template from the List of Templates.

{% endinfo_block %}

In the *List of Blocks for [Name] Slot* section, you see the following:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| ID | Sequence number. |
| Name | Alphabetic identifier of the CMS block. |
| Valid From (Included) and Valid To (Excluded) | Set of dates defining the time period of an active CMS block being visible in the store. |
| Status | CMS block status that can be active (visible on the store page) or inactive (invisible on the store page). |
| Stores | Store locale for which the block is available. |
| Actions | Set of actions that can be performed with a CMS block. |

{% info_block infoBox "Info" %}

Apart from the **ID** and **Actions**, the attributes described below depend on the CMS block settings defined in **Content&nbsp;<span aria-label="and then">></span> Blocks**. To learn about them, see reference information on the [Creating CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html) page.

{% endinfo_block %}

{% info_block infoBox "Info" %}

The attributes described below depend on the page type to which the template with the selected CMS block is applied: a product, category, or CMS page.
*Product Pages per Category* is only displayed when you are defining the visibility conditions of a CMS block belonging to the slot of the Product page template.

{% endinfo_block %}

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| All [Page Type] Pages | Radio button defining that the CMS block is displayed on all the [page type] pages to which the corresponding template is applied. |
| Specific [Page Type] Pages | Radio button defining that the CMS block is displayed only on the pages selected in the *[Page Type] Pages* and/or *Product Pages per Category* fields. |
| [Page Type] Pages | Drop-down menu in which you can select specific pages that are to display the selected CMS block. |
| Product Pages per Category | Drop-down menu in which you can select categories The CMS block is displayed on the products pages belonging to the selected categories. |

In this section, you can assign CMS blocks to slots and select the pages in which a selected CMS block is to be displayed.

## Changing the order of CMS blocks

You can change the position of a CMS block in relation to the other CMS blocks in a slot. This is done by moving the respective CMS block up and down.

To move a CMS block:
1. In *List of Slots for [Name] Template*, click on the row of the slot the CMS block of which you wish to move.
2. In the *Actions* column of the *List of  Blocks for [Name] Slot*,
    - To move a CMS block one position up, click **Move Up**. This will swap this slot with the one located above. The content of the CMS blocks will be swapped respectively on the corresponding page(s).
    - To move a CMS block one position down, click **Move Down**. This will swap this slot with the one located below. The content of the CMS blocks will be swapped respectively on the corresponding page(s).

{% info_block infoBox %}

If there is only one CMS block assigned to a slot, Move Up and Move Down actions are not available.

{% endinfo_block %}

## Viewing CMS blocks

To view a CMS block, click **View Block** in the *Actions* column in the *List of Blocks for [Name] Slot* section.

To learn about attributes on this page, see [Create CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-cms-blocks.html).

## Deleting CMS block assignments

You can delete the assignment of a CMS block to a slot removing its content from the corresponding Storefront page.

To delete an assignment, click **Delete** in the *Actions* column in *List of Blocks for [Name] Slot*. This will remove the content of the CMS block from the corresponding Storefront page.

{% info_block infoBox %}

Deleting an assignment does not delete the CMS block itself.

{% endinfo_block %}

## Selecting pages

You can select the Storefront pages in which CMS blocks will be displayed. This defines particular pages in which the content of the selected CMS block is rendered. Otherwise, a CMS block is rendered in all the pages to which the corresponding template with slots is applied.

To select pages:
<details>
<summary markdown='span'>Category pages</summary>

1. In *List of Blocks for [Name] Slot*, click on the row of the CMS block you wish to select pages for.
2. Select:
   1. The **All Categories Pages** radio button if you want the CMS block content to be displayed in all the category pages to which the corresponding template is applied.
   2. The **Specific Category Pages** radio button if you want the CMS block content to be displayed in a specific category page or in a selection of the category pages to which the corresponding template is applied.

{% info_block infoBox %}

The **All Category Pages** radio button is selected by default with the CMS block content displayed in all the pages to which the corresponding template is applied.

{% endinfo_block %}

If you selected the **Specific Category Pages** radio button:

3. In the **Category Pages** field, select the category pages on which the CMS block content will be displayed.
4. Click **Save** to apply the changes.
<br>
</details>

<details>
<summary markdown='span'>CMS Pages</summary>

1. In *List of Blocks for [Name] Slot*, click on the row of the CMS block you wish to select pages for.
2. In the *List of Blocks for [Name] Slot*, select:

    a. **All CMS Pages** radio button if you want the CMS block content to be displayed in all the CMS Pages to which the corresponding template is applied.
    b. **Specific CMS Pages** radio button if you want the CMS block content to be displayed in a specific CMS page or in a selection of the CMS pages to which the corresponding template is applied.

{% info_block infoBox %}

The **All CMS Pages** radio button is selected by default with the CMS block content displayed in all the CMS pages to which the corresponding template is applied.

{% endinfo_block %}

If you selected the **Specific CMS Pages** radio button:

3. In the *CMS Pages* field, select the CMS pages in which the CMS block content will be displayed.
4. Click **Save** to apply the changes.
<br>
</details>

<details>
<summary markdown='span'>Product details pages</summary>

1. In the *List of Blocks for [Name] Slot*, click on the row of the CMS block you wish to select pages for.
2. In *List of Blocks for [Name] Slot*, select:
    a. The **All Product Pages** radio button if you want the CMS block content to be displayed in all the product details pages to which the corresponding template is applied.
    b. A specific **Product Pages** radio button if you want the CMS block content to be displayed in a specific product details page or in a selection of the product details pages to which the corresponding template is applied.

{% info_block infoBox %}

The **All Product Pages** radio button is selected by default with the CMS block content displayed in all the product details pages to which the corresponding template is applied.

{% endinfo_block %}

If you select the **Specific Product Pages** radio button:

3. In the *Product Pages* field, select the product details pages on which the CMS block content will be displayed.
4. In the *Product Pages per Category* field, select the categories for the products assigned to these categories to show the CMS block content.

{% info_block infoBox %}

Selecting a product both as part of a category in the *Product Pages per Category* field and separately in the *Product Pages* field still defines that the CMS block content should only appear once on that product page. Thus if a product is included in a category that you select in the *Product Pages per Category* field, there is no reason to select the product in the Product Pages field.

{% endinfo_block %}

5. Click **Save** to apply the changes.
<br>
</details>
