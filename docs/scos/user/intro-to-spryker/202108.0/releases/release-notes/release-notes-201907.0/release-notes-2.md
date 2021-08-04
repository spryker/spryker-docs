---
title: Release Notes 201907.0
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-201907-0
redirect_from:
  - /2021080/docs/release-notes-201907-0
  - /2021080/docs/en/release-notes-201907-0
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of major new features and enhancements released in August of 2019.

For information about installing the Spryker Commerce OS see [Getting Started Guide](/docs/scos/dev/developer-guides/201907.0/dev-getting-sta).

Check out our release notes video for the quick illustration of the new features and improvements:
<iframe src="https://spryker.wistia.com/embed/iframe/l3hx8apvdq" title="Spryker Release Notes 201903.0" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen="0" mozallowfullscreen="0" webkitallowfullscreen="0" oallowfullscreen="0" msallowfullscreen="0" width="640" height="480"></iframe>


## Spryker Commerce OS

### Gift Card Reintegration
**Gift Card** is a prepaid certificate entitling its owner to use it for the purchase of products for the Gift Card’s value. In this release, we have refactored the **Gift Card** feature to support the latest version of our Demo Shops.

When **Gift Cards** are bought, they are treated just like regular products. However, you can filter out payment methods that should not be used to buy Gift Cards (for example, Invoice). Since Gift Cards are purely virtual, they are sent to your customers via email.

When **Gift Cards** are applied, they are treated as a separate payment method. Your customers can pay a part of or the whole order with a Gift Card. You can see the remaining balance for all active Gift Cards that your customers bought.

![Gift Cards reintegration](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image5.png){height="" width=""}

