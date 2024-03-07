---
title: "Import file details: shipment.csv"
last_updated: Jun 23, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-shipmentcsv
originalArticleId: 213aeaa8-3dd8-43da-870a-5f1174b640e2
redirect_from:
  - /docs/scos/dev/data-import/201903.0/data-import-categories/commerce-setup/file-details-shipment.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/commerce-setup/file-details-shipment.csv.html
  - /docs/scos/dev/data-import/202204.0/data-import-categories/commerce-setup/file-details-shipment.csv.html
  - /docs/scos/dev/data-import/202307.0/data-import-categories/commerce-setup/file-details-shipment.csv.html
  - /docs/pbc/all/carrier-management/202307.0/import-and-export-data/file-details-shipment.csv.html
  - /docs/pbc/all/carrier-management/202307.0/base-shop/import-and-export-data/file-details-shipment.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `shipment.csv` file to configure the [shipment](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/shipment-feature-overview.html) information in your Spryker Demo Shop.

To import the file, run

```bash
data:import:shipment
```

## Import file parameters



| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| shipment_method_key| &check; | String | | The identifier of the shipment method. |
| name|  &check; | String | | The name of the shipment method. |
| carrier |  &check; | String |  | The name of the shipment carrier. |
| taxSetName |  &check; | String | | 	The name of the tax set. |
| avalara_tax_code |  | String | | [Avalara tax code](/docs/pbc/all/tax-management/{{page.version}}/base-shop/tax-feature-overview.html#avalara-system-for-automated-tax-compliance) for automated tax calculation. |





## Import template file and content example



| FILE | DESCRIPTION |
| --- | --- |
| [template_shipment.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/202109.0/Template_shipment.csv) | Import file template with headers only. |
| [shipment.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/202109.0/shipment.csv) | Exemplary import file with the Demo Shop data. |
