---
title: Edit content items
description: The guide provides steps on how to update content items in the Back Office.
last_updated: Jul 9, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/editing-content-items
originalArticleId: 3b56fb8f-8503-472a-8601-b69c876c04b1
redirect_from:
  - /2021080/docs/editing-content-items
  - /2021080/docs/en/editing-content-items
  - /docs/editing-content-items
  - /docs/en/editing-content-items
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/content-items/edit-content-items.html
related:
  - title: Content Items feature overview
    link: docs/pbc/all/content-management-system/latest/base-shop/content-items-feature-overview.html
---

This topic describes how to edit content items in the Back Office.

## Prerequisites

To start working with abstract products, go to **Catalog&nbsp;<span aria-label="and then">></span> Products**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Editing a content item

To edit a content item:
1. On the left-side navigation bar, navigate to  **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. In the *Actions* column of the *List of Content Items* table, click **Edit** next to the item you want to modify. The *Edit Content Item Type: Content Item Key* page opens.
3. Make changes to the needed attributes.
4. To save the updates, click **Save**. The updated content item will be displayed on the grid of *List of Content Items*, and the following message is displayed: "*Content item has been successfully updated*".

**Tips and tricks**
<br>On the *Edit Content Item Type: Content Item Key* page, you can clear all the fields in the current locale by clicking **Clear locale**.

Clicking **Back to Content Items** in the top right corner of the page can trigger different actions:
- Selecting this option *prior to* saving the changes will discard all the changes and then take you to the *List of Content Items* page.
- Selecting this option *after* the changes have been saved will redirect you to the *List of Content Items* page.

## Reference information: Editing a content item

This section describes atribbutes on the *Overview of Content Items* page and attribbutes of the following content item pages:
- [Edit Content Item Banner: [Content Item Key]](#edit-content-item-banner-content-item-key-page)
- [Edit a Content Item Abstract Product List: [Content Item Key]](#edit-content-item-abstract-product-list-content-item-key-page)
- [Edit Content Item Product Set: [Content Item Key]](#edit-content-item-product-set-content-item-key-page)
- [Edit Content Item File List: [Content Item Key]](#edit-content-item-file-list-content-item-key-page)
- [Edit Navigation: [Content Item Key]](#edit-content-item-navigation-content-item-key-page)

The following table describes the attributes on the *Overview of Content Items* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Content Item Key | Fixed value of the content item indicated in the database. |
|Name | Name of a content item. |
| Description | Descriptive information on what a content item is used for.  |
| Content Type | Type of a content item. |
|Created | Date when a content item was created. |
| Updated | Date when a content item was last updated. |
| Actions | Set of actions that can be performed on a content item. |

By default, the latest created content item is displayed and sorted by the *Name* column on the grid of content items.

On the *Overview of Content Items* page, you can:

- Create a new content item.
- Sort content items by *Content Item Key*, *Name*, *Content type*, *Created*, and *Updated* dates.
- Filter content items using the search by *Content Item Key*, *Name*, *Description*, *Content type*, *Created*, and *Updated* dates.
- Edit a content item.

### Edit content Item Banner: [Content Item Key] page

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of a banner content item. |
|Description  | Descriptive information on what a banner is used for.  |
| Title |  Heading of the banner.|
| Subtitle| Text of the banner. |
|Image URL | Address where the image element of the banner content item is stored.  |
| Click URL | URL of the target page to which your shop visitors are redirected. |
| Alt-text | Some additional text that describes the image. |

### Edit Content Item Abstract Product List: [Content Item Key] page

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name for an abstract product list content item. |
| Description | Descriptive information on what an abstract product list is used for. |
| Top table |  Table that displays products included in an abstract product list content item.|
| Actions | Set of actions that performed on an abstract product list content item:<ul><li>**Move Down** or **Move Up** allows you to change the order of products in the list.</li><li>**Delete** allows removing the product from the list.</li></ul>|
| **Add more products (bottom table)**  | Table that contains all available products stored in the database. |
| ID | Sequence number. |
| SKU | Unique identifier of the product. |
| Image | Product image. |
| Name |  Product name.|
| Stores | Shows what stores the product can be used in. |
| Status |  Shows the status of the product: active or inactive. |
| Selected | Column that contains **+ Add to list** you can click to add a product to the top table so that it can be added to the abstract product list content item.|


### Edit Content Item Product Set: [Content Item Key] page

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name for a product set content item. |
|  Description| Descriptive information on what a product set is used for.  |
| Top table | Table that displays the selected product set.  |
| Actions (top table) | Column that contains **Delete** you can click to remove the product set from the list. |
| Available Product Sets |  Bottom table that displays product sets available in the database.|
| ID  | Sequence number. |
|  Name <br>(in the top table) | Name of the product set. |
| # of Products | Displays the number of products available in the product set. |
|Status  | Shows the status of the product set: active or inactive. |
|Actions (the bottom table)  | Column that contains **+ Add** you can click to add a product set to the top table so that it can be added to the product set content item. |

### Edit Content Item File List: [Content Item Key] page

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name for a file list content item. |
| Description | Descriptive information on what a file list content item is used for. |
| Selected Files | Top table that displays the selected files. |
| Actions | Set of actions you can perform on a file list content item:<ul><li>**Move Down** or **Move Up** allows you to change the order of files in the list. </li><li>**Delete** allows removing the selected file.</li></ul> |
| Available Files | Bottom table that displays a list of files uploaded to the file manager. |
| ID | Sequence number. |
| File Name | File name.  |
| Selected| Column that contains **+ Add to list** you can click to add a file to the top table so that it can be added to the file list content item. |


### Edit Content Item Navigation: [Content Item Key] page

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of the content item. |
| Description | Description of the content item. |
| Navigation | Field to select an existing navigation element. |

**What's next?**
<br>When content item is updated, you can add it via content item widgets to a block or a page if needed.

- To learn more about adding content item widgets to a block or page, see [Add content items to CMS blocks](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/blocks/add-content-items-to-cms-blocks.html).
