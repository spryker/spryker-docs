---
title: Create users
description: Learn how you can create new users directly in the back office of your Spryker Cloud Commerce OS Shop.
last_updated: Aug 2, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-users
originalArticleId: 835c1e16-904a-4ed9-82c8-50244c7b0ff2
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/users/managing-users/activating-and-deactivating-users.html
  - /docs/scos/user/back-office-user-guides/202311.0/users/managing-users/creating-users.html
  - /docs/pbc/all/user-management/202204.0/base-shop/manage-in-the-back-office/manage-users/create-users.html
related:
  - title: Assigning and deassigning customers from users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/assign-and-deassign-customers-from-users.html
  - title: Editing users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/edit-users.html
  - title: Deleting users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/delete-users.html
  - title: User and Rights Management
    link: docs/pbc/all/user-management/page.version/base-shop/user-and-rights-overview.html
---

This document describes how to create users in the Back Office.

## Prerequisites

* If you are new to the **Users** section, you might want to start with [Best practices: Managing users and their permissions with roles and groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-manage-users-and-their-permissions-with-roles-and-groups.html).
* Create at least one user group. For instructions, see [Create user groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-groups/create-user-groups.html).
* Review the [reference information](#reference-information-create-users) before you start or look up the necessary information as you go through the process.

## Create a user

1. Go to **Users&nbsp;<span aria-label="and then">></span> Users**.
2. On the **Users** page, click **Add New User**.
3. On the **Create new User** page, enter an **E-MAIL**.
4. Enter a **PASSWORD**.
5. For **REPEAT PASSWORD**, enter the same password once again.
6. Enter a **FIRST NAME**.
7. Enter a **LAST NAME**.
8. For **ASSIGNED GROUPS**, select one or more user groups you want to assign this user to.
9. Optional: To make this user an agent, select **THIS USER IS AN AGENT IN STOREFRONT**.
10. Optional: To make the user a warehouse user, select **WAREHOUSE USER**.
11. For **INTERFACE LANGUAGE**, select a language suitable for the user.
12. Click **Create**.

This opens the **Users** page with the success message displayed. The created user is displayed in the list.

## Reference information: Create users

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| E-MAIL | Email address of the user. It will be used for logging in, resetting password, and getting notifications. |
| PASSWORD | The user will be using this password to log in. |
| REPEAT PASSWORD | Password confirmation. |
| FIRST NAME | User's first name. |
| LAST NAME | User's last name. |
| ASSIGNED GROUPS | User groups to assign this user to. User groups define what areas and actions the user will have access to. To learn how to create user groups, see [Create user groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-groups/create-user-groups.html). |
| AGENT | Defines if this user is an [agent assist](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html) |
| WAREHOUSE USER| Defines if this user works in a warehouse to [fulfill orders](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/fulfillment-app-overview.html). |
| INTERFACE LANGUAGE | Defines the interface language of the Back Office for this user. |
