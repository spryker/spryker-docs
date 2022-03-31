---
title: Managing Groups
description: Use the procedures to create, edit a group and assign a role to this group in the Back Office.
last_updated: Nov 22, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/managing-groups
originalArticleId: d28a6800-6428-408f-8039-9baee6749ecd
redirect_from:
  - /v4/docs/managing-groups
  - /v4/docs/en/managing-groups
related:
  - title: Roles- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/users/roles-groups-and-users/references/roles-reference-information.html
  - title: User- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/users/roles-groups-and-users/references/user-reference-information.html
  - title: Managing Users
    link: docs/scos/user/back-office-user-guides/page.version/users/roles-groups-and-users/managing-users.html
  - title: Customer Groups
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/customer-groups-overview.html
---

This topic describes the procedures that you need to perform to create and update groups.
***

To start working with groups, navigate to the **Users Control > Groups** section.
***

## Creating a Group

Now you need to create a group to assign a role to it.

To create a group:
1. Click **Create Group** in the top right corner of the **Groups** table view page.
2. Enter the name of your group in the **Title** field.
3. In the **Assigned Roles** drop-down menu, select the role to assign to this group and click **Save**.

    {% info_block warningBox "Note" %}

    You can select from one to many roles to be assigned.

    {% endinfo_block %}

This will redirect you to the **Edit Group** page. The page contains the same fields as the **Create Group** page. The only difference is that on the **Edit** page you will see the **Users** section.

In this section, you can see what users are assigned to this specific group and de-assign them if needed.
***

## Editing a Group

To edit the group:
1. In the **Groups > Actions** column, click **Edit**.
2. On the **Edit Group** page you can:
    * Rename the group by changing the value in the **Title** field.
    * Assign a new role to a group.
        You can also remove the already assigned roles by clicking **X** on the left of the assigned role.
4. Once you finish updating the values, click **Save**.

***

To de-assign a user from a group:
1. In the **Groups > Actions** column, click **Edit**.
2. On the **Edit group** page in the **Users** section, click **Delete** in the _Actions_ column.

{% info_block infoBox %}

This action will not delete the user itself. It will just delete the association between this specific user and group.

{% endinfo_block %}

***

**Tips and tricks**

In case you need to know what roles are assigned to a specific group without initiating the update flow, do the following:
1. On the **Groups** table view page, click the hyperlinked value in the _Roles_ column.
    All roles assigned to this group are listed in the **Roles in Group** pop-up that appears.
2. Click **Close** to close the pop-up window.

***

**What's next?**

The preliminary steps are performed so you can proceed and create an actual user record.
