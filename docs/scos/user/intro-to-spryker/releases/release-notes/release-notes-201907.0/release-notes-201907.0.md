---
title: Release Notes 201907.0
description: This document contains a business level description of major new features and enhancements released in August of 2019.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/release-notes-201907-0
originalArticleId: a627c232-fc5c-4935-8a09-f56c8bd7d622
redirect_from:
  - /2021080/docs/release-notes-201907-0
  - /2021080/docs/en/release-notes-201907-0
  - /docs/release-notes-201907-0
  - /docs/en/release-notes-201907-0
  - /v5/docs/release-notes-201907-0
  - /v5/docs/en/release-notes-201907-0
  - /v4/docs/release-notes-201907-0
  - /v4/docs/en/release-notes-201907-0
  - /v3/docs/release-notes-201907-0
  - /v3/docs/en/release-notes-201907-0
  - /v2/docs/release-notes-201907-0
  - /v2/docs/en/release-notes-201907-0
  - /v1/docs/release-notes-201907-0
  - /v1/docs/en/release-notes-201907-0
  - /v6/docs/release-notes-201907-0
  - /v6/docs/en/release-notes-201907-0
---

The Spryker Commerce OS is an end-to-end solution for digital commerce. This document contains a business level description of major new features and enhancements released in August of 2019.

For information about installing the Spryker Commerce OS see [Getting Started Guide](/docs/scos/dev/developer-getting-started-guide.html).

Check out our release notes video for the quick illustration of the new features and improvements:

{% wistia l3hx8apvdq 960 720 %}

## Spryker Commerce OS

### Gift Card Reintegration
**Gift Card** is a prepaid certificate entitling its owner to use it for the purchase of products for the Gift Card’s value. In this release, we have refactored the **Gift Card** feature to support the latest version of our Demo Shops.

When **Gift Cards** are bought, they are treated just like regular products. However, you can filter out payment methods that should not be used to buy Gift Cards (for example, Invoice). Since Gift Cards are purely virtual, they are sent to your customers via email.

When **Gift Cards** are applied, they are treated as a separate payment method. Your customers can pay a part of or the whole order with a Gift Card. You can see the remaining balance for all active Gift Cards that your customers bought.

![Gift Cards reintegration](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image5.png)

**Documentation:**
Feature documentation: [Gift Cards](/docs/scos/user/features/201907.0/gift-cards-feature-overview.html)

### Scheduled Prices
Spryker now supports price defining prices that will take effect the next day/week/month at a specific time.
In the Back Office, you can import CSV files to define **Scheduled Prices** for your products. For each product, you can also view the **Scheduled Prices** defined.

Import your Scheduled Prices via a CSV file:

![Scheduled Prices import](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image12.png)

View the Scheduled Prices defined for a specific product:

![Scheduled Prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image11.png)

#### Compatibility Issues

* You cannot schedule prices for a merchant relation
* You cannot schedule prices for a volume price

**Documentation**: [Scheduled Prices](/docs/scos/user/features/201907.0/scheduled-prices-feature-overview.html)

### Defining the Order of Appearance for Images

In the Back Office, you can now define the order in which your images appear. For products, product sets and categories, you can define which image is to be shown first, second, third, etc.

![Reorder images](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image10.png)

**Documentation**: [Product Image Management](/docs/scos/user/features/201907.0/product-feature-overview/product-images-overview.html)
***
## CMS
### CMS Content Items
Spryker now has a new feature in Content Management. The Content Item is a new abstraction layer for any content element such as image, text, product list, etc, that is presented in the Front-End.

The **Content Item** feature enables the Content Manager to easily create or edit content which can be added to one or several pages or blocks, meaning, instead of editing every single page or block containing the same content, one can just apply changes to a single Content Item.

Moreover, using the **Content Items Widget**, the Content Manager decides where to insert the content item and chooses a template to specify how to display it.

