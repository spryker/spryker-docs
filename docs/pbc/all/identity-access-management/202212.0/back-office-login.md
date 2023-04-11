---
title: Log into the Back Office
description: Learn how a Back Office user can log into the Back Office either with a regular account or through a third-party service
last_updated: Jun 17, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/logging-in-to-the-back-office
originalArticleId: 1888fe14-c6fa-4879-967a-3b2944f5fbb1
redirect_from:
  - /2021080/docs/logging-in-to-the-back-office
  - /2021080/docs/en/logging-in-to-the-back-office
  - /docs/logging-in-to-the-back-office
  - /docs/en/logging-in-to-the-back-office
  - /docs/scos/user/back-office-user-guides/201811.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/201903.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/201907.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/202005.0/logging-in-to-the-back-office.html
  - /docs/scos/user/back-office-user-guides/202204.0/logging-in-to-the-back-office.html
---

Back Office supports login via two types of accounts:

* Back Office account.
* Account of a third-party service that is configured as a single sign-on.

{% info_block warningBox %}

Only [active](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/activating-and-deactivating-users.html) users can log in to the Back Office.

{% endinfo_block %}

## Login with a Back Office account

Only an existing Back Office user with sufficient permissions or a developer can create Back Office accounts. That is, if you want to onboard a new Back Office user, you need to create an account for them. For instructions on creating accounts in the Back Office, see [Create users](/docs/pbc/all/user-management/{{page.version}}/manage-in-the-back-office/manage-users/create-users.html).


To log in, on the Back Office login page, a user enters the email address and password of their account. If the credentials are correct and their account is active at that time, they are logged in.

If a user does not remember their password, they can reset it using the form available on the login page.

## Login with a single sign-on

Your project can have an single sign-on(SSO) login configured for Back Office login. SSO lets users log into the Back Office with accounts of a third-party service.

To log in with an SSO, on the Back Office login page, users click **Login with {Third-party service name}**. This opens the sign-in page of the configured service. Users sign in with their accounts and get redirected to the Back Office.

User with the email you used for the third-party service login appears on the [*Users*](/docs/pbc/all/user-management/{{page.version}}/manage-in-the-back-office/manage-users/create-users.html) page.

{% info_block warningBox %}

Depending on the [third-party login strategy](/docs/pbc/all/identity-access-management/{{page.version}}/identity-access-management.html#back-office-authentication) configured in your project, you might not be allowed to log in with a third-party account unless a user with an email that matches the existing third-party user email has not been [preliminary created](#prerequisites) and [activated](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/activating-and-deactivating-users.html).

{% endinfo_block %}

**Tips and tricks**

<br>Since the user with the email you used for login via the third party has been created in the project database, you can use this email for your next logins to the Back Office [as a regular user](#prerequisites). However, you need to [reset your password first](#password-reset), since to log you in to the Back Office via a third-party, a random password is generated and stored in the project database. You cannot use this password, and therefore need to create a new one by resetting the current password. Once you reset the password, you can log in to Back Office as a regular user without having to use the form for the third-party logins.
