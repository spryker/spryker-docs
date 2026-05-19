---
title: Create abstract product list content items
description: Learn how to create and manage abstract product list content items in the Spryker Cloud Commerce OS Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
redirect_from:
- /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/content-items/create-abstract-product-list-content-items.html
---

This topic describes how to create abstract product list content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#reference-information-create-abstract-product-list-content-items) before you start, or look up the necessary information as you go through the process.

## Create an abstract product list content item

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. On the **Overview of Content Items** page, click **Add Content Item&nbsp;<span aria-label="and then">></span> Abstract Product List**.
3. On the **Create Content Item: Abstract Product List** page, enter a **NAME**
4. Optional: Enter a **DESCRIPTION**.
5. In the **Add more products** section, click **Add to list** next to the products you want to add to the list.
    The products appear in the **Default** tab.
6. Optional: To reorder the added products, click **Move Up** or **Move Down** next to the needed products.  
7. Optional: Repeat steps 5-6 on one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
- Locale-specific products overwrite the default products when the Abstract Product List is rendered on a Storefront page with the [locale](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/multi-language-setup.html) selected.
- If no products are selected for a locale, the default products are displayed on a Storefront page with the locale selected.

{% endinfo_block %}

8. Click **Save**.
  This opens the **Overview of Content Items** page with a success message displayed. The created content item is displayed in the list.

**Tips and tricks**

To clear product selection on a tab, click **Clear locale**.

## Reference information: Create abstract product list content items

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Unique identifier of the content item. You will use it when adding the content item to CMS pages and blocks. |
| DESCRIPTION | Description for internal usage. |


### Reference information: Abstract product list content item widget

The widget allows you to add an Abstract Product List content item to any placeholders of a page or block.

**Use case example:** The widget can be used to display a list of products for a specific promoting campaign, for example, the Best Selling items, or a list of frequently used products on a page.

You can view how it looks like on the store website:

- **B2C**
Template used: Slider with product category info
![Abstract product list content item widget B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/abstract-product-list-yves-b2c.png)

- **B2B**
Template used: Product Slider for store/landing pages
![Abstract product list content item widget B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/apl-template-b2b.png)
