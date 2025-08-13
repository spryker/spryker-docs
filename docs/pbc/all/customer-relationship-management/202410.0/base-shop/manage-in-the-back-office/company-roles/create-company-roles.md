---
title: Create company roles
description: Learn how to create and manage company roles in the Spryker Cloud Commerce OS Back Office.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-company-roles
originalArticleId: 3297455f-e357-4d29-94ae-0797c45f25a3
redirect_from:
  - /2021080/docs/managing-company-roles
  - /2021080/docs/en/managing-company-roles
  - /docs/managing-company-roles
  - /docs/en/managing-company-roles
  - /docs/scos/user/back-office-user-guides/202204.0/customer/company-account/managing-company-roles.html
  - /docs/scos/user/back-office-user-guides/202200.0/customer/company-account/managing-company-roles.html
  - /docs/scos/user/back-office-user-guides/202311.0/customer/company-account/managing-company-roles.html
  - /docs/scos/user/back-office-user-guides/202311.0/customer/company-roles/create-company-roles.html
  - /docs/scos/user/back-office-user-guides/202204.0/customer/company-roles/create-company-roles.html
  - /docs/pbc/all/customer-relationship-management/latest/base-shop/manage-in-the-back-office/company-roles/create-company-roles.html
related:
  - title: Managing Companies
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-in-the-back-office/manage-companies.html
  - title: Company user roles and permissions overview
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html
---

This document describes how to create company roles in the Back Office.

## Prerequisites

- [Create a company](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-companies.html).
- Review the [reference information](#create-a-company-role) before you start, or look up the necessary information as you go through the process.

## Create a company role

1. Go to  **Company Account&nbsp;<span aria-label="and then">></span> Company Roles**.
2. On the **Company Roles** page, in the top right corner, click **Add Company User Role**.
3. On the **Create Company Role** page, select a **COMPANY**.
4. Enter a **NAME**
5. To automatically apply this role to every new user of the company, select **IS DEFAULT**.
6. Optional: For **UNASSIGNED PERMISSIONS** section, select the permissions to assign to this role.
7. Click **Save**.
    This opens the **Company Roles** page with a success message displayed. The created role is displayed in the list.


## Reference information: Create a company role

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| COMPANY | A company to create this role for. |
| NAME | Unique identifier of the role.  |
| IS DEFAULT | Defines if this role will be used by default for all the new company users created. If the selected **COMPANY** already has a default role, by selecting this option you change the default role to this one. |
| UNASSIGNED PERMISSIONS | Permissions that define what a company user with this rule can do. The permissions are defined on a code level. |


## Next steps

[Create company users](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/company-users/create-company-users.html)
