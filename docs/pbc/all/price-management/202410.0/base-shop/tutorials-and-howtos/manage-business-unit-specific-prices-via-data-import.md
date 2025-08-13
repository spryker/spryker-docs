---
title: Manage business unit specific prices via data import
description: Manage business unit prices for your Spyker based store using data import within your Spryker project.
last_updated: Feb 04, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/data-imports/how-to-manage-business-unit-specific-prices-via-data-import.html
  - /docs/pbc/all/price-management/202311.0/base-shop/tutorials-and-howtos/howto-manage-business-unit-specific-prices-via-data-import.html
  - /docs/pbc/all/price-management/202204.0/base-shop/tutorials-and-howtos/howto-manage-business-unit-specific-prices-via-data-import.html
related:
  - title: Merchant Custom Prices feature overview
    link: docs/pbc/all/price-management/latest/base-shop/merchant-custom-prices-feature-overview.html
---

{% info_block warningBox "B2B only" %}

You can apply the approaches described in this document only if your project follows the B2B model because the [merchant custom prices](/docs/pbc/all/price-management/{{site.version}}/base-shop/merchant-custom-prices-feature-overview.html) feature used for these approaches is only for B2B. Also, the behavior described in this document is not compatible with Marketplace.

{% endinfo_block %}

Let's assume you have a [default price](/docs/pbc/all/price-management/{{site.version}}/base-shop/scheduled-prices-feature-overview.html#price-types) for products, and you have merchants for whom you want to make a certain percentage discount from the default price.
You can do this by [adding merchant custom prices in the Back Office](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html) or by data import. This document explains how you can manage the merchant custom prices with data import.

## Data importers for merchant custom prices

In the Spryker B2B Demo Shop, there are two data importers used for managing the merchant custom prices:

- [merchant_relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv) containing information about merchants and merchant relation keys. The merchant relation keys are identifiers of the relations between sellers and buyers.
- [price-product-merchant-relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/DE/price_product_merchant_relationship.csv) containing specific product prices for individual merchant relations.

## Assign merchant custom prices using data import

1. In the `merchant_relationship.csv` file, define the merchant relation keys. For details, see the [example in the Spryker B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv).
2. Import merchant relations:

```bash
console data:import merchant-relationship
```

3. For each merchant relationship, create separate data import CSV files. For example, you can have a file `price-product-merchant-relationship-mr001.csv`, where `mr001` is the merchant relation key you defined in the previous step. In this file, you specify product prices for this specific merchant.
4. Do one of the following:
   - Set specific default prices for this merchant manually.
     <br>For example, if you provide a 20% discount on a product for the merchant relation `mr001` and change the default price for the product in the [product price file](/docs/pbc/all/price-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html), you have to go to the `price-product-merchant-relationship-mr001.csv` file and change the price for this merchant as well. Because changing the general default product price does not automatically change the merchant custom price for this product. Thus, with every change of the default product price, you have to manually change every merchant custom price of this product.
     <br>This option can work for a relatively small amount of products and merchants you provide the specific prices for. For big amount of this data, to avoid too much manual work, we recommend considering the following option.
   - Create a custom script that can automatically adjust merchant-specific prices upon the default price change.
    <br>In your ERP, you might have the base, or default price, defined along with the percentage of discount for your merchants. The script would handle the relation between the default price and the discount for merchants to define the specific price for the merchants.
    <br>For example, if the percentage of discount for a merchant is 20%, the script generates the `price-product-merchant-relationship-mr001.csv` file with the prices for this `mr001` merchant. In this example, the price is the default price minus 20%.
    <br>This approach is optimal for big amount of data. However, its main drawback is that you need some development effort and that the script runs and processes data outside the Spryker platform.

5. Import product prices for merchant relations:

   ```bash
   console data:import product-price-merchant-relationship
   ```
