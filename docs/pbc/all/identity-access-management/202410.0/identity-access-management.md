---
title: Identity Access Management
description: Learn all about the Spryker Identity Access Management capability and how to create and manage accounts within your Spryker project.
last_updated: Oct 2, 2022
template: concept-topic-template
redirect_from:
  - /docs/scos/user/back-office-user-guides/201811.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/201903.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/201907.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/202005.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/202204.0/logging-in-to-the-back-office.html
  - /docs/pbc/all/identity-access-management/202204.0/identity-access-management.html
---

The Identity Access Management capability enables all types of users in a Spryker shop to create and manage accounts. Different levels of security let users manage the access of other users.

## Back Office authentication

Back Office supports login via two types of accounts:

- Back Office account.
- Account of a third-party service that is configured as a single sign-on.

### Login with a Back Office account

Only an existing Back Office user with sufficient permissions or a developer can create Back Office accounts. That is, if you want to onboard a new Back Office user, you need to create an account for them. For instructions on creating accounts in the Back Office, see [Create users](/docs/pbc/all/user-management/202410.0/base-shop/manage-in-the-back-office/manage-users/create-users.html).


To log in, on the Back Office login page, a user enters the email address and password of their account. If the credentials are correct and their account is active at that time, they are logged in.

If a user does not remember their password, they can reset it using the form available on the login page.

### Login with a single sign-on

Your project can have a single sign-on(SSO) login configured for the Back Office. SSO lets users log into the Back Office with accounts of a third-party service.

The feature is shipped with an exemplary ECO module that supports SSO authentication via Microsoft Azure Active Directory. With the existing infrastructure, you can develop your own ECO modules for the identity managers you need. SSO uses the [OpenID](https://en.wikipedia.org/wiki/OpenID) protocol for authentication.

To log in with an SSO, on the Back Office login page, users click **Login with {Third-party service name}**. This opens the sign-in page of the configured service. Users sign in with their accounts and get redirected to the Back Office.

If a user chooses to log in using a third party, they are redirected to the OAuth provider's sign-in page—for example, Microsoft Azure. If the user successfully signs into the third-party service, the check is made if the user exists in the Spryker database. If the user exists in the database and is active, the user is logged in.

The following sections describe different ways of handling users that have access to your SSO service, but don't have a Back Office account.

### SSO authentication strategies

Depending on your access and security requirements, you can have one of the following strategies implemented for SSO authentication.


#### Registration is required only with the SSO service

If a user logs in with an SSO but does not have a Back Office account, the following happens:
- Based on the third-party system's user data, such as first name, last name, and email, a Back Office account is created.
- The user is assigned to the default user group.
- The user is logged into the Back Office.

The login process looks like this:

![image](https://confluence-connect.gliffy.net/embed/image/5b0f6ab5-d4d5-4b53-b82a-d73bec9c81ea.png?utm_medium=live&utm_source=custom)

#### Registration is required with the SSO service and with Spryker

If a user logs in with an SSO but does not have a Back Office account, the user is not logged in. To be able to log in, a user must have a Back Office account registered using the email address used for their account with the SSO service. Usually, this strategy is used when not all the users that have access to the SSO service need access to the Back Office.


![image](https://confluence-connect.gliffy.net/embed/image/5b0f6ab5-d4d5-4b53-b82a-d73bec9c81ea.png?utm_medium=live&utm_source=custom)

## Glue API authentication

For details about Glue API authentication, see [Glue API authentication and authorization](/docs/dg/dev/glue-api/202410.0/authentication-and-authorization.html)

## Current constraints

The feature has the following functional constraint:

Each of the identity managers is an ECO module that must be developed separately. After the module development, the identity manager's roles and permissions must be mapped to the roles and permissions in Spryker. The mapping is always implemented at the project level.



## Related Developer documents

|INSTALLATION GUIDES  | GLUE API GUIDES |
| - | - |
| [Install the Spryker Core Back Office feature](/docs/pbc/all/identity-access-management/202410.0/install-and-upgrade/install-the-spryker-core-back-office-feature.html)  | [Authentication and authorization](/docs/dg/dev/glue-api/202410.0/authentication-and-authorization.html) |
| [Install Microsoft Azure Active Directory](/docs/pbc/all/identity-access-management/202410.0/install-and-upgrade/install-microsoft-azure-active-directory.html)   | [Security and authentication](/docs/dg/dev/glue-api/202410.0/security-and-authentication.html) |
| [Install the Customer Access Glue API](/docs/pbc/all/identity-access-management/202410.0/install-and-upgrade/install-the-customer-access-glue-api.html) |  [Create customers](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-create-customers.html) |
| | [Confirm customer registration](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-confirm-customer-registration.html) |
| | [Manage customer passwords](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-manage-customer-passwords.html) |
| | [Authenticate as a customer](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-customer.html) |
| | [Manage customer authentication tokens via OAuth 2.0](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html) |
| | [Manage customer authentication tokens](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html) |
| | [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html) |
| | [Authenticating as a company user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html) |
| | [Manage company user authentication tokens](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html) |
| | [Authenticate as an agent assist](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html) |
| | [Managing agent assist authentication tokens](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-manage-agent-assist-authentication-tokens.html) |
| | [Delete expired refresh tokens](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-delete-expired-refresh-tokens.html) |
