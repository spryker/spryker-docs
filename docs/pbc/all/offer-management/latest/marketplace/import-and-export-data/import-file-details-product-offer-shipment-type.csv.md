---
title: "Import file details: product_offer_shipment_type.csv"
description: Learn how you can assign products offers by using the product offer shipment type CSV file in your Spryker Marketplace projects.
last_updated: Nov 23, 2023
template: data-import-template
redirect_from:
  - /docs/pbc/all/offer-management/latest/marketplace/import-and-export-data/import-file-details-product-offer-shipment-type.csv.html
---

This document describes the `product_offer_shipment_type.csv` file to assign product offers to [shipment types](/docs/pbc/all/carrier-management/202410.0/base-shop/shipment-feature-overview.html#shipment-type).

## Import file dependencies

- [merchant_product_offer.csv](/docs/pbc/all/offer-management/202410.0/marketplace/import-and-export-data/import-file-details-combined-merchant-product-offer.csv.html)
- [shipment_type.csv](/docs/pbc/all/carrier-management/202410.0/base-shop/import-and-export-data/import-file-details-shipment-type.csv.html)




## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-------------------------|-----------|-----------|--------------|-----------------------------|
| product_offer_reference | ✓ | string    |        | Product offer to assign a shipment type to. |
| shipment_type_key       | ✓ | string    |      | Shipment type to assign to the product offer.  |



## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_product_offer_shipment_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/import-and-export-data/import-file-details-product-offer-shipment-type.csv.md/template_product_offer_shipment_type.csv) | Import file template with headers only. |
| [product_offer_shipment_type.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/offer-management/marketplace/import-and-export-data/import-file-details-product-offer-shipment-type.csv.md/product_offer_shipment_type.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
console data:import:product-offer-shipment-type
```
