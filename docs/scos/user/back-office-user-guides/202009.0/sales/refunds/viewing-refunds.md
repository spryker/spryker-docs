---
title: Viewing refunds
description: The article provides reference information about attributes Back Office users see when viewing the list of refunds.
last_updated: Aug 27, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/refunds-reference-information
originalArticleId: 022d663d-393b-4298-8bb8-fb63ce126f11
redirect_from:
  - /v6/docs/refunds-reference-information
  - /v6/docs/en/refunds-reference-information
related:
  - title: Refunds feature overview
    link: docs/scos/user/features/page.version/refunds-feature-overview.html
---

This topic contains the reference information for working refunds in **Sales** > **Refunds**.
***
This page just displays the information so no actual actions can be done there.
On the **Refunds** page you see the **List of refunds** table that contains the following information:

| Value |Description  |
| --- | --- |
| **Refind Id**| The ID of a specific refund. |
|**Sales Order Id**  |The ID of the order that derives from the **Sales > Orders** section. |
| **Refund date** |The date when a specific refund has been created.|
| **Amount** |The amount of money to refund. This amount value derives from Item Total in **Sales > Orders**.|

{% info_block infoBox "Recieving refunds" %}

When a customer receives the items they ordered, they may encounter issues with some or all of them. In this case, a customer contacts the sales department asking them for a refund. A sales department representative navigates to the **Sales > Orders** section and opens the order. They change the status of order item (or all items) to **return** and then to **refund**. Once this is done, an appropriate record appears in the **Refunds** section.

{% endinfo_block %}
