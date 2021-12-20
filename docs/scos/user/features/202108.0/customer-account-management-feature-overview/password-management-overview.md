---
title: Password Management overview
description: Spryker offers multiple ways of managing customer account passwords.
last_updated: Jul 15, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/password-management-overview
originalArticleId: 5319cfcb-db06-4238-9f68-c473289b1297
redirect_from:
  - /2021080/docs/password-management-overview
  - /2021080/docs/en/password-management-overview
  - /docs/password-management-overview
  - /docs/en/password-management-overview
---

*Password Management* enables Spryker admins to manage customer account passwords. It also allows B2B and B2C Shoppers to manage their own account passwords.

When you create a customer account in the Back Office, you do not enter the password. Instead, you can select to send a password reset email to the customer account’s email address. This way, the customer knows that the account has been created and they need to reset the password to access it. See [Creating a Customer](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customers.html#creating-customers) to learn how Spryker admin sends password reset emails when creating customer accounts.

You can create customer accounts by [importing](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html#console-commands-to-run-import) a [customer.csv file](/docs/scos/dev/data-import/{{page.version}}/data-import-categories/commerce-setup/file-details-customer.csv.html). In this case, you can specify the passwords of the customer accounts to import, but it’s not mandatory. If you do not specify the passwords, you can send password reset emails to the customers without passwords by running `console customer:password:set`. Also, you can send password reset emails to all customers by running console `customer:password:reset`. See [Importing Data with a Configuration File](/docs/scos/dev/data-import/{{page.version}}/importing-data-with-a-configuration-file.html) to learn how a developer can import customer data.

With the help of [Glue API](/docs/scos/dev/glue-api-guides/{{page.version}}/glue-rest-api.html), you can change and reset customer account passwords. This can be useful when you want to use a single authentication in all the apps connected to your shop. See [Changing Customer’s Password](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-passwords.html#change-a-customers-password) and [Resetting Customer’s Password](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-passwords.html#reset-a-customers-password) to learn how a developer can do it.

On the Storefront, it is mandatory to enter a password when creating a customer account. After the account is created, you can update the password in the customer account or request a password reset via email.

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Get a general idea of Customer Account](/docs/scos/user/features/{{page.version}}/customer-account-management-feature-overview/customer-accounts-overview.html)  |
| [Get a general idea of Customer Registration](/docs/scos/user/features/{{page.version}}/customer-account-management-feature-overview/customer-registration-overview.html)   |
| [Get a general idea of Customer Login](/docs/scos/user/features/{{page.version}}/customer-account-management-feature-overview/customer-login-overview.html)  |
| [Get a general idea of Customer Groups](/docs/scos/user/features/{{page.version}}/customer-account-management-feature-overview/customer-groups-overview.html)   |
| [Get a general idea of Password Management](/docs/scos/user/features/{{page.version}}/customer-account-management-feature-overview/password-management-overview.html)  |

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Customer Account Management feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/customer-account-management-feature-walkthrough/customer-account-management-feature-walkthrough.html) for developers.

{% endinfo_block %}
