---
title: Creating a merchant abstract product
last_updated: Jun 30, 2021
description: This document describes how to create merchant abstract products in the Merchant Portal.
template: back-office-user-guide-template
---

This document describes how to create a merchant abstract product.

## Prerequisites

To start working with merchant abstract products, go to **Merchant Portal > Products**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Creating abstract products

To create a new abstract product:

1. On the *Products* page, click **Create Product**. *Create Abstract Product* drawer opens.

2. Define the following settings:

   1. Enter an **SKU Prefix**.

   2. Enter a **Name** for the EN locale. The rest of the locales will be defined once the product is created.

   3. Select **Abstract product has 1 concrete product** if you are creating an abstract product with a single concrete product. *Create an Abstract Product with 1 Concrete Product* drawer opens.
      Select **Abstract product has multiple concrete products** if the abstract product you are creating will contain multiple concrete products assigned to it.

   4. Click **Next**. </br>

      

      If the **Abstract product has 1 concrete product** was chosen:</br>
      

      1. On the *Create an Abstract Product with 1 Concrete Product* drawer, enter a **Concrete Product SKU.** 
      2. Enter a **Concrete Product Name.**
      3. Click **Create** to finish the product creation.

      

      ![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/merchant+portal+user+guides/Products/create-abstract-product-with-one-variant-mp.gif)

      

      If the **Abstract product has multiple concrete products** was chosen:</br>

      

      1. Select one or more super attributes that define your concrete products.
      2. In the field next to the super attribute you've selected, select one or more product attribute values.
      3. Repeat the previous step until you select at least one value for each selected super attribute.

      

      ![img](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/merchant+portal+user+guides/Products/create-abstract-product-with-multiple-variants-mp.gif)

3. Once done, click **Create**.

**Tips and Tricks**
To return to the previous step, click **Back**.

### Reference information: Create abstract product

| ATTRIBUTE             | DESCRIPTION       |
| ----------------------------- | ------------------------------------ |
| SKU prefix                                      | Unique abstract product identifier that is used to track unique information related to the product. |
| Name                                            | The name of the abstract product that is displayed for the product on the Storefront. |
| Abstract product has 1 concrete product         | Select this option when you want your abstract product to have a single concrete product. |
| Abstract product has multiple concrete products | Select this option when you want your abstract product to have multiple concrete products. |

### Reference information: Create an Abstract Product with 1 Concrete Product

| ATTRIBUTE            | DESCRIPTION             |
| --------------------- | ------------------------------------ |
| Concrete Product SKU     | Unique product identifier that is used to track unique information related to the product. |
| Autogenerate SKU         | Select this checkmark if you want the SKU to be generated automatically. By default, -1 is added to the abstract product SKU. For example, |
| Concrete Product Name    | The name of the concrete product that is displayed for the product on the Storefront. |
| Same as Abstract Product | Select this checkmark when you want the name of the concrete product to be copied from the abstract product’s name. |

### Reference information: Create an Abstract Product with multiple Concrete Products

You can select as many super attributes as you need and define one or more values for them. For each product attribute value you select, a product variant will be created. After creating the abstract product, you will be able to create new product variants based on the super attributes you select when creating the abstract product. In the *Concrete Products’ Preview* pane you can view the products to be created.

By selecting **Autogenerate SKU**s, the SKU numbers for the variants are generated automatically, based on the SKU of their abstract product.

By selecting **Same Name as Abstract Product**, the name of the concrete product gets copied from the abstract product’s name.

## Next steps

- [Edit abstract product](/docs/marketplace/user/merchant-portal-user-guides/{{ page.version }}/products/abstract-products/editing-merchant-abstract-product.html)