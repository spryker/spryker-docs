---
title: "Import file details: product_offer_shipment_type.csv"
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `product_offer_shipment_type.csv` file to assign product offers to [shipment types](/docs/pbc/all/carrier-management/202311.0/base-shop/shipment-feature-overview.html#shipment-type).

## Import file dependencies

* [merchant_product_offer.csv](/docs/pbc/all/offer-management/{{page.version}}/marketplace/import-and-export-data/import-file-details-combined-merchant-product-offer.csv.html)
* [merchant_product_offer.csv](/docs/pbc/all/offer-management/202307.0/marketplace/import-and-export-data/import-file-details-combined-merchant-product-offer.csv.html)




## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-------------------------|-----------|-----------|--------------|-----------------------------|
| product_offer_reference | ✓ | string    |        | Reference of product offer. |
| shipment_type_key       | ✓ | string    |      | Key of the shipment type.   |



## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/Template_product_abstract.csv) | Import file template with headers only. |
| [product_abstract.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Catalog+Setup/Products/202109.0/product_abstract.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
console data:import:product-offer-shipment-type
```
