---
title: Back Office Login overview
originalLink: https://documentation.spryker.com/2021080/docs/back-office-login-overview
redirect_from:
  - /2021080/docs/back-office-login-overview
  - /2021080/docs/en/back-office-login-overview
---

To be able to use the Spryker Back Office, users have to authenticate to the Back Office. They can authenticate via:

* Regular Back Office user account
* Third-party sign-on (optional)

To *authenticate as a regular Back Office user*, you should have the Back Office user account. See [Managing user](https://documentation.spryker.com/docs/managing-users#managing-users)s to learn how you can create and manage Back Office user accounts. 

You can also enable your users to sign in from a third-party service set up for your project. The third-party sign-on uses the [OpenID](https://en.wikipedia.org/wiki/OpenID) protocol for authentication.

{% info_block infoBox %}

The feature is shipped with an exemplary ECO module that supports authentication via Microsoft Azure Active Directory. With the existing infrastructure, you can develop your own ECO modules for the identity managers you need.

{% endinfo_block %}

If a user chooses to log in via a third-party, the user is redirected to the OAuth provider's sign-in page (for example, Microsoft Azure). If the user logs in to the third-party service successfully, the check is made if the user exists in the Spryker database. If the user exists in the database and is active, the user is logged in. If the user does not exist in the database, you can have one of the two different behaviors or strategies for your project:

<a name="strategies"></a>

**Strategy 1: Upon the first login, create the Back Office admin user based on the third-party system’s user data.**

If a user who does not exist in the Spryker database logs in for the first time, the following happens:

* Based on the third-party system’s user data such as first name, last name, and email, the Back Office user is created and visible on the [*Users* page](https://documentation.spryker.com/docs/user-reference-information) in the Back Office.
* The user is assigned to the default [group](https://documentation.spryker.com/docs/managing-groups). 

With Strategy 1, the login process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/5b0f6ab5-d4d5-4b53-b82a-d73bec9c81ea.png?utm_medium=live&utm_source=custom){height="" width=""}

**Strategy 2: Do not log in the user unless they exist in the Spryker database.**

Before a user can log in to Back Office with a third-party service credentials, the user should be added and set to Active in the database. You can add the user either via the Back Office or via the ACL module.

With Strategy 2, the login process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/5b0f6ab5-d4d5-4b53-b82a-d73bec9c81ea.png?utm_medium=live&utm_source=custom){height="" width=""}

## Current constraints

Currently, the feature has the following functional constraint:

Each of the Identity Managers is an ECO module that should be developed separately. After the module development, the Identity Manager’s roles and permissions should be mapped to the roles and permissions in Spryker. The mapping is always implemented at the project level.

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li>Enable Back Office Login in your project:
                    <ul>          
                <li><a href="https://documentation.spryker.com/2021080/docs/spryker-core-back-office-feature-integration" class="mr-link">Integrate the Spryker Core Back Office feature</a></li>
                <li><a href="https://documentation.spryker.com/2021080/docs/microsoft-azure-active-directory" class="mr-link">Integrate Microsoft Azure Active Directory</a></li>                
            </ul>
        </div>
         <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/2021080/docs/logging-in-to-the-back-office" class="mr-link">Log in to the Back Office</a></li>
               </ul>
        </div>
        </div>
</div>

