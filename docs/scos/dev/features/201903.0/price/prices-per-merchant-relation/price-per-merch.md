---
title: Prices per Merchant Relation Feature Overview
originalLink: https://documentation.spryker.com/v2/docs/price-per-merchant-relation-feature-overview
redirect_from:
  - /v2/docs/price-per-merchant-relation-feature-overview
  - /v2/docs/en/price-per-merchant-relation-feature-overview
---

When talking about product prices that depend on customers they refer to, we differentiate between two types: default prices and specific prices.

- **Default prices** are the prices shown by default to all regular customers
- **Specific prices** are different prices meant for specific target audience
![Prices diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/prices_diagram.png){height="" width=""}

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

The **Prices per Merchant Relation** feature relates specifically to prices set for individual merchant relations. This feature implies that customers see only prices applying to them, based on their merchant relation, or default prices if merchant relation doesn't have prices for some products.

The specific prices apply only to merchant relation assignee (business units, as a rule) and not to merchant relation owners. If a business unit of a customer has several merchant relations with different prices for one and the same product, the lowest price is offered.


**Default prices in the web-shop**
![Default prices in the web-shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/default_prices.png){height="" width=""}

**Prices for merchant referring to a specific relation**
![Prices for merchant referring to a specific relation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/merchant_prices.png){height="" width=""}

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
<!-- Last review date: Feb 8, 2019*  by Stanislav Matveev, Anastasija Datsun -->
