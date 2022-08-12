---
title: Creating an Abstract Product and Product Bundles
description: Use the procedure to create an abstract product, set a price and validity period, define superattributes, images, and a store the product is available in.
last_updated: Jul 31, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v2/docs/creating-an-abstract-product
originalArticleId: e31647d5-e5cf-4b95-b02d-70b54bb7de48
redirect_from:
  - /v2/docs/creating-an-abstract-product
  - /v2/docs/en/creating-an-abstract-product
related:
  - title: Creating Product Variants
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/creating-product-variants.html
  - title: Managing Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/managing-products/managing-products.html
  - title: Discontinuing Products
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/discontinuing-products.html
  - title: Creating and Managing Product Bundles
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-abstract-products/creating-product-bundles.html
  - title: Adding Product Alternatives
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-concrete-products/adding-product-alternatives.html
  - title: Adding Volume Prices
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/manage-abstract-products/adding-volume-prices-to-abstract-products.html
  - title: Managing Attributes
    link: docs/scos/user/back-office-user-guides/page.version/catalog/attributes/managing-product-attributes.html
  - title: Abstract Product- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/catalog/products/references/abstract-product-reference-information.html
---

This topic describes the procedures that you need to follow in order to create an abstract product and its variants.
***
To start working with products, navigate to the **Products > Products** section.
***

{% info_block warningBox "Pre-requisite" %}

As a pre-requisite for the procedure described below, please make sure that at least one super attribute exists in the system so you could create product variants. See the _Attributes_ set of articles to learn about the attributes. Please also keep in mind that all the variants you are going to create will have only the super attribute(s) that you select while creating the abstract product.

{% endinfo_block %}

{% info_block errorBox "Important" %}

Please keep in mind that you need to add at least one product variant while creating an abstract product. This is needed in order to be able to add more variants to this product in the future.

{% endinfo_block %}

According to the use case described in the Abstract and Concrete Products article, you are creating a Smartphone abstract product and add at least one variant to it.

***

**To create** an abstract product:
1. Click **Create Product** on the top-right corner of the **Product** page.
2. On the **Create a Product > General** tab:
   1. In the **Store relation** section, select the store(s) your product should be available for.
   2. Enter the SKU prefix.
   3. Type the name(s) and description(s) for your product.
   4. Enter **New from** and **New to** dates if you want to specify the period for the product to have the **New** label to be assigned to it, and have the product to be dynamically assigned to the **New** category.
3. Click Next to go to the **Price & Tax** tab or just click on it.
4. On the **Create a Product > Prices & Tax** tab:
   1. **B2B only:** In the **Merchant Price Dimension**, select the merchant relationship to define a special price per merchant relation. See the [Merchants](/docs/scos/user/back-office-user-guides/{{page.version}}/marketplace/marketplace.html) and [Products: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/references/products-reference-information.html) articles to know more.
   2. Define the prices for each currency and store that you have in your set up. If you want to display promotions, enter both    Default and Original prices. If no, you can enter only the Default price.
    {% info_block infoBox "Info" %}
    Gross prices are prices after tax, while net prices are prices before tax.
    {% endinfo_block %}
    
    See [Products: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/products/references/products-reference-information.html) to know more about default and original prices and why you use them.
   
   3. In the **Tax Set** drop-down, select the tax set that contains the tax rate(s) under which this specific product will be taxed.
5. Click **Next** or click the **Variants** tab.
  On the **Create a Product > Variants** tab, your task is to select at least one super attribute from the list and enter the values that define the difference between your product variants.
  As described in the example, you have a smartphone that goes in three colors. Thus the color is your super attribute.
   1. Select the **color** checkbox.
   2. Then select red, green, and orange from the drop-down list, or you can start typing the color and select the needed one from autosuggestion (the colors are your concrete products). See the [Creating a Product Attribute](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html) article to know more about super attributes.
  {% info_block warningBox "Note" %}

  If you are on the Variants tab and do not see the needed super attributes, you can go and create one in the separate tab. See the [Creating a Product Attribute](/docs/scos/user/back-office-user-guides/{{page.version}}/catalog/attributes/creating-product-attributes.html) article.

  {% endinfo_block %}

6. Click **Next** or select the **SEO** tab.
7. **Optionally:** On the **Create a Product > SEO** tab, enter meta information to describe the page's content.
8. Click **Next** or select the **Image** tab.
9. **Optionally:** On the **Create a Product > Image** tab, add images for the product:
   1. If the image is different for all locales, for each locale you click **Add Image Set**. If the image is the same, this is enough to add the Default image set.
   2. Enter the name of your image set, add links for the small and large images (if you need both).
   3. If you need several images/image sets, click either **Add image** or **Add image set** respectively and repeat the procedure.
10. Click **Save**.
 
***

**Tips and tricks**
Once you click **Save**, the page is refreshed. You will see the **Edit Product** page. You can start editing your product variants right from here by navigating to the **Variants** tab.

***

**What's next?**
During the procedure described in this topic you have already added several product variants, but you did not do any set up for them, thus the next step is to work with the product variants to populate them with the needed data and activate them to make them and the smartphone itself available in the online store (as well as to add more variants if needed).
