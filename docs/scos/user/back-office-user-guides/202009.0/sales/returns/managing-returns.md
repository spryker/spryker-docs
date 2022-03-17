---
title: Managing returns
description: In this article, you will know how to manage returns in the Back Office.
last_updated: Sep 7, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-returns
originalArticleId: 40f00c1c-437d-4f30-b1ac-451589ecbde4
redirect_from:
  - /v6/docs/managing-returns
  - /v6/docs/en/managing-returns
related:
  - title: Return Management Feature Overview
    link: docs/scos/user/features/page.version/return-management-feature-overview/return-management-feature-overview.html
  - title: Managing Orders
    link: docs/scos/user/back-office-user-guides/page.version/sales/orders/managing-orders.html
---

After a [return](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html) has been [created by a Back Office User](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/managing-orders.html#creating-returns) or by a [Shop User](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html#return-management-on-the-storefront), it appears on the *Orders > Returns* page. On this page, you can manage the returns as follows:


* View the return details
* Set the return statuses
* Print the return slip

To start managing returns, navigate to the *Sales >Returns* section.

## Viewing the Returns

{% info_block infoBox "Info" %}

Returns of the registered and guest users have different return references. See [Returns Section](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/references/reference-information-orders.html#returns-section) for details on the return references.

{% endinfo_block %}
To view details on a return, in the *Actions* column of the return, click **View**.

This takes you to the *Return Overview [Return reference]* page where you can view the return details, set the return statuses and print the return slip as described below.

## Setting the Return Statuses
You can either accept the returns created by the Back Office Users or by the Shop Users, or cancel them if the returns are no longer relevant, can not be made due to the Return Policy, or for other reason.

To set and track the return statuses, you trigger the return states.

To trigger the return states:

1. On the *Returns* page, click **View** in the *Actions* column. This takes you to the *Return Overview [Return reference]*.

2. *Trigger all matching state* section of the *Return Overview [Return reference]* page, click the necessary state. The return state changes and the new states that you can trigger, appear. See [Return Item States: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/references/reference-information-return-item-states.html) for information on the return items states and the flow.
![Trigger states](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Returns/trigger-status.png)

{% info_block infoBox "Info" %}

The triggered return states are reflected in [Customer Account on the Storefront](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html#return-management-on-the-storefront) informing Customers about the statuses of their returns.<!--- You can rename the default statuses that display on the Storefront so they would make more sense for the Storefront users. See *Display Custom Names for Order Item States on the Storefront* for details on how to do that.-->

{% endinfo_block %}

***
### Tips and tricks

To trigger the return states for all the items in the return, click the states at the *Trigger all matching states* field. To trigger the return states for individual items of the return, trigger the states in the *Trigger event* column for the necessary items.
***

## Printing a Return Slip
For all returns, irrespective of their statuses, you can print the automatically generated [return slip](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/return-management-feature-overview.html#return-slip).

To print the return slip:

* In the *Actions* column on the *List of Returns* page, click **Print slip**.
* On the *Return Overview [Return reference]* page, click **Print Return Slip**.

This takes you to the page with the print version of the return slip.

**What's next?**

* To learn about the attributes you enter and select while managing returns, see [Returns: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/references/reference-information-returns.html).
* To learn about the return item states, see [Return Item States: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/references/reference-information-return-item-states.html).
