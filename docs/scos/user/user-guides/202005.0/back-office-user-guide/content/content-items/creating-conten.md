---
title: Creating Content Items
originalLink: https://documentation.spryker.com/v5/docs/creating-content-items
redirect_from:
  - /v5/docs/creating-content-items
  - /v5/docs/en/creating-content-items
---

This topic describes how to create content items in the Back Office.

To start working with сontent items, go to **Content Management** > **Content Items**.

---
## Select a Content Item
Follow the steps below to select a content item you want to create:

1. On the *Overview of Content Items* page, click **Add Content Item** in the top right corner of the page.
2.  Select a content item type you want to create and follow the steps from the corresponding section:
    * [Create a Banner](#create-a-banner-content-item)
    * [Create an Abstract Product List](#create-an-abstract-product-list-content-item)
    * [Create a Product Set](#create-a-product-set-content-item)
    * [Create a File List](#create-a-file-list-content-item)
    * [Create a Navigation](#create-a-navigation-content-item)

See [Content Item Types: Module Relations](https://documentation.spryker.com/docs/en/content-item-types-module-relations) to learn about the content item types.

See [Content Items: Reference Information](https://documentation.spryker.com/docs/en/content-items-reference-information) to learn about the attributes on this page.

## Create a Banner Content Item
{% info_block infoBox %}

For the use cases and examples of the Banner content item, see [Banner Content Item Widget](https://documentation.spryker.com/docs/en/content-item-widgets-types-reference-information#banner-content-item-widget) and [Banner Content Item Widget Templates](https://documentation.spryker.com/docs/en/content-item-widgets-templates-reference-information#banner-content-item-widget-templates).

{% endinfo_block %}
Follow the steps to create a Banner:

1. On the *Create Content Item: Banner* page, enter **Name** and **Description**. The fields are mandatory. 
2. In the **Default** tab, fill out the following mandatory fields: 
    * **Title**
    * **Subtitle**
    * **Image URL**
    * **Click URL**
    * **Alt-text**

See [Content Items: Reference Information](https://documentation.spryker.com/docs/en/content-items-reference-information#create-and-edit-banner-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs. 
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific values overwrite the default values when the Banner is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/en/multi-language-setup) selected.
* If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.


{% endinfo_block %}

4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the Banner has been created:
* Above the **List of Content Items**, you can see the message: _Content item has been successfully created_.
* In the **List of Content Items**, you can see the created Banner.

{% endinfo_block %}


**Tips & Tricks**
On the *Create Content Item: Banner* page, you can do the following:

* Clear all the fields in a tab by clicking **Clear locale**.

* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

## Create an Abstract Product List Content Item

{% info_block infoBox %}

For the use cases and examples of the Abstract Product List content item, see [Abstract Product List Content Item Widget](https://documentation.spryker.com/docs/en/content-item-widgets-types-reference-information#abstract-product-list-content-item-widget) and [Abstract Product List Content Item Widget Templates](https://documentation.spryker.com/docs/en/content-item-widgets-templates-reference-information#abstract-product-list-content-item-widget-templates).

{% endinfo_block %}

Follow the steps to create an Abstract Product List:

1. On the *Create Content Item: Abstract Product List* page, enter **Name** and **Description**. The fields are mandatory.
2. In the **Defualt** tab, add products to the Abstract Product List as follows:
    1.  In the **Add more products** table, click **+Add to list** next to the desired products.
    {% info_block warningBox "Verification" %}

    The added products should appear in the table above the **Add more products** table.
    
{% endinfo_block %}
    2.  In the table above the **Add more products** table, sort the added products by clicking **Move Down** or **Move Up**. 

See [Content Items: Reference Information](https://documentation.spryker.com/docs/en/content-items-reference-information#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific products overwrite the default products when the Abstract Product List is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/en/multi-language-setup) selected.
* If no products are selected for a locale, the default products are displayed on a Storefront page with the locale selected.


{% endinfo_block %}
4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the Product Abstract List has been created:
* Above the **List of Content Items**, you can see the message: _Content item has been successfully created_.
* In the **List of Content Items**, you can see the created Product Abstract List.

{% endinfo_block %}




**Tips & Tricks**
On the *Create Content Item: Abstract Product List* page, you can do the following:

* Filter the products in the **Add more products** table by entering a product name or SKU in the **Search** field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.

{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

## Create a Product Set Content Item

{% info_block infoBox %}

For the use cases and examples of the Product Set content item, see [Product Set Content Item Widget](https://documentation.spryker.com/docs/en/content-item-widgets-types-reference-information#product-set-content-item-widget) and [Product Set Content Item Widget Templates](https://documentation.spryker.com/docs/en/content-item-widgets-templates-reference-information#product-set-content-item-widget-templates).

{% endinfo_block %}

Follow the steps to create a Product Set:

1. On the *Create Content Item: Product Set* page, enter **Name** and **Description**. The fields are mandatory.
2. In the **Defualt** tab, add a product set by clicking **+Add to list** next to it.
    {% info_block warningBox "Verification" %}

    The added product set should appear in the table above the **Available Product Sets** table.
    
{% endinfo_block %}

See [Content Items: Reference Information](https://documentation.spryker.com/docs/en/content-items-reference-information#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* A locale-specific product set overwrites the default product set when the Product Set content item is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/en/multi-language-setup) selected.
* If no product set is selected for a locale, the default product set is displayed on a Storefront page with the locale selected.


{% endinfo_block %}
4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the Product Set has been created:
* Above the **List of Content Items**, you can see the message: _Content item has been successfully created_.
* In the **List of Content Items**, you can see the created Product Set.

{% endinfo_block %}

**Tips & Tricks**
On the **Create Content Item: Product Set** page, you can do the following:

* Filter the product sets in the **Available Product Sets** table by entering a product set name in the **Search** field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

## Create a File List Content Item
{% info_block infoBox %}

For the use cases and examples of the File List content item, see [File List Content Item Widget](https://documentation.spryker.com/docs/en/content-item-widgets-types-reference-information#product-set-content-item-widget) and 
[File List](https://documentation.spryker.com/docs/en/content-item-widgets-templates-reference-information#file-list).

{% endinfo_block %}
Follow the steps to create a File List:

1. On the *Create Content Item: File List* page, enter **Name** and **Description**. The fields are mandatory. 
2. In the **Default** tab, add files to the File List as follows:
    1.  In the **Available Files** table, click **+Add to list** next to the desired files.
    {% info_block warningBox "Verification" %}

    The added files should appear in the **Selected Files** table.
    
{% endinfo_block %}
    2.  In the **Selected Files** table, sort the added files by clicking **Move Down** or **Move Up**. 

See [Content Items: Reference Information](https://documentation.spryker.com/docs/en/content-items-reference-information#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific files overwrite the default files when the File List is rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/en/multi-language-setup) selected.
* If no files are selected for a locale, the default files are displayed on a Storefront page with the locale selected.

{% endinfo_block %}
  


4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the File List has been created:
* Above the **List of Content Items**, you can see the message: _Content item has been successfully created_.
* In the **List of Content Items**, you can see the created FIle List.

{% endinfo_block %}


**Tips & Tricks**
On the *Create Content Item: File List* page, you can do the following:

* Filter the files in the **Available Files** table by entering a file name in the **Search** field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

## Create a Navigation Content Item

To create a Navigation content item:

1. On the *Create Content Item: Navigation* page, enter **Name** and **Description**.

2. In the **Default** tab, select a **Navigation**. See [Creating Navigation Elements](https://documentation.spryker.com/docs/en/managing-navigation-elements#creating-a-navigation-element) to learn about creating navigation elements.

3. If needed, repeat the previous step in one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific navigation element overwrites the default navigation element when rendered on a Storefront page with the [locale](https://documentation.spryker.com/docs/en/multi-language-setup) selected.
* If no navigation element is selected for a locale, the default navigation element is displayed on a Storefront page with the locale selected.

{% endinfo_block %}

4. Click **Save**. 
This takes you to the *Overview of Content Items* page. You can see the message about successful content item creation. The created content item is displayed in the *List of Content Items*.


***
**What's next?**
The content item is created. Now, you can add it to a CMS block. 

* To learn about adding content item to CMS blocks or a pages, see [Adding Content Items to CMS Pages and Blocks](https://documentation.spryker.com/docs/en/adding-content-items-to-cms-pages-and-blocks).
* To learn about editing content items, see [Editing Content Items](https://documentation.spryker.com/docs/en/editing-content-items).
