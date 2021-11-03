---
title: Return Management feature overview
description: This article provides a description for the feature Return Management in the Spryker Commerce OS.
last_updated: Jun 4, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/return-management-feature-overview
originalArticleId: 21653fb1-7ad6-4167-ad28-fdbc69434252
redirect_from:
  - /v6/docs/return-management-feature-overview
  - /v6/docs/en/return-management-feature-overview
  - /v6/docs/return-management
  - /v6/docs/en/return-management
  - /v6/docs/return-details-reference-information
  - /v6/docs/en/return-details-reference-information
---

The *Return Management* feature allows you to create and manage returns for a sales order. 

Once an order has been shipped, the registered buyer or a Back Office user can initiate a return of the whole order or its individual items. See [Managing orders](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/managing-orders.html) for details on how they can do that.

{% info_block warningBox "Note" %}

You can also create and manage returns via Glue API. For details, see [Manging the returns](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-returns/managing-the-returns.html).

{% endinfo_block %}

## Returnable items and a return policy
Not all the order items can be returned. For an item to be returnable, it should:

* Be in *Shipped* or *Delivered* state.
* Fall on the return dates set forth in the Return Policy.

The *Return Policy* is a set of rules that defines what items can be returned: in what conditions, in what period of time, etc. Out of the box, you can only define within what period the items can be returned. For example, you can specify that an item can be returned within 14 days after the purchase. 

{% info_block infoBox "Info" %}

For now, you can set the Return Policy period in code only. There is no UI for that. See [HowTo - Set the number of days for a return policy](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-set-number-of-days-for-a-return-policy.html) for details.

{% endinfo_block %}

## Return items states
The Return items can have the following states in the Order Management System (OMS):

* *Waiting for return*: Buyer created a return, but a Back Office user has not confirmed it yet.
* *Returned*: the return has been received and confirmed by the Back Office user.
* *Refunded*: Back Office user has made a refund for the returned items.
* *Return Canceled*: the return has been canceled by a Back Office user because of the return policy or for any other reason.
* *Shipped to customer*: the canceled return has been shipped back to the buyer.
* *Delivered*: Buyer has received the shipped return.
<!---
{% info_block infoBox "Return states on the Storefront" %}

The above states are the default ones in the OMS. You can display them as they are on the Storefront as well, or name the states differently for the Storefront users. For details on how to give custom names to the return states on the Storefront, see *Display Custom Names for Order Item States on the Storefront*.

{% endinfo_block %}
-->
The relation of sales order items statuses and the return states is as follows:
![Sales Order Items and Statuses](https://confluence-connect.gliffy.net/embed/image/cebbb529-19b7-4623-bd6d-ef2b30fe97a9.png?utm_medium=live&utm_source=custom)

## Return slip
Buyers and Back Office users can have a paper version of the return by printing the automatically generated *return slip*. The return slip contains return and sales order references, details on the returnable sales order items, and a barcode generated based on the return reference. 
![Return slip](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Return+Management/Return+Management+Feature+Overview/print-return-slip.png)

## Return Management on the Storefront
The **registered buyers** can return entire orders or individual sales order items as soon as they have been delivered to them. When returning, the buyers can select or enter a return reason.
The **guest users** can not initiate returns of their orders, as the return management is done via the Customer Account on the Storefront. Returns of the guest orders can be initiated only via the Back Office by the Back Office user. 

{% info_block warningBox "Note" %}

For a [Configurable Bundle](/docs/scos/user/features/{{page.version}}/configurable-bundle-feature-overview.html), you can’t select to return an entire Configurable Bundle, but you can select to return separate items from it.
The [Product Bundles](/docs/scos/user/features/{{page.version}}/product-bundles-feature-overview.html), on the contrary, are handled as one product, so only the whole bundle can be returned. You can not return individual items of a Product Bundle.

{% endinfo_block %}

Once a return request has been submitted, it acquires the *Waiting for return* state. The return states change as the Back Office user [processes the return](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/managing-orders.html#creating-returns). See [Return items states](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/references/reference-information-return-item-states.html) for details on the return states.

{% info_block infoBox "Info" %}

Next to each sales order item, there is the date till which the item can be returned. This date is controlled by the Return Policy. If the item is non-returnable, you cannot select the return reason and create the return.

{% endinfo_block %}

All the returns created by the buyer or by the Back Office user for the buyer are listed on the *Returns* page in the *Customer Account*. From here, the Buyer can view the return details and print the return slip.
The following figure shows how to create a return, view its details and print a slip:
![create and print a return](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Return+Management/Return+Management+Feature+Overview/create-and-print-a-return.gif)

## Return Management in the Back Office
A Back Office user can create returns for the [returnable items](#returnable-items-and-a-return-policy) from the order details page of the Back Office. See [Back Office user guide - Managing orders](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/orders/managing-orders.html) for details. Also, a Back Office user can view returns, change their states, print a return slip, and cancel the returns.  See [Back Office user guide - Manging returns](/docs/scos/user/back-office-user-guides/{{page.version}}/sales/returns/managing-returns.html)  for instructions on how to manage the returns in the Back Office.

{% info_block infoBox "Return management process" %}

To define the most suitable return management process for your project, to learn how you can use the default Spryker Return Management feature, and what custom development you might need to implement it, check out [Building a return management process: Best practices](/docs/scos/user/features/{{page.version}}/return-management-feature-overview/building-a-return-management-process-best-practices.html). 

{% endinfo_block %}

## Current constraints
Currently, the feature has the following functional constraints which are going to be resolved in the future:

* There is no user interface for managing the return policy and the return reasons.
* You can’t return individual items of a Product Bundle.
