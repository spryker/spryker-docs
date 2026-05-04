---
title: Business Units overview
description: Once a company administrator has created a company, and it has been activated and approved, they can start building the organizational structure.
last_updated: Jul 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/business-units-overview
originalArticleId: 7b1313e3-9240-4a26-a9ef-b00a8eb20fad
redirect_from:
  - /2021080/docs/business-units-overview
  - /2021080/docs/en/business-units-overview
  - /docs/business-units-overview
  - /docs/en/business-units-overview
  - /docs/scos/user/features/202200.0/company-account-feature-overview/business-units-overview.html
  - /docs/scos/user/features/202311.0/company-account-feature-overview/business-units-overview.html
  - /docs/scos/user/features/202204.0/company-account-feature-overview/business-units-overview.html
---

Once a company administrator has created a company that has been activated and approved in the Back Office, they can start building their company's organizational structure in the **My Company** section of the webshop.

The very first step of defining the company structure is setting up business units and creating the hierarchy of business units.

The **business units hierarchy** poses a system in which business units are arranged into levels:

- Upper level
- Lower level
- Same level

The business unit of the upper level is referred to as a *parent business unit*, and the business units below it are its *child business units*.

Upon company registration, a default business unit named "Headquarters" is automatically created under the **Business Units** section.

![default-business-unit_1_.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/default-business-unit_1_.png)

The company administrator can create, edit, delete as well as arrange business units in hierarchical order in the Business Units section.

To create a business unit, its name and email address must be specified.

{% info_block infoBox %}

The user can also select a parent business unit of the newly created unit. If it's not specified, the new business unit is created with the "0" level in the hierarchy—for example, as a parent.

{% endinfo_block %}

![new-bu.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/new-bu.png)

The parent and child business units are visually differentiated by means of indents. This differentiation is described in the following table:

| LEVEL | INDENTS |
| --- | --- |
| 0 level business units (parents) | Have no indents before their lines. |
| 1 level business units | Have a single indent before them. |
| 2 level business units | Have a double indent. |
| ... | ... |

Example:
![business-units-hierarchy.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/business-units-hierarchy.png)

The following are special characteristics of business units:

- You can't assign a parent business unit to its child.
- Deleting a parent business unit does not delete its children. The hierarchy is kept and just goes one level up.

{% info_block infoBox %}

A business unit is children that are one level below it, become 0 level parent business units, and their children become 1 level children.

{% endinfo_block %}

- A business unit can be assigned with one or multiple addresses.
- The existing addresses can be assigned to business units right at the stage of their creation, and the new addresses can be added on the **Edit Business Unit** page.

![business-units-address.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/business-units-address.png)

- The addresses can also be unassigned by clearing the check box of the respective address under the **Assign Addresses** section and clicking **Submit**.

![unassign-address.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/unassign-address.png)

This moves the address to the **UNASSIGNED ADDRESSES** section.

![unassigned-addresses.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+Unit+Management/Business+Units+Management+Feature+Overview/unassigned-addresses.png)

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Create company units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-units/create-company-units.html) |
| [Edit company units](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-units/edit-company-units.html) |
| [Create company unit addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-unit-addresses/create-company-unit-addresses.html) |
| [Edit company unit addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-unit-addresses/edit-company-unit-addresses.html) |


## See next

[Company user rules and permissions overview](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html)
