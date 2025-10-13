---
title: Edit company roles
description: Learn how to edit a company roles in the Spryker Cloud Commerce OS Back Office.
template: back-office-user-guide-template
last_updated: Nov 17, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202200.0/customer/company-account/managing-company-roles.html
  - /docs/scos/user/back-office-user-guides/202311.0/customer/company-account/managing-company-roles.html
  - /docs/scos/user/back-office-user-guides/202204.0/customer/company-roles/edit-company-roles.html
  - /docs/scos/user/back-office-user-guides/202204.0/customer/company-unit-addresses/edit-company-unit-addresses.html
related:
  - title: Managing Companies
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/manage-companies.html
  - title: Company user roles and permissions overview
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html
---

This document describes how to edit company roles in the Back Office.

## Prerequisites

Review the [reference information](#edit-a-company-role) before you start, or look up the necessary information as you go through the process.

## Edit a company role

1. Go to  **Company Account&nbsp;<span aria-label="and then">></span> Company Roles**.
2. On the **Company Roles** page, next to the role you want to edit, click **Edit**.
3. Enter a **NAME**
4. To automatically apply this role to every new user of the company, select **IS DEFAULT**.
5. For **ASSIGNED PERMISSIONS**, clear the checkboxes next to the permission you want to deassign from this role.
6. For **UNASSIGNED PERMISSIONS** section, select the checkboxes next to the permissions to assign to this role.
7. Click **Submit**.
    This refreshes the page with a success message displayed.


## Reference information: Edit a company role

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| COMPANY | A company this role belongs to. To define a role's company, [create](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/company-roles/create-company-roles.html) it from scratch. |
| NAME | Unique identifier of the role.  |
| IS DEFAULT | Defines if this role is used by default for all the new company users created. If the selected **COMPANY** already has a default role, by selecting this option you change the default role to this one. |
| ASSIGNED PERMISSIONS | Permissions that are assigned to this role. The permissions are defined on a code level. |
| UNASSIGNED PERMISSIONS | Permissions that are not assigned to this role. The permissions are defined on a code level. |
