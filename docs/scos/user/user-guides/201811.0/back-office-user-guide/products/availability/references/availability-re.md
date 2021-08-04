---
title: Availability- Reference Information
originalLink: https://documentation.spryker.com/v1/docs/availability-reference-information
redirect_from:
  - /v1/docs/availability-reference-information
  - /v1/docs/en/availability-reference-information
---

This article includes the information you need to know when working with the **Availability** section in Back Office.
***
## Overview page
On the **Overview of Products Availability** page, you see the following: 
* The SKUs and names of the abstract products and the SKU values is a hyperlink to this product Edit page.
* The number of product in current stock and the number of reserved products (meaning ordered ones)
*  The identifier for the bundled product and for those that are **never out of stock** (Yes/No values)
***
## View Product Availability page
On the **View Product Availability** page, you see 2 sections:
* Abstract product availability 
* Variant availability

The Abstract product availability section is not modifiable. It only provides overview information. As the abstract product itself does not have any stock, the Current Stock value will display the summarized value of all its variants.

Unlike the Abstract product availability, the Variant availability provides you with an option to edit stock. You invoke the edit stock flow from the Actions column. It also has the identifier of the product bundle.

Both sections contain the following info:
* The SKU and name of the abstract product/product variant
* The availability value, the number of products in current stock and the number of reserved products (meaning ordered ones)
* The identifier for the **never out of stock** (Yes/No values)
***
## Edit Stock page
The following table describes the attributes you see and enter on the Edit Stock page:

| Attribute | Description |
| --- | --- |
| **Stock Type** | The name of the corresponding warehouse. The field is auto-populated and is not editable.|
| **Quantity** | The number of products available in the stock for a specific store and warehouse. |
| **Never out of stock** | A checkbox to set the product to be always available in a specific store and warehouse. Meaning even if the quantity is set to 0, the product will still be available. This option is usually used for digital items, like Gift Cards, for example.|
| **Available in stores** | This value is auto-populated according to your store setup and is not modifiable in UI. This just identifies for which store you define the product availability value. |

## Availability Calculation: Example
A good example of availability calculation is a product bundle. 
Let's say you have two products: a Smartphone and three Glass Screen Protectors for it. They are presented in the store as separate items but also included in a bundle.

This means that a customer can either buy those separately from their product details pages or buy a "smartphone+3 glass screen protectors" bundle.

Each product has its own stock and availability value if to buy separately.
But in case of a bundle, the availability is calculated based on each item availability taking into account their **quantity in the bundle**.

Even if each item is available on its own, but the availability does not meet the minimum quantity for a bundle (e.g. there are only two glass screen protectors but the bundle goes with three), then all bundle is **unavailable**.
