---
title: HowTo - Manage merchant custom prices for products via data import
last_updated: Feb 04, 2022
template: howto-guide-template
---

{% info_block warningBox "B2B only" %}

You can apply the approaches described in this article only if your project follows the B2B model, as the merchant custom prices is only the B2B feature. Also, these approaches don't work for the Marketplace product offers.

{% endinfo_block %}

Let's assume you have a [default price](https://docs.spryker.com/docs/scos/user/features/202108.0/scheduled-prices-feature-overview.html#price-types) for products, and you have merchants for whom you want to make a certain percentage discount from the default price.
You can do this by [adding merchant custom prices via the Back Office](https://docs.spryker.com/docs/scos/user/back-office-user-guides/202108.0/catalog/products/abstract-products/creating-abstract-products-and-product-bundles.html#reference-information-defining-prices), or by data import. In this document, we consider the options of how you can manage the merchant custom prices with data import.

In the [price-product-merchant-relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/DE/price_product_merchant_relationship.csv) data importer, there is the `merchant_relation_key` which is an identifier of the relationship between the seller and the buyer. Also, each abstract and concrete products have their net and gross prices.

When you need to assign different product prices to merchants, you can do the following:

1. Define the merchant relationship keys in the `merchant_relationship.csv` file. See the [example in the Spryker B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv).

2. Create a separate data import .CSV files for each merchant relationship. For example, you could have a file `price-product-merchant-relationship-mr001.csv`, where `mr001` is the merchant relation key you defined at the previous step. In this file, you would then specify product prices for this specific merchant.

After that, you can do one of the following:
- Set specific DEFAULT prices for this merchant manually.
That means, if you provide say 20% discount on a product for merchant `mr001` and change the default price for product in the [product price data importer](https://docs.spryker.com/docs/scos/dev/data-import/202108.0/data-import-categories/catalog-setup/pricing/file-details-product-price.csv.html), you would have to go to the `price-product-merchant-relationship-mr001.csv` file and change the price for this merchant as well. Because changing the general default product price does not automatically change the merchant specific price for this product. That means that with every change of the default product price you would have to manually change the merchant specific price of this product.
This option can work for a relatively small amount of products and merchants you provide the specific prices for. For big amount of this data, to avoid to much of the manual work, we recommend considering the next option.
- Create a custom script that...
  In your ERP, you might have the base, or default price, defined along with the percentage of discount for your merchants. The script would translate the relation between the base price and the discount for merchants to define the specific price for the merchants. 
  For example, if the percentage of discount for merchant 20%, the script would generate the `price-product-merchant-relationship-mr001.csv` data importer with the prices for this mr001 merchant. In our example, the price would be: the default price minus 20%. 