**Documentation:**
Feature documentation: [Gift Cards](https://documentation.spryker.com/v3/docs/gift-card-purchase-management-201907)

### Scheduled Prices
Spryker now supports price defining prices that will take effect the next day/week/month at a specific time.
In the Back Office, you can import CSV files to define **Scheduled Prices** for your products. For each product, you can also view the **Scheduled Prices** defined.

Import your Scheduled Prices via a CSV file:

![Scheduled Prices import](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image12.png){height="" width=""}

View the Scheduled Prices defined for a specific product:

![Scheduled Prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image11.png){height="" width=""}

#### Compatibility Issues

* You cannot schedule prices for a merchant relation
* You cannot schedule prices for a volume price

**Documentation**: [Scheduled Prices](https://documentation.spryker.com/v3/docs/scheduled-prices-201907)

### Defining the Order of Appearance for Images

In the Back Office, you can now define the order in which your images appear. For products, product sets and categories, you can define which image is to be shown first, second, third, etc.

![Reorder images](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image10.png){height="" width=""}

**Documentation**: [Product Image Management](https://documentation.spryker.com/v3/docs/product-image-management-201907)
***
## CMS
### CMS Content Items
Spryker now has a new feature in Content Management. The Content Item is a new abstraction layer for any content element such as image, text, product list, etc, that is presented in the Front-End.

The **Content Item** feature enables the Content Manager to easily create or edit content which can be added to one or several pages or blocks, meaning, instead of editing every single page or block containing the same content, one can just apply changes to a single Content Item.

Moreover, using the **Content Items Widget**, the Content Manager decides where to insert the content item and chooses a template to specify how to display it.

The Spryker out-of-the-box **Content Items** are Banners, Abstract Product Lists, which includes Product Groups, Product Sets, and Files.

The Content Manager manages the **Content Items** in the Back Office while the app developer accesses content items via the Glue API and uses the content across many touchpoints with a single source of truth.

![Overview of content items page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image7.png){height="" width=""}

![Create content item page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image9.png){height="" width=""}

![Content item widget UI](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image8.png){height="" width=""}

**Documentation**: 

* [Content Items](https://documentation.spryker.com/v3/docs/content-items-201907)
* [Content Item Widgets](/docs/scos/dev/features/201907.0/cms/content-item-widgets/content-item-wi)
***
## Spryker Glue REST API
In this release, we’ve focused on exposing B2B functionality for our **B2B Front End API**.

In this release, Spryker added the most relevant functionality to help you create API driven B2B stores. Log in as a company user, use company account resources, do business on behalf of other company users, use and share multiple carts.

### B2B Login API
In the B2B context, buyers typically represent a company and act on its behalf. With the B2B Login API, Spryker Commerce OS provides a way for the user to log in not only as a Customer but also as a Company user, member of a Business Unit and with the level of permissions assigned by their organization according to the Company user’s roles.

**Documentation**: [B2B Logging in as Company User](https://documentation.spryker.com/v3/docs/logging-in-as-company-user-201907)

### Business on Behalf API
To impersonate a customer as a Company User, API clients can use the **Business on Behalf API**. It provides REST access to retrieve a list of the Company Users available to the currently logged in user and impersonate them as any user from that list.

**Documentation**: [B2B Logging in as Company User](https://documentation.spryker.com/v3/docs/logging-in-as-company-user-201907)

### Company Account API
In the B2B environment, users are organized in Business Units depending on the scope of their activity in the company for better manageability and accountability. Users also get roles assigned to them depending on their level of responsibility and hierarchy in the organization. The endpoints provided by the **Company Account API** allow you to retrieve Business Unit, Business unit addresses, and Company Roles information.

**Documentation**:  

* [Retrieving Company Information](/docs/scos/dev/glue-api/201907.0/glue-api-storefront-guides/b2b-account-management/retrieving-comp)
* [Retrieving Business Unit Information](/docs/scos/dev/glue-api/201907.0/glue-api-storefront-guides/b2b-account-management/retrieving-busi)
* [Retrieving Company User Information](/docs/scos/dev/glue-api/201907.0/glue-api-storefront-guides/b2b-account-management/retrieving-comp)
* [Retrieving Company Role Information](/docs/scos/dev/glue-api/201907.0/glue-api-storefront-guides/b2b-account-management/retrieving-comp)

### OAuth + Customer Account
Provides a way to authorize access to resources related to the level of permissions of each user, to update and revoke those permissions as well as manage the level of access of the company users to API resources according to their existing permissions at every given moment, everything is handled by the access token.

**Documentation**: 

* [Security and Authentication](/docs/scos/dev/glue-api/201907.0/glue-api-developer-guides/security-and-au)
* [B2B Logging in as Company User](https://documentation.spryker.com/v3/docs/logging-in-as-company-user-201907)
* [Retrieving Company Role Information](/docs/scos/dev/glue-api/201907.0/glue-api-storefront-guides/b2b-account-management/retrieving-comp)

### Multicart API
In the B2B world, company users can create and manage multiple carts according to their shopping needs and different purposes. With the Multicart API, users can create, manage and update multiple carts, assign products to each of them, update and delete items.

**Documentation**: [Managing Carts of Registered Users](https://documentation.spryker.com/v3/docs/managing-carts-of-registered-users)

### Shared Carts API
Users may also decide to work in a collaborative way and share their carts with other members of their Business Units, assign different levels of permissions to them and manage those permissions with ease. That’s the purpose of our Shared Carts API.

**Documentation**: [Shared Carts API](/docs/scos/dev/glue-api/201907.0/glue-api-storefront-guides/managing-carts/sharing-company)

### Payments by Third Party Providers API
In many cases, you may decide to provide your buyers and users with alternative payment methods that are handled completely by third party providers. The Payments by third Party Providers API provides you an endpoint to retrieve the payment completion order from those external providers to continue with the order according to your workflow.

**Documentation**: 

* [Interacting with Third Party Payment Providers via Glue API](/docs/scos/dev/tutorials/201907.0/advanced/glue-api/t-interacting-w)
* [B2B-B2C Checking Out Purchases and Getting Checkout Data](https://documentation.spryker.com/v3/docs/checking-out-purchases-and-getting-checkout-data)

Additionally, the following APIs were modified to support B2B use cases (they work now both for B2C and B2B) :

* Glue Application API
* Customer API
* Product API
* Catalog Search API
* Category API
* Alternative Products API
* Product Availability API
* Product Relations API
* Product Tax Sets API
* Product Labels API
* Cart API
* Discontinued Products API
* Checkout API
* Order History API
* Navigation API
* Rest Schema Validation
* Documentation Generator
***
## Spryker Cloud Readiness
Docker support is released and provides a new, faster way of working with the Spryker Commerce OS.

The new approach supports main tasks and activities required during the development: creating Docker images, running containers and developing new functionality.

The following functionality is supported and can be enabled/disabled when needed:

* Multi-store setup (3 stores are configured out-of-the-box)
* File synchronization between host OS and containers
* Xdebug
* SSL support

In order to deliver this, the architecture and core modules of the Spryker Commerce OS were updated. Plus, Docker-related files and supporting tools are provided.

B2B, B2C demo shops and master suite are covered at the moment.

The following OSs are supported: Linux, Mac, and Windows 10 Pro.

**Documentation**: [Spryker in Docker](/docs/scos/dev/developer-guides/201907.0/installation/spryker-in-docker/spryker-in-dock)
***
## B2B
### Request for Quote
**Request for Quote (RFQ)** provides one more channel of communication between customers (buyers) and merchants (sales rep) to negotiate a price, limited offers or even “take it or leave it” deals.

In the main use case, a buyer adds products to the cart, converts it to an **RFQ**, and sends the request to a sales rep. The sales rep prepares a quote for the buyer and sends it back with the new prices or items.

The feature also supports an alternative flow when a customer and salesperson had an off-line communication and the sales rep prepares a special offer on the buyer's behalf using the agent assist functionality.

![Request for Quote](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image6.png){height="" width=""}

#### Compatibility Issues:
Request for Quote v. 2.0.0  does not support bundles

**Documentation**: [Request for Quote](https://documentation.spryker.com/v3/docs/quotation-process-rfq-201907) 

### Punchout
This new functionality allows the B2B buyers to access Spryker’s online shop from within their ERP or procurement system.

The buyer can seamlessly log in to the chosen webshop within their browser, select items, and return the shopping cart to the procurement system. The final order will be placed within the ERP-system and can follow established procurement workflows.

![Punchout](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image1.png){height="" width=""}

The feature is implemented as an ECO module in partnership with 
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image3.png){height="" width=""}

https://www.punchoutcatalogs.com/

**Documentation**: [Punchout](https://documentation.spryker.com/v3/docs/punchout-201907)

### Multiple Comments
The feature has been released as a global widget and can be integrated into any page or entity of your online store. By default, the Comments widget is integrated to the Cart page. This allows you to add multiple comments with tags, so these comments will be linked to the order and appear not only in Zed Order Details page but also in Yves Order Details.

Even better - conversation about the order can continue after the order had been placed, without losing any useful information.

![Multiple comments](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image2.png){height="" width=""}

**Documentation**: [Comments](https://documentation.spryker.com/v3/docs/comments-201907)

### Unique URL for Easy Cart Sharing
This is a general feature that allows creating and sharing URL for any entity in the Spryker Commerce OS. With the **Persistent Cart Sharing** feature, you can quickly and easily share cart through communication channel like WhatsApp, Slack, or any other messenger, email, or social network.

You can share the cart via a link in two different modes: "internal" and "external".  For Internal users, you can share with "Read Only" or "Full Access" permissions, and for External - in the Preview mode.

In the first case, you provide users with the necessary level of access rights to the Cart. In the Preview mode, even users who have no account in the shop can view the cart - but cannot perform any actions.

Cart in the Preview mode can also be shared with users in your company because it's not limited in usage to external users only.

![Unique URL for Easy Cart Sharing](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image4.png){height="" width=""}

**Documentation**: [Unique URL per Cart for Easy Sharing](https://documentation.spryker.com/v3/docs/unique-url-per-cart-for-easy-sharing-201907)

### Other Improvements

* Vault - We introduce the Vault place where you can store valuable information and get it from there by ID in an encrypted form and vice versa
    **Documentation**: [Vault for Tokens](https://documentation.spryker.com/v3/docs/vault-for-tokens-201907)

* Customer Login by Token - Ability to log in to the Spryker Commerce OS by token
    **Documentation**: [Customer Login by Token](https://documentation.spryker.com/v3/docs/customer-login-by-token-201907)
    
***
## Partner Integrations
### Payone Cash on Delivery
We have extended our Payone module with the cash-on-delivery payment method. This can now be used by merchants to address some of the most skeptical customers who wish to pay for the order only once they have the product in their hands.

**Documentation**: [Payone - Cash on Delivery](/docs/scos/dev/technology-partners/201907.0/payment-partners/bs-payone/scos-integration/payone-cash-on-)

### Heidelpay Easycredit
We have extended our existing Heidelpay module with the payment method Easycredit, which allows customers to pay via an installment plan. This can help to increase your conversion rates of more expensive products and services.

**Documentation**: [Heidelpay - Easy Credit](/docs/scos/dev/technology-partners/201907.0/payment-partners/heidelpay/heidelpay-easy-)

### RatePay
We have extended our partner portfolio with a RatePay integration that offers 4 payment methods out-of-the-box:

* Prepayment
* Invoice
* Direct Debit
* Installment

**Documentation**: 

* [RatePay - Prepayment](/docs/scos/dev/technology-partners/201907.0/payment-partners/ratepay/ratepay-prepaym)
* [RatePay - Invoice](/docs/scos/dev/technology-partners/201907.0/payment-partners/ratepay/ratepay-invoice)
* [RatePay - Direct Debit](/docs/scos/dev/technology-partners/201907.0/payment-partners/ratepay/ratepay-direct-)
* [RatePay - Installment](/docs/scos/dev/technology-partners/201907.0/payment-partners/ratepay/ratepay-install)

### Episerver
We now have a new integration of our new partner Episerver and their online platform to support newsletters as well as the transactional notifications required in the usual e-commerce transactions.

**Documentation**: [Episerver](/docs/scos/dev/technology-partners/201907.0/marketing-and-conversion/customer-communication/episerver/episerver) 

### Easycredit Direct Integration
We have now a new integration of our new partner TeamBank AG and their payment method Ratenkauf by Easycredit, which allows customers to pay via an installment plan. This can help to increase your conversion rates of the more expensive products and services.

**Documentation**: [Ratenkauf by Easycredit - Installation and Configuration](/docs/scos/dev/technology-partners/201907.0/payment-partners/ratenkauf-by-easycredit/ratenkauf-by-ea)

### CrefoPay
We now have an integration with our new payment partner CrefoPay, which will provide the following payment methods out-of-the-box including partial operations and B2B:

* Bill (Invoice)
* Direct Debit
* Prepaid (Cash in Advance)Credit Card (Visa, MasterCard)
* PayPal
* Sofort
* Cash on Delivery

**Documentation**: [CrefoPay](/docs/scos/dev/technology-partners/201907.0/payment-partners/crefopay/crefopay-config) 

***
## Technical Enhancements
### Optimized Infrastructure Locator
Once an infrastructure class is located, it's available for other calls without additional location.

### Cart Calculation Optimizations
As we would like to provide maximum performance during calculations, we have switched to bulk hydrations and removed unnecessary hydrations (e.g. product images).

### Redis Sentinel
Redis Sentinel configuration is available on the project side. Make use of Redis cluster and scale your setup according to project load requirements.

<!--**Documenation**: ToDo https://spryker.atlassian.net/wiki/spaces/DOCS/pages/965214417/WIP+HowTo+-+Integrate+Redis+refactoring+TE-1558 -->

### Module Constrainter
Once a project extends or customizes Spryker functionalities of certain modules they should be constrained to ~ in project composer.json. This will help to avoid potentially dangerous updates of these modules.
From now on Spryker provides a tool which helps to identify such modules and automatically suggest module constraints. Check it out: 

```bash
code:constraint:modules.
```

### Code Quality
We have updated Spryker tooling to support PHPStan 0.11, which help us and projects to bring the code quality to the new level. New features are described in the PHPStan release notes.
 
Check out [Documentation Updates](/docs/scos/dev/about-spryker/201907.0/whats-new/documentation-u) for all the updates to documentation made with this release. 
