---
title: Create navigation content items
description: Learn how to create and manage navigation content items in the Spryker Cloud Commerce OS Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
redirect_from:
- /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/content-items/create-navigation-content-items.html
- /docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/content-items/create-navigation-content-items.html
---

This topic describes how to create navigation content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#reference-information-create-navigation-content-items) before you start, or look up the necessary information as you go through the process.

## Create a navigation content item

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. On the **Overview of Content Items** page, click **Add Content Item&nbsp;<span aria-label="and then">></span> Navigation**.
3. On the **Create Content Item: Product Set** page, enter a **NAME**.
4. Optional: Enter a **DESCRIPTION**.
5. On the **Default** tab, for **NAVIGATION**, select a navigation element.
6. Optional: Repeat the previous step on the needed locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
- Locale-specific values overwrite the default values when the banner is rendered on a Storefront page with the [locale](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/multi-language-setup.html) selected.
- If the fields are not filled out for a locale, the default values are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

7. Click **Save**.
    This opens the **Overview of Content Items** page with a success message displayed. The content item is displayed in the list.


**Tips and tricks**
To clear navigation selection on a tab, click **Clear locale**.


## Reference information: Create navigation content items

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Name of the content item. |
| DESCRIPTION | Description of the content item. |
| NAVIGATION | A navigation element to display in the content item. To create one, see [Create navigation elements](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/navigation/create-navigation-elements.html) |

## Next steps

- [Add content items to CMS pages and blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/add-content-items-to-cms-blocks.html).
- [Edit content items](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/content-items/edit-content-items.html).
