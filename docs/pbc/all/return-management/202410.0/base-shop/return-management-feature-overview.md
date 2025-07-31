---
title: Return Management feature overview
description: This document provides a description for the feature Return Management in the Spryker Commerce OS.
last_updated: Sep 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/return-management-feature-overview
originalArticleId: 74024d01-461c-4514-a158-fb22bb729dde
redirect_from:
  - /docs/scos/user/features/202108.0/return-management-feature-overview/return-management-feature-overview.html
  - /docs/pbc/all/return-management/202204.0/base-shop/return-management-feature-overview.html
---

The *Return Management* capability lets you create and manage returns for a sales order.

Once an order has been shipped, the registered buyer or a Back Office user can initiate a return of the whole order or its individual items. For details about how to create return, see [Creating returns](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-returns.html).

{% info_block warningBox "Note" %}

You can also create and manage returns using Glue API. For details, see [Manging the returns](/docs/pbc/all/return-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-returns.html).

{% endinfo_block %}

## Returnable items and a return policy

Not all the order items can be returned. For an item to be returnable, it must meet these conditions:

- Be in *Shipped* or *Delivered* state.
- Fall on the return dates set forth in the Return Policy.

The *Return Policy* is a set of rules that defines what items can be returned: in what conditions, in what period of time. Out of the box, you can only define within what period the items can be returned. For example, you can specify that an item can be returned within 14 days after the purchase.

{% info_block infoBox "Info" %}

For now, you can set the Return Policy period in code only. There is no UI for that. For details, see [HowTo: Set the number of days for a return policy](/docs/pbc/all/return-management/{{page.version}}/base-shop/set-number-of-days-for-a-return-policy.html).

{% endinfo_block %}

## Return items states

The Return items can have the following states in the Order Management System (OMS):

- `Waiting for return`. A buyer created a return, but a Back Office user has not confirmed it yet.
- `Returned`. The return has been received and confirmed by the Back Office user.
- `Refunded`. A Back Office user has made a refund for the returned items.
- `Return Canceled`. The return has been canceled by a Back Office user because of the return policy or for any other reason.
- `Shipped to customer`. The canceled return has been shipped back to the buyer.
- `Delivered`. A buyer has received the shipped return.
<!---
{% info_block infoBox "Return states on the Storefront" %}

The preceding states are the default ones in the OMS. You can display them as they are on the Storefront as well, or name the states differently for the Storefront users. For details about how to give custom names to the return states on the Storefront, see *Display Custom Names for Order Item States on the Storefront*.

{% endinfo_block %}
-->

