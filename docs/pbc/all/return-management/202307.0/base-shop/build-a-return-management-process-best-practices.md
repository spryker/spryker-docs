---
title: "Build a return management process: Best practices"
description: Choose a suitable return management process for your project.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/building-a-return-management-process-best-practices
originalArticleId: 4082625a-ef83-4e10-b517-716042ef8282
redirect_from:
  - /2021080/docs/building-a-return-management-process-best-practices
  - /2021080/docs/en/building-a-return-management-process-best-practices
  - /docs/building-a-return-management-process-best-practices
  - /docs/en/building-a-return-management-process-best-practices
  - /docs/pbc/all/return-management/202307.0/build-a-return-management-process-best-practices.html
---

Before you can start accepting returns from Buyers, you need to build the returns management strategy that suits your business the best. This document contains scenarios that can help you choose the most suitable returns workflow and implement it using the Spryker [Return Management](/docs/pbc/all/return-management/{{page.version}}/marketplace/marketplace-return-management-feature-overview.html) functionality.

<a name="scenario1"></a>

## Scenario 1: Typical return process for B2C models

{% info_block infoBox %}

You can implement this scenario with the default Spryker functionality, without extra development.

{% endinfo_block %}

Suppose you are a clothing retailer and often get items returned within the 14-day return window. You want to automate the return process as much as possible, so that minimum intervention of your employees is required.

You can have the following return process:

* *Buyer* places an order, and after the order has been delivered, the Buyer decides to return it. The Buyer does the following:

    1. Selects the items to return.
    2. Creates the return.
    3. Prints the return slip and puts it into the box with items.
    4. Prints the return label and adheres it to the box.
    5. Ships the order to the shop.

* When the shop receives the return, the *Shop Administrator* checks the returned items. If all is good and if items meet the shop’s policy for the condition of returned items, the Shop Administrator confirms the return and makes the refund. Otherwise, the Shop Administrator contacts the Buyer and either cancels the return, or clarifies the details and makes the refund.
![image](https://confluence-connect.gliffy.net/embed/image/ceba5ea5-5ee2-4e8c-acce-65b64467421c.png?utm_medium=live&utm_source=custom)

This scenario is typical for most B2C models, and its main advantages are:

* Suits perfectly for the 14-days returns.
* Requires minimum human intervention.
* Can be implemented with the default Spryker [Return Management](/docs/pbc/all/return-management/{{page.version}}/marketplace/marketplace-return-management-feature-overview.html) functionality, without extra development effort.

<a name="scenario2"></a>

## Scenario 2: Returns, warranty cases, and exchanges for B2C and B2B models

{% info_block infoBox %}

Implementation of this scenario requires the default Spryker functionality and extra development for your project.

{% endinfo_block %}

Suppose you sell equipment the usage of which requires specific skills or knowledge. Therefore, you want to avoid cases when customers return items just because they did not use them correctly. Also, you want to establish an efficient process for handling warranty events.

You can have the following return process:

* *Buyer* creates a reclamation for items that have issues from the Order Details page in the Storefront.
* *Shop Administrator* receives the reclamation and does the following:
1. Contacts the customer to clarify the details of the claim.
2. If the reclamation:
    * Is resolved without the return, the reclamation is closed.
    * Cannot be resolved without the return:
        1. Creates the return based on the reclamation.
        2. Sends the return slip and the return label to the Buyer so the Buyer can print it, adhere to the box and ship the items back.

The following schema illustrates the workflow as well as the areas that require custom development for your project:

![image](https://confluence-connect.gliffy.net/embed/image/2599f923-6892-42bc-a867-e2b38bed5b2b.png?utm_medium=live&utm_source=custom)

This scenario suites both B2B and B2C models and is especially good for resolving disputes and handling warranty cases that can imply return or replacement. So it is best to use such a workflow when human intervention is needed.

You can combine this scenario with [scenario 1](#scenario1). For example:

You might have the *Return* option available for Buyers within 14 days after the delivery of the products, and then have only the *Claim* option, which would be active during the warranty period.

Or:

You might have the *Return* button, but when clicking it, the Buyer would first need to create the claim, and once the Back Office User sees and approves the claim, the Buyer can print the return label and ship items back to the shop.

The workflow of this scenario has the following advantages:

* If Buyer did not use the product correctly or misunderstood the product functionality, the reclamation allows resolving the issue through communication between the Customer Service and the Buyer. This helps reduce the number of erroneous returns.
* You and Buyers do not have to pay the postage if there are actually no issues with the product.
* Even though this workflow implies additional development effort, you can tailor it to the specific needs of your project.

## Scenario 3: Returns through Customer Service for B2C and B2B models

{% info_block infoBox %}

Implementation of this scenario requires the default Spryker functionality and extra development for your project.

{% endinfo_block %}

As in [scenario 2](#scenario2), suppose you sell products that require specific knowledge. You want to reduce the number of erroneous claims from Buyers to a minimum by encouraging them to contact Customer Service if Buyers have doubts as to the delivered items. This way, if there are actually no issues with the items, the Customer Service can help Buyers quickly. Otherwise, the Customer Service takes all further actions: creates reclamation and, if needed, a return.

The workflow for this scenario is:

* If a *buyer* receives faulty items or has questions about them, they contact the *Customer Service*.
* Customer Service either consults the Buyer about the items or creates a reclamation.
* The reclamation is checked internally, and the decision about the return, exchange, or cancellation is made. Customer Service contacts Buyer with the results of the check.
![image](https://confluence-connect.gliffy.net/embed/image/fbcca843-0c8c-4f85-8cd9-9d2cf20b68e2.png?utm_medium=live&utm_source=custom)

Like with scenario 2, this scenario is best to use for resolving disputes and handling the warranty cases. That is, when you can not do without the human intervention.

You can also combine this scenario with [scenario 1](#scenario1). For example, you might have the *Return* option available for Buyers within 14 days after the delivery of the products, and then have some *Contact Customer Service* option, which would be active during the warranty period.

The main advantages of this approach are:
* You save Buyers' time by allowing them to quickly resolve their questions without having to create claims and wait for the responses.
* You have only valid Buyer claims, which can be sorted and forwarded to the respective departments by the Customer Service. You also have only valid return requests, which saves your and Buyers' time and money.
* Even though this workflow implies additional development effort, you can tailor it to the specific needs of your project.
