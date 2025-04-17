---
title: Users and rights overview
last_updated: Aug 20, 2021
description: User and rights management is a general term that describes the security functionality for controlling user access to perform various roles throughout the system
template: concept-topic-template
originalLink: https://documentation.spryker.com/docs/user-and-rights-overview
originalArticleId: 4006b24f-fd0a-480a-9589-d2b822fdbde3
redirect_from:
- /2021080/docs/user-and-rights-overview
- /2021080/docs/en/user-and-rights-overview
- /docs/user-and-rights-overview
- /docs/en/user-and-rights-overview
- /docs/scos/dev/feature-walkthroughs/202311.0/customer-account-management-feature-walkthrough/user-and-rights-overview.html
- /docs/scos/dev/feature-walkthroughs/202200.0/spryker-core-back-office-feature-walkthrough/user-and-rights-overview.html
- /docs/pbc/all/user-management/202204.0/base-shop/user-and-rights-overview.html
---

User and rights management is implemented in the following three bundles:

* ACL—ACL stands for Access Control List. This is where you can manage your roles, groups, privileges and resources.
* Auth—manages the authorization of a specific user by returning true or false if the credentials are allowed to access the system or not. It is used for login, logout, and used by the login controller to verify if a given user token is authenticated. Login is authenticated with a form or a header (via token). Auth is also used to validate that Zed has authorization to process incoming requests from Yves or third parties such as payment providers.
* User—lets you create users and assign them to groups. Each group contains a set of roles.

## Users and customers

It is important to distinguish between users and customers. A user works with the back-end side of the store and handles the store maintenance such as creating users and assigning them to roles that will let them perform actions such as editing the CMS, activating and deactivating products, and managing discounts. A customer on the other hand is the final consumer of the online store—for example, the person who places orders. Customers are also managed in Zed but in a different section.

Users are assigned to groups. Groups are a collection of Roles—for example, customer-care, root, or third-party. Roles have Resources (rules) assigned to them. Resources (rules) are used to assign specific privileges to a Role for example, a Sales Representative Role or a System Administrator Role. Resources are always /module/controller/action and you can use * as placeholder.

* `/customer/*/*` would mean everything in /customer.
* `/customer/view/*` would mean a user can only see customers but can't edit them.

## Managing users

The Auth, ACL, and User bundles are configured and managed through the Zed user interface. Bundles correspond with the tabs in Zed. You can find which name to place here from the file `/project/config/Zed/navigation.xml`

Also, you can find bundle names as well as controllers and actions in the file `communication/navigation.xml`. For example:

![bundles_navigation.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/scos/dev/feature-walkthroughs/spryker-core-back-office-feature-walkthrough/user-and-rights-overview.md/bundles_navigation.png)

See [Managing users](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/create-users.html) to learn how to create and manage users, groups, and roles.

<a name="add-acl"></a>

{% info_block infoBox "Adding users in the ACL module" %}

You can add Zed users not only via the Back Office, but also in the ACL module. To do so, add the user in `/Spryker/Zed/Acl/AclConfig::getInstallerUsers()`(see [AclConfig.php](https://github.com/spryker/acl/blob/d3193c9259ed2f2b6815f3b2c9f52f4e4e250bbe/src/Spryker/Zed/Acl/AclConfig.php) for example) and run `console setup:init-db`.

{% endinfo_block %}

## ACL configuration

Apart from being able to configure user access to Zed resources via Zed UI, you can grant access to additional resources by specifying them in `config_*.php`. The following options are used to do that:

* `AclConstants::ACL_DEFAULT_RULES`—is used to provide/restrict access to Zed resources, defined in the `Spryker/Zed/Auth/AuthConfig::$ingorable` property. For example:

```php
$config[AclConstants::ACL_DEFAULT_RULES] = [
    // ....
    [
        'bundle' => 'auth',
        'controller' => 'login',
        'action' => 'index',
        'type' => 'deny',
    ],
    // ....
];
```

In the example, we restrict access for everyone to Zed login page. This option affects both logged-in and anonymous users. The key feature is the ability to restrict/provide access for anonymous users.

* `AclConstants::ACL_USER_RULE_WHITELIST`—is used to provide additional access to Zed resources for all logged-in users. For example:

```php
$config[AclConstants::ACL_USER_RULE_WHITELIST] = [
    // ....
    [
        'bundle' => 'application',
        'controller' => '*',
        'action' => '*',
        'type' => 'allow',
    ],
    // ....
];
```

In the example, we grant access to the Application module resources for all users.

{% info_block warningBox "Note" %}

With the configuration provided in the example, users are granted access to these resources regardless of ACL configuration in ZED UI.

{% endinfo_block %}

* `AclConstants::ACL_DEFAULT_CREDENTIALS`—is used to provide additional access to Zed resources for a specific user. For example:

```php
$config[AclConstants::ACL_DEFAULT_CREDENTIALS] = [
    'winner@spryker.com' => [
        'rules' => [
            [
                'bundle' => '*',
                'controller' => '*',
                'action' => '*',
                'type' => 'allow',
            ],
        ],
    ],
]
```

In the example, we grant the user **winner@spryker.com** access to all Zed resources. To make it work, we should also add **winner@spryker.com** to this option: `UserConstants::USER_SYSTEM_USERS`. Here, a system user is any user who has additional ACL rules defined for them in `config_*.php` file.

* Note that if there is at least one `allow` type for a resource, the user will have access to it in spite of having a `deny` type for the same resource. It works for `AclConstants::ACL_USER_RULE_WHITELIST`, `AclConstants::ACL_DEFAULT_CREDENTIALS` and rules configured via Zed UI, except for `AclConstants::ACL_DEFAULT_RULES` as it's handled before checking if user logged in or not.
