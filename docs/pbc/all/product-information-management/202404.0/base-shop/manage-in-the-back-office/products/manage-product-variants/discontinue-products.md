---
title: Discontinuing products
description: Use the guide to make the product variant discontinued in the Back Office.
last_updated: Aug 11, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/discontinuing-products
originalArticleId: 9233e3f7-8568-4c3a-b8c2-3cd930ddb840
redirect_from:
  - /2021080/docs/discontinuing-products
  - /2021080/docs/en/discontinuing-products
  - /docs/discontinuing-products
  - /docs/en/discontinuing-products
  - /docs/scos/user/back-office-user-guides/202200.0/catalog/products/manage-concrete-products/discontinuing-products.html
  - /docs/scos/user/back-office-user-guides/202311.0/catalog/products/manage-concrete-products/discontinuing-products.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.html
related:
  - title: Adding Product Alternatives
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-in-the-back-office/products/manage-product-variants/add-product-alternatives.html
  - title: Discontinued products overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/product-feature-overview/discontinued-products-overview.html
---

This article describes what steps you need to follow to discontinue the product.

After releasing a better version of a product, a company might decide to discontinue the older version.
This means that a product or service that is discontinued is no longer being produced or offered.
Let's say you have such a product for which a newer version is being released, and you want to notify your customers that the older version is discontinued. How do you do that? You mark the product variant as discontinued.

{% info_block infoBox %}

You always discontinue a product variant, not an abstract product itself.

{% endinfo_block %}

## Prerequisites

To discontinue products for a concrete product, navigate to **Catalog&nbsp;<span aria-label="and then">></span> Products**.

Review the reference information before you start, or look up the necessary information as you go through the process.

## Discontinuing products

To discontinue a product, do the following:

1. On the *Edit Concrete Product* page, switch to the *Discontinue* tab.
2. Click **Discontinue**.
    You see additional attributes and information.
3. You can add a note about the reason for the product being discontinued or any other useful information. Just enter the text in the *Add Note* section for each locale.
4. Click **Save**.
The date of the deactivation is available for you on the *Discontinue* tab.
Days left (active_until) value is set to 180 days by default. You can change it on the project level.
<br>After the product is marked as discontinued, a corresponding label appears on the product detail page and search results in the shop application.
The product with the Discontinued label cannot be added to cart.

{% info_block warningBox "Note" %}

If the product added to the shopping list or wishlist is marked as discontinued, the *Discontinued* status appears in the list, and the online store customer is not able to proceed to the checkout.

{% endinfo_block %}

### Reference information: Discontinuing products

This section explains what happens on the Storefront after discontinuing a product.
Let's say the Smartphone with a flash memory equals 16GB is no longer popular, and it's more efficient for you to discontinue it. However, you need to propose some replacements for it to make sure that the user journey will be successful.
You will discontinue this product variant and set up other products to be displayed as alternatives.


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/product-information-management/base-shop/manage-in-the-back-office/products/manage-product-variants/discontinue-products.md/discontinued-and-alternative.mp4" type="video/mp4">
  </video>
</figure>



## Next steps

Review the other articles in the _Products_ section to know more about product management.
