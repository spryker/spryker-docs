---
title:  Merchant onboarding
description: This document describes the onboarding process for merchants and gives step-by-step instructions about completing it.
template: concept-topic-template
last_updated: Mar 29, 2023
---

This document describes how to onboard merchants.
Once created and approved, merchants become official members of the marketplace and can create products and offers to sell and fulfill orders in [Merchant Portal](/docs/marketplace/user/intro-to-spryker-marketplace/merchant-portal.html).

There are two primary roles: *operator* and *merchant*:
* An operator is a company that owns and administers the platform.
* A merchant is a business entity or individual that sells products on the operator's platform. The operator is responsible and engaged with the merchants to determine how they conduct their operations on the platform. The operator can serve as a merchant as well.

The onboarding process consists of seven steps. Each step requires specific actions that merchants, operators, or both need to take. 

If you run into any issues, please get in touch with your Spryker contact.

## Marchant onboarding process

The merchant onboarding process consists of the following steps:

1. The merchant puts in a request to join the marketplace.
2. The operator verifies the merchant's company and shares a contract.
3. The operator approves the merchant and provides them with access to the Merchant Portal to start completing their public profile.
4. The merchant creates products and offers in the Merchant Portal. Alternatively, the operator can help the merchant set up the process for automatically importing products and offers from a CSV template.
5. The operator decides what kind of payment process to implement—for example, whether or not to use a *Payment Service Provider (PSP)*.
6. An order management process that includes the process for fulfillment, including delivery, shipping, and returns, is established for merchants through Spryker State Machine.
7. A final check on the public profile, products, and offer quality is conducted. The operator activates merchants and their products and offers in Back Office. Both can be activated via a data importer as well.

Each step is described in the following sections.

### 1) Merchant: Put in a request to join

The official onboarding starts with a merchant requesting to join the marketplace. 

To request a new merchant account, use one of the following options:
* Build a landing page where the potential merchants can find the email address or a form to contact the operator to join the marketplace. In some cases, the operator may contact their partners and inform them about the marketplace.
* The merchant can use the page to self-register. Once complete, the data is sent to the operator for review (the feature is on the product roadmap and will be available soon).
* The preceding two options can be combined.

### 2) Operator: Verify (the KYC process) and register a merchant

1. Gather data a merchant provides, such as a registration number and the company behind the merchant, including representatives' information and their IDs.
2. To identify the trust level and the need for additional information, validate your merchant through public registers. 

{% info_block infoBox %}

To accelerate the validation process, you can use a relevant Spryker technology partner—for example, detected.app.

{% endinfo_block %}

The official relationship between the operator and merchant can be established by providing a contract to a merchant. For specific merchants, custom contracts can be used. Otherwise, boilerplate agreements must be available. Contracts can be made as part of terms and conditions that must be accepted prior, together with platform rules, customer communication guidelines, data policy, and SLA agreement. Clarification is also required regarding who the product data owner is and in which categories the merchant is allowed to sell.

![edit-merchant](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-2-edit-merchant.png)

### 3) Operator: Approve the merchant

1. In the Back Office, navigate to **Marketplace&nbsp;<span aria-label="and then">></span> Merchants**.
2. On the **Overview of Merchants** page that opens, in the **Actions** column, click **Approve Access**. 

By approving the merchant, the operator enables its users' access to Merchant Portal to start completing their public-facing profile and creating products or offers. 
A merchant admin user needs to be created by the operator based on data provided through the registration form, such as the email or first and last name of the contact person. 
The email with the password is automatically sent to access the Merchant Portal later on. The operator can also create more user accounts for the merchant if required.

![overview-of-merchants](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-3-overview-of-merchants.png)

![edit-user](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-3-edit-user.png)

### 4) Merchant and operator: Create and update the product and offers

Operator: Decide who the owner of the product data is:
* If the operator is the owner and handles the product data, other merchants can create offers with their specific prices and availability on top of existing products.
* If every merchant can create products, the operator needs to make sure there are no duplicates in the Marketplace, and they need to ensure the product data quality.

In the Merchant Portal, merchants can create and update products and offers individually. Alternatively, the operator can help the merchant in setting up the process for the automatic import of products and offers from a CSV template.

{% info_block infoBox %}

Based on the product volume, we recommend the following:
- If the number of products to be created or edited is small, use the interface in Merchant Portal.
- For large volumes, use a file and data importers or integrate with the merchant ERP system through Spryker Middleware.

{% endinfo_block %}

The operator needs to align with merchant categories as well as attributes and values that can be used in the importing process. Mapping needs to be done by merchants or through Spryker Middleware.

![concrete-products](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-4-concrete-products.png)

![create-offer](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-4-create-offer.png)


### 5) Operator: Set up the payment process operator

The following steps are taken by the operator:
1. Decide what kind of payment process to implement—for example, whether to use a PSP or not. 
2. Choose a revenue model to apply in the marketplace—for example, transaction-based, subscription-based, or listing-based—and whether a PSP can cover it.

The following example illustrates the process when using a PSP to cover the marketplace payments completely:
1. The merchant provides relevant company and representative data to the PSP. The operator can support this by adding the documents already sent to the operator by this merchant.
2. The PSP checks the merchant during the compliance and KYC process.
3. PSP approves the merchant and starts technical onboarding on its own.
4. The PSP calculates transactional fees and commissions agreed upon and makes payments to merchants.
5. The merchant receives access to the PSP interface, where data regarding commissions and payments can be checked.

{% info_block infoBox %}

For more information about the payment setup and available options, ask your Spryker contact.

{% endinfo_block %}

### 6) Operator: Set up the order management process

The State Machine models the order management process including both delivery and return flows that can be defined per merchant. It helps if you have big and smaller merchants with different processes behind them.


There are two fulfillment models applicable to Marketplace you can choose:
* Fulfillment by merchants: Merchants receive, process, and dispatch orders directly to your marketplace buyers.
* Fulfillment by marketplace: Merchants do the selling and manage the logistics, including returns.

The shipping process needs to be set up on a project level.

The State Machine can be set up to route an automated email to the relevant merchant once an order is created.

The following diagram shows an example of a simple State Machine workflow, where every merchant handles their own shipments and returns.

![state-machine-workflow-example](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-6-state-machine-workflow-example.png)

### 7) Merchant and operator: Approve products and offers and activate the merchant

The following steps are taken by the operator:

1. Do a final check of the merchant's public profile, products, and offer quality. 
2. Activate merchants and approve offers in the Back Office. 
3. Optional: Activate an approve products and offers through the data importer.
4. Optional: To optimize the product and offer approval process, define specific rules per merchant. 

{% info_block infoBox %}

Trusted merchants can have an automatic pre-approval, while new merchants have their new product listings pending first.

{% endinfo_block %}

![offers-in-the-back-office](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-7-offers-in-the-back-office.png)

![offers-on-the-storefront](https://spryker.s3.eu-central-1.amazonaws.com/docs/marketplace/user/intro-to-spryker-marketplace/merchant-onboarding/step-7-offers-on-storefront.png)



