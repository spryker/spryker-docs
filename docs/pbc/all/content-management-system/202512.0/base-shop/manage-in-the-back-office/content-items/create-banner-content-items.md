---
title: Create banner content items
description: Learn how to create and manage banner content items in the Spryker Cloud Commerce OS Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/content/content-items/references/reference-information-content-item-widgets-types.html
  - /docs/scos/user/back-office-user-guides/202311.0/content/content-items/creating-content-items.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.html
---

This topic describes how to create content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#reference-information-create-banner-content-items) before you start, or look up the necessary information as you go through the process.

## Create a banner content item

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. On the **Overview of Content Items** page, click **Add Content Item&nbsp;<span aria-label="and then">></span> Banner**.
3. On the **Create Content Item: Banner** page, enter a **NAME**.
4. Optional: Enter a **DESCRIPTION**.
5. On the **Default** tab, enter the following:
    - **TITLE**.
    - **SUBTITLE**
    - **IMAGE URL**
    - **CLICK URL**
    - **ALT-TEXT**
6. Optional: Repeat the previous step on the needed locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
- Locale-specific values overwrite the default values when the banner is rendered on a Storefront page with the [locale](/docs/pbc/all/order-management-system/latest/base-shop/datapayload-conversion/multi-language-setup.html) selected.
- If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

7. Click **Save**.
    This opens the **Overview of Content Items** page with a success message displayed. The content item is displayed in the list.

**Tips and tricks**

To clear all the fields on a tab, click **Clear locale**.



## Reference information: Create banner content items

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Unique identifier of the content item. You will use it when adding the content item to CMS pages and blocks. |
| DESCRIPTION | Description for internal usage. |
| TITLE |  Heading of the banner.|
| SUBTITLE| Text of the banner. |
| IMAGE URL | Address where the image element of the banner content item is stored.  |
| CLICK URL | URL of the target page to which your shop visitors are redirected. |
| ALT-TEXT | Some additional text that describes the image. |

### Reference information: Banner content item widget

The widget allows you to display a Banner content item on the defined sections of a page or block.

**Use case example:** The widget might be used to display a banner to promote products of a specific brand or hold a marketing campaign on the website.

You can view how it looks like on the store website:

- **B2C**
    Template used: Big Banner w/Middle Title and Subtitle
<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/content-management-system/base-shop/manage-in-the-back-office/content-items/create-banner-content-items.md/banner-yves-b2c.mp4" type="video/mp4">
  </video>
</figure>

- **B2B**
    Template used: Big Banner Left Title, Subtitle and Button
![Banner content item widget B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/banner-template-b2b.png)
