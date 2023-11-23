---
title: "Import file details: product_offer_service.csv"
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `product_offer_service.csv` file to configure the assignment of services to product offers.

## Import file dependencies

* [service.csv](/docs/pbc/all/service-point-management/202311.0/unified-commerce/import-and-export-data/import-file-details-service.csv.html)
* [merchant_product_offer.csv](/docs/pbc/all/offer-management/202311.0/marketplace/import-and-export-data/import-file-details-merchant-product-offer.csv.html)



## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| product_offer_reference | ✓ | string    |      | Identifier of a product offer to assign a service to. |
| service_key             | ✓ | string    |      | Identifier of a service to assign to the product offer.     |


## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/Template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/product_abstract.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import:product-offer-service
```
