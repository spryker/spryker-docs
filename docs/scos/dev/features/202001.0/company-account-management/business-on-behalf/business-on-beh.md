---
title: Business On Behalf Feature Overview
originalLink: https://documentation.spryker.com/v4/docs/business-on-behalf-feature-overview-201903
redirect_from:
  - /v4/docs/business-on-behalf-feature-overview-201903
  - /v4/docs/en/business-on-behalf-feature-overview-201903
---

Every [business unit](/docs/scos/dev/features/202001.0/company-account-management/business-unit-management/business-unit-m) includes some company users that have specific permissions within this business unit. Business on Behalf feature allows having multiple company users per customer account with a possibility to select one company user to be a default user. This default user can switch between the assigned business units.

You can assign a user to multiple business units in the Back Office. After that, a single user will be able to log in to several company accounts and manage all of them via a browser window.

{% info_block warningBox %}
Only customers having more than one Company user can make use of the feature.
{% endinfo_block %}
When you have access to multiple business units, you can:

* capture company information
* create orders on behalf of a business unit your account has been associated with
* manage business unit workflow, etc.

The following table describes some workflows where assigning a company user to multiple business units is helpful:

| Workflow | Description | Example |
| --- | --- | --- |
| Implementation of specific processes within a company. | In a B2B company, most often, you have multiple business units, and you might have company user who is entitled and responsible for making orders for (all) the business units. | Let's say you have a company that owns several restaurants. Each restaurant is represented as a business unit within your company. There is a manager who is responsible for certain product purchases for every restaurant within your company. Such user needs access to all the business units to be able to make orders on behalf of every restaurant. Or you might have a person responsible for approving orders within all or specific business units. In this case, you would like to have an approver, who would go through the business units and approve their orders.|
|Managing business units. | As a B2B company owner, you need to maintain all business units within your company. | You may set up business units for multiple office locations, and assign HR user to all of the business units so that they can handle the administrative functions within all the departments, like:<ul><li>create company accounts for new users</li><li>assign roles</li><li>add permissions</li><li>delete users.</li></ul> |

Database relations before any changes were applied used to be schematically represented as follows:

![scheme1.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/scheme1.png){height="" width=""}

The Customer data used to be connected to the Company User in a one-to-one relationship.

The aim of the Business on Behalf feature is having one-to-many relationships:


![scheme2.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/scheme2.png){height="" width=""}

Schematically, the relations between modules in the Business on Behalf feature are represented as follows:

![business-on-behalf-module-relations.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Business+on+Behalf/Business+on+Behalf+Feature+Overview/business-on-behalf-module-relations.png){height="" width=""}

`BusinessOnBehalfGui` module provides plugin `BusinessOnBehalfGuiAttachToCompanyButtonCustomerTableActionExpanderPlugin` for Customer module, and `CompanyUserTableAttachToBusinessUnitActionLinksExpanderPlugin` as well as `ReplaceDeleteButtonCompanyUserTableActionLinksExpanderPlugin` plugins for `CompanyUserG` module. Also, `BusinessOnBehalfGui` takes user information from `CompanyUser` module.

 <!--
_Last review date: Mar 14, 2019_ <!-- by Oksana Karasyova -->


