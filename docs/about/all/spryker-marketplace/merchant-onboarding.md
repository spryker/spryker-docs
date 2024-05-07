---
title:  Merchant onboarding
description: This document describes the onboarding process for merchants and gives step-by-step instructions for marketplace operators.
template: concept-topic-template
redirect_from:
last_updated: Mar 29, 2023
  - /docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding.html
  - /docs/scos/user/intro-to-spryker/spryker-marketplace/merchant-onboarding.html

---

This document describes how to onboard merchants.
Once created and approved, merchants become official marketplace members and can create products and offers to sell, fulfill orders and manage their profile in [Merchant Portal](/docs/about/all/spryker-marketplace/merchant-portal.html).

There are two primary roles: *operator* and *merchant*:
* An [operator](/docs/about/all/spryker-marketplace/back-office-for-marketplace-operator.html) is a company that owns and administers the platform.
* A [merchant](/docs/about/all/spryker-marketplace/marketplace-personas.html#merchant-user) is a business entity or individual that sells products on the operator's platform. The operator is responsible and engaged with the merchants to determine how they conduct their operations on the platform. The operator can be a merchant as well.

The merchant onboarding process consists of seven steps. Each step requires specific actions that merchants, operators, or both need to take.

If you run into any issues when onboarding the merchant, get in touch with your Spryker contact.

## Merchant onboarding process

The merchant onboarding process consists of the following steps:

1. The merchant puts in a request to join the marketplace and provides all required documents.
2. The operator verifies and registers the merchant.
3. The operator approves the merchant and provides access to the Merchant Portal.
4. The merchant [creates products](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/manage-in-the-merchant-portal/manage-products-in-the-merchant-portal.html) and [offers](/docs/pbc/all/offer-management/{{site.version}}/marketplace/manage-merchant-product-offers.html) in the Merchant Portal. Alternatively, the operator can help the merchant set up the process for automatically importing products and offers from a CSV template or the merchant's PIM or ERP system.
5. The operator decides what kind of payment process to implement—for example, whether or not to use a *Payment Service Provider (PSP)*.
6. An order management process for fulfillment, shipping, and returns is established for merchants through the [Spryker State Machine](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/state-machine-cookbook/state-machine-cookbook.html).
7. The operator conducts a final check on the merchant's public profile, products, and offer quality. The operator [activates merchants](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/manage-in-the-back-office/manage-merchants/create-merchants.html) and their products and offers in the Back Office. Everything can be activated through a [data importer](/docs/dg/dev/data-import/{{site.version}}/data-importers-implementation.html) as well.

Each step is described in the following sections.

### 1) Merchant: Put in a request to join

The official onboarding starts with a merchant requesting to join the marketplace.

To request a new merchant account, you can build a landing page with the [Spryker CMS](/docs/pbc/all/content-management-system/{{site.version}}/content-management-system.html) where potential merchants can find the email address or a form to contact the operator to join the marketplace. In some cases, the operator may contact their partners and inform them about the marketplace.

### 2) Operator: Verify (the KYC process) and register a merchant

1. Gather data a merchant provides, such as a registration number and the company behind the merchant, including representatives' information and their IDs.
2. To identify the trust level and the need for additional information, validate your merchant through public registers.

{% info_block infoBox %}

To accelerate the validation process, you can use relevant Spryker technology partners. For more details, reach out to your Spryker contact.

{% endinfo_block %}

The official relationship between the operator and merchant can be established by providing a contract to a merchant. For specific merchants, you can use custom contracts. If not, boilerplate agreements should be readily available. Contracts can be created as part of the terms and conditions, which must be accepted beforehand, along with the platform rules, customer communication guidelines, data policy, and SLA agreement. Clarification is also required regarding who the product data owner is, in which categories the merchant is allowed to sell, and the commissions and fees the merchant must pay the operator.

![edit-merchant](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-2-edit-merchant.png)

### 3) Operator: Approve the merchant

1. In the Back Office, navigate to **Marketplace&nbsp;<span aria-label="and then">></span> Merchants**.
2. On the **Overview of Merchants** page that opens, in the **Actions** column, click **Approve Access**.

By [approving the merchant](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/manage-in-the-back-office/manage-merchants/create-merchants.html), the operator enables merchant users to access the Merchant Portal to complete their public-facing profile and create products and offers.
Then, the operator needs to create a merchant admin user based on data provided through the registration form, such as the email or first and last name of the contact person. For this, the operator finds a merchant user in the Back Office, in **Merchant&nbsp;<span aria-label="and then">></span> Users** and assigns them the required permissions.
The email with the password is automatically sent to access the Merchant Portal later on. The operator can also create more user accounts for the merchant if required.

![overview-of-merchants](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-3-overview-of-merchants.png)

![edit-user](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-3-edit-user.png)

### 4) Merchant and operator: Create and update the product and offers

Operator: Decide who is the owner of the product data:
* If the operator is the owner and manages the product data, other merchants can create offers with specific prices and available quantities on top of existing products.
* If merchants can create products, the operator needs to make sure there are no duplicates in the Marketplace and regularly check the product data quality.

In the Merchant Portal, merchants can [create and update products](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/manage-in-the-merchant-portal/manage-products-in-the-merchant-portal.html) and offers individually. Alternatively, the operator can help the merchant set up the process for automatically importing products and offers from a CSV template or establish the data exchange process from the merchant's PIM or ERP system.

{% info_block infoBox %}

Based on the product volume, we recommend the following:
- If the number of products to be created or edited is small, merchants can use the interface in the [Merchant Portal](/docs/about/all/spryker-marketplace/merchant-portal.html).
- For large volumes, use a file and data importers or integrate with the merchant PIM or ERP system through the [Spryker Middleware](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/spryker-link-middleware.html).

{% endinfo_block %}

The operator and merchants need to align on categories, attributes, and values that can be used in the importing process. Mapping needs to be done by merchants or through Spryker Middleware.

![concrete-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-4-concrete-products.png)

![create-offer](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-4-create-offer.png)


### 5) Operator: Set up the payment process

The operator takes the following steps:
1. Decide what kind of payment process to implement—for example, whether to use a PSP or not.
2. Choose a revenue model to apply in the marketplace—for example, transaction-based, subscription-based, or listing-based—and whether a PSP can cover it.

The following example illustrates the process when using a PSP to cover the marketplace payments completely:
1. The merchant registers on the PSP portal and provides relevant company and representative information.
2. The PSP checks the merchant during the compliance and KYC process.
3. PSP approves the merchant and starts technical onboarding.
4. The PSP calculates transactional fees and commissions agreed upon and makes payments to merchants.
5. The merchant receives access to the PSP Back Office, where data regarding commissions and payments can be checked.

{% info_block infoBox %}

For more information about the payment setup and available options, ask your Spryker contact.

{% endinfo_block %}

### 6) Operator: Set up the order management process

The State Machine models the order management process, including both delivery and return parts that can be defined per merchant. It helps if you have big and small merchants with different fulfillment processes. Otherwise, you can use one State Machine flow for all your merchants.


There are two fulfillment models applicable to Marketplace you can choose:
* Fulfillment by merchants: Merchants receive, process, and dispatch orders directly to your marketplace buyers.
* Fulfillment by marketplace: Merchants sell products and the operator manages the logistics, including returns.

The shipping process needs to be set up on a project level.

The State Machine can be set up to route an automated email to the relevant merchant once an order is created.

The following diagram shows an example of a simple State Machine workflow, where every merchant handles their own shipments and returns.

![state-machine-workflow-example](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-6-state-machine-workflow-example.png)

### 7) Merchant and operator: Approve products and offers and activate the merchant

The following steps are taken by the operator:

1. Do a final check of the merchant's public profile, products, and offer quality.
2. [Activate merchants](/docs/pbc/all/merchant-management/{{site.version}}/marketplace/manage-in-the-back-office/manage-merchants/create-merchants.html) and [approve products](/docs/pbc/all/product-information-management/{{site.version}}/marketplace/manage-in-the-merchant-portal/concrete-products/manage-marketplace-concrete-products.html#activating-and-deactivating-a-concrete-product) and [offers](/docs/pbc/all/offer-management/{{site.version}}/marketplace/manage-merchant-product-offers.html#approving-or-denying-offers) in the Back Office.
3. Optional: Activate and approve products and offers through the data importer.
4. Optional: To optimize the product and offer approval process, define specific rules per merchant.

{% info_block infoBox %}

Trusted merchants can have an automatic pre-approval, while new merchants have their new product listings pending first.

{% endinfo_block %}

![offers-in-the-back-office](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-7-offers-in-the-back-office.png)

![offers-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-7-offers-on-the-storefront.png)
