---
title: Release Notes 201903.0
originalLink: https://documentation.spryker.com/v1/docs/release-notes-201903-0
redirect_from:
  - /v1/docs/release-notes-201903-0
  - /v1/docs/en/release-notes-201903-0
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of major new features and enhancements released in March of 2019.

For information about installing the Spryker Commerce OS, see [Getting Started Guide](/docs/scos/dev/developer-guides/201811.0/installation/dev-getting-sta).

Check out our release notes video for the quick illustration of the new features and improvements:
<iframe src="https://spryker.wistia.com/embed/iframe/78hzk9qs0t" title="Spryker Release Notes 201903.0" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="640" height="480"></iframe>

## Products
### Product Is Available Again Notifications
When customers visit an online store and see that the product they want is not in stock, there is still a way to bring them back and complete the purchase once you restock.

From this release on, customers would be able to subscribe to "back in stock" notifications.
Shops can define a specific template for the notification email.
![Product is available again notification](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image6.png){height="" width=""}

**Documentation**: [Product is Available Again](https://documentation.spryker.com/v1/docs/product-is-available-again-201903).

## Back office
### Apply Discount on Group of Products 
Previously, a discount could be applied only to an entire cart or a specific product.

Starting from this release, you can also apply a discount to a group of products if the quantity of those products in the customer’s cart fulfills predefined rules.

**Example**

* 20% off on juice products if the customer puts at least 6 bottles to the cart
* 20€ off if the customer puts at least 3 products of brand XYZ to the cart

![Discount on group of products](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image1.png){height="" width=""}

**Documentation**: [Discount](/docs/scos/dev/features/201811.0/promotions-and-discounts/discount/discount). 

### Back Office Translated to Multiple Language 
With this release, we have added a new opportunity for you to go global and build a multi-cultural team within your organization. Now, Spryker Back Office supports multiple languages and is shipped with UI in both English (en_US) and German (de_DE) languages.
![Back Office translated to multiple languages](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image8.png){height="" width=""}

**Documentation**: [Back Office Translations](https://documentation.spryker.com/v1/docs/back-office-translations-201903).

### Supporting Unlimited Number of Categories 
Previously, the Back Office “Category” page could not display a large number of categories (more than 10 000 for example). With this release, we have refactored the page so that it can handle as many categories as your shop has.
![Supporting unlimited number of categories](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image3.png){height="" width=""}

**Documentation**: [Category](https://documentation.spryker.com/v1/docs/category-management-201903).

## CMS
### Multi-store Support for CMS Pages
If you have multiple stores configured, you can define in which store a CMS page will be visible. A Back Office user can configure that in the back office.
![Multi-store support for CMS pages](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image9.png){height="" width=""}

**Documentation**: [Multi-store CMS Pages](https://documentation.spryker.com/v1/docs/multi-store-cms-pages-201903).

### CMS Pages in Search Results
Spryker improved search capabilities by including CMS pages in search results. Now, customers are redirected to the search result page containing two tabs: one for product pages and the other for CMS pages. The new tab lists CMS pages either as a list or as a grid.
![CMS pages in search results](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image7.png){height="" width=""}

**Documentation**: [CMS Pages in Search Results](https://documentation.spryker.com/v1/docs/cms-pages-in-search-results-201903).

### New Template for Category Page
The new template for the category page provides another navigation option for shops with a complex category structure. Having clicked a top-level category, a webshop visitor will be redirected to a subcategory page that shows a grid consisting of subcategory images. The shop owner can assign an image to each category in Back Office that will be shown on the page.
![New template for category page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image2.png){height="" width=""}

**Documentation**: [Assigning a Template for a Category Page](/docs/scos/dev/user-guides/201811.0/back-office-user-guide/category/category)

### CMS Block Widget
With the CMS Block widget, a content manager can create and manage content displayed on one or several CMS pages. This allows reusing existing content or adding promotional elements such as banners that will be shown on the website during the defined time configured per CMS Block.
![CMS block widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image5.png){height="" width=""}

**Documentation**: [CMS Block widget](https://documentation.spryker.com/v1/docs/content-widgets)

## Session Management Improvement 
In this release, we have improved the way the session works in Spryker. Out of the box, your customers and users will be able to interact with the web sites for as long as they are active.

If a user does not interact with the site for a specific period of time, the session will expire, and the user will be redirected to the login page for their next action.

**Documentation**: [Session Management](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/data-manipulation/data-enrichment/session-handler).

## SDK
### Code Sniffer, Architecture Sniffer, PHPStan Improvements
In this release, we have extended the Code Sniffer with the new concepts of levels: You can apply a different level when extra checks are required. We have also updated the Architecture Sniffer with new architectural rules and added a possibility to define a priority by a module.

PHPStan has been updated with config file inheritance. From now on, only new or changed settings need to be defined for a module. General settings are defined and loaded automatically for all modules.

**Documentation**: [Code Sniffer](/docs/scos/dev/features/201811.0/sdk/development-tools/code-sniffer), [Architecture Sniffer](/docs/scos/dev/features/201811.0/sdk/development-tools/architecture-sn), [PHPStan](https://documentation.spryker.com/v1/docs/phpstan-201903).

### Spryk: Code Generation Tool 
With this release, Spryker introduces a new code generator called Spryk. It helps with the generation of required boilerplate code. Spryk works for new and existing code and supports multiple scenarios or definitions. Some scenarios are complex and implemented as independent Spryk definitions linked together, allowing a developer to run code generation for the whole scenario or only for a part of it.

**Documentation**: [Spryk](https://documentation.spryker.com/v1/docs/spryk-201903).

## Spryker Glue REST API 
### Product Relations
The Spryker Glue REST API now includes endpoints for retrieving lists of related products. Endpoints are available for every type of relation working with the corresponding business logic.

**Documentation**: [Retrieving Related Products](https://documentation.spryker.com/v1/docs/retrieving-related-products-201903).

### Navigation
Every navigation node and its structure are retrievable via the navigation API endpoint.

**Documentation**: [Retrieving Navigation Trees](https://documentation.spryker.com/v1/docs/retrieving-navigation-trees-201903).

### Alternative Products
Product alternatives for concrete and abstract products are available via the respective endpoints. This allows you to offer alternatives for discontinued and unavailable products when needed.

**Documentation**: [Retrieving Alternative Products](https://documentation.spryker.com/v1/docs/retrieving-alternative-products-201903).

### Optional Resource Relationships
From now on, resource relationships are not included in the response by default. This will minimize the load for all endpoints in the default mode. You can specify required relationships using the include parameter of GET requests.

**Documentation**: [Configuring Visibility of the Included Section](https://documentation.spryker.com/v1/docs/ht-configuring-visibility-included-section-201903).

## B2B
### Quick Order Improvements
With this release, we have implemented significant improvements to the Quick Order feature. First, Quick Order now supports uploading of big packs of data with the help of CSV files, which allows the shop customers to order multiple products at once. Also, we have integrated a Search Widget for concrete products into Quick Order to enable full-text search for concrete products with the support of Measuring Units, Packaging Units and all kinds of Product restrictions (minimum and maximum quantity, Customer specific products, etc). Out of the box, the Spryker Search Widget can be used not only in Quick Order but as a separate widget for the Cart page and Shopping list. 
![Quick order improvements](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image10.png){height="" width=""}

**Documentation**: [Quick Order](/docs/scos/dev/features/201811.0/shopping-cart/quick-order/quick-order-201).

### Approval Process
We are introducing one of the core B2B features which enables managers to control purchases requested by their employees. A customer can choose to have an order approved by a responsible person before allowing the checkout. The company administrator can limit some roles with flexible permissions and define a threshold on the Cart Total value so a buyer would need to ask for approval when the Cat Total limit is exceeded. 
![Approval process](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image4.png){height="" width=""}

**Documentation**: [Approval Process](https://documentation.spryker.com/v1/docs/approval-process-201903).

### Other improvements

* Create New Address During Checkout: Allows creating a new address during checkout or select between Company Business Unit and Customer Address Book addresses.
* Business on Behalf: Back Office interface for creating Business on Behalf users has been implemented. Now, the feature supports both ways to create Business on Behalf users – via Import and through the Admin UI.
* Reclamation: Allows creating a reclamation from an order on the item level.

**Documentation**: [Checkout](https://documentation.spryker.com/v1/docs/delivery-address-step-shop-guide), [Business on Behalf](https://documentation.spryker.com/v1/docs/business-on-behalf-201903), [Reclamations](https://documentation.spryker.com/v1/docs/reclamations-201903).

## Partner Integrations
### Heidelpay Marketplace Payments
With the market showing an increasing number of marketplaces, Spryker has integrated its first marketplace-specific payment support by extending the existing Heidelpay integration.

Customer payments can now be split in the background and assigned to the corresponding vendors when a client buys a product delivered by different vendors. This feature ensures customers can buy several units of the same product sold by different vendors while still going through the checkout with one single order and one single payment.

**Documentation**: [Heidelpay - Split-payment Marketplace](/docs/scos/dev/technology-partners/201811.0/payment-partners/heidelpay/heidelpay-split).

### Adyen
Our recently finished Adyen integration covers a wide range of payment methods used both in the DACH region as well as outside of it, thus making sure customers can select the most appropriate payment method.

Out-of-the-box the following payment methods are included:

* Credit cards (VISA, Amex, Mastercard, Cartes Bancaires)
* Sofort
* Direct Debit
* Vorkasse (Prepayment)
* Klarna invoice
* PayPal, iDeal
* QR code payment methods (Alipay, WeChat)
* further ones can be added to the project

**Documentation**: [Adyen](/docs/scos/dev/technology-partners/201811.0/payment-partners/adyen/adyen).

### Arvato AfterPay
In addition to the existing Arvato RSS integration, Spryker has added the AfterPay payment method of Arvato, further extending the overall payment integrations of the Spryker Ecosystem. This invoice payment method includes a risk check of the potential uncertainty behind specific purchases and lowers the overall risk of fraud; used by default for the companies.

**Documentation**: [AfterPay](/docs/scos/dev/technology-partners/201811.0/payment-partners/afterpay/afterpay).

Check out [Documentation Updates](/docs/scos/dev/about-spryker/201811.0/whats-new/documentation-u) for all the updates to documentation made with this release. 
