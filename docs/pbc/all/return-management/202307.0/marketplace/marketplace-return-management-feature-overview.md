---
title: Marketplace Return Management feature overview
description: This document contains concept information for the Marketplace Return Management feature.
template: concept-topic-template
last_updated: Nov 10, 2023
related:
  - title: Managing marketplace returns
    link: docs/pbc/all/return-management/page.version/marketplace/manage-in-the-back-office/manage-marketplace-returns.html
---

*Marketplace Return Management* feature lets you create and manage returns for a merchant order in a Spryker Marketplace Demo Shop.

Once an order has been shipped, the registered buyer or a Back Office user can initiate a return of the whole marketplace order or its individual items. For information about what items can be returned, see [Returnable items and a return policy](/docs/pbc/all/return-management/{{page.version}}/base-shop/return-management-feature-overview.html#returnable-items-and-a-return-policy). For information about how a Back Office user can create returns, see [Managing marketplace orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-marketplace-orders.html).


{% info_block warningBox "Note" %}

You can also create and manage returns via Glue API. For details, see [Managing the returns](/docs/pbc/all/return-management/{{page.version}}/marketplace/glue-api-manage-marketplace-returns.html).

{% endinfo_block %}

## Marketplace return items states

The return items can have the following states in the Marketplace Order Management System (Marketplace OMS):

* *Waiting for return*: a buyer created a return, but a merchant user has not confirmed it in the Merchant Portal yet.
* *Returned*: the return has been received and confirmed by the merchant user.
* *Refunded*: A merchant user has made a refund for the returned items.
* *Return Canceled*: the return has been canceled by a merchant user because of the return policy or for any other reason.
* *Shipped to customer*: the canceled return has been shipped back to the buyer.
* *Delivered*: the buyer has received the shipped return.

The relation of the sales order items statuses and the return states is as follows:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Return+Management/marketplace-merchant-return-process.png)

## Marketplace return slip

Buyers and Back Office users (Marketplace administrator and [main merchant](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/main-merchant.html)) can have a paper version of the return by printing the automatically generated *return slip*. The return slip contains:

* The return and marketplace sales order references.
* Details about the returnable marketplace sales order items.
* A barcode generated based on the return reference.

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Return+Management/marketplace-return-slip.png)

## Marketplace Return Management on the Storefront

The registered buyers can return entire orders or individual merchant order items as soon as they have been delivered to them. When returning, the buyers can select or enter a return reason.

The guest users can not initiate returns of their orders, as the return management is done via the Customer Account on the Storefront. Returns of the guest orders can be initiated only via the Back Office by the Back Office user.

{% info_block infoBox "Info" %}

One return can include products only from one merchant.

{% endinfo_block %}

Once a return request has been submitted, it acquires the *Waiting for return* state. The return states change as the merchant [processes the return](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-marketplace-orders.html#creating-a-marketplace-return). For details about the return states, see [Return items states](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-marketplace-orders.html#reference-information-creating-a-marketplace-return).

All the returns created by the buyer or by the Back Office user for the buyer are listed on the *Returns* page in the *Customer Account*. From here, the buyer can view the return details and print the return slip.

The following figure shows how to create a return, view its details, and print a slip:

![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Features/Marketplace+Return+Management/create-a-return-marketplace.gif)

## Marketplace Return Management in the Back Office

A Back Office user can create returns for the [returnable items](/docs/pbc/all/return-management/{{page.version}}/base-shop/return-management-feature-overview.html#returnable-items-and-a-return-policy) from the order details page of the Back Office. For details, see [Back Office user guide: Managing orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-in-the-back-office/manage-marketplace-orders.html). Also, a Back Office user can view returns, close fulfilled returns, print a return slip, and cancel returns.

## Marketplace Return Management in the Merchant Portal

Merchants process their returns in the Merchant Portal. For details about how to manage the merchant returns, see [Merchant Portal guide: Managing merchant orders ](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-merchant-orders.html).

## Related Business User documents

| MERCHANT PORTAL USER GUIDES  | BACK OFFICE USER GUIDES |
| --- | --- |
| [Managing merchant returns](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/manage-merchant-orders.html#managing-merchant-returns) | [Managing marketplace returns](/docs/pbc/all/return-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-marketplace-returns.html) |
|    | [Managing main merchant returns](/docs/pbc/all/return-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-main-merchant-returns.html) |

## Related Developer articles

| INSTALLATION GUIDES      | GLUE API GUIDES     |
| -------------------- | -------------- |
| [Install the Marketplace Return Management feature](/docs/pbc/all/return-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-return-management-feature.html) | [Managing the returns](/docs/pbc/all/return-management/{{page.version}}/marketplace/glue-api-manage-marketplace-returns.html) |
| [Install the Marketplace Return Management Glue API](/docs/pbc/all/return-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-return-management-glue-api.html) |              
