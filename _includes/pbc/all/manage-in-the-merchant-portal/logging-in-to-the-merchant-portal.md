This document describes how to log into the Merchant portal.


## Prerequisites

1. [Create a merchant user](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-users.html#creating-a-merchant-user)
2. [Activate the merchant user](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-users.html#activating-and-deactivating-the-merchant-users).

Each section in this guide contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

{% info_block warningBox %}

A [marketplace administrator](/docs/scos/user/intro-to-spryker/spryker-marketplace/marketplace-personas.html#marketplace-administrator) cannot log in to Merchant Portal.

{% endinfo_block %}

## Creating a password

Once the merchant user is [activated](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchant-users.html#activating-and-deactivating-the-merchant-users), an email with the password reset link is sent. To reset the password:

1. Click the link provided in the email. The **Reset Password** page opens.

   ![Reset password page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Login+and+logout/set-password-for-merchant-portal.png)

2. In the **Password** field, enter the new password.

3. In **Repeat Password**, enter the new password again to confirm it.

4. Click **Reset** to update the password.

The password is reset and you can use it for login.

## Logging in

To log in to the Merchant Portal, on the login page, enter your email and password and click **Login**.

![Merchant Portal login](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Login+and+logout/merchant-portal-login.png)


### Reference information: Logging in to the Merchant Portal

This section describes the attributes you enter when logging into the Merchant Portal.

| ATTRIBUTE | DESCRIPTION  |
| --------- | --------------- |
| Email     | Email address associated with the merchant user. The Password Reset link is sent to this email. |
| Password  | Password for the merchant user account.                      |

## Restoring the password

If you forgot your Merchant Portal password:
1. In the login form, click **Forgot password?**.
  The **Reset Password** page opens.
2. Enter the email that was used for your Merchant Portal account registration and click **Send email**.
You should receive an email with the link to restore your password.
3. In the email, click the restore password link.
The **Reset Password** page opens.
4. In the **Password** and **Repeat password** fields, enter your new password.
5. Click **Reset**.

Your password is now updated. To log in, enter the new password in the login form.


<!---
## Logging out of the Merchant Portal

To log out, in the top right corner of the Merchant Portal, click the user icon and then click **Logout**.

![Logout of Merchant Portal](https://spryker.s3.eu-central-1.amazonaws.com/docs/Marketplace/user+guides/Merchant+Portal+user+guides/Login+and+logout/log-out-of-the-merchant-portal.gif)
-->

**What’s Next?**

To have a quick overview of Merchant performance, see [Managing merchant's performance data](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-merchant-portal/manage-merchants-performance-data.html).

To learn how to manage a Merchant Profile in the Merchant Portal, see [Editing merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants.html#editing-merchants).