The Spryker out-of-the-box **Content Items** are Banners, Abstract Product Lists, which includes Product Groups, Product Sets, and Files.

The Content Manager manages the **Content Items** in the Back Office while the app developer accesses content items via the Glue API and uses the content across many touchpoints with a single source of truth.

![Overview of content items page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image7.png)

![Create content item page](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image9.png)

![Content item widget UI](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image8.png)

**Documentation**:

* [Content Items](/docs/scos/user/features/201907.0/content-items-feature-overview.html)
* [Content Item Widgets](/docs/scos/user/features/201907.0/content-items-feature-overview.html)
***
## Spryker Glue REST API
In this release, we’ve focused on exposing B2B functionality for our **B2B Front End API**.

In this release, Spryker added the most relevant functionality to help you create API driven B2B stores. Log in as a company user, use company account resources, do business on behalf of other company users, use and share multiple carts.

### B2B Login API
In the B2B context, buyers typically represent a company and act on its behalf. With the B2B Login API, Spryker Commerce OS provides a way for the user to log in not only as a Customer but also as a Company user, member of a Business Unit and with the level of permissions assigned by their organization according to the Company user’s roles.

**Documentation**: [B2B Logging in as Company User](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-b2b-account/authenticating-as-a-company-user.html)

### Business on Behalf API
To impersonate a customer as a Company User, API clients can use the **Business on Behalf API**. It provides REST access to retrieve a list of the Company Users available to the currently logged in user and impersonate them as any user from that list.

**Documentation**: [B2B Logging in as Company User](/docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/authenticating-as-a-company-user.html)

### Company Account API
In the B2B environment, users are organized in Business Units depending on the scope of their activity in the company for better manageability and accountability. Users also get roles assigned to them depending on their level of responsibility and hierarchy in the organization. The endpoints provided by the **Company Account API** allow you to retrieve Business Unit, Business unit addresses, and Company Roles information.

**Documentation**:  

* [Retrieving Company Information](/docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/retrieving-companies.html)
* [Retrieving Business Unit Information](/docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/retrieving-business-units.html)
* [Retrieving Company User Information](/docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/retrieving-company-users.html)
* [Retrieving Company Role Information](/docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/retrieving-company-roles.html)

### OAuth + Customer Account
Provides a way to authorize access to resources related to the level of permissions of each user, to update and revoke those permissions as well as manage the level of access of the company users to API resources according to their existing permissions at every given moment, everything is handled by the access token.

**Documentation**:

* [Security and Authentication](/docs/scos/dev/glue-api-guides/201907.0/security-and-authentication.html)
* [B2B Logging in as Company User](/docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/authenticating-as-a-company-user.html)
* [Retrieving Company Role Information](/docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/retrieving-company-roles.html)

### Multicart API
In the B2B world, company users can create and manage multiple carts according to their shopping needs and different purposes. With the Multicart API, users can create, manage and update multiple carts, assign products to each of them, update and delete items.

**Documentation**: [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/201907.0/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html)

### Shared Carts API
Users may also decide to work in a collaborative way and share their carts with other members of their Business Units, assign different levels of permissions to them and manage those permissions with ease. That’s the purpose of our Shared Carts API.

**Documentation**: [Shared Carts API](/docs/scos/dev/glue-api-guides/201907.0/managing-carts/sharing-company-user-carts/sharing-company-user-carts.html)

### Payments by Third Party Providers API
In many cases, you may decide to provide your buyers and users with alternative payment methods that are handled completely by third party providers. The Payments by third Party Providers API provides you an endpoint to retrieve the payment completion order from those external providers to continue with the order according to your workflow.

**Documentation**:

* [Interacting with Third Party Payment Providers via Glue API](/docs/scos/dev/tutorials-and-howtos/advanced-tutorials/glue-api/tutorial-interacting-with-third-party-payment-providers-via-glue-api.html)
* [B2B-B2C Checking Out Purchases and Getting Checkout Data](/docs/scos/dev/glue-api-guides/201907.0/checking-out/checking-out-purchases.html)

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

