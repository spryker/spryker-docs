---
title: HowTo - Manage business unit specific prices via data import
last_updated: Feb 04, 2022
template: howto-guide-template
related:
  - title: Merchant Custom Prices feature overview
    link: docs/scos/user/features/page.version/merchant-custom-prices-feature-overview.html
---

{% info_block warningBox "B2B only" %}

You can apply the approaches described in this document only if your project follows the B2B model because the [merchant custom prices](https://docs.spryker.com/docs/scos/user/features/{{site.version}}/merchant-custom-prices-feature-overview.html) feature used for these approaches is only for B2B. Also, the behavior described in this document is not compatible with Marketplace.

{% endinfo_block %}

Let's assume you have a [default price](/docs/scos/user/features/{{site.version}}/scheduled-prices-feature-overview.html#price-types) for products, and you have merchants for whom you want to make a certain percentage discount from the default price.
You can do this by [adding merchant custom prices via the Back Office](/docs/scos/user/back-office-user-guides/{{site.version}}/catalog/products/manage-abstract-products/creating-abstract-products-and-product-bundles.html) or by data import. This document explains how you can manage the merchant custom prices with data import.

## Data importers for merchant custom prices

In the Spryker B2B Demo Shop, there are two data importers used for managing the merchant custom prices:

- [merchant_relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv) containing information about merchants and merchant relation keys. The merchant relation keys are identifiers of the relations between sellers and buyers.
- [price-product-merchant-relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/DE/price_product_merchant_relationship.csv) containing specific product prices for individual merchant relations.

## Assigning merchant custom prices via data import

To assign special product prices to merchants, you can do the following:

1. In the `merchant_relationship.csv` file, define the merchant relation keys. For details, see the [example in the Spryker B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv).
2. To import merchant relations, run
   ```
   console data:import merchant-relationship
   ```
3. For each merchant relationship, create separate data import CSV files. For example, you can have a file `price-product-merchant-relationship-mr001.csv`, where `mr001` is the merchant relation key you defined in the previous step. In this file, you specify product prices for this specific merchant.
4. Then, you can do one of the following:
   - Set specific default prices for this merchant manually.
For example, if you provide a 20% discount on a product for the merchant relation `mr001` and change the default price for the product in the [product price file](https://docs.spryker.com/docs/scos/dev/data-import/{{site.version}}/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html), you have to go to the `price-product-merchant-relationship-mr001.csv` file and change the price for this merchant as well. Because changing the general default product price does not automatically change the merchant custom price for this product. Thus, with every change of the default product price, you have to manually change every merchant custom price of this product.
This option can work for a relatively small amount of products and merchants you provide the specific prices for. For big amount of this data, to avoid too much manual work, we recommend considering the next option.
   - Create a custom script that can automatically adjust merchant-specific prices upon the default price change.
In your ERP, you might have the base, or default price, defined along with the percentage of discount for your merchants. The script would handle the relation between the default price and the discount for merchants to define the specific price for the merchants.
For example, if the percentage of discount for a merchant is 20%, the script generates the `price-product-merchant-relationship-mr001.csv` file with the prices for this `mr001` merchant. In this example, the price is the default price minus 20%.
This approach is optimal for big amount of data. However, its main drawback is that you need some development effort and that the script runs and processes data outside of the Spryker platform.

5. To import product prices for merchant relations, run
   ```
   console data:import product-price-merchant-relationship
   ```
