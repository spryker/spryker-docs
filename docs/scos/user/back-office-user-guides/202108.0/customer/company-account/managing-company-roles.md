---
title: Managing company roles
description: Use the procedures to create, update, delete, and assign company roles in the Back Office.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-company-roles
originalArticleId: 3297455f-e357-4d29-94ae-0797c45f25a3
redirect_from:
  - /2021080/docs/managing-company-roles
  - /2021080/docs/en/managing-company-roles
  - /docs/managing-company-roles
  - /docs/en/managing-company-roles
related:
  - title: Managing Company Users
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-users.html
  - title: Managing Company Unit Addresses
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-unit-addresses.html
  - title: Managing Company Units
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-units.html
  - title: Managing Companies
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-companies.html
---

This topic describes the procedures of creating and managing company roles. This is one of the steps in the Company Account setup.

## Prerequisites

To start managing company roles, navigate to  **Company Account** > **Company Roles**.

{% info_block warningBox "Note" %}

Make sure to [create a company](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-companies.html#creating-companies) before you create a company role.

{% endinfo_block %}

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating a company role

To create a new company role:
1. On the *Overview of Company Roles* page, in the top right corner, click **Add Company User Role**.
2. In the *Create role* pane, enter the required information:
     * From the *Company* drop-down list, select a company.
     * In the **Name** field, enter the name of the company role.
3. Select **Is Default** to apply this role to all new company users automatically.
4. In the *Unassigned Permissions* section, assign all permissions you need by selecting the checkboxes on the left of each value.
5. Click **Save**.

## Editing a company role

To edit a company role:
1. On the *Overview of Company Roles* page in the *Actions* column, click **Edit**  if you want to change the details for a company role.
2. In the *Update role* pane, update the needed attributes.

## Deleting a company role

To delete a company role:
1. On the *Overview of Company Roles* page in the _Actions_ column, click **Delete**.
2. On the confirmation page, click **Delete** company role to confirm the action.
   {% info_block infoBox "Info" %}

   If you delete a default role, the following message is displayed: "*You cannot delete a default role; please set another default role before the delete action.*"

   {% endinfo_block %}

**What's next?**
<br>Once the role is created, you can proceed with creating a company user and assign the created role to it.
See [Managing company users](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-users.html) to know how the company users are created and managed.
