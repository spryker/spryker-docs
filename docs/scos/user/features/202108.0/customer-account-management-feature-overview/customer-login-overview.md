---
title: Customer Login overview
last_updated: Jul 15, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/customer-login-overview
originalArticleId: 7641234a-88aa-4031-85e1-c67aa38eb030
redirect_from:
  - /2021080/docs/customer-login-overview
  - /2021080/docs/en/customer-login-overview
  - /docs/customer-login-overview
  - /docs/en/customer-login-overview
---

The *Cusotmer Login* feature with an enhanced secure password policy enables you to prevent brute-force login attacks by configuring your project in the following ways:

* Block a Storefront user account for some time after a certain number of login attempts.

* Enforce the use of strong passwords by defining requirements for a password like length, allowed and forbidden characters.

You can define separate settings for a Storefront user and agent.

## Demo Shop default configuration

The feature’s default configuration in the Spryker Demo Shop is as follows. When a user tries to log in, and the number of unsuccessful login attempts reaches the preset limit (11 attempts for a Storefront user and 10 for an [agent](/docs/scos/user/features/{{page.version}}/agent-assist-feature-overview.html)), the user account is locked out for some time (5 minutes for a Storefront user and 6 for an agent). After the last unsuccessful attempt, the user is notified that the ban is applied, and the user cannot log in until the ban expires.

To minimize login issues for real customers, the ban is applied by the IP address, which means you can log in to the same user account from one IP address while being locked out from another IP address. All information about blocked accounts is stored in Redis.

When registering an account or changing an old password in the Demo Shop, the password must contain a combination of alphabetic, numeric, and special characters. The alphabetic characters must also be of mixed case (e.g., one lower case and one upper case), and the password length must be from 8 to 64 characters.

{% info_block warningBox "Developer guides" %}

Are you a developer? See [Customer Account Management feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/customer-account-management-feature-walkthrough/customer-account-management-feature-walkthrough.html) for developers.

{% endinfo_block %}
