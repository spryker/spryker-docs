---
title: Users
description: The section can be used to create, update, and Back Office users, user groups and roles in the Back Office.
last_updated: Nov 26, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v4/docs/users-control
originalArticleId: 9b27d258-d72b-4adf-a5a1-c145086d9c43
redirect_from:
  - /v4/docs/users-control
  - /v4/docs/en/users-control
related:
  - title: User and Rights Management
    link: docs/scos/dev/feature-walkthroughs/page.version/spryker-core-back-office-feature-walkthrough/user-and-rights-overview.html
---

The Users Control section in the Back Office is mostly used by Spryker Admins.
This section is designed to build a logical organizational structure of users that performs different types of actions in the Back Office.
The bigger is the online shop, the more clients it has, the more Back Office users it may need. Therefore, the primary uses of the Users Control section are to create those users, build the user group structure and either grant or restrict the access to a defined list of sections.
 **Standardized flow of actions for a Spryker Admin**

![Users Control - Spryker Admin](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Users+Control/users-control-section.png)

{% info_block infoBox %}

This is how a Spryker Admin interacts with other departments to build a team structure with a specific set of access rules for each specific team member.

{% endinfo_block %}

The Users Control section is structured in the following way:
* Roles
* Groups
* Users

These sections are logically connected by the following:
* Each user must be assigned to one or several groups.
* The group must be assigned with one or several roles.

Thus, first of all, a Spryker Admin identifies the list of roles that each user is going to have in the **Roles** section. Next, the team should be split into groups in the **Groups** section. And finally, the users for each team member are created and assigned to the defined list of groups in the **User** section.

**What's next?**

To know how to manage roles, groups and users, see the following articles:
* [Managing Roles](/docs/scos/user/back-office-user-guides/{{page.version}}/users/roles-groups-and-users/managing-roles.html)
* [Managing Groups](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-user-groups/creating-user-groups.html)
* [Managing Users](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/creating-users.html)

To know more about the attributes you use to manage roles, groups, and users, see the following articles:
* [Roles: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/users/roles-groups-and-users/references/roles-reference-information.html)
* [User: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/users/roles-groups-and-users/references/user-reference-information.html)
