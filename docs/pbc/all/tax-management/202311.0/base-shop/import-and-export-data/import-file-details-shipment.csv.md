---
title: "Import file details: shipment.csv"
last_updated: Aug 2, 2022
template: data-import-template
redirect_from:
  - /docs/pbc/all/tax-management/202311.0/base-shop/import-and-export-data/import-file-details-shipment.csv.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/import-and-export-data/import-file-details-shipment.csv.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/spryker-tax/import-and-export-data/import-file-details-shipment.csv.html
  - /docs/pbc/all/tax-management/202204.0/base-shop/import-and-export-data/import-file-details-shipment.csv.html
---

This document describes how to import taxes for shipment methods via  `shipment.csv`. To import full information for shipment methods, see ["Import file details: shipment.csv"](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-shipment.csv.html).

## Import file dependencies

[tax.csv](/docs/pbc/all/tax-management/{{site.version}}/base-shop/import-and-export-data/import-file-details-tax-sets.csv.html)


## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| shipment_method_key| &check; | String | | Identifier of the shipment method. |
| tax_set_name |  &check; | String | | 	Name of the tax set. |

## Import command

```bash
data:import:shipment
```

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_shipment.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/import-and-export-data/import-tax-sets-for-shipment-methods.md/Template_shipment.csv) | Import file template with headers only. |
| [shipment.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/tax-management/import-and-export-data/import-tax-sets-for-shipment-methods.md/shipment.csv) | Exemplary import file with the Demo Shop data. |
