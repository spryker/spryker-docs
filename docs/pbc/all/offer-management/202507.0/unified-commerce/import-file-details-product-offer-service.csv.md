---
title: "Import file details: product_offer_service.csv"
description: Learn how to assign services to product offers through the product offer service csv file for your Spryker Unified Commerce Project.
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `product_offer_service.csv` file to configure the assignment of services to product offers.

## Import file dependencies

- [service.csv](/docs/pbc/all/service-point-management/latest/unified-commerce/import-and-export-data/import-file-details-service.csv.html)
- [merchant_product_offer.csv](/docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)



## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| product_offer_reference | ✓ | string    |      | Identifier of a product offer to assign a service to. |
| service_key             | ✓ | string    |      | Identifier of a service to assign to the product offer.     |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_offer_service.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/unified-commerce/import-and-export-data/Import+file+details%3A+product_offer_service.csv/template_product_offer_service.csv) | Import file template with headers only. |
| [product_offer_service.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/unified-commerce/import-and-export-data/Import+file+details%3A+product_offer_service.csv/product_offer_service.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import:product-offer-service
```
