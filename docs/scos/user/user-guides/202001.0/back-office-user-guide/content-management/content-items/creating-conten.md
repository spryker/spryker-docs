---
title: Creating Content Items
originalLink: https://documentation.spryker.com/v4/docs/creating-content-items
redirect_from:
  - /v4/docs/creating-content-items
  - /v4/docs/en/creating-content-items
---

This topic describes the procedure of creating content items in the Back Office.

To start working with сontent items, go to **Content Management** > **Content Items**.

## Select a Content Item
Follow the steps below to select a content item you want to create:

1. On the *Overview of Content Items* page, click **Add Content Item** in the top right corner of the page.
2.  Select a content item type you want to create and follow the steps from the corresponding section:
    * [Create a Banner](#create-a-banner)
    * [Create an Abstract Product List](#create-an-abstract-product-list)
    * [Create a Product Set](#create-a-product-set)
    * [Create a File List](#create-a-file-list)

See [Content Items Types: Module Relations](https://documentation.spryker.com/v4/docs/content-items-types-module-relations-201907) to learn more about the content item types.

See [Content Items: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/references/content-items-r) to learn about the attributes on this page.

## Create a Banner
Follow the steps to create a Banner:

1. On the *Create Content Item: Banner* page, enter **Name** and **Description**. The fields are mandatory. 
2. In the **Default** tab, fill out the following mandatory fields: 
    * **Title**
    * **Subtitle**
    * **Image URL**
    * **Click URL**
    * **Alt-text**


![Banner content item](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Items/Creating+Content+Items/banner-content-item-page.png){height="" width=""}

See [Content Items: Reference Information](https://documentation.spryker.com/v4/docs/content-items-reference-information#create-and-edit-banner-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs. 
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific values overwrite the default values when the Banner is rendered on a Storefront page with the [locale](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/datapayload-conversion/multi-language-) selected.
* If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.


{% endinfo_block %}

4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the Banner has been created:
* Above the **List of Content Items**, you can see the message: _Content item has been successfully created_.
* In the **List of Content Items**, you can see the created Banner.

{% endinfo_block %}

***
**Tips & Tricks**
On the *Create Content Item: Banner* page, you can do the following:

* Clear all the fields in a tab by clicking **Clear locale**.

* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

## Create an Abstract Product List
Follow the steps to create an Abstract Product List:

1. On the *Create Content Item: Abstract Product List* page, enter **Name** and **Description**. The fields are mandatory.
2. In the **Defualt** tab, add products to the Abstract Product List as follows:
    1.  In the **Add more products** table, click **+Add to list** next to the desired products.
    {% info_block warningBox "Verification" %}

    The added products should appear in the table above the **Add more products** table.
    
{% endinfo_block %}
    2.  In the table above the **Add more products** table, sort the added products by clicking **Move Down** or **Move Up**. 

See [Content Items: Reference Information](https://documentation.spryker.com/v4/docs/content-items-reference-information#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific products overwrite the default products when the Abstract Product List is rendered on a Storefront page with the [locale](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/datapayload-conversion/multi-language-) selected.
* If no products are selected for a locale, the default products are displayed on a Storefront page with the locale selected.


{% endinfo_block %}
4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the Product Abstract List has been created:
* Above the **List of Content Items**, you can see the message: _Content item has been successfully created_.
* In the **List of Content Items**, you can see the created Product Abstract List.

{% endinfo_block %}

![Abstract product list content item](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Items/Creating+Content+Items/apl-create-page.png){height="" width=""}


***
**Tips & Tricks**
On the *Create Content Item: Abstract Product List* page, you can do the following:

* Filter the products in the **Add more products** table by entering a product name or SKU in the **Search** field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.

{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

## Create a Product Set
Follow the steps to create a Product Set:

1. On the *Create Content Item: Product Set* page, enter **Name** and **Description**. The fields are mandatory.
2. In the **Defualt** tab, add a product set by clicking **+Add to list** next to it.
    {% info_block warningBox "Verification" %}

    The added product set should appear in the table above the **Available Product Sets** table.
    
{% endinfo_block %}

See [Content Items: Reference Information](https://documentation.spryker.com/v4/docs/content-items-reference-information#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* A locale-specific product set overwrites the default product set when the Product Set content item is rendered on a Storefront page with the [locale](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/datapayload-conversion/multi-language-) selected.
* If no product set is selected for a locale, the default product set is displayed on a Storefront page with the locale selected.


{% endinfo_block %}
4. Click **Save**. This takes you to the *Overview of Content Items* page.
{% info_block warningBox "Verification" %}

Make sure the Product Set has been created:
* Above the **List of Content Items**, you can see the message: _Content item has been successfully created_.
* In the **List of Content Items**, you can see the created Product Set.

{% endinfo_block %}

***


**Tips & Tricks**
On the **Create Content Item: Product Set** page, you can do the following:

* Filter the product sets in the **Available Product Sets** table by entering a product set name in the **Search** field.
* Clear all the fields in a tab by clicking **Clear locale**.
* Go back to the *Overview of Content Items* page by clicking **Back to Content Items** in the top right corner.
{% info_block warningBox "Saving changes" %}

Make sure to click **Save** before clicking **Back to Content Items** or going to any other Back Office section. Otherwise, the changes are discarded.

{% endinfo_block %}

## Create a File List
Follow the steps to create a File List:

1. On the *Create Content Item: File List* page, enter **Name** and **Description**. The fields are mandatory. 
2. In the **Default** tab, add files to the File List as follows:
    1.  In the **Available Files** table, click **+Add to list** next to the desired files.
    {% info_block warningBox "Verification" %}

    The added files should appear in the **Selected Files** table.
    
{% endinfo_block %}
    2.  In the **Selected Files** table, sort the added files by clicking **Move Down** or **Move Up**. 

See [Content Items: Reference Information](https://documentation.spryker.com/v4/docs/content-items-reference-information#create-and-edit-abstract-product-list-content-item-page) to learn about the attributes on this page. 

3. If needed, repeat the previous step in one or more locale-specific tabs.
{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific files overwrite the default files when the File List is rendered on a Storefront page with the [locale](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/datapayload-conversion/multi-language-) selected.
* If no files are selected for a locale, the default files are displayed a Storefront page with the locale selected.

{% endinfo_block %}
  
![File list content item](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Items/Creating+Content+Items/file-list-create.png){height="" width=""}

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
***
**What's next?**
The content item is created. Now, you can add it to a CMS block. 

* To learn about adding content item to CMS blocks or a pages, see [Adding Content Item Widgets to Pages and Blocks](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/content-item-widgets/adding-content-).
* To learn about editing content items, see [Editing Content Items](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/content-management/content-items/editing-content).
