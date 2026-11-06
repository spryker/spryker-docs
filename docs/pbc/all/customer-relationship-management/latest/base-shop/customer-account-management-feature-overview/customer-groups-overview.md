---
title: Customer Groups overview
description: The Customer Groups feature lets you organize customers into groups to help you target users for discounts and promotions.
last_updated: Nov 2, 2026
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-groups-overview
originalArticleId: 046cf042-1c53-4c82-8498-21ec52d2e51f
redirect_from:
  - /2021080/docs/customer-groups-overview
  - /2021080/docs/en/customer-groups-overview
  - /docs/customer-groups-overview
  - /docs/en/customer-groups-overview
  - /docs/scos/user/features/202200.0/customer-account-management-feature-overview/customer-groups-overview.html
  - /docs/scos/user/features/202311.0/customer-account-management-feature-overview/customer-groups-overview.html
  - /docs/scos/user/features/202204.0/customer-account-management-feature-overview/customer-groups-overview.html
  - /docs/pbc/all/customer-relationship-management/202212.0/base-shop/customer-account-management-feature-overview/customer-groups-overview.html
  - /docs/scos/user/features/201903.0/customer-account-management-feature-overview/customer-groups-overview.html
---

*Customer Groups* let you organize customers into groups to help you target users for discounts and promotions.

## Members of a customer group

A customer group can hold the following members:

