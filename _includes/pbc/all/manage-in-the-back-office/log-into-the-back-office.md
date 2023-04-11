You can log into the Back Office using one of the following accounts:

* Back Office account.
* Account of a third-party service that is configured as a single sign-on in your project.

{% info_block warningBox %}

Only [active](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/activating-and-deactivating-users.html) Back Office accounts can log into the Back Office.

{% endinfo_block %}

## Log in with a Back Office account

On the Back Office login page, enter the **EMAIL** and **PASSWORD** of your account and click **Login**.

If you don't have a login URL, your Back Office administrator or a developer can provide you with it.

If you don't have a Back Office account, ask an existing Back Office user or a developer to [create](/docs/pbc/all/user-management/{{page.version}}/manage-in-the-back-office/manage-users/create-users.html#create-a-user) you one.


## Restore a Back Office password

1. On the Login page, click **Forgot password?**.
2. Enter the **EMAIL** that was used for your Back Office account registration and click **Recover password**.
    You should receive an email with the link to restore your password.
3. In the email, click the change password link.
    This opens the **Reset password** page in the Back Office.
4. In the **Password** and **Repeat password** fields, enter your new password.
5. Click **Reset**.

Your password is now updated. To log in, enter the new password in the login form.

## Log in with a third-party account

If single sign-on is configured in your project, you can log in with a third-party account as follows:

1. In the login form, click **Login with {Third-party service name}**.
    This opens the third-party sign-in page.
2. Sign into the third-party system by entering your username and password.

This logs you in and opens the Back Office home page.

**Tips and tricks**


<br> After you log in with a third-party account, a Back Office account with the same email address is created in the system. To use that account to log into the Back Office, [reset the account's password](#restore-a-back-office-password). After you reset the password, you can [log into the Back Office as a regular user](#log-in-with-a-back-office-account).
