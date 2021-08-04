---
title: Company Accounts overview
originalLink: https://documentation.spryker.com/2021080/docs/company-accounts-overview
redirect_from:
  - /2021080/docs/company-accounts-overview
  - /2021080/docs/en/company-accounts-overview
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

<details open>
<summary>Create a company</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/create-a-company.gif)

</details>


<details open>
<summary>Create a business unit</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/create-a-business-unit.gif)

</details>

<details open>
<summary>Edit a business unit</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/edit-a-business-unit.gif)
</details>

<details open>
<summary>Delete a business unit</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/delete-a-business-unit.gif)

</details>


<details open>
<summary>Create a user</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/create-a-user.gif)
</details>

<details open>
<summary>Edit, enable, and disable a user</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/enable-disable-edit-a-user.gif)

</details>

<details open>
<summary>Delete a user</summary>

![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Company+Account+Management/Company+Account/Company+Account+Feature+Overview/delete-a-user.gif)
</details>


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                 <li><a href="https://documentation.spryker.com/docs/retrieving-companies" class="mr-link">Retrieve company information via Glue API</a></li>
                 <li><a href="https://documentation.spryker.com/docs/glue-api-company-account-api-feature-integration" class="mr-link">Integrate the Company Account Glue API</a></li>
                <li>Enable Company Accounts:</li>
                <li><a href="https://documentation.spryker.com/docs/company-account-feature-integration" class="mr-link">Integrate the Company Account feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/mg-companyuser#upgrading-from-version-1-0-0-to-version-2-0-0" class="mr-link">Migrate the CompanyUser module from version 1.* to version 2.*</a></li>    
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/managing-companies" class="mr-link">Manage companies</a></li>
            </ul>
        </div>
    </div>
</div>

## See next 
[Business Units overview](https://documentation.spryker.com/docs/business-units-overview)