**Documentation**: [Spryker in Docker](/docs/scos/dev/the-docker-sdk/201907.0/the-docker-sdk.html)
***
## B2B
### Request for Quote
**Request for Quote (RFQ)** provides one more channel of communication between customers (buyers) and merchants (sales rep) to negotiate a price, limited offers or even “take it or leave it” deals.

In the main use case, a buyer adds products to the cart, converts it to an **RFQ**, and sends the request to a sales rep. The sales rep prepares a quote for the buyer and sends it back with the new prices or items.

The feature also supports an alternative flow when a customer and salesperson had an off-line communication and the sales rep prepares a special offer on the buyer's behalf using the agent assist functionality.

![Request for Quote](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image6.png)

#### Compatibility Issues:
Request for Quote v. 2.0.0  does not support bundles

**Documentation**: [Request for Quote](/docs/scos/user/features/201907.0/quotation-process-feature-overview.html)

### Punchout
This new functionality allows the B2B buyers to access Spryker’s online shop from within their ERP or procurement system.

The buyer can seamlessly log in to the chosen webshop within their browser, select items, and return the shopping cart to the procurement system. The final order will be placed within the ERP-system and can follow established procurement workflows.

![Punchout](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image1.png)

The feature is implemented as an ECO module in partnership with
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image3.png)

https://www.punchoutcatalogs.com/

**Documentation**: [Punchout](/docs/scos/user/features/201907.0/technology-partner-integrations/punch-out/punch-out-feature-overview.html)

### Multiple Comments
The feature has been released as a global widget and can be integrated into any page or entity of your online store. By default, the Comments widget is integrated to the Cart page. This allows you to add multiple comments with tags, so these comments will be linked to the order and appear not only in Zed Order Details page but also in Yves Order Details.

Even better - conversation about the order can continue after the order had been placed, without losing any useful information.

![Multiple comments](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image2.png)

**Documentation**: [Comments](/docs/scos/user/features/201907.0/comments-feature-overview.html)

### Unique URL for Easy Cart Sharing
This is a general feature that allows creating and sharing URL for any entity in the Spryker Commerce OS. With the **Persistent Cart Sharing** feature, you can quickly and easily share cart through communication channel like WhatsApp, Slack, or any other messenger, email, or social network.

You can share the cart via a link in two different modes: "internal" and "external".  For Internal users, you can share with "Read Only" or "Full Access" permissions, and for External - in the Preview mode.

In the first case, you provide users with the necessary level of access rights to the Cart. In the Preview mode, even users who have no account in the shop can view the cart - but cannot perform any actions.

Cart in the Preview mode can also be shared with users in your company because it's not limited in usage to external users only.

![Unique URL for Easy Cart Sharing](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/Releases/Release+notes/Release+Notes+201907.0/image4.png)

**Documentation**: [Unique URL per Cart for Easy Sharing](/docs/scos/user/features/201907.0/resource-sharing-feature-overview.html)

### Other Improvements

* Vault - We introduce the Vault place where you can store valuable information and get it from there by ID in an encrypted form and vice versa
    **Documentation**: [Vault for Tokens](/docs/scos/user/features/201907.0/spryker-core-feature-overview/vault-for-tokens-overview.html)

* Customer Login by Token - Ability to log in to the Spryker Commerce OS by token
    **Documentation**: [Customer Login by Token](/docs/scos/user/features/201907.0/company-account-feature-overview/customer-login-by-token-overview.html)

***
## Partner Integrations
### Payone Cash on Delivery
We have extended our Payone module with the cash-on-delivery payment method. This can now be used by merchants to address some of the most skeptical customers who wish to pay for the order only once they have the product in their hands.

