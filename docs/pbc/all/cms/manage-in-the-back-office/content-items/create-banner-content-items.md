Create a banner content item






This topic describes how to create content items in the Back Office.

## Prerequisites

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

##

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.


On the **Overview of Content Items** page, click **Add Content Item** in the top right corner of the page.
2.  Select a content item type you want to create and follow the steps from the corresponding section:
    * [Create a banner](#create-a-banner-content-item)
    * [Create an abstract product list](#create-an-abstract-product-list-content-item)
    * [Create a product set](#create-a-product-set-content-item)
    * [Create a file list](#create-a-file-list-content-item)
    * [Create a navigation](#create-a-navigation-content-item)

To learn about the content item types, see [Content item types: Module relations](/docs/scos/dev/feature-walkthroughs/{{page.version}}/content-items-feature-walkthrough/content-item-types-module-relations.html).


## Create a banner content item

{% info_block infoBox %}

For the use cases and examples of the banner content item, see [Banner Content Item Widget](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/references/reference-information-content-item-widgets-types.html#banner-content-item-widget) and [Banner Content Item Widget Templates](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/references/reference-information-content-item-widgets-templates.html#banner-content-item-widget-templates).

{% endinfo_block %}

1. On the **Create Content Item: Banner** page, enter a **NAME**.
2. Optional: Enter a **Description**.
3. On the **Default** tab, enter the following:
    * **TITLE**
    * **SUBTITLE**
    * **IMAGE URL**
    * **CLICK URL**
    * **ALT-TEXT**

3. Optional: Repeat the previous step on the needed tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific values overwrite the default values when the banner is rendered on a Storefront page with the [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html) selected.
* If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

4. Click **Save**.
    This takes you to the **Overview of Content Items** page with a success message displayed. The content item is displayed in the list.

**Tips and tricks**

To clear all the fields on a tab, click **Clear locale**.

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
