---
title: Marketplace Product Offer Prices feature overview
description: The Marketplace Product Offer Prices feature lets Marketplace merchants set prices for product offers for your Spryker Marketplace Project.
template: feature-overview-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/feature-walkthroughs/202212.0/marketplace-product-offer-prices-feature-walkthrough.html
---

With the *Marketplace Product Offer Prices* feature, the Marketplace merchants can define custom prices for [product offers](/docs/pbc/all/offer-management/{{page.version}}/marketplace/marketplace-merchant-portal-product-offer-management-feature-overview.html).

Merchants can define the prices for each product offer. If no price for the product offer is specified, a default price from the concrete product is used.

Price types (for example,gross price, net price) are assigned to each price, and for each price type, there can be from *one* to *n* product prices. Price type entities are used to differentiate between use cases: for example, we have DEFAULT and ORIGINAL prices which are used for sale pricing. You can add your own price types and use them in your app.

A new price type can be added by importing price data. The price type in the CSV file will be added or updated.

To learn more details about prices import file, see: [File details: product_price.csv](/docs/pbc/all/price-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-product-price.csv.html)

Depending on the price mode selected by a customer in Storefront, the price can have gross or net value. You can run your shop in both modes as well as select net mode for business customers, for example.

A price is also associated with a currency and a store.

To support product offer prices, a *PriceProductOffer* database table has been added to connect *PriceProductStore* and *ProductOffer* tables. In order to store the information about product offer prices that will be synchronized to Storage, the *ProductConcreteProductOfferPriceStorage* database table has been added. On the Storefront, this data is used to display correct prices for product offers.

In addition, product offers support volume prices. Merchants can now enter volume prices for product offers, and customers will see the corresponding price on their Storefront based on the quantity they have chosen. The volume prices for product offers work the same as the volume prices for products.

To learn more about prices and volume prices, see: [Prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/prices-feature-overview.html), [Volume Prices](/docs/pbc/all/price-management/{{page.version}}/base-shop/prices-feature-overview/volume-prices-overview.html)

## Related Developer documents

|INSTALLATION GUIDES  |GLUE API GUIDES  |DATA IMPORT  |
|---------|---------|---------|
| [Install the Marketplace Product Offer Prices feature](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-features/install-the-marketplace-product-offer-prices-feature.html)          | [Retrieving product offer prices](/docs/pbc/all/price-management/{{page.version}}/marketplace/glue-api-retrieve-product-offer-prices.html)          | [File details: price-product-offer.csv](/docs/pbc/all/price-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-price-product-offer.csv.html)           |
|[Glue API: Marketplace Product Offer Prices integration](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)           |           |           |
