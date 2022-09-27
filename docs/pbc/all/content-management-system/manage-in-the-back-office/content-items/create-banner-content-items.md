---
title: Create banner content items
description: Learn how to create banner content items in the Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
---

This topic describes how to create content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#create-banner-content-items) before you start, or look up the necessary information as you go through the process.

## Create a banner content item

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. On the **Overview of Content Items** page, click **Add Content Item&nbsp;<span aria-label="and then">></span> Banner**.
3. On the **Create Content Item: Banner** page, enter a **NAME**.
4. Optional: Enter a **DESCRIPTION**.
5. On the **Default** tab, enter the following:
    * **TITLE**.
    * **SUBTITLE**
    * **IMAGE URL**
    * **CLICK URL**
    * **ALT-TEXT**
6. Optional: Repeat the previous step on the needed locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* Locale-specific values overwrite the default values when the banner is rendered on a Storefront page with the [locale](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/multi-language-setup.html) selected.
* If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

7. Click **Save**.
    This takes you to the **Overview of Content Items** page with a success message displayed. The content item is displayed in the list.

**Tips and tricks**

To clear all the fields on a tab, click **Clear locale**.



## Reference information: Create banner content items

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Name | Name of a banner content item. |
| DESCRIPTION  | Descriptive information on what a banner is used for.  |
| TITLE |  Heading of the banner.|
| SUBTITLE| Text of the banner. |
| IMAGE URL | Address where the image element of the banner content item is stored.  |
| CLICK URL | URL of the target page to which your shop visitors are redirected. |
| ALT-TEXT | Some additional text that describes the image. |

### Reference information: Banner content item widget

The widget allows you to display a Banner content item on the defined sections of a page or block.

**Use case example:** The widget might be used to display a banner to promote products of a specific brand or hold a marketing campaign on the website.

You can view how it looks like on the store website:

* **B2C**
    Template used: Big Banner w/Middle Title and Subtitle
![Banner content item widget B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/banner-yves-b2c.gif)

* **B2B**
    Template used: Big Banner Left Title, Subtitle and Button
![Banner content item widget B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/banner-template-b2b.png)



### Reference information: Banner content item widget templates

The following templates are used to set up a Banner content item widget:

#### Bottom title

Displays a title and a subtitle of the banner at the bottom of the image. Clicking any element of the banner will redirect your shop visitors to the target page.

{% info_block warningBox "For B2B:" %}

Displays a title and a subtitle of the banner, and the Shop Now button at the bottom of the image.

{% endinfo_block %}

See how the **Bottom title** template looks like on Yves:

* **White Label**
![Banner bottom title white label](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-bottom-title-white-label.png)

* **B2B Shop**
![Banner bottom title B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-bottom-title-b2b.png)

* **B2C Shop**
![Banner bottom title B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-bottom-title-b2c.png)

#### Top title

Displays a title and a subtitle of the banner in the upper part of the image. Clicking any element of the banner will redirect your shop visitors to the target page.

{% info_block warningBox "For B2B:" %}

Displays a title and a subtitle of the banner, and the Shop Now button in the upper part of the image.

{% endinfo_block %}

See how the **Top Title** template looks like on Yves:

* **White Label**

![Banner top title white label](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-top-title-white-label.png)

* **B2B Shop**
![Banner top-title B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-top-title-b2b.png)

* **B2C Shop**
![Banner top title B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-top-title-b2c.png)

#### Big banner w/middle title and subtitle

Displays a title and a subtitle of the banner in the middle of the image. Clicking any element of the banner will redirect your shop visitors to the target page.

See how the **Big Banner w/Middle Title and Subtitle** template looks like on Yves:

* **B2C Shop**
![Big banner w/middle title and subtitle](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-with-link-b2c.png)

####  Big banner w/middle title and subtitle without link  
Displays a title and a subtitle of the banner in the middle of the image and makes it non-clickable.

See how the **Big Banner w/Middle Title and Subtitle without link** template looks like on Yves:

 * **B2C Shop**   
![Banner without link](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-without-link-b2c.png)

#### Big banner left title, subtitle and button

Displays a title, a subtitle, and a **Shop Now** button on the left of the banner. Clicking any element of the banner will redirect your shop visitors to the target page.

See how the **Big Banner Left Title, Subtitle and Button** template looks like on Yves:

* **B2B Shop**
![Big banner left title, subtitle and button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+templates:+Reference+Information/banner-left-button-b2b.png)
