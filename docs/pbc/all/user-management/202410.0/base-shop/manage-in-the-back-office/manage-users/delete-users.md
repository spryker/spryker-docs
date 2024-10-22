---
title: Delete users
description: Learn how to delete users in the Back Office
last_updated: Oct 24, 2024
template: back-office-user-guide-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/202311.0/users/managing-users/deleting-users.html
  - /docs/pbc/all/user-management/202204.0/base-shop/manage-in-the-back-office/manage-users/delete-users.html
related:
  - title: Assigning and deassigning customers from users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/assign-and-deassign-customers-from-users.html
  - title: Create users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/create-users.html
  - title: Editing users
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-users/edit-users.html
---


To delete a user, do the following:
1. Go to **Users&nbsp;<span aria-label="and then">></span> Users**.
2. Next to the user you want to delete, click **Delete**.
3. On the **Delete User** page, click **Delete** to confirm the action.
    This opens the **Users** page with the success message displayed. The user's **STATUS** is **Deleted**. The user's record stays in the database, and you can reactivate it at any time. The user is logged out immediately.


{% info_block warningBox "Amazon QuickSight assets" %}

Deleting a user that owns [Amazon QuickSight] assets, such as data sets, analyses, and dashboards, deletes their assets as well. Make sure to transfer ownership of all the needed assets before deleting a user.

{% endinfo_block %}
