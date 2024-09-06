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
  - /docs/scos/user/features/202200.0/company-account-feature-overview/company-accounts-overview.html
  - /docs/scos/user/features/202311.0/company-account-feature-overview/company-accounts-overview.html
  - /docs/scos/user/features/202204.0/company-account-feature-overview/company-accounts-overview.html
---

*Company accounts* let you build an organizational structure for your B2B business.

## Company

The top level of every B2B business model hierarchy is a *company*. The company represents a legal organization related to stores and has specific metadata, like a tax number. A company can have a name, activity state, and status attributes.

{% info_block warningBox "Company statuses" %}

On initial registration of a company, in the Back Office, it appears with the *Pending* status. After the company has been checked, it gets the *Approved* status.


![companies_overview.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/companies_overview.png)

{% endinfo_block %}

## Business unit

A company consists of several *business units*, which you can consider physical divisions of the company. Business units can have a hierarchical structure too. They can have their own departments and teams. Business units also have metadata, like a tax number.

![company-account-overview.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/company-account-overview.png)

## Company address

The level below the business unit is the *company address*. The company address is a physical representation of a company.

One company address can be assigned to several business units. For example, if IT and Sales departments are located in the same office, they can share one company address.

However, a department may be distributed between several locations and have several addresses. For example, if it is a building company, and each unit is a construction site, for each order made for this department, one selects which address of the department the order is to be delivered to. Also, default billing and shipping addresses can't be assigned to business units.

## Company user

The process of a new company registration begins with the registration of a customer. A customer that is an employee of a company is referred to as a *company user*. A company user always belongs to at least one business unit.

The company user contains all the information about the customer and has a one-to-one relationship with the customer. Actually, when a new company user is created, a respective customer is created too. Therefore, the customer and company user always go together. The only difference between them is that the company user can contain meta information related to its company.


## Company account on the Storefront
Company users can perform the following actions on the Storefront:

<details>
<summary>Create a company</summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-accounts-overview.md/create-a-company.mp4" type="video/mp4">
  </video>
</figure>


</details>


<details>
<summary>Create a business unit</summary>


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-accounts-overview.md/create-a-business-unit.mp4" type="video/mp4">
  </video>
</figure>

</details>

<details>
<summary>Edit a business unit</summary>


<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-accounts-overview.md/edit-a-business-unit.mp4" type="video/mp4">
  </video>
</figure>


</details>

<details>
<summary>Delete a business unit</summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-accounts-overview.md/delete-a-business-unit.mp4" type="video/mp4">
  </video>
</figure>

</details>


<details>
<summary>Create a user</summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-accounts-overview.md/create-a-user.mp4" type="video/mp4">
  </video>
</figure>


</details>

<details>
<summary>Edit, enable, and disable a user</summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-accounts-overview.md/enable-disable-edit-a-user.mp4" type="video/mp4">
  </video>
</figure>

</details>

<details>
<summary>Delete a user</summary>

<figure class="video_container">
    <video width="100%" height="auto" controls>
    <source src="https://spryker.s3.eu-central-1.amazonaws.com/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-accounts-overview.md/delete-a-user.mp4" type="video/mp4">
  </video>
</figure>

</details>

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Manage companies](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-companies.html) |


## See next
[Business Units overview](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/business-units-overview.html)
