---
title: Edit users
description: Learn how you can edit users directly in the back office of your Spryker Cloud Commerce OS Shop.
template: back-office-user-guide-template
last_updated: Jan 4, 2024
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/users/managing-users/editing-users.html
  - /docs/pbc/all/user-management/202204.0/base-shop/manage-in-the-back-office/manage-users/edit-users.html
related:
  - title: Assigning and deassigning customers from users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/assign-and-deassign-customers-from-users.html
  - title: Create users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/create-users.html
  - title: Deleting users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/delete-users.html
---

This document describes how to edit users in the Back Office.

## Prerequisites

Review the [reference information](#reference-information-edit-users) before you start, or look up the necessary information as you go through the process.

## Editing users

1. Go to **Users&nbsp;<span aria-label="and then">></span> Users**.
2. Next to the user you want to edit, click **Edit**.
3. On the **Edit User** page, update any of the following:
    - **E-MAIL**
    - **PASSWORD**
    - **REPEAT PASSWORD**
    - **FIRST NAME**
    - **LAST NAME**
4. For **ASSIGNED GROUPS**, do the following:
    - Clear the checkboxes next to the groups you want to deassign this user from.
    - Select one or more groups to assign this user to.
5. Optional: Select or clear the **THIS USER IS AN AGENT** checkbox.
6. Optional: Select or clear the **THIS USER IS A WAREHOUSE USER** checkbox.
7. Select an **INTERFACE LANGUAGE**.
8. Select a **STATUS**.
9. Click **Update**.
    This opens the **Users** page with the success message displayed.

## Reference information: Edit users

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| E-MAIL | Email address of the user. It is used for logging in, resetting password, and getting notifications. |
| PASSWORD | Enter this value to update the user's password. |
| REPEAT PASSWORD | Enter the same new password to confirm it. |
| FIRST NAME | User's first name. |
| LAST NAME | User's last name. |
| ASSIGNED GROUPS | The user groups this user is assigned to. User groups define what areas and actions the user has access to. To learn how to create user groups, see [Create user groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-groups/create-user-groups.html). |
| AGENT | Defines if this user is an [agent assist](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html) |
| WAREHOUSE USER| Defines if this user works in a warehouse to [fulfill orders](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/fulfillment-app-overview.html). |
| INTERFACE LANGUAGE | Defines the interface language of the Back Office for this user. |
| STATUS | Defines if the user can access the Back Office. |
