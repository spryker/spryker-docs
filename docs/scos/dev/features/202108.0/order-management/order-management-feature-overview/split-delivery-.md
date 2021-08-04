---
title: Split Delivery overview
originalLink: https://documentation.spryker.com/2021080/docs/split-delivery-overview
redirect_from:
  - /2021080/docs/split-delivery-overview
  - /2021080/docs/en/split-delivery-overview
---

*Split Delivery* enables the same order as *shipments* to multiple delivery addresses and/or on different dates, and/or with different shipment methods. A *shipment* is a set of two or more products combined by the same delivery address.

Each shipment defines:

* Delivery address
* Shipment method
* Delivery date requested from a customer

In the Storefront, Split Delivery allows you, as a customer, to set different delivery addresses for the order items, specify the date when you want the items to be delivered and select shipment methods per each shipment.

In the Back Office, the Split Delivery allows you, as a Back Office user, to view, update and/or create multiple shipments for an order that had originally one delivery address.
The following scheme illustrates relations between **Shipment**, **ShipmentGui**, and **Sales** modules:

![Module relations](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Split+Delivery/split-delivery-module-relations.png)

## Split Delivery on the Storefront

{% info_block warningBox %}
Keep in mind that Split Delivery works *only* if there are several product items in one order.
{% endinfo_block %}

In the *Address* checkout step, the **Define to multiple addresses** drop-down option allows you to assign a delivery address per cart item.

Then, in the *Shipment* checkout step, you can see the products grouped by the same delivery address. The number of shipments equals the number of the same delivery addresses. For each shipment, you can select a delivery date (optional) and a shipment method.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Shop+User+Guides/Checkout/Shop+Guide+-+Summary+Step/summary-step-new.png)

See [Shop Guide - Address](https://documentation.spryker.com/docs/address-step-shop-guide-201911) for more details on how to add multiple delivery addresses to order items in the Storefront.

## Split Delivery in the Back Office
In the Back Office, the shipments are displayed in the *Order Items* section on the **View Order: [Order ID]** page.

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Split+Delivery/Split+Delivery+Feature+Overview/shipments-zed.png)

Here you can perform the following actions on shipments:

* Create a new shipment for the whole order
* Modify a delivery address, a shipment method (without any impact on order totals), and a delivery date
* Move items between shipments
* Change the state of each item or all items per shipment

See [Orders](https://documentation.spryker.com/docs/managing-orders) for more details on how to create and manage shipments in the Back Office.

## Constraints
### Gift Card compatibility
Currently, the Split Delivery is not compatible with the Gift Cards feature. If you want to buy a Gift card, only *one* delivery address can be selected for the whole order. 

### Limitation for payment service providers
Most of payment service providers (PSP) support a single delivery address for a given order, while Split Delivery enables your customers to add multiple shipments to the same order. In this case, you need to modify the configuration of the online store to allow your customers to deliver order items to different addresses. See [HowTo - Disable Split Delivery in Yves Interface](https://documentation.spryker.com/docs/ht-disable-split-delivery-in-yves-interface) for information on how to do that.

<!--
### Product Bundles
With Split Delivery, Product Bundles items can be shipped to different delivery addresses. However, if a product bundle is a part of the order and you don't want it to be split and delivered to different delivery addresses, you need to configure the implementation of the Checkout process on your project level.
-->


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
 <li><a href="https://documentation.spryker.com/docs/ht-disable-split-delivery-in-yves-interface" class="mr-link">Disable Split Delivery on the Storefront</a></li>                
                <li><a href="https://documentation.spryker.com/docs/split-delivery-concept" class="mr-link">Enable Split Delivery</a></li>
                <li>Enable the Split Delivery Glue API:</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-checkout-feature-integration" class="mr-link">Integrate the Checkout Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-shipment-feature-integration" class="mr-link">Integrate the Shipment Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-company-account-feature-integration" class="mr-link">Integrate the Company Account Glue API</a></li>
                <li><a href="https://documentation.spryker.com/docs/glue-api-customer-account-management-feature-integration" class="mr-link">Integrate the Customer Account Management Glue API</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-order-shipments#creating-a-new-shipment-for-order" class="mr-link">Create a shipment</a></li>
                <li><a href="https://documentation.spryker.com/docs/managing-order-shipments#editing-shipment-details" class="mr-link">Edit a shipment</a></li>
            </ul>
        </div>
    </div>
</div>
