---
title: User and Rights Management
originalLink: https://documentation.spryker.com/v3/docs/user-and-rights-management
redirect_from:
  - /v3/docs/user-and-rights-management
  - /v3/docs/en/user-and-rights-management
---

User and rights management is a general term that describes the security functionality for controlling user access to perform various roles throughout the system.

In the Spryker Commerce OS user and rights management is implemented in the following three bundles:

* ACL - ACL stands for Access Control List. This is where you can manage your roles, groups, privileges and resources.
* Auth - manages the authorization of a specific user by returning true or false if the credentials are allowed to access the system or not. It is used for login, logout, and used by the login controller to verify if a given user token is authenticated. Login is authenticated with a form or a header (via token). Auth is also used to validate that Zed has authorization to process incoming requests from Yves or 3rd parties such as payment providers.
* User - Allows to create users and assign them to groups. Each group contains a set of roles.

## Users and Customers
It is important to distinguish between users and customers. A user works with the back-end side of the store and handles the store maintenance such as creating users and assigning them to roles that will allow them to perform actions such as editing the CMS, activating and deactivating products and managing discounts. A customer on the other hand is the final consumer of the online store i.e. the person who places orders. Customers are also managed in Zed but in a different section.

Users are assigned to groups. Groups are a collection of Roles e.g. customer-care, root, 3rd party etc. Roles have Resources (rules) assigned to them. Resources (rules) are used to assign specific privileges to a Role for example, a Sales Representative Role or a System Administrator Role. Resources are always /module/controller/action and you can use * as placeholder.

* `/customer/*/*` would mean everything in /customer.
* `/customer/view/*` would mean a user can only see customers but can’t edit them.

## Managing Users
The Auth, ACL and User bundles are configured and managed through the Zed user interface. Bundles correspond with the tabs in Zed. You can find which name you should place here from the file `/project/config/Zed/navigation.xml`

Also, you can find bundle names as well as controllers and actions in the file `communication/navigation.xml`. For example:

![bundles_navigation.png](https://cdn.document360.io/9fafa0d5-d76f-40c5-8b02-ab9515d3e879/Images/Documentation/bundles_navigation.png){height="" width=""}

Learn to create and manage Users, Groups and Roles in Users Control Manual.

## ACL Configuration
Apart from being able to configure user access to Zed resources via Zed UI, you can grant access to additional resources by specifying them in `config_*.php`. The following options are used to do that:

* AclConstants::ACL_DEFAULT_RULES - is used to provide/restrict access to Zed resources, defined in the Spryker\Zed\Auth\AuthConfig::$ingorable property. For example:

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

* `AclConstants::ACL_USER_RULE_WHITELIST` - is used to provide additional access to Zed resources for all logged-in users. For example:
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
{% info_block warningBox %}
With the configuration provided in the example, users are granted access to these resources regardless of ACL configuration in ZED UI.
{% endinfo_block %}

* `AclConstants::ACL_DEFAULT_CREDENTIALS` - is used to provide additional access to Zed resources for a specific user. For example:
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

* Note that if there is at least one `allow` type for a resource, the user will have access to it in spite of having a `deny` type for the same resource. It works for `AclConstants::ACL_USER_RULE_WHITELIST`, `AclConstants::ACL_DEFAULT_CREDENTIALS` and rules configured via Zed UI, except for `AclConstants::ACL_DEFAULT_RULES` as it is handled before checking if user logged in or not.
