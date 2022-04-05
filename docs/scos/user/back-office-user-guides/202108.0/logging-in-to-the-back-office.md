---
title: Logging in to the Back Office
description: Learn how a Back Office user can log in to the Back Office either with a regular account or through a third-party service
last_updated: Jun 17, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/logging-in-to-the-back-office
originalArticleId: 1888fe14-c6fa-4879-967a-3b2944f5fbb1
redirect_from:
  - /2021080/docs/logging-in-to-the-back-office
  - /2021080/docs/en/logging-in-to-the-back-office
  - /docs/logging-in-to-the-back-office
  - /docs/en/logging-in-to-the-back-office
---

To be able to use the Back Office, you have to log in to it. You can log in via:

* Regular Back Office user account
* Third-party service

{% info_block warningBox %}

Only [active](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/activating-and-deactivating-users.html) users can log in to the Back Office.

{% endinfo_block %}

## Logging in with a regular Back Office user account
<a name="prerequisites"></a>
{% info_block warningBox "Prerequisites" %}

To log in with a Back Office user account, you should have the account preliminary created either [by the existing Back Office user](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/creating-users.html#creating-users) or [programmatically by a developer](/docs/scos/dev/feature-walkthroughs/{{page.version}}/spryker-core-back-office-feature-walkthrough/user-and-rights-overview.html).

{% endinfo_block %}


To log in, on the Back Office login page, enter your login details.

### Restoring your password
<a name="password-reset"></a>
If you forgot your password:

1. In the login form, click **Forgot password**.
2. Enter the email that was used for your Back Office account registration and click **Recover password**.
You should receive an email with the link to restore your password.
3. In the email, click the change password link.
This takes you to the *Reset password page* in the Back Office.
4. In the *Password* and *Repeat password* fields, enter your new password.
5. Click **Reset**.

Your password is now updated. To log in, enter the new password in the login form.

## Logging in with a third-party account

Depending on the configuration of your project, you may be able to log in to the Back Office via a third-party system.

To log in with a third-party system credentials:

1. In the login form, click **Login with {Third-party service name}**. This redirects your to the third-party sign-in page.
2. Log in to the third-party system by entering your username and password.

You are taken to the Back Office home page as a logged-in user. User with the email you used for the third-party service login appears on the [*Users*](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/creating-users.html) page.

{% info_block warningBox %}

Depending on the [third-party login strategy](/docs/scos/user/features/{{page.version}}/spryker-core-back-office-feature-overview/spryker-core-back-office-feature-overview.html#back-office-authentication) configured in your project, you might not be allowed to log in with a third-party account unless a user with an email that matches the existing third-party user email has not been [preliminary created](#prerequisites) and [activated](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/activating-and-deactivating-users.html).

{% endinfo_block %}

**Tips and tricks**
<br>Since the user with the email you used for login via the third party has been created in the project database, you can use this email for your next logins to the Back Office [as a regular user](#prerequisites). However, you need to [reset your password first](#password-reset), since to log you in to the Back Office via a third-party, a random password is generated and stored in the project database. You cannot use this password, and therefore need to create a new one by resetting the current password. Once you reset the password, you can log in to Back Office as a regular user without having to use the form for the third-party logins.
