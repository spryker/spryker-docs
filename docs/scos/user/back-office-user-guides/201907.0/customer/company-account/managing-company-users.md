---
title: Managing Company Users
description: Use the procedures to create, edit, enable/disable, delete, and attach company users to business units in the Back Office.
last_updated: Nov 22, 2019
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v3/docs/managing-company-users
originalArticleId: 2b668ca0-cfed-4663-99ab-df54e7f1c492
redirect_from:
  - /v3/docs/managing-company-users
  - /v3/docs/en/managing-company-users
related:
  - title: Company Account- Reference Information
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/references/company-account-reference-information.html
  - title: Managing Company Roles
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-roles.html
  - title: Managing Company Units
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-units.html
  - title: Managing Company Unit Addresses
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-company-unit-addresses.html
  - title: Managing Companies
    link: docs/scos/user/back-office-user-guides/page.version/customer/company-account/managing-companies.html
---

This topic describes the procedures for creating and managing company users. This is the final step in the company account setup.
***

The company user can be created only if the company role, company, and business unit exist.
***

To start managing company users, navigate to the **Company Account > Company Users** section.
*** 

## Creating a Company Users

To add a new company user:

1. On the **Overview of Company Users** page, click **Add User** in the top right corner.
2. On the **Create Company User** page:
  1. Enter customer's email, salutation, first name, last name, and gender in the respective fields.
  2. If you want the email with change password details be sent to the customer, select the **Send password token through email** checkbox.
  3. Enter the date of birth and phone values.
  4. Select company and business units from the respective drop-down lists.
  5. Check the checkbox for Roles you want to assign to the user. The values available for selection are limited by those assigned to a company. See [Managing Company Roles](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/company-account/managing-company-roles.html) to learn how the company roles are created.
3. Once done, click **Save**.
***

## Attaching a Company User to a Business Unit

This is a very important step in a company account setup.
To attach a company user to a new company business unit, **within the same company**:
1. On the **Overview of Company Users** page in the _Actions_ column, click **Attach to BU** for a user for which you want to change the assigned business unit.
2. On the **Attach to Business Unit** page:
  1. Select a business unit you would like the company user to be attached to from the drop-down list.
  2. Assign the role under the **Assigned Roles** section.
3. Click **Save**.
***
## Editing a Company User
To edit a company user:
1. On the **Overview of Company Users** page in the _Actions_ column, click **Edit** for the user you want to update.
2. Update the needed values and click **Save**.
  {% info_block infoBox "Info" %}

  All values are available for modifications except for the email. The **Email** field is greyed out and is not available for modifications.

  {% endinfo_block %}
***

## Enabling/Disabling a Company User

If the company User is currently deactivated, there will be the **Enable** option in the _Actions_ column. Click it to activate the user.

And vice versa, if the user is enabled, they can be disabled here. Click **Disable** to deactivate the user.
![Enabling a company user](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Company+Account/Managing+Company+Users/enabling-company-user.png) 

## Deleting a Company User

To delete a company user:
1. On the **Overview of Company Users** page, click **Delete** in the _Actions_ column. 
2. On the **Company user deletion confirmation** page, confirm the deletion. 
  {% info_block warningBox "Note" %}

  If confirmed, the user will be deleted from everywhere and will no longer be able to log in to the online store.
  
  {% endinfo_block %}

