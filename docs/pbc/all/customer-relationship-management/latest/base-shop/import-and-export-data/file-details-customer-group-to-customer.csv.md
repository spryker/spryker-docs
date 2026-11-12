---
title: "File details: customer_group_to_customer.csv"
description: Use the customer_group_to_customer.csv file to assign customers to customer groups in your Spryker shop.
template: data-import-template
last_updated: Oct 14, 2026
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
  - title: Install the B2B Customer Groups feature
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html
---

This document describes the `customer_group_to_customer.csv` file to assign customers to [customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html) in your Spryker shop. For how imported memberships behave, see [Import customer groups and their memberships](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html#import-customer-groups-and-their-memberships).

## Import file dependencies

- [File details: customer_group.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group.csv.html)
- [File details: customer.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer.csv.html)

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| customer_group_name | &check; | String | Compared ignoring case. When several groups match, the group with exactly this name is used. | Name of the customer group to assign the customer to. |
| customer_reference | &check; | String | Must match a customer. | Reference of the customer from the [customer.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer.csv.html) file. The Backend API uses the same reference. |

An anonymized customer keeps the customer reference. If the file still lists such a customer, the import adds the customer back to the group, as the Back Office and the Backend API do.

A row is rejected, and the other rows are still imported, when it has one of the following problems:

| PROBLEM | MESSAGE IN THE IMPORT REPORT |
| --- | --- |
| The customer group name is empty. | `The customer group name is empty.` |
| No customer group has the name. | `Customer group "{name}" was not found.` |
| Several customer groups have the name ignoring case, and none has exactly this name. | `Customer group name "{name}" matches more than one customer group.` |
| The customer reference is empty. | `The customer reference is empty.` |
| No customer has the reference. | `Customer with reference "{reference}" was not found.` |

## Import file example

```csv
customer_group_name,customer_reference
Key Accounts,DE--2
Key Accounts,DE--3
Key Accounts,DE--4
```

## Import file command

```bash
data:import customer-group-customer
```
