---
title: "Import file details: service_point_address.csv"
description: Learn how to configure service point addresses via importing data through the service point address CSV file in your Spryker unified commerce project.
last_updated: Nov 23, 2023
template: data-import-template
---

This document describes the `service_point_address.csv` file to configure [service point addresses](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/service-points-feature-overview.html).

## Import file dependencies

[service_point.csv](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/import-and-export-data/import-file-details-service-point.csv.html)




## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
|-|-|-|-|-|
| service_point_key | ✓ | String    |       | Identifier of the service point to import the address for. |
| region_iso2_code  |   | String    |          | Region ISO2 code.               |
| country_iso2_code | ✓ | String    |          | Country ISO2 code.                |
| address1          | ✓ | String    |          | First line of address.            |
| address2          | ✓ | String    |          | Second line of address.           |
| address3          |   | String    |           | Third line of address.            |
| city              | ✓ | String    |        | City.                             |
| zip_code          | ✓ | String    |        | Zip code.                         |



## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [template_service_point_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_point_address.csv.md/template_service_point_address.csv) | Import file template with headers only. |
| [service_point_address.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/service-point-management/unified-commerce/import-and-export-data/service_point_address.csv.md/service_point_address.csv) | Exemplary import file with the Demo Shop data. |

## Import command

```bash
data:import service-point-address
```