**Documentation**: [Payone - Cash on Delivery](/docs/scos/user/technology-partners/201907.0/payment-partners/bs-payone/scos-integration/payone-cash-on-delivery.html)

### Heidelpay Easycredit
We have extended our existing Heidelpay module with the payment method Easycredit, which allows customers to pay via an installment plan. This can help to increase your conversion rates of more expensive products and services.

**Documentation**: [Integrating the Easy Credit payment method for Heidelpay](/docs/scos/dev/technology-partner-guides/{{site.version}}/payment-partners/heidelpay/integrating-payment-methods-for-heidelpay/integrating-the-easy-credit-payment-method-for-heidelpay.html)

### RatePay
We have extended our partner portfolio with a RatePay integration that offers 4 payment methods out-of-the-box:

* Prepayment
* Invoice
* Direct Debit
* Installment

**Documentation**:

* [Integrating the Prepayment payment method for RatePay](/docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-prepayment-payment-method-for-ratepay.html)
* [Integrating the Invoice payment method for RatePay](/docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-invoice-payment-method-for-ratepay.html)
* [Integrating the Direct Debit payment method for RatePay](/docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay/integrating-the-direct-debit-payment-method-for-ratepay.html)
* [Integrating the Installment payment method for RatePay](/docs/scos/user/technology-partners/201907.0/payment-partners/ratepay/integrating-payment-methods-for-ratepay//integrating-the-installment-payment-method-for-ratepay.html)

### Episerver
We now have a new integration of our new partner Episerver and their online platform to support newsletters as well as the transactional notifications required in the usual e-commerce transactions.

**Documentation**: [Episerver](/docs/scos/user/technology-partners/201907.0/marketing-and-conversion/customer-communication/episerver.html)

### Easycredit Direct Integration
We have now a new integration of our new partner TeamBank AG and their payment method ratenkauf by easyCredit, which allows customers to pay via an installment plan. This can help to increase your conversion rates of the more expensive products and services.

**Documentation**: [Installing and configuring ratenkauf by easyCredit](/docs/scos/dev/technology-partner-guides/{{site.version}}/payment-partners/ratenkauf-by-easycredit/installing-and-configuring-ratenkauf-by-easycredit.html)

### CrefoPay
We now have an integration with our new payment partner CrefoPay, which will provide the following payment methods out-of-the-box including partial operations and B2B:

* Bill (Invoice)
* Direct Debit
* Prepaid (Cash in Advance)Credit Card (Visa, MasterCard)
* PayPal
* Sofort
* Cash on Delivery

**Documentation**: [CrefoPay](/docs/scos/dev/technology-partner-guides/{{site.version}}/payment-partners/crefopay/installing-and-configuring-crefopay.html)

***
## Technical Enhancements
### Optimized Infrastructure Locator
Once an infrastructure class is located, it's available for other calls without additional location.

### Cart Calculation Optimizations
As we would like to provide maximum performance during calculations, we have switched to bulk hydrations and removed unnecessary hydrations (e.g. product images).

### Redis Sentinel
Redis Sentinel configuration is available on the project side. Make use of Redis cluster and scale your setup according to project load requirements.

<!--**Documenation**: ToDo https://spryker.atlassian.net/wiki/spaces/DOCS/pages/965214417/WIP+HowTo+-+Integrate+Redis+refactoring+TE-1558 -->

### Module Constrainer
Once a project extends or customizes Spryker functionalities of certain modules they should be constrained to ~ in project composer.json. This will help to avoid potentially dangerous updates of these modules.
From now on Spryker provides a tool which helps to identify such modules and automatically suggest module constraints. Check it out:

```bash
code:constraint:modules.
```

### Code Quality
We have updated Spryker tooling to support PHPStan 0.11, which help us and projects to bring the code quality to the new level. New features are described in the PHPStan release notes.
 
Check out [Documentation Updates](/docs/scos/user/intro-to-spryker/whats-new/documentation-updates.html) for all the updates to documentation made with this release.
