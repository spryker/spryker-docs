---
title: Shop Guide - Managing Products
originalLink: https://documentation.spryker.com/v4/docs/shop-guide-managing-products
redirect_from:
  - /v4/docs/shop-guide-managing-products
  - /v4/docs/en/shop-guide-managing-products
---

This article describes how you, as a Buyer, can manage products in the Storefront, and provides step-by-step instructions on how to add products to the shopping cart, shopping lists and wishlists, and add the product reviews.
***
You, as a Buyer, can manage and perform all the actions on products from the **Product detail page** as well as view main details of the specific product, for example, a price, a product SKU, general description of the product, customer reviews, and other relevant information you may be interested in before making a final purchase decision.
***
You can navigate to a product detail page from:

* Home page by clicking a product card
* Catalog page by clicking a product card
* Shopping list by clicking a product name
* Search results page by clicking a product card
* Search bar > Products section

![Ways to navigate to a product detail page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/pdp-video-gif.gif){height="" width=""}

On the product detail page, you can view some general product information that includes:

* Product name
* Image with the product label displayed (if available)
* SKU of the concrete product
* Price (default and original)
* Product group 
* Product options
* Product description
* Product attributes
* Product reviews 

<details open>
<summary>For the descriptions of the elements you see on the page, expand this section:</summary>
    
![Basic elements available on the product detail page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/basic-elements.png){height="" width=""}
    
| # | Element | Description |
| --- | --- | --- |
| 1 | **Product name** | Name of the product: text that uniquely identifies it. |
| 2 | **Product label** | Text assigned to the product to highlight it in the online store. |
| 3 | **SKU** | Unique identifier of the product. |
| 4 | **Product price (default and original)** | *Default* price is the actual current price in the currency you’ve selected, while an *original* price (strikeout) is the price that has been applied before the default price is used due to some product promotion. |
| 5 | **Ratings** | Product star rating. |
| 6 | **Product group** | Set of products grouped by color. |
| 7 | **Product options** | Additional items you can purchase along with the product. The examples can be gift wrapping, warranty, and insurance. See [Product Options Overview](https://documentation.spryker.com/v4/docs/product-options-overview#product-options-overview) for more information. |
| 8 | **Add to Cart section** | Section you can use to add a product to a cart. See the Adding a Product to Cart section for more details. |
| 9 | **Add to Shopping list section** | Section you can use to add a product to a shopping list. See the Adding a Product to Shopping List section for more details. |
| 10 | **Add to Wishlist section** | Section you can use to add a product to a wishlist. See the Adding a Product to Wishlist section for more details. |
| 11 | **Product description** | Detailed description of the product that allows customers to see product features and benefits they may get using the product. |
| 12 | **Product attributes** | List of product characteristics that make it distinct from other products, such as a brand, a size, etc. |
    
</br>
</details>

If a shop owner offers some additional items (product options), you can add them to the cart together with the product you are going to purchase, for example, warranty, insurance or gift wrapping, or leave your feedback regarding the product in the **Ratings & Reviews** section. 

Under **Ratings & Reviews**, a set of **similar products** can be displayed. In this set, shop owners usually recommend products that are similar in properties to the product you are viewing and might match the requirements you are looking for in the product. If you want to view or add the product to the cart, click the product card. This will redirect you to the product detail page of this specific product where you can view product information and/or add it to the cart. 

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/reviews-and-slots.png){height="" width=""}
***
To sum up, on the product detail page, you can do the following:

* View the product information
* Add the product to the cart
* Add the product to the shipping list or wishlist (if applicable for the shop)
* Set a rating and share your feedback about the product
* Navigate to the PDP pages of other products displayed on the page
***
## Adding a Product to Cart

{% info_block warningBox "If you have the Multiple Carts feature enabled, then:" %}


Prior to adding a product to the cart, make sure that you’ve selected the cart you need. For this, on top of the page, in the My cart widget, select the cart to which you want to add the product.
You have the following options to select the shopping cart:

