---
title: Managing returns
description: In this article, you will know how to manage returns in the Back Office.
last_updated: Jun 23, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-returns
originalArticleId: 52e17a39-524b-49a9-8add-40103a721653
redirect_from:
  - /2021080/docs/managing-returns
  - /2021080/docs/en/managing-returns
  - /docs/managing-returns
  - /docs/en/managing-returns
related:
  - title: Return Management Feature Overview
    link: docs/scos/user/features/page.version/return-management-feature-overview/return-management-feature-overview.html
---

After a [return](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html) has been [created by a Back Office User](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/creating-returns.html#creating-returns) or by a [Shop User](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html#return-management-on-the-storefront), it appears on the *Orders > Returns* page. On this page, you can manage the returns as follows:

* View the return details
* Set the return statuses
* Print the return slip

## Prerequisites

To start managing returns, go to **Sales** > **Returns**.

## Viewing returns

On the **Returns** page, next to the return you want to view, click **View**. 





The following table describes the attributes you see when viewing a return.

**RETURNED ITEMS section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Product | List of all items included in the return. |
| Quantity | Product quantity. |
| Price | Product price. |
| Price | Total amount paid for the item. |
| State | State for the item. |
| Trigger event | Changes the state of return items. |
| Trigger all matching states | If no items are selected, changes the state of all the items in the return. If one or more items are selected, changes the state of the selected items. |

**Total section**

The *Total* section displays the total amount of items to be returned and the total sum to be refunded.

**GENERAL INFORMATION section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Order Reference | Unique identifier of the order a reference was created for. |
| Return Reference | Unique identifier of a return. |
| Return Date | Date when the return was created. |
| State | State of the return. |

**CUSTOMER section**

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Customer reference | Unique identifier of the customer a return was created for. |
| Name | Name of the customer a return was created for. |
| Email | Email address of the customer a return was created for. |




## Printing a return slip


Next to the return you want to generate a [return slip](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html#return-slip) for, click **Print Slip**.
    This opens the page with an auto-generated slip.
