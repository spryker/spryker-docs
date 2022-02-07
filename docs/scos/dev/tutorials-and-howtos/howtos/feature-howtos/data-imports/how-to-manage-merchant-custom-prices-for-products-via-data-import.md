---
title: 'HowTo: Manage merchant custom prices for products via data import'
last_updated: Feb 04, 2022
template: howto-guide-template
---

{% info_block warningBox "B2B only" %}

You can apply the approaches described in this article only if your project follows the B2B model, as the [merchant custom prices](https://docs.spryker.com/docs/scos/user/features/202108.0/merchant-custom-prices-feature-overview.html) is only the B2B feature. Also, keep in mind that these approaches don't work for the Marketplace product offers.

{% endinfo_block %}

Let's assume you have a [default price](https://docs.spryker.com/docs/scos/user/features/202108.0/scheduled-prices-feature-overview.html#price-types) for products, and you have merchants for whom you want to make a certain percentage discount from the default price.
You can do this by [adding merchant custom prices via the Back Office](https://docs.spryker.com/docs/scos/user/back-office-user-guides/202108.0/catalog/products/abstract-products/creating-abstract-products-and-product-bundles.html#reference-information-defining-prices), or by data import. In this document, we consider how you can manage the merchant custom prices with data import.

## Data importers for merchant custom prices

In the Spryker B2B Demo Shop, there are two data importers used for managing the merchant custom prices:

- [merchant_relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv) containing information about merchants and merchant relation keys. The merchant relation keys are identifiers of the relations between sellers and buyers.
- [price-product-merchant-relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/DE/price_product_merchant_relationship.csv) containing specific product prices for individual merchant relations.

## Assigning merchant custom prices via data import

To assign special product prices to merchants, you can do the following:

1. Define the merchant relation keys in the `merchant_relationship.csv` file. See the [example in the Spryker B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv).
2. Run 
   ```Bash
   console data:import merchant-relationship
   ```
3. Create a separate data import .CSV files for each merchant relationship. For example, you could have a file `price-product-merchant-relationship-mr001.csv`, where `mr001` is the merchant relation key you defined in the previous step. In this file, you would then specify product prices for this specific merchant.
4. Then, you can do one of the following:
- Set specific default prices for this merchant manually.
That means, if you provide say 20% discount on a product for merchant relation `mr001` and change the default price for the product in the [product price file](https://docs.spryker.com/docs/scos/dev/data-import/202108.0/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html), you would have to go to the `price-product-merchant-relationship-mr001.csv` file and change the price for this merchant as well. Because changing the general default product price does not automatically change the merchant custom price for this product. Thus, with every change of the default product price, you have to manually change the every merchant custom price of this product.
This option can work for a relatively small amount of products and merchants you provide the specific prices for. For big amount of this data, to avoid too much manual work, we recommend considering the next option.
- Create a custom script that would automatically adjust merchant-specific prices upon the default price change.
In your ERP, you might have the base, or default price, defined along with the percentage of discount for your merchants. The script would handle the relation between the default price and the discount for merchants to define the specific price for the merchants. 
For example, if the percentage of discount for merchant is 20%, the script would generate the `price-product-merchant-relationship-mr001.csv` file with the prices for this mr001 merchant. In our example, the price would be the default price minus 20%. 
This approach is optimal for big amount of data. However, its main drawback is in the fact that you need some development effort and that the script runs and processes data outside of the Spryker platform.

5. Run
   ```
   console data:import product-price-merchant-relationship
   ```
