---
title: HowTo - Manage merchant custom prices for many products
last_updated: Feb 04, 2022
template: howto-guide-template
---

{% info_block warningBox "B2B only" %}

You can apply the approaches described in this article only if your project follows the B2B, as the merchant custom prices is only the B2B feature.

{% endinfo_block %}

There might be situation when you have lots of products, say, 100000, many customers, say 1000, and want to set individual prices on these products for each customer.

There is a base price, and you want to define a discount from this price for a specific customer.

In the [price-product-merchant-relationship.csv](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/DE/price_product_merchant_relationship.csv) data importer, there is the `merchant_relation_key` which is an identifier of the relationship between the seller and the buyer. Also, each abstract and concrete products have their net and gross prices.

When you need to assign different prices of big number of products to the big number of merchants, we recommend doing the following:

Approach 1:

1. Define the merchant relationship keys in the `merchant_relationship.csv` file. See the [example in the Spryker B2B Demo Shop](https://github.com/spryker-shop/b2b-demo-shop/blob/master/data/import/common/common/merchant_relationship.csv).

2. Create a separate data import .CSV files for each merchant relationship. For example, you could have a file `price-product-merchant-relationship-mr001.csv`, where `mr001` is the merchant relation key you defined at the previous step. In this file, you would then specify product prices for this specific merchant.

