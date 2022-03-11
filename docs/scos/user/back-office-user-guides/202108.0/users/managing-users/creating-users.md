---
title: Creating users
description: Learn how to create users in the Back Office
last_updated: Aug 2, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-users
originalArticleId: 835c1e16-904a-4ed9-82c8-50244c7b0ff2
redirect_from:
  - /2021080/docs/managing-users
  - /2021080/docs/en/managing-users
  - /docs/managing-users
  - /docs/en/managing-users
related:
  - title: User and Rights Management
    link: docs/scos/dev/feature-walkthroughs/page.version/spryker-core-back-office-feature-walkthrough/user-and-rights-overview.html
---

This document describes how to create users in the Back Office.

## Prerequisites

1. If you are new to the **Users** section, you might want to start with [Best practices: Managing users and their permissions with roles and groups](/docs/scos/user/back-office-user-guides/{{page.version}}/users/best-practices-managing-users-and-their-permissions-with-roles-and-groups.html).
2. Create at least one user group. For instructions, see [Creating user groups](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-user-groups/creating-user-groups.html).
3. To start working with users, go to **Users** > **Users**.

Review the [reference information](#reference-information-creating-users) before you start, or look up the necessary information as you go through the process.

## Creating users

1. On the **Users** page, click **Add New User**.
2. On the **Create new User** page, enter an **E-MAIL**.
3. Enter a **PASSWORD**.
4. For **REPEAT PASSWORD**, enter the same password once again.
5. Enter a **FIRST NAME**.
6. Enter a **LAST NAME**.
7. For **ASSIGNED GROUPS**, select one or more user groups you want to assign this user to.
8. If you want this user to be an agent, select **THIS USER IS AN AGENT**.
9. Select an **INTERFACE LANGUAGE**.
10. Click **Create**.

This opens the **Users** page with the success message displayed. The created user is displayed in the list.

## Reference information: Creating users

The following table describes the attributes you enter and select when creating roles:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| E-MAIL | Email address of the user. It will be used for logging in, resetting password, and getting notifications. |
| PASSWORD | The user will be using this password to log in. |
| REPEAT PASSWORD | Password confirmation. |
| FIRST NAME | User's first name. |
| LAST NAME | User's last name. |
| ASSIGNED GROUPS | User groups to assign this user to. User groups define what areas and actions the user will have access to. To learn how to create user groups, see [Creating user groups](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-user-groups/creating-user-groups.html). |
| AGENT | Defines if this user is an [agent assist](/docs/scos/user/features/{{page.version}}/agent-assist-feature-overview.html) |
| INTERFACE LANGUAGE | Defines the interface language of the Back Office for this user. |
