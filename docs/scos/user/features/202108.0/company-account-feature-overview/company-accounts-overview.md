---
title: Company Accounts overview
description: In the context of permissions management, the top level of a B2B business model hierarchy is a Company. Each company has its organizational structure.
last_updated: Jul 19, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/company-accounts-overview
originalArticleId: 843043bb-7eeb-4023-8296-1c564b95f682
redirect_from:
  - /2021080/docs/company-accounts-overview
  - /2021080/docs/en/company-accounts-overview
  - /docs/company-accounts-overview
  - /docs/en/company-accounts-overview
---



Company accoounts allow to build an organizational structure of your B2B business.

## Company

The top level of every B2B business model hierarchy is a *company*. The company represents a legal organization, which is related to stores and has specific metadata, like a tax-number. A company can have a name, activity state, and status attributes.

{% info_block warningBox "Company statuses" %}

On initial registration of a company, in the Back Office, it appears with the *Pending* status. After the company has been checked, it gets the *Approved* status.


![companies_overview.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/companies_overview.png)

{% endinfo_block %}

## Business unit

A company consists of several *business units* which you can consider as physical divisions of the company. The business units, can have a hierarchical structure too. They can have their own departments, teams, etc. Business units also have metadata, like a tax-number.

![company-account-overview.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/company-account-overview.png)

## Company address

The level below the business unit is *company address*. The company address is a physical representation of a company.

One company address can be assigned to several business units. For example, if IT and Sales departments are located in the same office, they can share one company address.

However, a department may distributed between several locations and have several addresses. For example, if the company is a building firm and each unit is a construction site. In this case, for each order made for this department, one should select which address of the department the order should be delivered to. Also, it is possible to assign default billing and shipping addresses to business units.

## Company user

The process of a new company registration begins with the registration of a customer. A customer that is an employee of a company is referred to as a *company user*. A company user always belongs to at least one business unit.

The company user contains all the information about the customer and has a one-to-one relation to the customer. Actually, when a new company user is created, a respective customer is created too. Therefore, the customer and company user always go together. The only difference between them is that the company user can contain meta information related to its company.


## Company account on the Storefront
Company users can perform the following actions on the Storefront:

<details>
<summary markdown='span'>Create a company</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/create-a-company.gif)

</details>


<details>
<summary markdown='span'>Create a business unit</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/create-a-business-unit.gif)

</details>

<details>
<summary markdown='span'>Edit a business unit</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/edit-a-business-unit.gif)
</details>

<details>
<summary markdown='span'>Delete a business unit</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/delete-a-business-unit.gif)

</details>


<details>
<summary markdown='span'>Create a user</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/create-a-user.gif)
</details>

<details>
<summary markdown='span'>Edit, enable, and disable a user</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/enable-disable-edit-a-user.gif)

</details>

<details>
<summary markdown='span'>Delete a user</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/delete-a-user.gif)
</details>

## Related Business User articles

|BACK OFFICE USER GUIDES|
|---|
| [Manage companies](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-companies.html) |


{% info_block warningBox "Developer guides" %}

Are you a developer? See [Company Account feature walkthrough](/docs/scos/dev/feature-walkthroughs/{{page.version}}/company-account-feature-walkthrough/company-account-feature-walkthrough.html) for developers.

{% endinfo_block %}

## See next
[Business Units overview](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/business-units-overview.html)
