---
title: Refunds- Reference Information
description: The article provides reference information about attributes Back Office users see when viewing the list of refunds.
last_updated: Nov 22, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/refunds-reference-information
originalArticleId: 27b2eb6f-8601-4e9b-bc71-4a73d6f997b3
redirect_from:
  - /v3/docs/refunds-reference-information
  - /v3/docs/en/refunds-reference-information
related:
  - title: "Reference information: Refund module"
    link: docs/scos/dev/feature-walkthroughs/page.version/refunds-feature-walkthrough/reference-information-refund-module.html
  - title: Refunds feature overview
    link: docs/scos/user/features/page.version/refunds-feature-overview.html
---

If a customer changes their mind about an order, you can give him/her a refund for the order. 
***
To view the refunds, navigate to the **Sales > Refunds** section.
***
This page just displays the information so no actual actions can be done there.
On the **Refunds** page you see the **List of refunds** table that contains the following information:

| Value |Description  |
| --- | --- |
| **Refind Id**| The ID of a specific refund. |
|**Sales Order Id**  |The ID of the order that derives from the **Sales > Orders** section. |
| **Refund date** |The date when a specific refund has been created.|
| **Amount** |The amount of money to refund. This amount value derives from Item Total in **Sales > Orders**.|

**How refunds appear in the Refunds section?**
When a customer receives the items they ordered, they may encounter issues with some or all of them. In this case, a customer contacts the sales department asking them for a refund. A sales department representative navigates to the **Sales > Orders** section and opens the order. They change the status of order item (or all items) to **return** and then to **refund**. Once this is done, an appropriate record appears in the **Refunds** section.
