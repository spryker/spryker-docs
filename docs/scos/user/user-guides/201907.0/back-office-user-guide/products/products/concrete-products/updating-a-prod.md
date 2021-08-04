---
title: Updating a Product Variant
originalLink: https://documentation.spryker.com/v3/docs/updating-a-product-variant
redirect_from:
  - /v3/docs/updating-a-product-variant
  - /v3/docs/en/updating-a-product-variant
---

This article describes how you update the product variant added during the abstract product setup.
The described procedure is also valid for an already existing product variant. 
***
To start working with product variants, navigate to the **Products > Products** section.
***
**Pre-conditions**
The procedure you are going to perform is very similar to the procedure described in the Creating a Product Variant article. See the [Creating a Product Variant](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/concrete-products/creating-a-prod) article to know more. Also, see [Concrete Product: Reference Information](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/references/concrete-produc) to know more about the attributes that you see, select, and enter while updating the product variant.
***
**To update** a product variant:
1. Navigate to the **Edit Concrete Product** page using one of the following paths:
   * **Products > View** in the _Actions_ column for a specific abstract product **>** scroll down to the **Variants tab > Edit** in the _Actions_ column for a specific product variant
    * **Products > Edit** in the _Actions_ column for a specific abstract product **> Variants tab > Edit** in the _Actions_ column for a specific product variant
2. On the **Edit Concrete Product** page, update the following tabs: 
    1. **General tab**: populate name and description, valid from and to dates, make the product searchable by selecting the Searchable checkbox for the appropriate locale (or all locales).
    2. **Price & Stock tab**: define the default/original, gross/net prices, and stock.
    {% info_block warningBox "Note" %}
The prices for the variant are inherited from the abstract product so you will see the same values as you have entered while creating the abstract product. **B2B:** The merchant relation prices are inherited by Product Variants as well. 
{% endinfo_block %}
    3. **Image tab**: define the image(s), image set(s), and the image order for you product variant.
    4. **Assign bundled products** tab: this tab is used in case you need to create a product bundle. See the [Creating and Managing Product Bundles](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/managing-products/creating-and-ma) article to know more.
    5. **Discontinue** tab: This tab is used in case you want to discontinue the product. See the [Discontinuing a Product](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/managing-products/discontinuing-a) article to know more.
    6. **Product Alternatives** tab: This tab is used to define the product alternatives for the product. See the [Adding Product Alternatives](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/managing-products/adding-product-) topic to know more.
    7. **Scheduled Prices** tab: here you can only review scheduled prices imported via a CSV file if any. The actual import is done in the **Prices > Scheduled Prices** section.
3. Once done, click **Save**.
***
**What's next?**
Following the same steps, you will update all variants that you have added to your abstract product.
You may also want to add more product variants. Learn how you do that by navigating to the [Creating a Product Variant](/docs/scos/dev/user-guides/202001.0/back-office-user-guide/products/products/concrete-products/creating-a-prod) article. 
