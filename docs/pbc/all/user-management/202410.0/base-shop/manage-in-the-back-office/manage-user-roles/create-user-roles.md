---
title: Create user roles
description: Learn how you can create new user roles directly in the back office of Spryker Cloud Commerce OS.
last_updated: Aug 2, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-roles
originalArticleId: 646ae8f6-32b9-440d-8cdf-c720d046de25
redirect_from:
  - /2021080/docs/managing-roles
  - /2021080/docs/en/managing-roles
  - /docs/managing-roles
  - /docs/en/managing-roles
  - /docs/scos/user/back-office-user-guides/202311.0/users/roles-groups-and-users/managing-roles.html
  - /docs/scos/user/back-office-user-guides/202311.0/users/managing-user-roles/creating-user-roles.html
  - /docs/pbc/all/user-management/202204.0/base-shop/manage-in-the-back-office/manage-user-roles/create-user-roles.html
related:
  - title: Editing user roles
    link: docs/pbc/all/user-management/page.version/base-shop/manage-in-the-back-office/manage-user-roles/edit-user-roles.html
---

This document describes how to create user roles in the Back Office.

## Prerequisites

- If you are new to the **Users** section, you might want to start with [Best practices: Managing users and their permissions with roles and groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-manage-users-and-their-permissions-with-roles-and-groups.html).

- Review the [reference information](#reference-information-create-user-roles) before you start, or look up the necessary information as you go through the process.

## Create user roles

1. Go to **Users&nbsp;<span aria-label="and then">></span> User Roles**.
2. On the **User Roles** page, click **Add new Role**.
3. On the **Create new Role** page, enter a **NAME** and click **Create**.
    This opens the **Edit Role** page with the success message displayed.
4. In the **Rule** pane, select a **BUNDLE**.
5. Select a **CONTROLLER**.
6. Select an **ACTION**.
7. Select a **PERMISSION**
8. Click **Add Rule**.
      The page refreshes with the success message displayed and the rule displayed in the **Assigned Rules** section.
9. Repeat steps 3-7 until you add all the needed rules.


### Reference information: Create user roles

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| NAME | Unique identifier of the role. You use this name to assign roles when managing users. |
| BUNDLE | Depending on the **PERMISSION**, allows or denies access to a section of the Back Office. You can check this value by going to the needed section and looking it up in the URL. For example, in `https://backoffice.de.b2b-demo-shop.local/product-attribute-gui/attribute/create`, `product-attribute-gui` is a bundle. |
| CONTROLLER | Depending on the **PERMISSION**, allows or denies access to a subsection of the Back Office. You can check this value by going to the needed subsection and looking it up in the URL. For example, in `https://backoffice.de.b2b-demo-shop.local/product-attribute-gui/attribute/create`, `attribute` is a controller. |
| ACTION | Depending on the **PERMISSION**, allows or denies access to making actions. You can check this value by going to the needed action and looking it up in the URL. For example, in `https://backoffice.de.b2b-demo-shop.local/product-attribute-gui/attribute/create`, `create` is an action.
| PERMISSION | Denies or allows access to the **BUNDLE**, **CONTROLLER**, and **ACTION**. |

**Tips and tricks**

To allow or deny access for all of the bundles, controllers or actions, select `*` in the needed field.

Alternatively, you can look up **BUNDLE**, **CONTROLLER**, and **ACTION** values in the `navigation.xml` of the needed module.

See the example of the `navigation.xml` file of the AvailabilityGui module:

<details>
<summary>navigation.xml</summary>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<config>
    <product>
        <pages>
            <AvailabilityGui>
                <label>Availability</label>
                <title>Availability</title>
                <bundle>availability-gui</bundle>
                <controller>index</controller>
                <action>index</action>
                <pages>
                    <product-availability>
                        <label>Product Availability</label>
                        <title>Product Availability</title>
                        <bundle>availability-gui</bundle>
                        <controller>index</controller>
                        <action>view</action>
                        <visible>0</visible>
                    </product-availability>

                    <stock-edit>
                        <label>Edit Stock</label>
                        <title>Edit Stock</title>
                        <bundle>availability-gui</bundle>
                        <controller>index</controller>
                        <action>edit</action>
                        <visible>0</visible>
                    </stock-edit>
                </pages>
            </AvailabilityGui>
        </pages>
    </product>
</config>
```

</details>


## Next steps

[Create user groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-groups/create-user-groups.html)
