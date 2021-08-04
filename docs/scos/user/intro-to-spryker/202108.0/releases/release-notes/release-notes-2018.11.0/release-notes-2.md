---
title: Release Notes 2018.11.0
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-2018-11-0
redirect_from:
  - /2021080/docs/release-notes-2018-11-0
  - /2021080/docs/en/release-notes-2018-11-0
---

 The Spryker Commerce OS is an end-to-end solution for e-commerce. This document contains a business level description of major new features and enhancements released in November of 2018.

{% info_block infoBox %}
For information about installing the Spryker Commerce OS, see [Getting Started Guide](/docs/scos/dev/developer-guides/201811.0/installation/dev-getting-sta
{% endinfo_block %}.

## Demo Shops
### B2B Demo Shop
Spryker’s new B2B Demo Shop was made to provide you with the right combination of modules and functionalities to represent the most common B2B commerce use case. You will get an integrated and stable product that is consistent in both technological and feature completeness point of view. This Demo Shop is our recommended starting point for all standard B2B commerce projects. It comes with the new modern look-and-feel and atomic design approach.
![B2B Demo Shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image1.png){height="" width=""}

**Documentation**: [B2B Demo Shop](/docs/scos/dev/about-spryker/201811.0/demoshops).
        
### Non-authenticated B2B Shop User Permissions Manager
Spryker has improved permissions control mechanism for non-authenticated B2B shop users. A shop administrator can hide/show specific shop features such as prices, shopping lists, an ability to add products to the cart or going to the checkout.
![Non-authenticated  B2B shop users](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image2.png){height="" width=""}

**Documentation**: [Hide Content from Logged-out Users](/docs/scos/dev/features/201811.0/company-account-management/hide-content-from-logged-out-users/hide-content-fr)

### B2C Demo Shop
For everyone interested in B2C commerce use cases, we provide Spryker’s B2C Demo Shop. It also consists of the most common combination of modules and functionalities to cover your needs in the B2C commerce.
![B2C Demo shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image4.png){height="" width=""}

**Documentation**: [B2C Demo Shop](https://documentation.spryker.com/v1/docs/demoshops#b2c-demo-shop)

### B2B Company Account
Let your customers model their company hierarchies by defining business units including multiple addresses to make the ordering process more convenient. They can create and manage users and assign roles and permissions to the Business Units to give full control where it’s needed. The Business on Behalf feature provides users with the ability to log in to different business units with the same credentials fully inheriting business unit permissions.
![B2B company account](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image8.png){height="" width=""}

**Documentation**: [Company Account](https://documentation.spryker.com/v1/docs/company-account)

### B2B Shopping List
Shopping list is the feature that allows customers to create and share multiple lists of products between company business units or single users, allowing them to make regular or wholesale purchases in the most convenient way. All or selected products can be added to a Shopping Cart. Shopping lists can be shared between users with a different set of permissions. A user can also print a shopping list along with the barcodes.
The shopping list widget provides quick access to the available shopping lists from the top menu.
![B2B shopping list](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image16.png){height="" width=""}

**Documentation**: [Shopping List](/docs/scos/dev/features/201811.0/shopping-list/shopping-list)

### B2B Cart
Shopping cart experience has been improved and enhanced to meet B2B customers needs. Cart information is persistent throughout multiple sessions. Users can create multiple carts in their accounts and enable/disable sharing of the cart with particular users or whole business units. It is also possible to clone an existing cart with all products inside. Notes can also be added to the cart or cart item level. A user can access the list of available carts and switch between them from a shopping cart widget in the top menu.
![B2B cart](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image6.png){height="" width=""}

**Documentation**: [Cart](/docs/scos/dev/features/201811.0/shopping-cart/cart)

### Quick Order
The Quick Order functionality aims to help customers who want to purchase multiple products in bulk. A customer can prepare a list of product SKUs and quantity separated by spaces, semicolons or commas and paste it in the Quick Order page or manually add SKU and quantity per item one by one.
![Quick order](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image13.png){height="" width=""}

**Documentation**: [Quick Order](https://documentation.spryker.com/docs/quick-order-201903)

### Reorder
Customers can now resubmit any of their previous orders; the whole list of products can be reordered in one click using recent orders from Customer Account / Orders History.
![Reorder](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image9.png){height="" width=""}

A customer can also reorder one or several products from the previous order on the Order Details page.
![Reorder on the Order details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image17.png){height="" width=""}

**Documentation**: [Reorder](/docs/scos/dev/features/201811.0/order-management/reorder)

## Product Management Enhancements
### Discontinued Products
Indicate products that are no longer available in your store with a "discontinued" label. At the same time, you can offer alternative products to your customers to keep up revenues and customer loyalty.

**Documentation**: [Discontinued Products](/docs/scos/dev/features/201811.0/product-management/discontinued-products/discontinued-pr)

### Alternative Products
A shop owner can define a list of alternative products that will be suggested to customers if the selected item is not available.
![Alternative products](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/Image+3.png){height="" width=""}

**Documentation**: [Alternative Products](/docs/scos/dev/features/201811.0/product-management/alternative-products/alternative-pro)

### Measurement Units
The measurement units feature allows shop owners to specify multiple measurement units per product: meter, centimeter, gallon, pint, and piece. This feature provides additional flexibility to how products can be measured and sold. No matter what you sell – fruits, fabric, clothing or any other items, this feature will help you to apply custom measurement settings to any product.
![Measurement units](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image15.png){height="" width=""}

**Documentation**: [Measurement Units](/docs/scos/dev/features/201811.0/packaging-and-measurement-units/measurement-units/measurement-uni)

### Packaging Units
Offer cost-efficient and flexible packaging units that suit the type of the product and your customer needs, such as bags, palettes, or packets in addition to single item packaging.

Packaging units can either contain a fixed or variable quantity of items.
![Packaging units](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image18.png){height="" width=""}

**Documentation**: [Packaging Units](/docs/scos/dev/features/201811.0/packaging-and-measurement-units/packaging-units/packaging-units)

### Barcode Generator
Enrich your products with an individual barcode that is generated based on the SKU number. The barcode can be printed for scanning directly from a product or attached to a shopping list for easy reordering.

**Documentation**: [Barcode Generator](/docs/scos/dev/features/201811.0/product-management/barcode-generator/barcode-generat)

### Products Restrictions
With the Product Restrictions feature, you as a shop owner can easily define who of your customers gets to see what items or categories. Any item in your product catalog can be either whitelisted or blacklisted per customer. The lists can be uploaded or imported to make it easier to set up.

**Documentation**: [Product Restrictions](https://documentation.spryker.com/v1/docs/product-restrictions-from-merchant-to-buyer-201903) 

### Merchant Concept
We have introduced the concept of Merchant to allow our customers to implement the Marketplace functionality. In a non-marketplace setup, there is always one Merchant. Product Restrictions and Customer Specific Prices are implemented by linking a B2B customer to the Merchant.

**Documentation**: [Merchants and Merchant Relations](https://documentation.spryker.com/v1/docs/merchants-and-merchant-relations)

## General Cart Enhancements
### Minimum Order Value
Easily set a minimum order value for any of your products where either the customer cannot proceed to checkout unless the value is reached, or the difference is added as a special fee to the total sum.
![Minimum order value](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image11.png){height="" width=""}

**Documentation**: [Minimum Order Value](https://documentation.spryker.com/v1/docs/minimum-order-value-201903)

## Price Management Enhancements
### Net/Gross Price
You can easily manage gross and net prices per product, country, and currency. Please note that you cannot mix Net and Gross prices in the same shopping cart.
![Net and gross price](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image14.png){height="" width=""}

**Documentation**: [Net &amp; Gross Prices](/docs/scos/dev/features/201811.0/price/net-gross-price)

### Volume Prices
With the Volume Prices feature, you can define individual prices for a product for different order quantities. Set specific volume thresholds for your products to encourage your customers to purchase larger quantities of a product in order to receive the special volume discount.
![Volume prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image12.png){height="" width=""}

**Documentation**: [Volume Prices](/docs/scos/dev/features/201811.0/price/volume-prices/volume-prices)

### Customer-specific Prices
Offer your customers individual agreements and customize the prices per business unit accordingly. To avoid unnecessary repetition of values, the data is compressed in the database.
![Customer-specific price](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image7.png){height="" width=""}

The shop owner can set up a price per merchant/business unit combination.
![Customer-specific price per merchant unit combination](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image10.png){height="" width=""}

**Documentation**: [Prices per Merchant Relations](/docs/scos/dev/features/201811.0/price/prices-per-merchant-relation/price-per-merch)

### Agent Assist
With the Agent Assist feature, you may enable your employees to help your customers with true efficiency, all while operating the same storefront interface. No more confusing backend UI. Agent Assist allows your employees to log-in to the storefront using a particular URL, search for a customer to assist and pick them up to do business on their behalf. A feature flag in the session allows for versatile customizations of the storefront functionality during an agent assist session. This feature may also be used as a point of sale solution in physical retail stores.
![Agent assist](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+2018.11.0/image3.png){height="" width=""}

**Documentation**: [Agent Assist](https://documentation.spryker.com/v1/docs/agent-assist)

### Add Concrete Product to Existing Abstract Product
With this improvement, you will be able to attach new product concretes to existing abstract products directly in the backend interface.

**Documentation**: [Products](/docs/scos/dev/features/201811.0/product-management/product)
