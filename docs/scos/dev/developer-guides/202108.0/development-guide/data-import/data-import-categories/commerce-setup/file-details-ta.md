---
title: File details- tax.csv
originalLink: https://documentation.spryker.com/2021080/docs/file-details-taxcsv
redirect_from:
  - /2021080/docs/file-details-taxcsv
  - /2021080/docs/en/file-details-taxcsv
---

This article contains content of the **tax.csv** file to configure [tax](https://documentation.spryker.com/docs/tax) information on your Spryker Demo Shop.

To import the data, run

```Bash
data:import:tax
```

## Import file parameters
The file should have the following parameters:


| PARAMETER | REQUIRED | TYPE |REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
|tax_set_name | &check; | String |  | Name of the tax set. |
| country_name | &check; | String |  | Country to which the tax refers to. |
| tax_rate_name | &check; | String | | Name of the tax rate. <br>Tax rate is the ratio (usually expressed as a percentage) at which a business or person is taxed. |
| tax_rate_percent | &check; | Float | | Tax rate, expressed  as a percentage. |

 
 ## Dependencies
This file has no dependencies.

## Import template file and content example
Find the template and an example of the file below:

| FILE | DESCRIPTION |
| --- | --- |
| [template_tax.csv template](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/Template+tax.csv) | Tax .csv template file (empty content, contains headers only). |
| [tax.csv](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Data+Manipulation/Data+Ingestion/Data+Import/Data+Import+Categories/Commerce+Setup/tax.csv) | Exemplary import file with the Demo Shop data. |
 
