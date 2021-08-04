---
title: Managing groups
originalLink: https://documentation.spryker.com/2021080/docs/managing-groups
redirect_from:
  - /2021080/docs/managing-groups
  - /2021080/docs/en/managing-groups
---

This topic describes how to manage groups.

To start working with groups, go  to **Users** > **Groups**.

## Creating groups

Now you need to create a group to assign a role to it.

To create a group:
1. In the top right corner of the *Groups* table, click **Create Group**.
2.  In the **Title** field, enter the name of your group
3. From the **Assigned Roles** drop-down menu, select the role to assign to this group and click **Save**.
    {% info_block warningBox "Note" %}
You can select from one to many roles to be assigned.
{% endinfo_block %}

This redirects you to the *Edit Group* page. The page contains the same fields as the *Create Group* page. The only difference is that on the *Edit* page, you see the *Users* section.

In this section, you can see what users are assigned to this specific group and de-assign them if needed. 

## Editing groups

To edit the group:
1. In the *Groups* > *Actions* column, click **Edit**.
2. On the *Edit Group* page, you can:
    * Rename the group by changing the value in the **Title** field.
    * Assign a new role to a group. 
        You can also remove the already assigned roles by clicking **X** on the left of the assigned role.
4. Click **Save**.

To de-assign a user from a group:
1. In the *Groups* > *Actions* column, click **Edit**.
2. On the *Edit group* page, in the *Users* section, click **Delete** in the _Actions_ column.
{% info_block infoBox %}
This action does not delete the user itself. It just deletes the association between this specific user and group.
{% endinfo_block %}


**Tips & tricks**
To know what roles are assigned to a specific group without initiating the update flow, do the following:
1. On the *Groups* table view page, click the hyperlinked value in the _Roles_ column.
    All roles assigned to this group are listed in the *Roles in Group* pop-up that appears. 
2. To close the pop-up window, click **Close**.

**What's next?**
The preliminary steps are performed so you can proceed and create an actual user record.

