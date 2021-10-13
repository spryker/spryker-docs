---
title: Viewing refunds
description: The article provides reference information about attributes Back Office users see when viewing the list of refunds.
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/viewing-refunds
originalArticleId: 36f1525b-6f90-41be-b0bf-75d368e91b8c
redirect_from:
  - /2021080/docs/viewing-refunds
  - /2021080/docs/en/viewing-refunds
  - /docs/viewing-refunds
  - /docs/en/viewing-refunds
---

This topic describes how to view refunds. 

## Viewing refunds

To view a list of refunds, navigate to **Sales** > **Refunds**. The *Overview of Refunds* page is displayed. 


### Reference information: Viewing refunds

On the *Overview of Refunds* page, you see the *List of refunds* table that contains detailed information about refunds. The page is meant to represent  information about refunds, so no actual actions can be done there.
The following table describes attributes you see when viewing refunds on the *Overview of Refunds* page.

| ATTRIBUTE | DESCRIPTION  |
| --- | --- |
| Refind Id| ID of a specific refund. |
|Sales Order Id  | ID of the order that derives from **Sales** > **Orders**. |
| Refund date | Date when a specific refund has been created.|
| Amount | Amount of money to refund. This amount value derives from Item Total in **Sales** > **Orders**.|

{% info_block infoBox "Receiving refunds" %}

When a customer receives the items they ordered, they may encounter issues with some or all of them. In this case, a customer contacts the sales department asking them for a refund. A sales department representative navigates to the **Sales > Orders** section and opens the order. They change the status of the order item (or all items) to *return* and then to *refund*. Once this is done, an appropriate record appears in the *Refunds* section.

{% endinfo_block %}

