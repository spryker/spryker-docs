---
title: Merchant Custom Prices feature overview
description: This feature relates to prices set for individual merchant relations. Customers see only prices applying to them, based on their merchant relation.
last_updated: Jul 22, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/merchant-custom-prices-feature-overview
originalArticleId: 903b5851-5d21-4823-9ca4-695a55355b02
redirect_from:
  - /2021080/docs/merchant-custom-prices-feature-overview
  - /2021080/docs/en/merchant-custom-prices-feature-overview
  - /docs/merchant-custom-prices-feature-overview
  - /docs/en/merchant-custom-prices-feature-overview
  - /docs/scos/user/features/202200.0/merchant-custom-prices-feature-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/merchant-custom-prices-feature-walkthrough.html
  - /docs/pbc/all/price-management/merchant-custom-prices-feature-overview.html
  - /docs/pbc/all/price-management/202204.0/base-shop/merchant-custom-prices-feature-overview.html
related:
  - title: HowTo - Manage business unit specific prices via data import
    link: docs/pbc/all/price-management/latest/base-shop/tutorials-and-howtos/manage-business-unit-specific-prices-via-data-import.html
---

In B2B commerce transactions, prices are typically negotiated in contracts. Therefore, merchants and their clients, who are usually company business units, expect to see their own prices in the shop. With the *Merchant Custom Prices* feature, the shop owners of the [B2B Demo Shop](/docs/about/all/b2b-suite.html) can provide different prices for merchants and their clients. This way, the relationship between merchants and buyers is reflected more accurately, and the shop owners can set different prices for various customers.


When talking about product prices that depend on the customers they refer to, and we differentiate between two types: default and specific.
- *Default prices* are the prices shown by default to all regular customers.
- *Specific prices* are different prices meant for a specific target audience.

![Prices diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/prices_diagram.png)

The different price categories that can be selected based on contextual information, like customer or merchant relationship, are referred to as *price dimension*.

We have the following price dimensions:

- Mode (Net/Gross)
- Volume
- Store
- Currency
- Merchant Relationship

All prices in Spryker OS are stored in `spy_price_product_store`; however, connections to price dimensions are stored to different tables.

{% info_block infoBox %}

For example, `spy_price_product_default` contains only connections to prices that were imported during store installation or created using Zed UI and connections to prices pertain to merchant relations would reside in `spy_price_product_merchant_relationship`. So the `spy_price_product_default` table poses a set of relations between the `spy_price_product_default` and `fk_price_product_store` tables and related entities.

{% endinfo_block %}

The Merchant Custom Prices feature relates specifically to prices set for individual merchant relations. This feature implies that customers see only prices applying to them, based on their merchant relation, or default prices if merchant relation doesn't have prices for some products. The specific prices apply only to the merchant relation assignee (business units, as a rule), not to merchant relation owners.

{% info_block warningBox %}

- If the default product price is lower than any of the merchant relation prices for a given product, the default price is displayed in Storefront. You can adjust this behavior on the project level by customizing the business logic for the price display.
- If a business unit of a customer has several merchant relations with different prices for the same product, the lowest price is offered.

{% endinfo_block %}

**Default prices in the web-shop**

![Default prices in the web-shop](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/default_prices.png)

**Prices for a merchant referring to a specific relation**

![Prices for a merchant referring to a specific relation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Prices+per+Merchant+Relations/Prices+per+Merchant+Relation+Feature+Overview/merchant_prices.png)

Besides setting specific prices for individual merchant relations products manually, the prices can also be added in bulk by importing them from a CSV file. The CSV file for import must contain populated `merchant_relation_key`, `abstract_sku`, `concrete_sku`, `price_type`, `store,currency`, `price_net`, `price_gross` fields.

To import the specific prices for merchant relations from the CSV file residing in `data/import` inside the module `PriceProductMerchantRelationshipDataImport`, run:

```bash
console data:import product-price-merchant-relationship
```

Or, if you want to import merchant from your file, indicate a path to it:

```bash
console data:import product-price-merchant-relationship [-f [path_to_csv_file]
```

To remove all imported merchant relation prices, you can run:

```bash
console price-product-merchant-relationship:delete
```

Or, you can remove merchant relation prices referring to specific merchant relations by specifying their IDs:

```bash
console price-product-merchant-relationship:delete [-m X] . X = MR ID
```

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Set prices per merchant relations when creating abstract products and product bundles](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html)   |

## Related Developer documents

|INSTALLATION GUIDES | MIGRATION GUIDES |
|---------|---------|
| [Install the Merchant custom prices feature](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-merchant-custom-prices-feature.html)  | [Upgrade the PriceProduct module](/docs/pbc/all/price-management/{{site.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-priceproduct-module.html) |
