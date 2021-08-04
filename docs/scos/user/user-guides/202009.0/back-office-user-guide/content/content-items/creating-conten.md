---
title: Creating content items
originalLink: https://documentation.spryker.com/v6/docs/creating-content-items
redirect_from:
  - /v6/docs/creating-content-items
  - /v6/docs/en/creating-content-items
---

This topic describes how to create content items in the Back Office.

---

## Prerequisites

To start working with сontent items, go to **Content** > **Content Items**.

Each section contains reference information. Make sure to review it before you start, or just look up the necessary information as you go through the process.


## Select a content item
Follow the steps below to select a content item you want to create:

1. On the *Overview of Content Items* page, click **Add Content Item** in the top right corner of the page.
2.  Select a content item type you want to create and follow the steps from the corresponding section:
    * [Create a banner](#create-a-banner-content-item)
    * [Create an abstract product list](#create-an-abstract-product-list-content-item)
    * [Create a product set](#create-a-product-set-content-item)
    * [Create a file list](#create-a-file-list-content-item)
    * [Create a navigation](#create-a-navigation-content-item)

To learn about the content item types, see [Content item types: Module relations](https://documentation.spryker.com/docs/content-item-types-module-relations).

### Reference information: Select a content item

On the *Overview of Content Items* page, you see the following:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Content Item Key | Fixed value of the content item indicated in the database. |
|Name  | Name of a content item. |
| Description |Descriptive information on what a content item is used for.  |
| Content Type | Type of a content item. |
|Created | Date when a content item was created. |
| Updated | Date when a content item was last updated.|
| Actions | Set of actions that can be performed on a content item. |

By default, the latest created content item is displayed and sorted by the _Name_ column on the grid of content items.

On the *Overview of Content Items* page, you can:

* Create a new content item.
* Sort content items by *Content Item Key*, *Name*, *Content type*, *Created*, and *Updated* dates.
* Filter content items using the search by *Content Item Key*, *Name*, *Description*, *Content type*, *Created*, and *Updated* dates.
* Edit a content item.


## Create a banner content item
{% info_block infoBox %}

For the use cases and examples of the banner content item, see [Banner Content Item Widget](https://documentation.spryker.com/docs/content-item-widgets-types-reference-information#banner-content-item-widget) and [Banner Content Item Widget Templates](https://documentation.spryker.com/docs/content-item-widgets-templates-reference-information#banner-content-item-widget-templates).

{% endinfo_block %}
Follow the steps to create a banner:

1. On the *Create Content Item: Banner* page, enter **Name** and **Description**. The fields are mandatory. 
2. In the *Default* tab, fill out the following mandatory fields: 
    * **Title**
    * **Subtitle**
    * **Image URL**
    * **Click URL**
    * **Alt-text**

3. If needed, repeat the previous step in one or more locale-specific tabs. 
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific values overwrite the default values when the banner is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/multi-language-setup) selected.
* If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.


{% endinfo_block %}

4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the banner has been created:
* Above *List of Content Items*, you can see the message: _Content item has been successfully created_.
* In *List of Content Items*, you can see the created banner.

{% endinfo_block %}


**Tips & Tricks**
On the *Create Content Item: Banner* page, you can do the following:

* Clear all the fields in a tab by clicking **Clear locale**.

* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

### Reference information: Create a banner content item

The following table describes the attributes on the *Create Content Item: Banner* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of a banner content item. |
|Description  | Descriptive information on what a banner is used for.  |
| Title |  Heading of the banner.|
| Subtitle| Text of the banner. |
|Image URL | Address where the image element of the banner content item is stored.  |
| Click URL | URL of the target page to which your shop visitors are redirected. |
| Alt-text | Some additional text that describes the image. |

## Create an abstract product list content item

{% info_block infoBox %}

For the use cases and examples of the abstract product list content item, see [Abstract Product List Content Item Widget](https://documentation.spryker.com/docs/content-item-widgets-types-reference-information#abstract-product-list-content-item-widget) and [Abstract Product List Content Item Widget Templates](https://documentation.spryker.com/docs/content-item-widgets-templates-reference-information#abstract-product-list-content-item-widget-templates).

{% endinfo_block %}

Follow the steps to create an abstract product list:

1. On the *Create Content Item: Abstract Product List* page, enter **Name** and **Description**. The fields are mandatory.
2. In the *Defualt* tab, add products to the abstract product list as follows:
    1.  In the *Add more products* table, click **+Add to list** next to the desired products.
    {% info_block warningBox "Verification" %}

    The added products should appear in the table above the *Add more products* table.
    
{% endinfo_block %}
    2.  In the table above the *Add more products* table, sort the added products by clicking **Move Down** or **Move Up**.  

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific products overwrite the default products when the Abstract Product List is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/multi-language-setup) selected.
* If no products are selected for a locale, the default products are displayed on a Storefront page with the locale selected.


{% endinfo_block %}
4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the abstract product list has been created:
* Above *List of Content Items*, you can see the message: _Content item has been successfully created_.
* In *List of Content Items*, you can see the created abstract product list.

{% endinfo_block %}

**Tips & tricks**
On the *Create Content Item: Abstract Product List* page, you can do the following:

* Filter the products in the *Add more products* table by entering a product name or SKU in the *Search* field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.

{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

### Reference information: Create an abstract product list content item

The following table describes the attributes on the *Create Content Item: Abstract Product List* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name for an abstract product list content item. |
| Description | Descriptive information on what an Abstract Product List is used for. |
| Top table |  Table that displays products included in an Abstract Product List content item.|
| Actions | Set of actions that can be performed on an Abstract Product List content item:<ul><li>**Move Down** or **Move Up** allows you to change the order of products in the list.</li><li>**Delete** allows removing the product from the list.</li></ul>|
| **Add more products (bottom table)**  | Table that contains all available products stored in the database. |
| ID | Sequence number. |
| SKU | Unique identifier of the product. |
| Image | Product image. |
| Name |  Product name.|
| Stores | Shows what stores the product can be used in. |
| Status |  Shows the status of the product: active or inactive. |
| Selected | Column that contains **+ Add to list** you can click to add a product to the top table so that it can be added to the abstract product list content item.|

## Create a product set content item

{% info_block infoBox %}

For the use cases and examples of the product set content item, see [Product Set Content Item Widget](https://documentation.spryker.com/docs/content-item-widgets-types-reference-information#product-set-content-item-widget) and [Product Set Content Item Widget Templates](https://documentation.spryker.com/docs/content-item-widgets-templates-reference-information#product-set-content-item-widget-templates).

{% endinfo_block %}

Follow the steps to create a product set:

1. On the *Create Content Item: Product Set* page, enter **Name** and **Description**. The fields are mandatory.
2. In the *Defualt* tab, add a product set by clicking **+Add to list** next to it.
    {% info_block warningBox "Verification" %}

    The added product set should appear in the table above the *Available Product Sets* table.
    
{% endinfo_block %}

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* A locale-specific product set overwrites the default product set when the product set content item is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/multi-language-setup) selected.
* If no product set is selected for a locale, the default product set is displayed on a Storefront page with the locale selected.


{% endinfo_block %}
4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the product set has been created:
* Above *List of Content Items*, you can see the message: _Content item has been successfully created_.
* In *List of Content Items*, you can see the created product set.

{% endinfo_block %}

**Tips & tricks**
On the *Create Content Item: Product Set* page, you can do the following:

* Filter the product sets in the *Available Product Sets* table by entering a product set name in the **Search** field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

### Reference information: Create a product set content item

The following table describes the attributes on the *CreateContent Item: Product Set* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name for a Product Set content item. |
|  Description| Descriptive information on what a product set is used for.  |
| Top table | Table that displays the selected product set.  |
| Actions (top table) | Column that contains **Delete** you can click to remove the product set from the list. |
| Available Product Sets |  Bottom table that displays product sets available in the database.|
| ID  | Sequence number. |
|  Name </br>(in the top table) | Name of the product set. |
| # of Products | Displays the number of products available in the product set. |
|Status  | Shows the status of the product set: active or inactive. |
|Actions (the bottom table)  | Column that contains **+ Add** you can click to add a product set to the top table so that it can be added to the product set content item. |

## Create a file list content item
{% info_block infoBox %}

For the use cases and examples of the file list content item, see [File List Content Item Widget](https://documentation.spryker.com/docs/content-item-widgets-types-reference-information#product-set-content-item-widget) and [File List](https://documentation.spryker.com/docs/content-item-widgets-templates-reference-information#file-list).

{% endinfo_block %}
Follow the steps to create a file list:

1. On the *Create Content Item: File List* page, enter **Name** and **Description**. The fields are mandatory. 
2. In the *Default* tab, add files to the file list as follows:
    1.  In the *Available Files* table, click **+Add to list** next to the desired files.
    {% info_block warningBox "Verification" %}

    The added files should appear in the *Selected Files* table.
    
{% endinfo_block %}
    2.  In the *Selected Files* table, sort the added files by clicking **Move Down** or **Move Up**. 

See [Content items: reference information](https://documentation.spryker.com/docs/content-items-reference-information#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific files overwrite the default files when the file list is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/multi-language-setup) selected.
* If no files are selected for a locale, the default files are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the file list has been created:
* Above *List of Content Items*, you can see the message: _Content item has been successfully created_.
* In *List of Content Items*, you can see the created file list.

{% endinfo_block %}

**Tips & tricks**
On the *Create Content Item: File List* page, you can do the following:

* Filter the files in the *Available Files* table by entering a file name in the *Search* field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

### Reference information: Create a file list content item

The following table describes the attributes on the *Create Content Item: File List* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name for a file list content item. |
| Description | Descriptive information on what a file list content item is used for. |
| Selected Files | Top table that displays the selected files. |
| Actions | Set of actions you can perform on a File List content item:<ul><li>**Move Down** or **Move Up** allows you to change the order of files in the list. </li><li>**Delete** allows removing the selected file.</li></ul> |
| Available Files | Bottom table that displays a list of files uploaded to the file manager. |
| ID | Sequence number. |
| File Name | File name.  |
| Selected| Column that contains **+ Add to list** you can click to add a file to the top table so that it can be added to the file list content item. |

## Create a navigation content item

To create a navigation content item:

1. On the *Create Content Item: Navigation* page, enter **Name** and **Description**.
2. In the *Default* tab, select a navigation from the *Navigation* drop-down list. See [Creating navigation elements](https://documentation.spryker.com/docs/managing-navigation-elements#creating-a-navigation-element) to learn about creating navigation elements.

3. If needed, repeat the previous step in one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific navigation element overwrites the default navigation element when rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/multi-language-setup) selected.
* If no navigation element is selected for a locale, the default navigation element is displayed on a Storefront page with the locale selected.

{% endinfo_block %}

4. Click **Save**. 
This takes you to the *Overview of Content Items* page. You can see the message about successful content item creation. The created content item is displayed in the *List of Content Items*.

### Reference information: Create a navigation content item

The following table describes the attributes on the *Create Content Item: Navigation* page.

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of the content item. |
| Description | Description of the content item. |
| Navigation | Field to select an existing navigation element. |

***

**What's next?**
The content item is created. Now, you can add it to a CMS block. 

* To learn about adding content item to CMS blocks or a pages, see [Adding content items to CMS pages and blocks](https://documentation.spryker.com/docs/adding-content-items-to-cms-pages-and-blocks).
* To learn about editing content items, see [Editing content items](https://documentation.spryker.com/docs/editing-content-items).
