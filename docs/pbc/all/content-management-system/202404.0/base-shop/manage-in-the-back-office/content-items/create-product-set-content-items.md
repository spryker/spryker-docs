---
title: Create product set content items
description: Learn how to create product set content items in the Back Office.
last_updated: Oct 22, 2022
template: back-office-user-guide-template
redirect_from:
- /docs/pbc/all/content-management-system/202204.0/base-shop/manage-in-the-back-office/content-items/create-product-set-content-items.html
---

This topic describes how to create product set content items in the Back Office.

## Prerequisites

Make sure to review [reference information](#reference-information-create-product-set-content-items) before you start, or look up the necessary information as you go through the process.

## Create a product set content item

1. Go to **Content&nbsp;<span aria-label="and then">></span> Content Items**.
2. On the **Overview of Content Items** page, click **Add Content Item&nbsp;<span aria-label="and then">></span> Product Set**.
3. On the **Create Content Item: Product Set** page, enter a **NAME**
4. Optional: Enter a **DESCRIPTION**.
5. In the **Available Product Sets** section, click **Add** next to the product set you want to add to the list.
    The product set appears in the **Default** tab.
7. Optional: Repeat the previous step on one or more locale-specific tabs.

{% info_block infoBox "Multi-language setup" %}

The following logic applies in a multi-language setup:
* A locale-specific product set overwrites the default product set when the product set content item is rendered on a Storefront page with the [locale](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/datapayload-conversion/multi-language-setup.html) selected.
* If no product set is selected for a locale, the default product set is displayed on a Storefront page with the locale selected.

{% endinfo_block %}

8. Click **Save**.
    This opens the **Overview of Content Items** page with a success message displayed. The content item is displayed in the list.


## Reference information: Create product set content items

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Unique identifier of the content item. You will use it when adding the content item to CMS pages and blocks. |
| DESCRIPTION | Description for internal usage. |


### Reference information: Product set content item widget

The widget allows you to add a Product Set content item to any placeholders of a page or block. The Product Set widget can be displayed as a slider or carousel.

**Use case example:** The widget can be used to display a product set containing, for example, Basic Office Supplies, on a page from which your customers can select and add an item or all items to the cart with one click.

You can view how it looks like on the store website:

* **B2C**
Template used: Images left side, products right side and only add all button)
![Product set content item widget B2C](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/product-set-yves-b2c.png)

* **B2B**
Template used: Product Set for landing pages
![Product set content item widget B2B](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Content+Management+System/Content+Item+Widgets/Content+Item+Widgets+types%3A+Reference+Information/product-set-template-b2b.png)
