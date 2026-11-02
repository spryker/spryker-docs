---
title: "File details: customer_group.csv"
description: Use the customer_group.csv file to create customer groups and update their descriptions in your Spryker shop.
template: data-import-template
last_updated: Oct 14, 2026
related:
  - title: Execution order of data importers in Demo Shop
    link: docs/dg/dev/data-import/latest/execution-order-of-data-importers.html
  - title: Install the B2B Customer Groups feature
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html
---

This document describes the `customer_group.csv` file to create [customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html) and update their descriptions in your Spryker shop.

Each row creates a customer group when no group has the name. When a group has the name, the row replaces the description of that group and keeps its name and members. Customer groups that are missing from the file are kept.

## Import file parameters

| PARAMETER | REQUIRED | TYPE | REQUIREMENTS OR COMMENTS | DESCRIPTION |
| --- | --- | --- | --- | --- |
| name | &check; | String | Up to 70 characters. Compared with the existing names ignoring case. | Name of the customer group. |
| description |  | String | Up to 255 characters. An empty value removes the description. | Description of the customer group. |

When several customer groups have the name ignoring case, the row updates the group with exactly that name. When none of them has exactly that name, the row is rejected.

## Import file example

```csv
name,description
Key Accounts,Strategic customers with negotiated terms
Hospitality,"Hotels, restaurants and bars"
DACH Region,"Locations in Germany, Austria and Switzerland"
Trial Accounts,Companies on a trial or proof-of-concept contract
```

## Import file command

```bash
data:import customer-group
```
