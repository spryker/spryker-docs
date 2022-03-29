---
title: Creating Product Variants
description: Use the guide to configure a product variant, set a price and validity period, make it searchable on the website, and more
last_updated: Aug 13, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/creating-a-product-variant
originalArticleId: 3309889e-5836-43ec-b81c-80232f870d5f
redirect_from:
  - /v4/docs/creating-a-product-variant
  - /v4/docs/en/creating-a-product-variant
related:
  - title: Managing Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/managing-products/managing-products.html
  - title: Discontinuing Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/discontinuing-products.html
  - title: Creating and Managing Product Bundles
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/managing-products/creating-and-managing-product-bundles.html
  - title: Adding Product Alternatives
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/adding-product-alternatives.html
  - title: Adding Volume Prices
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/managing-products/adding-volume-prices.html
---

This topic describes the procedure you need to follow in order to add a new product variant to the abstract product.
***
The procedure that you are going to perform is very similar to how you create the abstract product and update the product variants.
To know what attributes you see, enter, and select while creating a product variant, see [Concrete Product: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/references/concrete-product-reference-information.html).
***
To start creating the product variant, navigate to the **Products > Products** section.
***

**To create a product variant:**
1. On the **Product** page, click **Edit** in the _Actions_ column for the product for which you want to create a new variant.
2. On the **Edit Product Abstract** page, click **Add Variant** in the top right corner.
3. In the **General** tab, do the following:
    1. Add **SKU** or select **Autogenerate SKU**.
    2. Select a super attribute.
    {% info_block warningBox "Note" %}

    The super attributes drop-down list includes only those selected during the abstract creation flow.

    {% endinfo_block %}

    3. Add product name and description and select **Searchable** if you want your product to be searchable by its name in the online store.
    4. Enter **Valid From** and **Valid To** dates to specify when the product should go online in the web-shop. This step is optional.
4. Go to the **Price & Stock** tab.
5. In the **Price & Tax** tab, set prices and taxes for products:
    1. To take the prices over from the abstract product, select **Use prices from abstract product**.

    {% info_block warningBox "Note" %}

    The merchant relation prices are inherited by Product Variants as well.

    {% endinfo_block %}

    3. Otherwise, enter Original and eventually Default prices for the product for Gross and Net price modes.
    4. **B2B only:** In the **Merchant Price Dimension**, select the merchant relationship to define a special price per merchant relation. See [Merchants](/docs/scos/user/back-office-user-guides/{{page.version}}/marketplace/marketplace.html) and [Products: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/references/products-reference-information.html) to know more.
    5. Select **Quantity** for the product and then select **Never out of stock** if you want the product to never go out of stock.
6. **Optionally**: Click **Next** to go to the next **Image** tab or select it and add images for the product and define the image order.
7. **Optionally**: Click **Next** of select the **Assign bundled products** tab. This tab is used only if you need to create a bundles product. See [Creating and Managing Product Bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/managing-products/creating-and-managing-product-bundles.html) to know more.
8. Click **Save**.


Once you click **Save**, the page is refreshed and you will see two additional tabs: Discontinue and Product Alternatives. See  [Discontinuing Products](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/discontinuing-products.html) and [Adding Product Alternatives](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/adding-product-alternatives.html) to know more.

{% info_block errorBox "Important" %}

To make sure your product wil be shown and searchable in your online store, we highly recommend you to go through the checklist in [HowTo - Make a Product Searchable and Shown on the Storefront](/docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-make-a-product-searchable-and-shown-on-the-storefront.html).

{% endinfo_block %}

**What's next?**

Once you have set things up, you will most likely need to know what managing actions you can do with your products. See articles in the [Managing Products](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/managing-products/managing-products.html) section.
