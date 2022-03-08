---
title: Release Notes 201903.0
description: This document contains a business level description of major new features and enhancements released in March of 2019.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-201903-0
originalArticleId: 2bbb03f8-9482-4221-b53a-409c36125058
redirect_from:
  - /2021080/docs/release-notes-201903-0
  - /2021080/docs/en/release-notes-201903-0
  - /docs/release-notes-201903-0
  - /docs/en/release-notes-201903-0
  - /v5/docs/release-notes-201903-0
  - /v5/docs/en/release-notes-201903-0
  - /v4/docs/release-notes-201903-0
  - /v4/docs/en/release-notes-201903-0
  - /v3/docs/release-notes-201903-0
  - /v3/docs/en/release-notes-201903-0
  - /v2/docs/release-notes-201903-0
  - /v2/docs/en/release-notes-201903-0
  - /v1/docs/release-notes-201903-0
  - /v1/docs/en/release-notes-201903-0
  - /v6/docs/release-notes-201903-0
  - /v6/docs/en/release-notes-201903-0
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of major new features and enhancements released in March of 2019.

For information about installing the Spryker Commerce OS, see [Getting Started Guide](/docs/scos/dev/developer-getting-started-guide.html).

Check out our release notes video for the quick illustration of the new features and improvements:
<iframe src="https://spryker.wistia.com/embed/iframe/78hzk9qs0t" title="Spryker Release Notes 201903.0" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="640" height="480"></iframe>

## Products
### Product Is Available Again Notifications
When customers visit an online store and see that the product they want is not in stock, there is still a way to bring them back and complete the purchase once you restock.

From this release on, customers would be able to subscribe to "back in stock" notifications.
Shops can define a specific template for the notification email.
![Product is available again notification](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image6.png)

**Documentation**: [Product is Available Again](/docs/scos/user/features/201903.0/availability-notification-feature-overview.html).

## Back office
### Apply Discount on Group of Products
Previously, a discount could be applied only to an entire cart or a specific product.

Starting from this release, you can also apply a discount to a group of products if the quantity of those products in the customer’s cart fulfills predefined rules.

**Example**

* 20% off on juice products if the customer puts at least 6 bottles to the cart
* 20€ off if the customer puts at least 3 products of brand XYZ to the cart

![Discount on group of products](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image1.png)

**Documentation**: [Discount](/docs/scos/user/features/201903.0/promotions-discounts-feature-overview.html).

### Back Office Translated to Multiple Language
With this release, we have added a new opportunity for you to go global and build a multi-cultural team within your organization. Now, Spryker Back Office supports multiple languages and is shipped with UI in both English (en_US) and German (de_DE) languages.
![Back Office translated to multiple languages](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image8.png)

**Documentation**: [Back Office Translations](/docs/scos/user/features/201903.0/spryker-core-back-office-feature-overview/back-office-translations-overview.html).

### Supporting Unlimited Number of Categories
Previously, the Back Office “Category” page could not display a large number of categories (more than 10 000 for example). With this release, we have refactored the page so that it can handle as many categories as your shop has.
![Supporting unlimited number of categories](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image3.png)

**Documentation**: [Category](/docs/scos/user/features/201903.0/category-management-feature-overview.html).

## CMS
### Multi-store Support for CMS Pages
If you have multiple stores configured, you can define in which store a CMS page will be visible. A Back Office user can configure that in the back office.
![Multi-store support for CMS pages](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image9.png)

**Documentation**: [Multi-store CMS Pages](/docs/scos/user/features/201903.0/cms-feature-overview/cms-pages-overview.html).

### CMS Pages in Search Results
Spryker improved search capabilities by including CMS pages in search results. Now, customers are redirected to the search result page containing two tabs: one for product pages and the other for CMS pages. The new tab lists CMS pages either as a list or as a grid.
![CMS pages in search results](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image7.png)

**Documentation**: [CMS Pages in Search Results](/docs/scos/user/features/201903.0/cms-feature-overview/cms-pages-in-search-results-overview.html).

### New Template for Category Page
The new template for the category page provides another navigation option for shops with a complex category structure. Having clicked a top-level category, a webshop visitor will be redirected to a subcategory page that shows a grid consisting of subcategory images. The shop owner can assign an image to each category in Back Office that will be shown on the page.
![New template for category page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image2.png)

**Documentation**: [Assigning a Template for a Category Page](/docs/scos/user/features/201903.0/category-management-feature-overview.html)

### CMS Block Widget
With the CMS Block widget, a content manager can create and manage content displayed on one or several CMS pages. This allows reusing existing content or adding promotional elements such as banners that will be shown on the website during the defined time configured per CMS Block.
![CMS block widget](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image5.png)

**Documentation**: [CMS Block widget](/docs/scos/user/features/201903.0/cms-feature-overview/cms-blocks-overview.html)

## Session Management Improvement
In this release, we have improved the way the session works in Spryker. Out of the box, your customers and users will be able to interact with the web sites for as long as they are active.

If a user does not interact with the site for a specific period of time, the session will expire, and the user will be redirected to the login page for their next action.

**Documentation**: [Session Management](/docs/scos/dev/back-end-development/session-handlers.html).

## SDK
### Code Sniffer, Architecture Sniffer, PHPStan Improvements
In this release, we have extended the Code Sniffer with the new concepts of levels: You can apply a different level when extra checks are required. We have also updated the Architecture Sniffer with new architectural rules and added a possibility to define a priority by a module.

