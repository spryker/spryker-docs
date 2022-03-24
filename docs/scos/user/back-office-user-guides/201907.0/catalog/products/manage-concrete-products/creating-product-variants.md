---
title: Creating Product Variants
description: Use the guide to configure a product variant, set a price and validity period, make it searchable on the website, and more
last_updated: Dec 23, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/creating-a-product-variant
originalArticleId: c6b17212-a1b7-4969-8734-ad18dafd04ad
redirect_from:
  - /v3/docs/creating-a-product-variant
  - /v3/docs/en/creating-a-product-variant
related:
  - title: Editing Product Variants
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/editing-product-variants.html
  - title: Managing Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/managing-products/managing-products.html
  - title: Discontinuing Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/discontinuing-products.html
  - title: Creating Product Bundles
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-abstract-products/creating-product-bundles.html
  - title: Adding Product Alternatives
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/adding-product-alternatives.html
  - title: Adding Volume Prices to Abstract Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-abstract-products/adding-volume-prices-to-abstract-products.html
  - title: Concrete Product- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/references/concrete-product-reference-information.html
  - title: Products- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/references/products-reference-information.html
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
  2. Otherwise, enter Original and eventually Default prices for the product for Gross and Net price modes.
  3. **B2B only:** In the **Merchant Price Dimension**, select the merchant relationship to define a special price per merchant relation. See [Merchants](/docs/scos/user/back-office-user-guides/{{page.version}}/marketplace/marketplace.html) and [Products: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/references/products-reference-information.html) to know more.
  4. Select **Quantity** for the product and then select **Never out of stock** if you want the product to never go out of stock.
6. **Optionally**: Click **Next** to go to the next tab (Image) or select a necessary tab.
  1. In the Image tab, add images for the product and define the image order.
7. **Optionally**: Click **Next** of select the **Assign bundled products** tab. This tab is used only if you need to create a bundles product. See [Creating and Managing Product Bundles](/docs/scos/user/back-office-user-guides/{{page.version}}/products/products/managing-products/creating-and-managing-product-bundles.html) to know more.
8. Click **Save**.
***

Once you click **Save**, the page is refreshed and you will see two additional tabs: Discontinue and Product Alternatives. See  [Discontinuing Products](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/manage-concrete-products/discontinuing-products.html) and [Adding Product Alternatives](/docs/scos/user/back-office-user-guides/{{page.version}}/products/products/managing-products/adding-product-alternatives.html) to know more.
***

**What's next?**
Once you have set things up, you will most likely need to know what managing actions you can do with your products. See articles in the [Managing Products](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/managing-products/managing-products.html) section.
