---
title: Managing Returns
originalLink: https://documentation.spryker.com/v5/docs/managing-returns
redirect_from:
  - /v5/docs/managing-returns
  - /v5/docs/en/managing-returns
---

After a [return](https://documentation.spryker.com/docs/en/return-management-feature-overview) has been [created by a Back Office User](https://documentation.spryker.com/docs/en/managing-orders#creating-a-return) or by a [Shop User](https://documentation.spryker.com/docs/en/shop-guide-creating-a-return), it appears on the *Orders > Returns* page. On this page, you can manage the returns as follows:

* View the return details
* Set the return statuses
* Print the return slip

To start managing returns, navigate to the *Sales >Returns* section.

## Viewing the Returns
To view details on a return, in the *Actions* column of the return, click **View**. 

This takes you to the *Return Overview [Return reference]* page where you can view the return details, set the return statuses and print the return slip as described below.

## Setting the Return Statuses
You can either accept the returns created by the Back Office Users or by the Shop Users, or cancel them if the returns are no longer relevant, can not be made due to the Return Policy, or for other reason. 

To set and track the return statuses, you trigger the return states. 

To trigger the return states:

1. On the *Returns* page, click **View** in the *Actions* column. This takes you to the *Return Overview [Return reference]*.

2. *Trigger all matching state* section of the *Return Overview [Return reference]* page, click the necessary state. The return state changes and the new states that you can trigger, appear. See [Return Item States: Reference Information](https://documentation.spryker.com/docs/en/return-item-states-reference-information) for information on the return items states and the flow.
![Trigger states](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Sales/Returns/trigger-status.png){height="" width=""}
 
{% info_block infoBox "Info" %}

The triggered return states are reflected in [Customer Account on the Storefront](https://documentation.spryker.com/docs/en/shop-guide-creating-a-return) informing Customers about the statuses of their returns.

{% endinfo_block %}
***
### Tips & Tricks

To trigger the return states for all the items in the return, click the states at the *Trigger all matching states* field. To trigger the return states for individual items of the return, trigger the states in the *Trigger event* column for the necessary items. 
***

## Printing a Return Slip
For all returns, irrespective of their statuses, you can print the automatically generated [return slip](https://documentation.spryker.com/docs/en/return-management-feature-overview#return-slip). 

To print the return slip:

* In the *Actions* column on the *List of Returns* page, click **Print slip**. 
* On the *Return Overview [Return reference]* page, click **Print Return Slip**.

This takes you to the page with the print version of the return slip.

**What's next?**

* To learn about the attributes you enter and select while managing returns, see [Returns: Reference Information](https://documentation.spryker.com/docs/en/returns-reference-information).
* To learn about the return item states, see [Return Item States: Reference Information](https://documentation.spryker.com/docs/en/return-item-states-reference-information). 
