---
title: Identity Access Management
description:
last_updated: Oct 2, 2022
template: concept-topic-template
---

The Identity Access Management capability enables all types of users in a Spryker shop to create and manage accounts. Different levels of security let users manage the access of other users.

## Back Office authentication


To use the Spryker Back Office, users have to authenticate to the Back Office. They can authenticate by the following:

* Regular Back Office user account.
* Third-party sign-on (optional).

To *authenticate as a regular Back Office user*, you must have a Back Office user account. To learn how to create and manage Back Office user accounts, see [Managing users](/docs/pbc/all/user-management/{{page.version}}/manage-in-the-back-office/manage-users/create-users.html).

You can also let your users sign in from a third-party service set up for your project. The third-party sign-on uses the [OpenID](https://en.wikipedia.org/wiki/OpenID) protocol for authentication.

{% info_block infoBox %}

The feature is shipped with an exemplary ECO module that supports authentication using Microsoft Azure Active Directory. With the existing infrastructure, you can develop your own ECO modules for the identity managers you need.

{% endinfo_block %}

If a user chooses to log in using a third party, the user is redirected to the OAuth provider's sign-in page—for example, Microsoft Azure. If the user logs in to the third-party service successfully, the check is made if the user exists in the Spryker database. If the user exists in the database and is active, the user is logged in. If the user does not exist in the database, you can have one of the two different behaviors or strategies for your project:

<a name="strategies"></a>

**Strategy 1: Upon the first login, create the Back Office admin user based on the third-party system’s user data.**

If a user who does not exist in the Spryker database logs in for the first time, the following happens:
* Based on the third-party system’s user data such as first name, last name, and email, the Back Office user is created and visible on the [Users page](/docs/pbc/all/user-management/{{page.version}}/manage-in-the-back-office/manage-users/create-users.html) in the Back Office.
* The user is assigned to the default [group](/docs/pbc/all/user-management/{{page.version}}/manage-in-the-back-office/manage-user-groups/create-user-groups.html).

With Strategy 1, the login process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/5b0f6ab5-d4d5-4b53-b82a-d73bec9c81ea.png?utm_medium=live&utm_source=custom)

**Strategy 2: Do not log in to the user unless they exist in the Spryker database.**

Before a user can log in to Back Office with third-party service credentials, the user must be added and set to `Active` in the database. You can add the user using either the Back Office or the ACL module.

With Strategy 2, the login process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/5b0f6ab5-d4d5-4b53-b82a-d73bec9c81ea.png?utm_medium=live&utm_source=custom)

## Current constraints

The feature has the following functional constraint:

Each of the identity managers is an ECO module that must be developed separately. After the module development, the identity manager’s roles and permissions must be mapped to the roles and permissions in Spryker. The mapping is always implemented at the project level.

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Log in to the Back Office](/docs/pbc/all/identity-access-management/{{page.version}}/log-into-the-back-office.html) |



## Related Developer documents

|INSTALLATION GUIDES  | GLUE API GUIDES |
| - | - |
| [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-spryker-core-back-office-feature.html)  | [Authentication and authorization](/docs/pbc/all/identity-access-management/{{page.version}}/glue-api-authentication-and-authorization.html) |
| [Install Microsoft Azure Active Directory](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-microsoft-azure-active-directory.html)   | [Security and authentication](/docs/pbc/all/identity-access-management/{{page.version}}/glue-api-security-and-authentication.html) |
| [Install the Customer Access Glue API](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-customer-access-glue-api.html) |  [Create customers](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-create-customers.html) |
| | [Confirm customer registration](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-confirm-customer-registration.html) |
| | [Manage customer passwords](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-passwords.html) |
| | [Authenticate as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html) |
| | [Manage customer authentication tokens via OAuth 2.0](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html) |
| | [Manage customer authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html) |
| | [Authenticating as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) |
| | [Manage company user authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html) |
| | [Authenticate as an agent assist](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html) |
| | [Managing agent assist authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-agent-assist-authentication-tokens.html) |
| | [Delete expired refresh tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-delete-expired-refresh-tokens.html) |
