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
---

*Customer Groups* let you organize customers into groups to help you target users for discounts and promotions.

## How customers become members of a customer group

A customer can be a member of a customer group in the following ways:

- **Directly:** The customer is assigned to the group. You can assign customers in the Back Office. For instructions, see [Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html).
- **Through a company:** The company of the company user the customer currently shops as is assigned to the group.
- **Through a business unit:** The business unit of the company user the customer currently shops as, or any of its parent business units, is assigned to the group.

The groups a customer belongs to in all of these ways are the customer's *effective customer groups*. Company and business unit assignments require the Customer Experience Management feature, `spryker-feature/customer-experience-management`.

## Customer groups in discount conditions

When you create a discount, you can use the `customer-group` field in the **APPLY WHEN** condition to apply the discount only to customers of a specific group. For details, see [Create discounts](/docs/pbc/all/discount-management/latest/base-shop/manage-in-the-back-office/create-discounts.html#define-on-what-conditions-the-discount-can-be-applied).

The condition is checked against the customer's effective customer groups. This lets you offer a discount to all users of a B2B company or business unit without assigning each customer to the group individually. The group name in the condition is matched case-insensitively.

By default, the condition checks only the groups a customer is assigned to directly. To also check the groups of the customer's company and business units, a developer needs to enable it. For instructions, see [Install the Customer Account Management + Promotions & Discounts feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-promotions-and-discounts-feature.html#optional-apply-customer-group-discounts-to-companies-and-business-units).

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

Effective customer groups are used only by the `customer-group` discount condition.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Manage customer groups](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-customer-groups.html)   |
