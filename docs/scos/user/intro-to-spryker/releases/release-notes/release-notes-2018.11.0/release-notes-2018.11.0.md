---
title: Release Notes 2018.11.0
description: This document contains a business level description of major new features and enhancements released in November of 2018.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-2018-11-0
originalArticleId: 32076dc8-dd8a-438c-8029-cbf2eb7cf2e3
redirect_from:
  - /2021080/docs/release-notes-2018-11-0
  - /2021080/docs/en/release-notes-2018-11-0
  - /docs/release-notes-2018-11-0
  - /docs/en/release-notes-2018-11-0
  - /v5/docs/release-notes-2018-11-0
  - /v5/docs/en/release-notes-2018-11-0
  - /v4/docs/release-notes-2018-11-0
  - /v4/docs/en/release-notes-2018-11-0
  - /v3/docs/release-notes-2018-11-0
  - /v3/docs/en/release-notes-2018-11-0
  - /v2/docs/release-notes-2018-11-0
  - /v2/docs/en/release-notes-2018-11-0
  - /v1/docs/release-notes-2018-11-0
  - /v1/docs/en/release-notes-2018-11-0
  - /v6/docs/release-notes-2018-11-0
  - /v6/docs/en/release-notes-2018-11-0
related:
  - title: Multiple and Shared Shopping Lists overview
    link: docs/scos/user/features/page.version/shopping-lists-feature-overview/shopping-lists-feature-overview.html
  - title: Shopping Cart
    link: docs/scos/user/features/page.version/cart-feature-overview/cart-feature-overview.html
  - title: Reorder feature overview
    link: docs/scos/user/features/page.version/reorder-feature-overview.html
---

 The Spryker Commerce OS is an end-to-end solution for e-commerce. This document contains a business level description of major new features and enhancements released in November of 2018.

{% info_block infoBox %}

For information about installing the Spryker Commerce OS, see [Getting Started Guide](/docs/scos/dev/developer-getting-started-guide.html).

{% endinfo_block %}

## Demo Shops
### B2B Demo Shop
Spryker’s new B2B Demo Shop was made to provide you with the right combination of modules and functionalities to represent the most common B2B commerce use case. You will get an integrated and stable product that is consistent in both technological and feature completeness point of view. This Demo Shop is our recommended starting point for all standard B2B commerce projects. It comes with the new modern look-and-feel and atomic design approach.
![B2B Demo Shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image1.png)

