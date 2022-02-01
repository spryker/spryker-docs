---
title: Company Account feature overview
description: The Company Account page gives a clear overview of business’ structure, hierarchy, shipping, billing addresses, and other users in the Business Unit.
last_updated: Jul 30, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/company-account
originalArticleId: 8009f001-a9dd-426b-916a-b3b8a5e4acc7
video: true
redirect_from:
  - /2021080/docs/company-account
  - /2021080/docs/en/company-account
  - /docs/company-account
  - /docs/en/company-account
---

A B2B business model implies bilateral commercial relations between businesses, so a company is the top figure of every B2B marketplace. Each company has a specific organizational structure with its divisions (units) and employee roles. At some point or another, a B2B business owner would need separate accounts for employees to constrain or extend rights in regards to products, orders, confidential information, etc.

The *Company Account* feature allows you to control user access to the system within an organization by configuring different permissions and roles for the company's entities (units) and users. You can set up your own company structure of business units and users with various levels of permissions and roles.

One of the most important building blocks of the company account is business units, or sub-divisions of the company formed for different locations, entities or departments of your company. Each business unit can have their own billing and shipping addresses, hierarchy level, and users. Business units enable to narrow down responsibilities, establish permissions within them, and gain better control of all processes.

The feature enables you to create your own permission rules and assign them to company users. Implement any kind of business logic, from simple checks, like single permissions, to complex ones, like purchasing limit, customer allocation and business unit check.

Organizations with multiple business units that support their own set of accounts, customers, and vendors often need some of their company users to be able to access (and eventually manage) not one business unit but several business units within the whole company. Business on behalf enables you to set up multiple company users for one customer account. You can assign a company user to multiple business units with different roles and permissions to match your organization's policies and procedures.

The feature allows customer login by token. By dynamically generating a token, a user is able to log in with a pre-defined company user to a new e-commerce provider. All this happens without sharing the login information or having to fill out a sign-up form.

Check out the following video about managing company accounts:

Setting up company structure:

{% wistia qkdgkeannb 960 720 %}


## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
|  [Get a general idea of Company Accounts](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-accounts-overview.html)  |
|  [Get a general idea of Business Units](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/business-units-overview.html)  |
|  [Get a general idea of Business on Behalf](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/business-on-behalf-overview.html)  |
|  [Get a general idea of company user roles and permissions](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-user-roles-and-permissions-overview.html)  |


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Company Account feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/company-account-feature-walkthrough/company-account-feature-walkthrough.html) for developers.

{% endinfo_block %}