The relation of sales order items statuses and the return states is as follows:
![Sales Order Items and Statuses](https://confluence-connect.gliffy.net/embed/image/cebbb529-19b7-4623-bd6d-ef2b30fe97a9.png?utm_medium=live&utm_source=custom)

## Return slip

Buyers and Back Office users can have a paper version of the return by printing the automatically generated *return slip*. The return slip contains return and sales order references, details about the returnable sales order items, and a barcode generated based on the return reference.
![Return slip](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Return+Management/Return+Management+Feature+Overview/print-return-slip.png)

## Return Management on the Storefront

The *registered buyers* can return entire orders or individual sales order items as soon as they have been delivered to them. When returning, the buyers can select or enter a return reason.
The *guest users* can not initiate returns of their orders, as the return management is done by the Customer Account on the Storefront. Returns of the guest orders can be initiated only in the Back Office by the Back Office user.

{% info_block warningBox "Note" %}

For a [Configurable Bundle](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/configurable-bundle-feature-overview.html), you can't select to return an entire Configurable Bundle, but you can select to return separate items from it.
The [Product Bundles](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/feature-overviews/product-bundles-feature-overview.html), on the contrary, are handled as one product, so only the whole bundle can be returned. You can not return individual items of a Product Bundle.

{% endinfo_block %}

Once a return request has been submitted, it acquires the *Waiting for return* state. The return states change as the Back Office user [processes the return](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-returns.html). For details about the return states, see [Return items states](/docs/pbc/all/return-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-returns.html).

{% info_block infoBox "Info" %}

Next to each sales order item, there is the date until which the item can be returned. This date is controlled by the Return Policy. If the item is non-returnable, you cannot select the return reason and create the return.

{% endinfo_block %}

All the returns created by the buyer or by the Back Office user for the buyer are listed on the **Returns** page in the **Customer Account**. From here, the buyer can view the return details and print the return slip.
The following figure shows how to create a return, view its details and print a slip:
![create and print a return](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/return-management/base-shop/return-management-feature-overview.md/create-and-print-a-return.mp4)

## Return Management in the Back Office

A Back Office user can create returns for the [returnable items](#returnable-items-and-a-return-policy) from the order details page of the Back Office. For details, see [Back Office user guide - Managing orders](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-returns.html). Also, a Back Office user can view returns, change their states, print a return slip, and cancel the returns. For details about how to manage the returns in the Back Office, see [Back Office user guide - Manging returns](/docs/pbc/all/return-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-returns.html).

{% info_block infoBox "Return management process" %}

To define the most suitable return management process for your project, to learn how you can use the default Spryker Return Management feature, and what custom development you might need to implement it, check out [Building a return management process: Best practices](/docs/pbc/all/return-management/{{page.version}}/base-shop/build-a-return-management-process-best-practices.html).

{% endinfo_block %}


## Video tutorial

Check out this video to get more details about how Return Management works:

{% wistia kqxwnzjo3o 960 720 %}

## Current constraints

The feature has the following functional constraints which are going to be resolved in the future:

- There is no user interface for managing the return policy and the return reasons.
- You can't return individual items of a Product Bundle.

## Installation

To install the return management capability, do the following:

1. Install the required modules using Composer:

```bash
composer require spryker-feature/return-management:"{{site.version}}" spryker/sales-returns-rest-api:"{{site.version}}" spryker/barcode:"^1.1.1" --update-with-dependencies
```

2. Follow the integration guides in [Related Developer documents](#related-developer-documents).

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Create returns in the Back Office](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/manage-in-the-back-office/orders/create-returns.html)  |
| [View return details, set return statuses and print return slips in the Back Office](/docs/pbc/all/return-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-returns.html)  |
| [Choose a suitable return management process for your project](/docs/pbc/all/return-management/{{page.version}}/base-shop/build-a-return-management-process-best-practices.html)  |

## Related Developer documents

| INSTALLATION GUIDES  | GLUE API GUIDES | TUTORIALS AND HOWTOS |
|---|---|---|
| [Install the Return Management feature](/docs/pbc/all/return-management/{{page.version}}/base-shop/install-and-upgrade/install-the-return-management-feature.html) | [Managing the returns](/docs/pbc/all/return-management/{{page.version}}/marketplace/glue-api-manage-marketplace-returns.html) | [HowTo: Set number of days for a return policy](/docs/pbc/all/return-management/{{page.version}}/base-shop/set-number-of-days-for-a-return-policy.html) |
| [Install the Configurable Bundle + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-configurable-bundle-order-management-feature.html) |  |  |
| [Install the Return Management Glue API](/docs/pbc/all/return-management/{{page.version}}/base-shop/install-and-upgrade/install-the-return-management-glue-api.html) |  |  |
| [Install the Order Management feature](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |  |  |
| [Install the Product + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-order-management-feature.html) |  |  |
| [Install the Product Bundles + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-bundles-order-management-feature.html) |  |  |
| [Install the Product Bundles + Return Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-bundles-return-management-feature.html) |  |  |
| [Product Measurement Unit feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-measurement-units-feature.html) |  |  |
| [Install the Product Options + Order Management feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-product-options-order-management-feature.html) |  |  |
| [Install the Product Packaging Unit feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-packaging-units-feature.html) |  |  |