**Documentation**: [B2B Demo Shop](/docs/scos/user/intro-to-spryker/about-spryker.html#spryker-b2bb2c-demo-shops).

### Non-authenticated B2B Shop User Permissions Manager
Spryker has improved permissions control mechanism for non-authenticated B2B shop users. A shop administrator can hide/show specific shop features such as prices, shopping lists, an ability to add products to the cart or going to the checkout.
![Non-authenticated  B2B shop users](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image2.png)

**Documentation**: [Hide Content from Logged-out Users](/docs/scos/user/features/201811.0/customer-access-feature-overview.html)

### B2C Demo Shop
For everyone interested in B2C commerce use cases, we provide Spryker’s B2C Demo Shop. It also consists of the most common combination of modules and functionalities to cover your needs in the B2C commerce.
![B2C Demo shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image4.png)

**Documentation**: [B2C Demo Shop](/docs/scos/user/intro-to-spryker/b2c-suite.html)

### B2B Company Account
Let your customers model their company hierarchies by defining business units including multiple addresses to make the ordering process more convenient. They can create and manage users and assign roles and permissions to the Business Units to give full control where it’s needed. The Business on Behalf feature provides users with the ability to log in to different business units with the same credentials fully inheriting business unit permissions.
![B2B company account](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image8.png)

**Documentation**: [Company Account](/docs/scos/user/features/201811.0/company-account-feature-overview/company-account-feature-overview.html)

### B2B Shopping List
Shopping list is the feature that allows customers to create and share multiple lists of products between company business units or single users, allowing them to make regular or wholesale purchases in the most convenient way. All or selected products can be added to a Shopping Cart. Shopping lists can be shared between users with a different set of permissions. A user can also print a shopping list along with the barcodes.
The shopping list widget provides quick access to the available shopping lists from the top menu.
![B2B shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image16.png)

**Documentation**: [Shopping List](/docs/scos/user/features/201811.0/shopping-lists-feature-overview/shopping-lists-feature-overview.html)

### B2B Cart
Shopping cart experience has been improved and enhanced to meet B2B customers needs. Cart information is persistent throughout multiple sessions. Users can create multiple carts in their accounts and enable/disable sharing of the cart with particular users or whole business units. It is also possible to clone an existing cart with all products inside. Notes can also be added to the cart or cart item level. A user can access the list of available carts and switch between them from a shopping cart widget in the top menu.
![B2B cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image6.png)

**Documentation**: [Cart](/docs/scos/user/features/201811.0/cart-feature-overview/cart-feature-overview.html)

### Quick Order
The Quick Order functionality aims to help customers who want to purchase multiple products in bulk. A customer can prepare a list of product SKUs and quantity separated by spaces, semicolons or commas and paste it in the Quick Order page or manually add SKU and quantity per item one by one.
![Quick order](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image13.png)

**Documentation**: [Quick Order](/docs/scos/user/features/201811.0/quick-add-to-cart-feature-overview.html)

### Reorder
Customers can now resubmit any of their previous orders; the whole list of products can be reordered in one click using recent orders from Customer Account / Orders History.
![Reorder](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image9.png)

A customer can also reorder one or several products from the previous order on the Order Details page.
![Reorder on the Order details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image17.png)

**Documentation**: [Reorder](/docs/scos/user/features/201811.0/reorder-feature-overview.html)

## Product Management Enhancements
### Discontinued Products
Indicate products that are no longer available in your store with a "discontinued" label. At the same time, you can offer alternative products to your customers to keep up revenues and customer loyalty.

**Documentation**: [Discontinued Products](/docs/scos/user/features/201811.0/product-feature-overview/discontinued-products-overview.html)

### Alternative Products
A shop owner can define a list of alternative products that will be suggested to customers if the selected item is not available.
![Alternative products](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/Image+3.png)

**Documentation**: [Alternative Products](/docs/scos/user/features/201811.0/alternative-products-feature-overview.html)

### Measurement Units
The measurement units feature allows shop owners to specify multiple measurement units per product: meter, centimeter, gallon, pint, and piece. This feature provides additional flexibility to how products can be measured and sold. No matter what you sell – fruits, fabric, clothing or any other items, this feature will help you to apply custom measurement settings to any product.
![Measurement units](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image15.png)

**Documentation**: [Measurement Units](/docs/scos/user/features/201811.0/measurement-units-feature-overview.html)

### Packaging Units
Offer cost-efficient and flexible packaging units that suit the type of the product and your customer needs, such as bags, palettes, or packets in addition to single item packaging.

Packaging units can either contain a fixed or variable quantity of items.
![Packaging units](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image18.png)

**Documentation**: [Packaging Units](/docs/scos/user/features/201811.0/packaging-units-feature-overview.html)

### Barcode Generator
Enrich your products with an individual barcode that is generated based on the SKU number. The barcode can be printed for scanning directly from a product or attached to a shopping list for easy reordering.

**Documentation**: [Barcode Generator](/docs/scos/user/features/201811.0/product-barcode-feature-overview.html)

### Products Restrictions
With the Product Restrictions feature, you as a shop owner can easily define who of your customers gets to see what items or categories. Any item in your product catalog can be either whitelisted or blacklisted per customer. The lists can be uploaded or imported to make it easier to set up.

**Documentation**: [Product Restrictions](/docs/scos/user/features/{{site.version}}/merchant-product-restrictions-feature-overview.html)

### Merchant Concept
We have introduced the concept of Merchant to allow our customers to implement the Marketplace functionality. In a non-marketplace setup, there is always one Merchant. Product Restrictions and Customer Specific Prices are implemented by linking a B2B customer to the Merchant.

**Documentation**: [Merchants and Merchant Relations](/docs/scos/user/features/{{site.version}}/merchant-b2b-contracts-feature-overview.html)

## General Cart Enhancements
### Minimum Order Value
Easily set a minimum order value for any of your products where either the customer cannot proceed to checkout unless the value is reached, or the difference is added as a special fee to the total sum.
![Minimum order value](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image11.png)

**Documentation**: [Minimum Order Value](/docs/scos/user/features/{{site.version}}/checkout-feature-overview/order-thresholds-overview.html)

## Price Management Enhancements
### Net/Gross Price
You can easily manage gross and net prices per product, country, and currency. Please note that you cannot mix Net and Gross prices in the same shopping cart.
![Net and gross price](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image14.png)

**Documentation**: [Net &amp; Gross Prices](/docs/scos/dev/back-end-development/data-manipulation/datapayload-conversion/net-and-gross-prices-management.html)

### Volume Prices
With the Volume Prices feature, you can define individual prices for a product for different order quantities. Set specific volume thresholds for your products to encourage your customers to purchase larger quantities of a product in order to receive the special volume discount.
![Volume prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image12.png)

**Documentation**: [Volume Prices](/docs/scos/user/features/201811.0/prices-feature-overview/volume-prices-overview.html)

### Customer-specific Prices
Offer your customers individual agreements and customize the prices per business unit accordingly. To avoid unnecessary repetition of values, the data is compressed in the database.
![Customer-specific price](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image7.png)

The shop owner can set up a price per merchant/business unit combination.
![Customer-specific price per merchant unit combination](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image10.png)

**Documentation**: [Prices per Merchant Relations](/docs/scos/user/features/201811.0/merchant-custom-prices-feature-overview.html)

### Agent Assist
With the Agent Assist feature, you may enable your employees to help your customers with true efficiency, all while operating the same storefront interface. No more confusing backend UI. Agent Assist allows your employees to log-in to the storefront using a particular URL, search for a customer to assist and pick them up to do business on their behalf. A feature flag in the session allows for versatile customizations of the storefront functionality during an agent assist session. This feature may also be used as a point of sale solution in physical retail stores.
![Agent assist](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image3.png)

**Documentation**: [Agent Assist](/docs/scos/user/features/{{site.version}}/agent-assist-feature-overview.html)

### Add Concrete Product to Existing Abstract Product
With this improvement, you will be able to attach new product concretes to existing abstract products directly in the backend interface.

**Documentation**: [Products](/docs/scos/user/features/201811.0/product-feature-overview/product-feature-overview.html)