- **Customers**: discount conditions and other rules that target a customer group evaluate the customers of the group.
- **Companies** and **business units**: with the B2B Customer Groups feature, a customer group also records which B2B accounts belong to it. You manage these memberships in the Back Office, through the Backend API, and by data import. If enabled, the `customer-group` discount condition also evaluates the company users of these companies and business units. Other rules that target a customer group evaluate only its customers. For details, see [Customer groups in discount conditions](#customer-groups-in-discount-conditions).

To install company and business unit memberships, see [Install the B2B Customer Groups feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html).

## Company and business unit memberships

A company membership and a business unit membership are independent of each other. Each records only the company or business unit that was assigned:

- Assigning a company does not assign its business units or its company users.
- Assigning a business unit does not assign its company, its parent or child business units, or its company users.
- Removing a company from a group keeps the business units of that company in the group.
- Removing the last business unit of a company keeps the company in the group.

These rules describe the stored memberships. When the `customer-group` discount condition evaluates them, a business unit membership also applies to the company users of its child business units. For details, see [How business unit assignments are inherited](#how-business-unit-assignments-are-inherited).

A company or business unit can belong to any number of customer groups, and a customer group can hold business units of different companies.

Managing memberships never changes the companies, business units, company users, or customers themselves. Deleting a customer group removes its memberships, and deleting a company or business unit removes it from every customer group.

## Manage memberships in the Back Office

In the Back Office, the pages that create and edit a customer group have a **Companies** tab and a **Business Units** tab next to the **Customers** tab. Each tab has the following tables:

- An *available* table that lists the companies or business units that are not assigned to the group. You select the ones to assign.
- An *assigned* table that lists the members of the group. You select the ones to remove.

![Companies tab of the Edit customer group page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/customer-account-management-feature-overview/customer-groups-overview.md/edit-customer-group-companies-tab.png)

![Business Units tab of the Edit customer group page](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/customer-account-management-feature-overview/customer-groups-overview.md/edit-customer-group-business-units-tab.png)

The selections are saved together with the customer group. The page that shows a customer group displays the **Companies** and **Business Units** panels, with an **Edit** button that opens the edit page of each company or business unit.

![View customer group page with the Companies and Business Units panels](https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/customer-account-management-feature-overview/customer-groups-overview.md/view-customer-group.png)

The **Customers** column of the tables counts company users:

- For a company, all of its company users, including inactive ones.
- For a business unit, only the company users directly in that business unit, not the users of its child business units, including inactive ones.

For instructions, see [Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html).

## Manage memberships using the Backend API

The Backend API lets integrations, such as an ERP, a CRM, or a partner administration tool, list, add, replace, and remove the companies and business units of a customer group. A write through the Backend API changes the same memberships as a save in the Back Office.

For the endpoints, see [Backend API: Manage companies and business units of customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-companies-and-business-units-of-customer-groups.html).

## Import customer groups and their memberships

Four data importers load customer groups and their members in bulk, for example, from an ERP export:

| FILE | WHAT IT DOES |
| --- | --- |
| [customer_group.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group.csv.html) | Creates customer groups and updates their descriptions. |
| [customer_group_to_company.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-company.csv.html) | Assigns companies to customer groups. |
| [customer_group_to_company_business_unit.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-company-business-unit.csv.html) | Assigns business units to customer groups. |
| [customer_group_to_customer.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-customer.csv.html) | Assigns customers to customer groups. |

An imported membership is the same membership that a Back Office save creates: it is listed in the Back Office, and you can remove it there. The membership files work as follows:

- They only add memberships. They never remove a membership, and they never create, change, or delete a customer group, company, business unit, company user, or customer.
- Each file assigns only what it names: importing a company does not assign its business units or customers.
- Importing the same file again changes nothing. A membership that already exists, from an earlier import or from the Back Office, is skipped.
- A row that refers to a customer group, key, or customer reference that does not exist is rejected. The other rows are still imported, the import report lists the reason for each rejected row, and the run is reported as failed.

The membership importers address companies and business units by their keys. Companies and business units created in the Back Office, through the Backend API, or by self-registration have no key, so the import cannot assign them.

As with other data importers, the import report lists only the first 50 rejected rows by default. A row whose number of columns differs from the header stops the import of the rest of that file.

## Customer groups in discount conditions

When you create a discount, you can use the `customer-group` field in the **APPLY WHEN** condition to apply the discount only to customers of a specific group. For details, see [Create discounts](/docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html#define-on-what-conditions-the-discount-can-be-applied).

By default, the condition checks only the groups a customer is assigned to directly. With the B2B Customer Groups feature, a developer can enable the condition to also check the groups of the customer's company and business units. This lets you offer a discount to all users of a B2B company or business unit without assigning each customer to the group individually. For instructions, see [Install the B2B Customer Groups feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html#optional-apply-customer-group-discounts-to-companies-and-business-units).

When enabled, a customer is in a customer group for the condition in the following cases:

- The customer is assigned to the group directly.
- The company of the company user the customer currently shops as is assigned to the group.
- The business unit of the company user the customer currently shops as, or any of its parent business units, is assigned to the group.

The group name in the condition is matched case-insensitively.

### How business unit assignments are inherited

A business unit assignment covers the business unit and all its child business units at any depth. It never covers the parent or sibling business units. Only the company user that the customer currently shops as is considered. The customer's other company users do not add any groups.

For example, a company has the following business unit hierarchy, and the business unit *Zurich* is assigned to the customer group *DACH Region*:

```text
HQ
├── Zurich
│   └── Zurich Sales
└── Barcelona
```

| CUSTOMER'S CURRENT BUSINESS UNIT | BUSINESS UNITS CHECKED | MEMBER OF DACH REGION |
|---|---|---|
| Zurich | Zurich, HQ | Yes. Zurich is assigned to the group. |
| Zurich Sales | Zurich Sales, Zurich, HQ | Yes. Zurich Sales inherits the assignment of its parent business unit. |
| HQ | HQ | No. An assignment of a child business unit does not apply to its parent. |
| Barcelona | Barcelona, HQ | No. Barcelona is a sibling of Zurich. |

If a customer belongs to the same group in several ways, the group is counted once.

### When changes take effect

When you assign or unassign a company or business unit, or move a business unit to another parent, the change applies from the next request — for example, the next cart update. If a cart update removes a discount, the customer sees a message that the discount is no longer available. Discounts of placed orders are not affected.

## Current constraints

The feature has the following functional constraints:

- Company and business unit memberships affect only the `customer-group` discount condition, and only if it is enabled. They do not affect prices, product lists, content, or any other rule that targets a customer group.
- In the Back Office tables, you select companies and business units one at a time. There is no option to select all rows.
- A Backend API request that replaces the members of a customer group accepts up to 1,000 companies or business units. To change a larger set, add and remove members individually.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html)   |

## Related Developer documents

| INSTALLATION GUIDES | GLUE API GUIDES | DATA IMPORT |
|---------|---------|---------|
| [Install the B2B Customer Groups feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-b2b-customer-groups-feature.html) | [Backend API: Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-groups.html) | [File details: customer_group.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group.csv.html) |
|   | [Backend API: Manage companies and business units of customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-companies-and-business-units-of-customer-groups.html) | [File details: customer_group_to_company.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-company.csv.html) |
|   |   | [File details: customer_group_to_company_business_unit.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-company-business-unit.csv.html) |
|   |   | [File details: customer_group_to_customer.csv](/docs/pbc/all/customer-relationship-management/latest/base-shop/import-and-export-data/file-details-customer-group-to-customer.csv.html) |
