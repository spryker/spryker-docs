---
title: Shop Guide - Shopping Lists
description: Use the procedures to create, update, share, and print shopping lists, dismiss shared shopping lists, and add items to a shopping list.
last_updated: May 19, 2020
template: howto-guide-template
originalLink: https://documentation.spryker.com/v1/docs/shopping-lists-shop-guide
originalArticleId: 7c295ea1-f32b-4350-a794-0bd33737859d
redirect_from:
  - /v1/docs/shopping-lists-shop-guide
  - /v1/docs/en/shopping-lists-shop-guide
related:
  - title: Multiple and Shared Shopping Lists overview
    link: docs/scos/user/features/page.version/shopping-lists-feature-overview/shopping-lists-feature-overview.html
  - title: Shopping List Notes overview
    link: docs/scos/user/features/page.version/shopping-lists-feature-overview/shopping-list-notes-overview.html
  - title: Shopping list printing overview
    link: docs/scos/user/features/page.version/shopping-lists-feature-overview/shopping-list-printing-overview.html
---

The **Shopping Lists** page allows customers to create and manage the shopping lists of frequently purchased products and add all the items to the cart as well as manage existing shopping lists.

There are two ways to open the **Shopping Lists** page:

{% info_block infoBox %}

Make sure that you are logged in to your customer account.

{% endinfo_block %}

1. Go to the header of your shop application and click Shopping Lists.
![Shopping lists header](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/header-shopping-lists.png)

2. In your **Customer Account**, select **Shopping Lists** on the left-side navigation bar.
![Shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/shopping-list-shop-guide.png)
***
## Graphic User Interface

{% info_block infoBox %}

Hover your mouse over the numbers to view their description.

{% endinfo_block %}

![Shopping lists GUI](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/shop-lists-gui.png)
***
## Creating a New Shopping List

{% info_block warningBox %}

Keep in mind that you must be logged in to your customer account.

{% endinfo_block %}

To create a shopping list, enter a shopping list name and click **+ Create shopping list**.
![Create a shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/create-shopping-list-btn.png)

A new shopping list appears in the table of your shopping lists.
**
## Adding Items to a New Shopping List

After you have created a shopping list, there are no items in it. Thus, the next step is to add product items to this list.

There are two ways to add items to your shopping list:

* From a product detail page
* <a href="#editing-shopping-lists">While editing the shopping list</a>
***
## Adding Products from the Product Detail Page

1. Navigate to a product detail page of the product you would like to add to a shopping list.
2. From the drop-down list, select the name of the shopping list where you want to add a product item and click **Add to Shopping list**.
![Add to shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/add-to-shopping-list-btn.png)

The product item will be successfully added to your shopping list.
***
## Managing Shopping Lists

Customers can _view_ their own or shared shopping lists, _edit, share, print, delete_ them, and _add_ them _to cart_ on the _Shopping lists_ page.

### Editing Shopping Lists

To edit a shopping list, click **Edit** next to the shopping list you would like to change.

![Editing shopping lists](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/edit-btn.png)

The _Edit shopping list_ page opens where you can:

* Add an item to a shopping list. For this, search an item by its SKU or name (1), specify the quantity (2), and then add it to the shopping list (3).
![Quick add to a shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/quick-add-to-shopping-list-window.png)

{% info_block warningBox %}

To be able to search for products, make sure that [Search Widget for Concrete Products](/docs/scos/user/features/201903.0/product-feature-overview/search-widget-for-concrete-products-overview.html) feature is [integrated](/docs/scos/dev/feature-integration-guides/201903.0/search-widget-for-concrete-products-feature-integration.html) into your Project.

{% endinfo_block %}

* View the shopping list owner and access rights.
![View a shopping list owner and access rights](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/view-owner-on-edit-page.png)

* View the shopping list details: its price, name, SKU, etc.
* Change the product item quantity using minus and plus buttons.
![View details](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/view-details.png)

* Add a note to the item. To save the note, click **Save**. See [Shopping List Notes Feature Overview](https://docs.demo-spryker.com/v4/docs/shopping-list-notes-overview) for more details.

* Select the warranty option from the drop-down list.
![Warranty options](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/warranty-options.png)

* Select the insurance option.
![Insurance option](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/insurance-option.png)

* Remove the item from the shopping list.
![Remove the item from the shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/remove-btn.png)

* Remove all product items from the shopping list by clicking **Remove all** at the bottom of the list.
* Delete the shopping list. To do this, click **Delete** at the bottom of the shopping list.

To keep the changes, click **Submit**.

### Sharing Shopping Lists

You can share (grant access rights) your shopping lists with business units or individual customers.

To share a shopping list:

1.  Click **Share** on the _Shopping lists_ page.
![Share button](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/share-btn.png)

2. From the **drop-down list** next to the business unit or customer you want to share a shopping list with, select the appropriate access rights level.

{% info_block infoBox %}

See [Permissions Management for Shared Shopping Lists](/docs/scos/user/features/{{page.version}}/shopping-lists-feature-overview/multiple-and-shared-shopping-lists-overview.html) to learn more about types of shopping list access rights.

{% endinfo_block %}

![Share page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/share-page.png)

3. Click **Share**.

### Printing Shopping Lists

Here you can print your own and shared shopping lists of products with their barcodes.

To print a shopping list, click **Print** on the _Shopping lists_ page.
![Printing a shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/print-btn.png)

This will open the shopping list containing its ID, name, product SKU and barcode, product name, default price, and a note (if any), which you can print.
![Printable shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/printable-shopping-list.png)

### Deleting a Shopping List

Clicking **Delete** will delete a shopping list from your shopping lists.
![Delete a shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/delete-btn.png)

### Adding Shopping Lists to Cart

It is possible to add selected shopping lists to cart with one click.

To add a shopping list with product items to cart, select the shopping list (lists) in the _Name_ column and click **Add selected to cart**.

![Add selected to cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/place-order.png)

The shopping list with the available items will be added to the shopping cart. See [Shopping Cart](/docs/scos/user/features/{{page.version}}multiple-carts-feature-overview.html#multiple-carts-per-user-on-the-storefront) to learn how to manage and purchase items using the cart.

### Dismissing Shared Shopping Lists

If you do not need a shopping list shared with you, you can remove it from your shopping lists.

To remove a **shared** list, click **Dismiss** for the respective list.
![Dismissing a shared shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Shopping+Lists/dismiss-btn.png)

This will delete the shared shopping list from your customer account.

<!-- Last review date: Aug 06, 2019by Oksana Karasyova -->
