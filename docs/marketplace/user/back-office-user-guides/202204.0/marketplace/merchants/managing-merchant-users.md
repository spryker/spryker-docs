---
title: Managing merchant users
last_updated: Apr 23, 2021
description: This guide explains how Marketplace administrator can manage merchant users in the Back Office.
template: back-office-user-guide-template
---

A merchant user is a user that performs tasks on behalf of the merchant in the Merchant Portal. Marketplace administrator can manage merchant users in the Back Office.

---

## Prerequisites

To start managing merchant users:
1. Navigate to the **Marketplace&nbsp;<span aria-label="and then">></span> Merchants**.
2. Next to the merchant you want to create a merchant user for, click **Edit** in the **Actions** column. You are taken to the **Edit Merchant: [Merchant ID]** page.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Creating a merchant user

{% info_block infoBox "Info" %}

To create a merchant user, create a merchant first.

{% endinfo_block %}

To create a merchant user, do the following:

1. On the **Edit Merchant [Merchant ID]** page, go to the **Users** tab.

2. Click **+Add New User**.

3. Fill in the required information.

4. Click **Create**.

By default, each merchant user obtains the role of Merchant Portal Administrator. To change it, [edit the Back Office](/docs/scos/user/back-office-user-guides/{{page.version}}/users/managing-users/editing-users.html) user record.

### Reference information: Creating a merchant user

This section contains the attributes description you see when creating a merchant user.

#### Users tab

On the **Users** tab, you see a table with all the merchant users available for the merchant. The following information is included in the table:
* Merchant user ID
* Email
* First Name
* Last Name
* Merchant user status
* Actions

![merchant-users-page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Marketplace/Merchants/merchant-users-page.png)

#### Create Merchant user page

The following table describes the attributes you enter and select when creating merchant users.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Email | Text field where you specify the email address of the merchant user. The email with the reset password instructions will be sent to this email address.  | &check; |
| First name | Text field where you specify the first name of the merchant user. | &check; |
| Last name | Text field where you specify the last name of the merchant user. | &check; |

## Editing the merchant user

To edit a merchant user, do the following:

1. On the **Edit Merchant** page, on the **Users** tab, click **Edit** for a merchant user you want to edit.

On the **Edit Merchant user** page, edit the merchant user details.

### Reference information: Editing a merchant user

The following table describes the attributes you enter and select when editing merchant users.

| ATTRIBUTE | DESCRIPTION | REQUIRED? |
|-|-|-|
| Email | Text field where you specify the email address of the merchant user. The email with the reset password instructions will be sent to this email address.  | &check; |
| First name | Text field where you specify the first name of the merchant user. | &check; |
| Last name | Text field where you specify the last name of the merchant user. | &check; |
| Status | Drop-down menu where you can update the status of the merchant user. Can be: Active, Blocked, Deleted. | &check; |

## Activating and deactivating the merchant users

Once the merchant user is created, they need to be activated in order to be able to access the Merchant Portal.

{% info_block infoBox "Info" %}

Make sure that the merchant is approved in the Back Office to be able to proceed with the merchant user activation. You will not be able to activate the merchant user if the merchant is denied.

{% endinfo_block %}

To activate the merchant user, click **Activate** in the **Actions** column of the **Merchant Users** page.

Once the merchant user is activated, they receive the email message with the reset password instructions to the email address specified at the step of [merchant user creation](#creating-a-merchant-user).

{% info_block infoBox "Info" %}

To deactivate the merchant user, click **Deactivate** in the **Actions** column of the **Merchant Users** page.

{% endinfo_block %}

{% info_block infoBox "Info" %}

The merchant user gets automatically deactivated when the merchant gets denied.

{% endinfo_block %}

Once the merchant user is created and activated, they can log in to the Merchant Portal.

## Deleting merchant users

If you do not need a merchant user anymore, you can delete it.

To delete the merchant user, click **Delete** on the **Edit Merchant** page, on the **Users** tab.

{% info_block infoBox "Info" %}

In the current implementation, the **Delete** button only restricts the merchant user’s access to the Merchant Portal. However, you can change the behavior in your project.

{% endinfo_block %}
