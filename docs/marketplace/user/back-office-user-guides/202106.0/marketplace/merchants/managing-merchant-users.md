---
title: Managing merchant users
last_updated: Apr 23, 2021
description: This guide explains how Marketplace Administrator can manage merchant users in the Back Office.
template: back-office-user-guide-template
---

A merchant user is a user that performs tasks on behalf of the merchant in the Merchant Portal. Marketplace Administrator can manage merchant users in the Back Office.

To start managing  merchant users, navigate to the *Marketplace* > *Merchants* > *Edit Merchant* page.

## Creating a merchant user

{% info_block infoBox "Info" %}
To create a merchant user, create a Merchant first.
{% endinfo_block %}

To create a merchant user, do the following:

1. On the *Edit Merchant* page, go to the *Users* tab.

2. Click **+Add New User**.

3. Fill in the required information. See [Merchants: Reference Information](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/marketplace/merchants/merchants-reference-information.html) for details on the attributes you can add.

4. Click **Create**.

By default, each merchant user obtains the role of Merchant Portal Administrator. To change it, [edit the Back Office](https://documentation.spryker.com/docs/managing-users#editing-a-user) user record.


## Editing the merchant user
To edit a merchant user, do the following:

1. On the *Edit Merchant* page in the *Users* tab, click **Edit** for a merchant user you want to edit.

On the *Edit Merchant user* page, edit the merchant user details.

## Activating and deactivating the merchant users

Once the merchant user is created, they need to be activated in order to be able to access the Merchant Portal.

{% info_block infoBox "Info" %}
Make sure that the merchant is approved in the Back Office to be able to proceed with the merchant user activation. You will not be able to activate the merchant user if the merchant is denied.
{% endinfo_block %}

To activate the merchant user, click **Activate** in the *Actions* column of the *Merchant Users* page.

Once the merchant user is activated, they receive the email message with the reset password instructions to the email address specified at the step of [merchant user creation](/docs/marketplace/user/back-office-user-guides/{{ page.version }}/marketplace/merchants/managing-merchant-users.html#creating-a-merchant-user).

{% info_block infoBox "Info" %}
To deactivate the merchant user, click Deactivate in the Actions column of the Merchant Users page.
{% endinfo_block %}

{% info_block infoBox "Info" %}
Merchant user gets automatically deactivated when the merchant gets denied.
{% endinfo_block %}

Once the merchant user is created and activated, they can log in to the Merchant Portal.

## Deleting merchant users

If you do not need a merchant user anymore, you can delete it.

To delete the merchant user, click **Delete** on the *Edit Merchant* page in the *Users* tab.

{% info_block infoBox "Info" %}
In the current implementation, the Delete button only restricts the merchant user’s access to the Merchant Portal. However, you can change the behavior in your project.
{% endinfo_block %}
