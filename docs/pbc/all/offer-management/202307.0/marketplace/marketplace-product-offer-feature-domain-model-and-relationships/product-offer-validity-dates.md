---
title: "Product Offer validity dates: Domain model and relationships"
description: This document provides reference information about Marketplace Product Offer validity dates in the Spryker Marketplace.
template: concept-topic-template
last_updated: Jul 25, 2023
---

Validity dates define the date range when a product offer is active. The Validity Dates entity manipulates the product offer activity field (`spy_product_offer.is_active`),
activating and deactivating it based on the validity date range.

To update the product offer activity by validity dates data, run:

```bash
console product-offer:check-validity
```

## Module relations

The following schema illustrates module relations in the Product Offer Validity entity:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/c49ca6db-3655-4d86-bdb1-ed05d2e1e721.png?utm_medium=live&utm_source=custom)


## Domain model
The following schema illustrates the ProductOffer-ProductOfferValidity domain model:

![Entity diagram](https://confluence-connect.gliffy.net/embed/image/b20c2abe-77c4-4c33-b361-48034e64dc7b.png?utm_medium=live&utm_source=custom)

## Validity data import

You can import the product offer validity data from the[product_offer_validity.csv](/docs/pbc/all/offer-management/{{site.version}}/marketplace/import-and-export-data/import-file-details-product-offer-validity.csv.html) file by running

```bash
data:import product-offer-validity
```
