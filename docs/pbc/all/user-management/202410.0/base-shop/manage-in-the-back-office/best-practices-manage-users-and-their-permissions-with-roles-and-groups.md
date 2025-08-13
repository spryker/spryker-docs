---
title: "Best practices: Manage users and their permissions with roles and groups"
description: Learn how to manage users and their permissions with roles and groups
template: back-office-user-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/users/best-practices-managing-users-and-their-permissions-with-roles-and-groups.html
  - /docs/pbc/all/user-management/202204.0/base-shop/manage-in-the-back-office/best-practices-manage-users-and-their-permissions-with-roles-and-groups.html
related:
  - title: Customer Groups overview
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-groups-overview.html
---

This document describes how to create a user with restricted access to the  Back Office.

In this example, we assume that you want to create a user and give them access to all the areas of the Back Office. Also, you want to deny the user access to adding product attributes. Follow the instructions below.

## 1. Creating a user role

User roles define what areas of the Back Office are accessible to user and what they can do in them.

Even if you don't want to restrict access of a user, to create a user, you still must create at least one user role that gives full access. In this example, you are going to create a role that gives full access and restricts the user from creating product attributes. Follow the instructions in the following sections.

### Checking the bundle, controller, and action values

To restrict or allow access to an area or action of the Back Office, you need the understand the following values:

- Bundle
- Controller
- Action

Bundle and controller are responsible for allowing and restricting access to areas, while action is responsible for allowing or restricting actions.

There are several ways you can extract these values in. For more information about this, see the [Users and Rights overview](/docs/pbc/all/user-management/{{page.version}}/base-shop/user-and-rights-overview.html#users-and-customers). The easiest way is to look it up in the URL. To look up the values for restricting access to adding product attributes, do the following:

1. Go to **Catalog&nbsp;<span aria-label="and then">></span> Attributes**.
2. Click **Create Product Attribute**.
3. Check the link in your browser. It should be similar to `backoffice.demo-spryker.com/product-attribute-gui/attribute/create`.

In this example, the values are as follows:

| URL COMPONENT | VALUE |
| --- | --- |
| product-attribute-gui | bundle |
| attribute  | controller |
| create | action |


### Creating the role with limited access

1. Go to **Users&nbsp;<span aria-label="and then">></span> User Roles**.
2. Click **Add new Role**.
3. On the **Create new Role** page, enter a **NAME**.
  Later, you will be using this name when assigning this role to user groups.
4. Click **Create**.
    This creates the roles and opens the **Edit Role** page.
5. Create the rule that gives full access:
    1. For **BUNDLE**, **CONTROLLER**, and **ACTION** select `*`.
        `*` means that the rule applies to all the existing bundles, controllers, and actions.
    2. For **PERMISSION**, select **allow**.
        This type of permission gives access to the **BUNDLE**, **CONTROLLER**, and **ACTION** you've selected.
    3. Click **Add rule**.
        The page refreshes with the success message displayed and the rule displayed in the **Assigned Rules** section.
6. Using the details you've checked in [Checking the bundle, controller, and action values](#checking-the-bundle-controller-and-action-values), set up the rule that restricts creating product attributes:
    1. For **BUNDLE**, select **product-attribute-gui**.
    2. For **CONTROLLER**, select **attribute**.
    3. For **ACTION**, enter **create**.
    4. For **PERMISSION**, select **deny**.
        This type of permission denies access to the **BUNDLE**, **CONTROLLER**, and **ACTION** you've selected.
    5. Click **Add rule**.
        The page refreshes with the success message displayed and the rule displayed in the **Assigned Rules** section.

## 2. Creating a user group

User groups is a tool for managing multiple users. When you change the permissions of a group, you change the permissions of all the users belonging to it. In this example, you are going to create one user, but you still must to create a group for it.


To create the user group, do the following:

1. Go to **Users&nbsp;<span aria-label="and then">></span> User Groups**.
2. Click **Create Group**.
3. Enter a **TITLE**.
    You will use this title to identify the group when creating the user.
4. For **ASSIGNED ROLES**, select the role you've created in [1. Creating a user role](#creating-a-user-role).
    This gives the group the permissions you've defined for the role.
5. Click **Save**.
    This opens the **Edit Group** page with the success message displayed. The **USERS** pane shows all the users this role is assigned to. As you didn't create the user yet, the pane is empty.

## 3. Creating a user

1. Go to **Users&nbsp;<span aria-label="and then">></span> Users**.
1. On the **Users** page, click **Add New User**.
2. On the **Create new User** page, enter an **E-MAIL**.
    The user will be using this email address to log into the Back Office.
3. Enter a **PASSWORD**.
    The user will be using this password to log into the Back Office.
4. For **REPEAT PASSWORD**, enter the same password once again.
5. Enter a **FIRST NAME**.
6. Enter a **LAST NAME**.
7. For **ASSIGNED GROUPS**, select the group you've created in [2. Creating a user group](#creating-a-user-group).
8. If you want this user to be an agent, select **THIS USER IS AN AGENT**.
    Agent users can perform actions on customers' behalf. For more information about agent users, see [Agent Assist feature overview](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html)
9. Select an **INTERFACE LANGUAGE**.
    The Back Office interface will be in this language for the user.
10. Click **Create**.

This opens the **Users** page with the success message displayed. The created user is displayed in the list.

That's it! You can test the new user by logging into their account. They should have full access except for creating product attributes. When they click **Create a Product Attribute**, they get the **Access denied** message.