PHPStan has been updated with config file inheritance. From now on, only new or changed settings need to be defined for a module. General settings are defined and loaded automatically for all modules.

**Documentation**: [Code Sniffer](/docs/scos/dev/sdk/development-tools/code-sniffer.html), [Architecture Sniffer](/docs/scos/dev/sdk/development-tools/architecture-sniffer.html ), [PHPStan](/docs/scos/dev/sdk/development-tools/phpstan.html).

### Spryk: Code Generation Tool
With this release, Spryker introduces a new code generator called Spryk. It helps with the generation of required boilerplate code. Spryk works for new and existing code and supports multiple scenarios or definitions. Some scenarios are complex and implemented as independent Spryk definitions linked together, allowing a developer to run code generation for the whole scenario or only for a part of it.

**Documentation**: [Spryk](/docs/scos/dev/sdk/development-tools/spryk-code-generator.html).

## Spryker Glue REST API
### Product Relations
The Spryker Glue REST API now includes endpoints for retrieving lists of related products. Endpoints are available for every type of relation working with the corresponding business logic.

**Documentation**: [Retrieving Related Products](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-products/retrieving-related-products.html).

### Navigation
Every navigation node and its structure are retrievable via the navigation API endpoint.

**Documentation**: [Retrieving Navigation Trees](/docs/scos/user/features/201903.0/navigation-feature-overview.html).

### Alternative Products
Product alternatives for concrete and abstract products are available via the respective endpoints. This allows you to offer alternatives for discontinued and unavailable products when needed.

**Documentation**: [Retrieving Alternative Products](/docs/scos/dev/glue-api-guides/201903.0/managing-products/retrieving-alternative-products.html).

### Optional Resource Relationships
From now on, resource relationships are not included in the response by default. This will minimize the load for all endpoints in the default mode. You can specify required relationships using the include parameter of GET requests.

**Documentation**: [Configuring Visibility of the Included Section](/docs/scos/dev/tutorials-and-howtos/howtos/glue-api-howtos/configuring-visibility-of-the-included-section.html).

## B2B
### Quick Order Improvements
With this release, we have implemented significant improvements to the Quick Order feature. First, Quick Order now supports uploading of big packs of data with the help of CSV files, which allows the shop customers to order multiple products at once. Also, we have integrated a Search Widget for concrete products into Quick Order to enable full-text search for concrete products with the support of Measuring Units, Packaging Units and all kinds of Product restrictions (minimum and maximum quantity, Customer specific products, etc). Out of the box, the Spryker Search Widget can be used not only in Quick Order but as a separate widget for the Cart page and Shopping list.
![Quick order improvements](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image10.png)

**Documentation**: [Quick Order](/docs/scos/user/features/201903.0/quick-add-to-cart-feature-overview.html).

### Approval Process
We are introducing one of the core B2B features which enables managers to control purchases requested by their employees. A customer can choose to have an order approved by a responsible person before allowing the checkout. The company administrator can limit some roles with flexible permissions and define a threshold on the Cart Total value so a buyer would need to ask for approval when the Cat Total limit is exceeded.
![Approval process](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201903.0/image4.png)

**Documentation**: [Approval Process](/docs/scos/user/features/201903.0/approval-process-feature-overview.html).

### Other improvements

* Create New Address During Checkout: Allows creating a new address during checkout or select between Company Business Unit and Customer Address Book addresses.
* Business on Behalf: Back Office interface for creating Business on Behalf users has been implemented. Now, the feature supports both ways to create Business on Behalf users – via Import and through the Admin UI.
* Reclamation: Allows creating a reclamation from an order on the item level.

**Documentation**: [Checkout](/docs/scos/user/features/201903.0/checkout-feature-overview/multi-step-checkout-overview.html), [Business on Behalf](/docs/scos/user/features/201903.0/company-account-feature-overview/business-on-behalf-overview.html), [Reclamations](/docs/scos/user/features/201903.0/reclamations-feature-overview.html).

## Partner Integrations
### Heidelpay Marketplace Payments
With the market showing an increasing number of marketplaces, Spryker has integrated its first marketplace-specific payment support by extending the existing Heidelpay integration.

Customer payments can now be split in the background and assigned to the corresponding vendors when a client buys a product delivered by different vendors. This feature ensures customers can buy several units of the same product sold by different vendors while still going through the checkout with one single order and one single payment.

**Documentation**: [Integrating the Split-payment Marketplace payment method for Heidelpay](/docs/scos/dev/technology-partner-guides/{{site.version}}/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-split-payment-marketplace-payment-method-for-heidelpay.html).

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

**Documentation**: [Adyen](/docs/scos/user/technology-partners/201903.0/payment-partners/adyen.html).

### Arvato AfterPay
In addition to the existing Arvato RSS integration, Spryker has added the AfterPay payment method of Arvato, further extending the overall payment integrations of the Spryker Ecosystem. This invoice payment method includes a risk check of the potential uncertainty behind specific purchases and lowers the overall risk of fraud; used by default for the companies.

**Documentation**: [AfterPay](/docs/scos/user/technology-partners/201903.0/payment-partners/afterpay.html).

Check out [Documentation Updates](/docs/scos/user/intro-to-spryker/whats-new/documentation-updates.html) for all the updates to documentation made with this release.
