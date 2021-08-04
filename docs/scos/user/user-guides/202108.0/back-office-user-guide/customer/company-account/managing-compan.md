---
title: Managing companies
originalLink: https://documentation.spryker.com/2021080/docs/managing-companies
redirect_from:
  - /2021080/docs/managing-companies
  - /2021080/docs/en/managing-companies
---

This topic describes how to manage company records.

## Prerequisites

To start managing a company record, go to **Customers** > **Companies**.

Review the reference information before you start, or just look up the necessary information as you go through the process.

## Creating a company

To create a new company record, do the following:
1. On the *Overview of Companies* page, click **Create Company** in the top right corner.
2. On the *Create Company* page, in the *Name* field, enter the name of the company you would like to create.
3. Click **Save**. 
    The new created company appears in the _List of the Companies_ table on the *Companies* page.
{% info_block errorBox "Important" %}
Once the company is created, one business unit for it is created by default. This is considered to be a headquarter and can be managed in the same ways as the other business units. See [Managing company units](https://documentation.spryker.com/docs/managing-company-units
{% endinfo_block %} for more details.)

The companies can be managed by triggering certain actions in the _Actions_ column in the _List of Companies_ table on the *Companies* page. 
Specifically, company roles can be **Edited**, **Activated**, **Deactivated**, **Approved**, and **Denied**.

## Managing a company

Right after the company has been created whether in the shop application or in the Back Office, it appears with the *Pending* status in the *List of Companies* table. To become active and available for usage, it needs to be approved and then activated.
![Managing a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/managing-company.png)

### Approving and activating a company

To approve a company and activate a company:
1. Click **Approve** in the _Actions_ column. 
    As a result, the status of the company is changed to *Approved*.
2. Click **Activate** in the _Actions_ column. As a result, the activity state of the company will change from **Inactive** to **Active**.

![Approving a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/activating-company.png)

### Denying a company

In case you cannot approve the registration, you can deny it.
To disapprove a company, click **Deny**.
![Denying a company](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Companies/denying-company.png)

:::(Info)
You can approve and activate the record in a later event. The record itself will continue existing in the system.
:::

### Deactivating a company

To deactivate a company, click **Deactivate**.

### Editing a company

To change the name of a company: 
1. Click **Edit** in the _Actions_ column.
2. On the *Edit Company* page, in the *Name* file, edit the name of the company.
The updated company name is displayed in the _List of the Companies_ table of the *Companies* page.

**What's next?**
The company record is added and now you can proceed with creating a company unit. See [Managing company units](https://documentation.spryker.com/docs/managing-company-units) for more details.

### Reference information: Creating and managing companies

The following table describes the information that you see on the *Overview of Companies* page when creating and managing a company.

|PAGE NAME | INFORMATION |
| --- | --- |
| Overview of Companies | On this page, you can see the company ID and name, either Active, or Inactive label, the company status (either *Approved* or *Declined*), and the actions you can perform (**Edit**, **Activate**/**Deactivate**, **Approve**/**Deny**). |


