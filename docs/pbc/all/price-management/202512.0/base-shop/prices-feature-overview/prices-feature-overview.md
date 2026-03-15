---
title: Prices feature overview
description: In the document, you can find the price definition, its types, and how the price is inherited and calculated.
last_updated: Mar 16, 2023
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/prices-overview
originalArticleId: 003e8985-3230-4498-838b-234a10f1a810
redirect_from:
  - /docs/scos/user/features/202200.0/prices-feature-overview/prices-feature-overview.html
  - /docs/scos/user/features/202311.0/prices-feature-overview/prices-feature-overview.html  
  - /docs/scos/dev/feature-walkthroughs/202311.0/prices-feature-walkthrough/prices-feature-walkthrough.html
  - /docs/scos/user/features/202108.0/prices-feature-overview/prices-feature-overview.html
  - /docs/scos/user/features/202005.0/prices-feature-overview/prices-feature-overview.html
  - /docs/pbc/all/price-management/202204.0/base-shop/prices-feature-overview/prices-feature-overview.html
---

The *Prices* feature enables Back Office users to set prices for products and manage them effectively.

## Price types

To accommodate business requirements, there can be various price types—for example, a *default price* is a product's regular price. An *original price* is typically used to show a product's price before a discount was applied. The original price is displayed in a strikethrough font next to the default price.


![Default and original prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/price-management/prices-feature-overview/prices-feature-overview.md/default-and-original-prices.png)


## Product types and price inheritance

Back Office users can set prices for both [abstract products and product variants](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/product-feature-overview/product-feature-overview.html#abstract-products-and-product-variants). When an abstract product has multiple product variants, you can set a price for the abstract product and different prices for each product variant.

On the Storefront, when customers browse catalog and search pages, they see abstract product prices.

![Abstract product prices in catalog](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/price-management/prices-feature-overview/prices-feature-overview.md/abstract-product-prices-in-catalog.png)

When a customer opens a Product Details page, they still see an abstract product price.

![Abstract product price on the Product Details page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/price-management/prices-feature-overview/prices-feature-overview.md/abstract-product-prices-on-pdp.png)

After selecting a product variant, they see the variant's price.

<iframe width="960" height="720" src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/price-management/prices-feature-overview/prices-feature-overview.md/prices-of-abstract-products-and-pruduct-variants.mp4" frameborder="0" allowfullscreen></iframe>

In some cases, you may want to set the same price for all the product variants. Then, you set the price for the abstract product and don't set any for the variants. When the variants don't have prices, they inherit the price of their abstract product.

Similarly, when there is one product variant, it makes sense to set the price just for the abstract product.

In the last two cases described, since product variants don't have prices, customers see the abstract product price on all the Storefront pages.

## Prices in database

Prices are stored as an integer, in the smallest unit of a currency—for example, Euro prices are stored in cents.

Each price is assigned to a price type, like DEFAULT or ORIGINAL price. For a price type, there can be *one* to *n* product prices defined. Price type entity is used to differentiate between use cases. For example, you can have DEFAULT and ORIGINAL types to use for sale pricing.

The price can have a gross or net value which can be used based on a price mode selected by a customer on the Storefront. You can have a shop running in both modes and select the net mode for the business customer, for example.

{% info_block Net and Gross Prices Across Tax Regions %}

It's important to understand how Spryker calculates gross price for a product across tax regions, to ensure your store displays the intended price to customers. If a customer chooses *gross* mode and chooses to buy the product in a tax region different than the store's tax region, Spryker calculates the new region's tax based on the product's gross price defined for this product in the store, rather than the product's net price. Therefore, the tax amount will be different depending on whether *gross* or *net* is enabled on the storefront. Here's a simple example of price calculation across tax regions:

The Value Added Tax (VAT) in country A, the store's tax region, is 20%. The net price of a product is 100. In country A the gross price is 120. The customer sees a price of 100 in net mode and a price of 120 in gross mode.

However, your customer chooses to buy the same product from country B while still in the store that falls under country A tax rates.

VAT in country B is 10%. Tax for the new region is calculated based on the product's *gross* price in the store's region because the customer selected *gross* mode. In country B, the customer still sees a gross price of 120. However, the net price shown is 109,09 (VAT at 10% rate from 120 is 10.91).

{% endinfo_block %}

Price also has currency and store assigned to it.
![Price calculation](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_calculation.png)

## Price retrieving logic

If a concrete product doesn't have a price entity stored, it inherits the values stored for its abstract product. When fetching the price of a concrete product, the price entity of the respective concrete product SKU is checked. If the entity exists, the price is returned. If not, an abstract product owning that concrete product is queried and its price entity is checked. If it exists, the abstract product's price is returned for the concrete product. If it does not exist an exception is thrown.

The following diagram summarizes the logic for retrieving the price for a product:
![Price retrieval logic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Price+Functionality/price_retrieval_logic.png)

## Related Business User documents

| OVERVIEWS | BACK OFFICE USER GUIDES |
|---| - |
| [Volume prices](/docs/pbc/all/price-management/latest/base-shop/prices-feature-overview/volume-prices-overview.html) | [Define prices when creating abstract products and product bundles](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/create-abstract-products-and-product-bundles.html)   |
| | [Edit prices of an abstract product](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-abstract-products-and-product-bundles/edit-abstract-products-and-product-bundles.html#edit-prices-of-an-abstract-product-or-product-bundle)   |
| | [Define prices when creating a concrete product](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/create-product-variants.html)  |
| | [Edit prices of a concrete product](/docs/pbc/all/product-information-management/latest/base-shop/manage-in-the-back-office/products/manage-product-variants/edit-product-variants.html)   |

## Related Developer documents

| INSTALLATION GUIDES  | GLUE API GUIDES | DATA IMPORT | TUTORIALS AND HOWTOS | REFERENCES |
|---|---|---|---|---|
| [Install the Prices feature](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html) | [Retrieving abstract product prices](/docs/pbc/all/price-management/latest/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html) | [File details: product_price.csv](/docs/pbc/all/price-management/latest/base-shop/import-and-export-data/import-file-details-product-price.csv.html) | [HowTo: Handle twenty five million prices in Spryker Commerce OS](/docs/pbc/all/price-management/latest/base-shop/tutorials-and-howtos/handle-twenty-five-million-prices-in-spryker-commerce-os.html) | [Money module: reference information](/docs/pbc/all/price-management/latest/base-shop/extend-and-customize/money-module-reference-information.html) |
| [Install the Product Price Glue API](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-the-product-price-glue-api.html) | [Retrieving concrete product prices](/docs/pbc/all/price-management/latest/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html) |  |  | [PriceProduct module details: reference information](/docs/pbc/all/price-management/latest/base-shop/extend-and-customize/priceproduct-module-details-reference-information.html) |
