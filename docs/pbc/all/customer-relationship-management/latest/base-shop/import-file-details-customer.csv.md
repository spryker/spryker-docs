---
title: "Import file details: customer.csv"
last_updated: Jun 16, 2021
template: data-import-template
originalLink: https://documentation.spryker.com/2021080/docs/file-details-customercsv
originalArticleId: 08356679-8b76-4d14-b756-fb39a77d3da7
redirect_from:
  - /2021080/docs/file-details-customercsv
  - /2021080/docs/en/file-details-customercsv
  - /docs/file-details-customercsv
  - /docs/en/file-details-customercsv
  - /docs/scos/dev/data-import/201811.0/data-import-categories/commerce-setup/file-details-customer.csv.html
  - /docs/scos/dev/data-import/201903.0/data-import-categories/commerce-setup/file-details-customer.csv.html
  - /docs/scos/dev/data-import/201907.0/data-import-categories/commerce-setup/file-details-customer.csv.html
  - /docs/scos/dev/data-import/202311.0/data-import-categories/commerce-setup/file-details-customer.csv.html
  - /docs/scos/dev/data-import/202204.0/data-import-categories/commerce-setup/file-details-customer.csv.html
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/page.version/execution-order-of-data-importers.html
---

This document describes the `customer.csv` file to configure [Customer](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html) information in your Spryker Demo Shop.

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| customer_reference | &check; | String |  Must be unique and end with a number. | Reference of the Customer. |
| locale_name |  | String |  | Locale name. |
| phone |  | String |  | Customer's phone number. |
| email | &check; | String | Must be unique. | Customer's e-mail. |
| salutation | &check; | String | Values must be:<ul><li>Mr</li><li>Mrs</li><li>Dr, or </li><li>Ms</li></ul> .The value must be within the list of values predefined in the `spyCustomerTableMap.php` file. | Used salutation. |
| first_name | &check; | String |   | Customer's first name. |
| last_name | &check; | String |   | Customer's last name. |
| company |  | String |   | Customer's Company |
| gender | &check; | String | Customer's gender.<br>The value must be within the list of values predefined in the `spyCustomerTableMap.php`file. | Gender definition.|
| date_of_birth |  | Date |   | Customer's date of birth. |
| password |  | String |  | Customer's password. |
| registered |  | Date |  | Customer's date of registration. |

## Import template file and content example

| FILE | DESCRIPTION |
| --- | --- |
| [customer.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+customer.csv) | Exemplary import file with headers only. |
| [customer.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/customer.csv) | Exemplary import file with Demo Shop data. |

## Import command

```bash
data:import:customer
```