* select the cart from the five carts displayed by default in the widget
* select the cart from all available carts by clicking **All Carts** in the widget
* create a new cart by clicking **Create New Cart**. Then, enter the name of the cart in the **Cart Name** field, and click **Submit**. For more information on how to create carts, see [Shop Guide - Creating a Shopping Cart](/docs/scos/dev/user-guides/202001.0/shop-user-guide/shop-guide-shopping-carts/creating-shoppi).

![Shopping cart widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/shopping-cart-widget.png){height="" width=""}

{% endinfo_block %}

**To add a product to the cart:**

1. (Optional) Select the product options from the drop-down list.
2. Specify the quantity of the product you want to purchase. By default, the quantity equals **1**.
3. (Optional) Clear the **Add as separate item** checkbox if you do not want to add this product as a separate item to the order. By default, this checkbox is selected.
4. To complete the operation, click **Add to Cart**. The items will be added to the selected (active) shopping cart. See [Shop Guide - Checkout](/docs/scos/dev/user-guides/202001.0/shop-user-guide/shop-guide-checkout/checkout-shop-g) to learn more about how to proceed with the order.

![Add to cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/add-to-cart-howto.png){height="" width=""}
***
## Adding a Product to Shopping List

{% info_block warningBox %}

The shopping lists are available only for **B2B** shop users.

{% endinfo_block %}

You can order frequently bought products faster by adding the products to a [shopping list](https://documentation.spryker.com/v4/docs/multiple-shared-shopping-lists-overview-201907).

**To add a product to the shopping list:**

1. From the drop-down list, select the shopping list to which you want to add the product.
2. Specify the quantity of the product and click **Add to Shopping list**. The item will be added to the shopping list you’ve selected. For more information on managing shopping lists, see [Shop Guide - Shopping Lists](/docs/scos/dev/user-guides/202001.0/shop-user-guide/shopping-lists-).

![Add to shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/add-to-shopping-list-howto.png){height="" width=""}

**Tips & Tricks**

If you have no shopping lists created in your account, a drop-down list with shopping lists will be unavailable. Clicking **Add to Shopping list** will create a new shopping list with the default name ‘Shopping List’ and add the product to it.
***
## Adding a Product Review
With the [Product Reviews](/docs/scos/dev/features/202001.0/product-information-management/product-reviews) feature, you can share your experience or feedback about using the product.

**To add a review:**

1. In the **Ratings & Reviews > Product Ratings** section, click **Add a Review**.

{% info_block warningBox %}

If you have not been logged in, the **Sign Up / Sign In** page opens.

{% endinfo_block %}

2. In the Add a Review section, populate the required fields:

* rating
* customer name
* summary
* description

![Add a product review](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/add-review-howto.png){height="" width=""}

3. To keep the changes, click **Submit**. The review will be saved and sent to the shop administrator for further processing.

**Tips & Tricks**

If you want to discard the changes you’ve added, click **Cancel**.
***
## Adding a Product to Wishlist

{% info_block warningBox %}

The wishlists are available only for logged in **B2C** shop users.

{% endinfo_block %}

If you want to purchase later the items you are interested in, you can add them to a [wishlist](/docs/scos/dev/features/202001.0/wishlist/multiple-wishli).

To add a product to the wishlist, click **Add to Wishlist**. This will add the product to a newly created wishlist with the default name ‘My wishlist’ in your account and redirect you to the **Customer Account > Wishlist** section.

If you have several wishlists in your account, then first, select the wishlist to which you want to add the product, and then click **Add to Wishlist**. The product will be saved to the selected wishlist.

![Add products to a wishlist](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Managing+Products/adding-to-wishlist.png){height="" width=""}
***

**What’s next?**

After you added the product to the cart, you can proceed with the checkout. For more information, see [Shop Guide - Checkout](https://documentation.spryker.com/v4/docs/checkout-shop-guide-201911#shop-guide---checkout).

To learn how to create and manage shopping lists, see [Shop Guide - Shopping Lists](https://documentation.spryker.com/v4/docs/shopping-lists-shop-guide#shop-guide---shopping-lists).

To learn how to create and manage wishlists, see [Shop Guide - Managing Wishlists](/docs/scos/dev/user-guides/202001.0/shop-user-guide/shop-guide-wish). 
