---
title: Managing product labels
originalLink: https://documentation.spryker.com/v6/docs/managing-product-labels
redirect_from:
  - /v6/docs/managing-product-labels
  - /v6/docs/en/managing-product-labels
---

This topic describes how to manage product labels.

To start managing product labels, go to **Merchandising** > **Product Labels**.

***

## Viewing product labels

To view the details of a product label, in the *Actions* column of the *Overview of Product Labels*, select **View**.

On the *View Product Label: “{product label name}”*  page, the following information is available:

* product label name, front-end reference, priority, status
* validity period, dynamicity, exclusivity
* stores in which the product label is displayed on the Storefront
* translations of the product label name 
* products to which the product label is applied

**Tips & Tricks**

On the *View Product Label: “{product label name}”*  page, you can:

* View the product to which the product label is assigned by clicking **View** in the *Actions* column of the *Applied Products* table. This takes you to the *View Product Abstract: {product abstract SKU}* page.

## Editing product labels

{% info_block warningBox "Dynamic product labels" %}

Products for the [dynamic product labels](https://documentation.spryker.com/docs/product-labels-feature-overview#dynamic-product-label) (like *New*, or *Sale*) are applied dynamically based on the defined rules. There is no way to apply products manually.

{% endinfo_block %}

To edit a product label:
1. In the _Actions_ column of the *Overview of Product Labels* page, select **Edit**. 
2. On the *Edit Product Label: “{product label name}* page, edit the values. To learn about the attributes you see on the page, see [Product Labels: Reference Information](https://documentation.spryker.com/docs/product-labels-reference-information).
3. Select **Save**.
The page is refreshed to show the message about successful product label update.


**Tips & Tricks**

In the *Assigned Products* subtab of the *Products* tab, clear the check box next to a product to deassign it from the label.


## Next steps

To learn about the attributes you enter and select while managing product label, see [Product Labels: Reference Information](https://documentation.spryker.com/docs/product-labels-reference-information).
