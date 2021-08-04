---
title: Merchant Custom Prices feature overview
originalLink: https://documentation.spryker.com/2021080/docs/merchant-custom-prices-feature-overview
redirect_from:
  - /2021080/docs/merchant-custom-prices-feature-overview
  - /2021080/docs/en/merchant-custom-prices-feature-overview
---

In B2B commerce transactions, prices are typically negotiated in contracts. Therefore merchants and their clients, which are usually company business units, expect to see their own prices in the shop. With the Merchant Custom Prices feature, the shop owners of B2B and B2C marketplaces can provide different prices for merchants and their clients. This way the relationship between merchants and buyers is reflected more accurately, and the shop owners can set different prices for various customers.


When talking about product prices that depend on customers they refer to, we differentiate between two types: default prices and specific prices.

- **Default prices** are the prices shown by default to all regular customers
- **Specific prices** are different prices meant for specific target audience
![Prices diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/prices_diagram.png)

The different price categories that can be selected based on contextual information, like customer, merchant relationship, etc. is referred to as **price dimension**.

Currently we have the following price dimensions:

- Mode (Net/Gross)
- Volume
- Store
- Currency
- Merchant Relationship

All prices in Spryker OS are stored in *spy_price_product_store*, however connections to price dimensions are stored to different tables.

{% info_block infoBox %}
For example spy_price_product_default contains only connections to prices, which were imported during store installation or created using Zed UI, and connections to prices pertain to merchant relations, would reside in spy_price_product_merchant_relationship. So the spy_price_product_default table poses a set of relations between spy_price_product_default and fk_price_product_store table and related entities.
{% endinfo_block %}

The **Merchant Custom Prices** feature relates specifically to prices set for individual merchant relations. This feature implies that customers see only prices applying to them, based on their merchant relation, or default prices if merchant relation doesn't have prices for some products.

The specific prices apply only to merchant relation assignee (business units, as a rule) and not to merchant relation owners. If a business unit of a customer has several merchant relations with different prices for one and the same product, the lowest price is offered.


**Default prices in the web-shop**
![Default prices in the web-shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/default_prices.png)

**Prices for merchant referring to a specific relation**
![Prices for merchant referring to a specific relation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/merchant_prices.png)

Besides setting specific prices for individual merchant relations products manually, the prices can also be added in bulk by importing them from a .csv file. The .csv file for import must contain populated `merchant_relation_key`, `abstract_sku and/or concrete_sku`, `price_type`, `store,currency`, `price_net`, `price_gross` fields.

To import the specific prices for merchant relations from the .csv file residing in `data/import` inside the module `PriceProductMerchantRelationshipDataImport`, run



```bash
console data:import product-price-merchant-relationship
```
Or, if you want to import merchant from your file, indicate a path to it:

```bash
console data:import product-price-merchant-relationship [-f [path_to_csv_file]
```


To remove all imported merchant relation prices you can run:

```bash
console price-product-merchant-relationship:delete
```
Or, you can remove merchant relation prices referring to specific merchant relations by specifying their IDs:

```bash
console price-product-merchant-relationship:delete [-m X] . X = MR ID
```










## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
              <!--  <li><a href="https://documentation.spryker.com/docs/merchant-custom-prices-feature-overview" class="mr-link">Import prices for merchant relations</a></li> -->
                <li>Integrate the Merchant Custom Prices feature:</li>
                <li><a href="https://documentation.spryker.com/docs/en/merchant-custom-prices-feature-integration" class="mr-link">Integrate the Merchant Custom Prices feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/merchant-feature-integration" class="mr-link">Integrate the Merchant feature</a></li>  
               <li><a href="https://documentation.spryker.com/docs/mg-priceproduct" class="mr-link">Migrate to the latest version of the PriceProduct module</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/creating-abstract-products-and-product-bundles" class="mr-link">Set prices per merchant relations when creating abstract products and product bundles</a></li>
            </ul>
        </div>
    </div>
</div>

