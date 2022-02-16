---
title: Business on behalf overview
description: Business on behalf allows having multiple company users per customer account with a possibility to select one company user to be a default user.
last_updated: Jun 2, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/business-on-behalf
originalArticleId: e9c3f423-90eb-40c1-985e-5dc817746523
redirect_from:
  - /v6/docs/business-on-behalf
  - /v6/docs/en/business-on-behalf
---

Every [business unit](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/business-units-overview.html) includes some company users that have specific permissions within this business unit. The *Business on Behalf* feature allows having multiple company users per customer account with a possibility to select one company user to be a default user. This default user can switch between the assigned business units.

For example, as a shop owner, you might have a financial manager in your company, who, for audit purposes, should be able to access company business units' accounts to check their order histories, shopping lists, etc.

You can assign a user to multiple business units in the Back Office. After that, a single user will be able to log in to several company accounts and manage all of them via a browser window.

{% info_block warningBox %}

Only customers having more than one Company user can make use of the feature.

{% endinfo_block %}
When you have access to multiple business units, you can:

* Capture company information.
* Create orders on behalf of a business unit your account has been associated with.
* Manage business unit workflow, etc.

The following table describes some workflows where assigning a company user to multiple business units is helpful:

| Workflow | Description | Example |
| --- | --- | --- |
| Implementation of specific processes within a company. | In a B2B company, most often, you have multiple business units, and you might have company user who is entitled and responsible for making orders for (all) the business units. | Let's say you have a company that owns several restaurants. Each restaurant is represented as a business unit within your company. There is a manager who is responsible for certain product purchases for every restaurant within your company. Such a user needs access to all the business units to be able to make orders on behalf of every restaurant. Or you might have a person responsible for approving orders within all or specific business units. In this case, you would like to have an approver, who would go through the business units and approve their orders.|
|Managing business units. | As a B2B company owner, you need to maintain all business units within your company. | You may set up business units for multiple office locations and assign an HR user to all of the business units so that they can handle the administrative functions within all the departments, like:<ul><li>Create company accounts for new users</li><li>Assign roles</li><li>Add permissions</li><li>Delete users</li></ul> |

Database relations without the Business on Behalf feature are as follows:

![scheme1.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/scheme1.png)

That is, the customer data used is connected to the company user in a one-to-one relationship.

The aim of the Business on Behalf feature is having one-to-many relationships:

![scheme2.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/scheme2.png)

## Business on Behalf on the Storefront

Company users can assign and unassign a company business unit to their accounts on the storefront:
![business-on-behalf-select-company-business-unit.gif](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/business-on-behalf-select-company-business-unit.gif)