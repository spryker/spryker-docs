---
title: "File details: customer_group_to_company_business_unit.csv"
description: Use the customer_group_to_company_business_unit.csv file to assign business units to customer groups in your Spryker shop.
template: data-import-template
last_updated: Oct 14, 2026
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
  - title: Install the B2B Customer Groups feature
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html
---

This document describes the `customer_group_to_company_business_unit.csv` file to assign business units to [customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html) in your Spryker shop. For how imported memberships behave, see [Import customer groups and their memberships](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html#import-customer-groups-and-their-memberships).

## Import file dependencies

- [File details: customer_group.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group.csv.html)
- [File details: company_business_unit.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-company-business-unit.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| customer_group_name | &check; | String | Compared ignoring case. When several groups match, the group with exactly this name is used. | Name of the customer group to assign the business unit to. |
| business_unit_key | &check; | String | Must match exactly one business unit. | Key of the business unit from the [company_business_unit.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-company-business-unit.csv.html) file. |

A customer group can hold business units of different companies. Assigning a business unit does not assign its company, its parent or child business units, or its users.

A row is rejected, and the other rows are still imported, when it has one of the following problems:

| PROBLEM | MESSAGE IN THE IMPORT REPORT |
| --- | --- |
| The customer group name is empty. | `The customer group name is empty.` |
| No customer group has the name. | `Customer group "{name}" was not found.` |
| Several customer groups have the name ignoring case, and none has exactly this name. | `Customer group name "{name}" matches more than one customer group.` |
| The business unit key is empty. | `The business unit key is empty.` |
| No business unit has the key. | `Business unit with key "{key}" was not found.` |
| Several business units have the key. This can happen only in a database without the unique key on business unit keys. | `Business unit key "{key}" matches more than one business unit.` |

Business units created in the Back Office, through the Backend API, or by self-registration have no key, so this file cannot assign them.

## Import file example

```csv
customer_group_name,business_unit_key
DACH Region,acme_corporation_Berlin
DACH Region,acme_corporation_Zurich
DACH Region,Ottom_store_Berlin
```

## Import file command

```bash
data:import customer-group-company-business-unit
```
