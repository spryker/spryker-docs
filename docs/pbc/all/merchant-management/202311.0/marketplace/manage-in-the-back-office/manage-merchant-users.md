---
title: Managing merchant users
last_updated: Apr 23, 2021
description: This guide explains how Marketplace administrator can manage merchant users in the Back Office.
template: back-office-user-guide-template
redirect_from:
  - /docs/marketplace/user/back-office-user-guides/202311.0/marketplace/merchants/managing-merchant-users.html
---

A merchant user is a user that performs tasks on behalf of the merchant in the Merchant Portal. Marketplace administrator can manage merchant users in the Back Office.


## Prerequisites

1. Go to **Marketplace&nbsp;<span aria-label="and then">></span> Merchants**.
2. Next to the merchant you want to create or edit a merchant user for, click **Edit**.
    This opens the **Edit Merchant: {Merchant_ID}** page.
3. Click the **Users** tab.    

## Add merchant users

1. Click **Add Merchant User**.
2. On the **CREATE MERCHANT USER** page, enter the following details:
  * **E-MAIL**
  * **FIRST NAME**
  * **LAST NAME**  
3. Click **Create**.
    This opens the **Edit Merchant: {MERCHANT_ID}** page with a success message displayed. The merchant user is displayed in the list.

By default, each merchant user obtains the role of Merchant Portal Administrator. To change it, [edit the user](/docs/pbc/all/user-management/{{page.version}}/base-shop/manage-in-the-back-office/manage-users/edit-users.html).

| ATTRIBUTE | DESCRIPTION | REQUIRED |
|-|-|-|
| E-MAIL | This email address is used as a username to log into the Merchant Portal.  |

## Edit merchant users

1. Next to the merchant user you want to edit, click **Edit**.

2. On the **Edit Merchant user** page, enter any of the following:
  * **E-MAIL**
  * **FIRST NAME**
  * **LAST NAME**
3. Select a **STATUS**.
4. Click **Save**
    This opens the **Edit Merchant: {MERCHANT_ID}** page with a success message displayed. The merchant user is displayed in the list.

    

### Reference information: Editing a merchant user

The following table describes the attributes you enter and select when editing merchant users.

| ATTRIBUTE | DESCRIPTION | REQUIRED |
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
