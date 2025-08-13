---
title: Manage availability
last_updated: Feb 02, 2021
description: This document contains reference information for working with the Availability section in Back Office.
template: back-office-user-guide-template
redirect_from:
---

This document includes the information you need to know when working with the **Availability** section in Back Office.

---

## Overview page

On the **Overview of Products Availability** page, you see the following:

* The SKUs and names of the abstract products and SKU values are a hyperlink to this product's **Edit** page.
* The number of products in current stock and the number of reserved products (meaning ordered ones).
* The identifier for the bundled product and those that are *never out of stock* (Yes/No values).

{% info_block infoBox "Info" %}

For multi-store projects, you can filter the products according to the store the product is available.

{% endinfo_block %}

{% info_block infoBox "Info" %}

For the [Marketplace](/docs/about/all/spryker-marketplace/marketplace-concept.html) project, you can also filter the products according to the merchant the product belongs to.

{% endinfo_block %}

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/warehouse-management-system/marketplace/manage-availability.md/merchants-switcher-on-availabilities.mp4" type="video/mp4">
  </video>
</figure>

---

## View product availability page

On the **View Product Availability** page, you see two sections:

* Abstract product availability
* Variant availability

The **Abstract Product availability** section is not modifiable. It only provides basic information. As the abstract product itself does not have any stock, the **Current Stock** value reflects the summarized value of all its variants.


{% info_block infoBox "Info" %}

The **Abstract Product** contains a drop-down list where you can select the store for which you need to view the availability of the product.

{% endinfo_block %}

{% info_block infoBox "Info" %}

For the [Marketplace](/docs/about/all/spryker-marketplace/marketplace-concept.html) project, a merchant name is available for a specific product. The availability of a certain merchant warehouse is provided.

{% endinfo_block %}

Unlike the abstract product availability, the variant availability provides you with an option to edit stock. You invoke the edit stock flow from the **Actions** column. It also has the identifier of the product bundle.

Both sections contain the following info:

* The SKU and name of the abstract product/product variant.
* The availability value, the number of products in the current stock, and the number of the reserved products (meaning the ordered ones).
* The identifier for the *never out of stock* (Yes/No values).

---

## Edit stock page

The following table describes the attributes you see and enter on the **Edit Stock** page:

| ATTRIBUTE | DESCRIPTION |
|-|-|
| Stock Type | Name of the corresponding warehouse. The field is auto-populated and is not editable. |
| Quantity | Number of products available in the stock for a specific store and warehouse. |
| Never out of stock | Checkbox to set the product to be always available in a specific store and warehouse. Meaning even if the quantity is set to 0, the product will still be available. This option is usually used for digital items, like gift cards, for example. |
| Available in stores | This value is auto-populated according to your store setup and is not modifiable in UI. It just identifies for which store you define the product availability value. |

## Availability calculation: example

A good example of availability calculation is a product bundle.
Let's say you have two products: a smartphone and three glass screen protectors for it. They are presented in the store as separate items but also included in a bundle.

This means that a customer can either buy those separately from their product details pages or buy a "smartphone+3 glass screen protectors" bundle.

Each product has its own stock and availability value if bought separately.
But in the case of a bundle, the availability is calculated based on each item's availability taking into account their *quantity in the bundle*.

Even if each item is available on its own, but the availability does not meet the minimum quantity for a bundle (for example, there are only two glass screen protectors, but the bundle goes with three), then the whole bundle is *unavailable*.
