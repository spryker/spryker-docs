---
title: Managing company users
description: Use the procedures to create, edit, enable/disable, delete, and attach company users to business units in the Back Office.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-company-users
originalArticleId: ff15efb5-30c1-4b0e-b56d-596d90d40123
redirect_from:
  - /2021080/docs/managing-company-users
  - /2021080/docs/en/managing-company-users
  - /docs/managing-company-users
  - /docs/en/managing-company-users
related:
  - title: Managing Company Unit Addresses
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-unit-addresses.html
  - title: Managing Company Units
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-units.html
  - title: Managing Company Roles
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-roles.html
  - title: Managing Companies
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-companies.html
---

This topic describes how to manage company users.

## Prerequisites

To start working with company users, go to the **Customers** > **Company Users** section.

{% info_block warningBox "Note" %}

Make sure you have a [company role](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-roles.html), [company](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-companies.html), and [business unit](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-units.html) created.

{% endinfo_block %}

Review the reference information before you start, or look up the necessary information as you go through the process.

## Creating company users

To add a new company user:
1. On the *Overview of Company Users* page, in the top right corner, click **Add User**.
2. On the *Create Company User* page:
    1. Enter customer's email, salutation, first name, last name, and gender in the respective fields.
    2. If you want the email with change password details be sent to the customer, select the **Send password token through email** checkbox.
    3. Enter the date of birth and phone values.
    4. Select company and business units from the respective drop-down lists.
    5. Enter the phone number of the user (optional).
    6. Check the checkbox for the roles you want to assign to the user. The values available for selection are limited by those assigned to a company. See [Managing company roles](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-roles.html) to learn how the company roles are created.
3. Click **Save**.

## Editing a company user

To edit a company user:
1. On the *Overview of Company Users* page, in the _Actions_ column, click **Edit** for the user you want to update.
2. Update the needed values and click **Save**.

{% info_block infoBox "Info" %}

All values are available for modifications except for the email. The *Email* field is greyed out and is not available for modifications.

{% endinfo_block %}

### Reference information: Creating and editing and  a company user

The following table describes the attributes you see, select, or enter while creating or editing a company user.

| ATTRIBUTE |DESCRIPTION  |
| --- | --- |
| Email | Email of the customer that is used for logging in to the online store. It is not available for modifications on the *Edit* page. |
| Salutation | Formal salutation for the customer (_Mr_, _Mrs_, _Ms_, _Dr_). |
| First Name | Customer first name. |
| Last Name |  Customer last name.|
| Gender | Customer gender. |
| Date of birth | Customer date of birth. |
Company  | Drop-down list with the companies from **Customers** > **Companies**. This selection defines the list of available business unit. |
| Business Unit | Business unit to which the user is going to be assigned. The list of the available values depends on the selected company. |
| Assigned Roles | Roles assigned to the customer. |
Unassigned Roles | Roles that you can select to be assigned to the customer.|

## Attaching a company user to a business unit

To attach a company user to a new company business unit within the same company:
1. On the *Overview of Company Users* page, in the _Actions_ column, click **Attach to BU** for a user for which you want to change the assigned business unit.
2. On the *Attach to Business Unit* page:
    1. Select a business unit you would like the company user to be attached to from the drop-down list.
    2. Assign the role under the *Assigned Roles* section.
3. Click **Save**.

## Enabling and disabling a company user

If the company User is currently deactivated, in the *Actions* column, click the **Enable** option to activate the user.

To deactivate an enabled user, click **Disable**.
![Enabling a company user](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Company+Users/enabling-company-user.png)

## Deleting a company user

To delete a company user:
1. On the *Overview of Company Users* page, click **Delete** in the *Actions* column.
2. On the *Company user deletion confirmation* page, confirm the deletion.

{% info_block warningBox "Note" %}

If confirmed, the user is deleted from everywhere and is no longer able to log in to the online store.

{% endinfo_block %}
