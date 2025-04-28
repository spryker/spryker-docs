---
title: Users Management
description: The Spryker User Management capability lets you manage Back Office users within your Spryker based projects.
last_updated: Aug 20, 2021
template: concept-topic-template
redirect_from:
- /docs/pbc/all/user-management/202204.0/user-management.html
---

The *User Management* capability lets you create and manage Back Office users and their permissions.

The default Back Office user has permissions to create user accounts and manage their permissions. For instructions, see [Create users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/create-users.html).

## User permissions

Permissions are managed with the help of *user roles* and *user groups*.

Each Back Office user has a role that defines their permissions to perform actions. For example, a content manager does not manage product catalog, but you may want them to be able to view products. So, in **Catalog** > **Products** section, you give them access to the `view` action, but not to the `edit` or `add` actions.

To make the process of managing permissions easier, instead of assigning roles to each user, you assign roles to user groups. Then, when you add a user to a group, they get the permissions of the role assigned to the group. This also lets you change permissions of multiple users at a time.

For instructions on creating user roles and groups, see the following documents:

* [Create user roles](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-roles/create-user-roles.html)
* [Create user groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-groups/create-user-groups.html)

## Agent assist

An agent assist is a Back Office user that has permissions to act on customers' behalf. Using their account, they can log into a customer's account on the Storefront and help them with requested actions.

For more details about the agent assist feature, see the [Agent assist feature overview](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html)

## Installation

To install the User Management capability, do the following:

1. Install the required modules using Composer:
```bash
composer require spryker-feature/agent-assist:"{{site.version}}" spryker-feature/acl:"{{site.version}}" --update-with-dependencies
```
2. Follow the integration guides for the individual features:
* [User Management](#related-developer-documents)
* [Agent Assist](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html#related-developer-documents)

## Related Business User documents

| OVERVIEWS | BACK OFFICE USER GUIDES|
| - |---|
| [Agent Assist feature overview](/docs/pbc/all/user-management/{{page.version}}/base-shop/agent-assist-feature-overview.html) | [Best practices: Manage users and their permissions with roles and groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/best-practices-manage-users-and-their-permissions-with-roles-and-groups.html)|
| | [Create user roles](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-roles/create-user-roles.html) |
| | [Edit user roles](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-roles/edit-user-roles.html) |
| | [Create user groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-groups/create-user-groups.html) |
| | [Edit user groups](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-user-groups/edit-user-groups.html) |
| | [Create users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/create-users.html) |
| | [Edit users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/edit-users.html) |
| | [Assign and deassign customers from users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/assign-and-deassign-customers-from-users.html) |
| | [Delete users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/delete-users.html) |

## Related Developer documents

| OVERVIEWS | INSTALLATION GUIDES |
| - | - |
| [Users and rights overview](/docs/pbc/all/user-management/{{page.version}}/base-shop/user-and-rights-overview.html) | [Install the ACL feature](/docs/pbc/all/user-management/{{page.version}}/base-shop/install-and-upgrade/install-the-acl-feature.html) |
