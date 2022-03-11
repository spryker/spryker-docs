---
title: Managing Customers
description: This guide provides instructions on how shop owners can add and manage personal information, customer billing, and shipping addresses in the Back Office.
last_updated: Jan 13, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v1/docs/managing-customers
originalArticleId: 70806e28-c52d-4e23-b001-2d43ed86169e
redirect_from:
  - /v1/docs/managing-customers
  - /v1/docs/en/managing-customers
related:
  - title: Customer Accounts
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/customer-account-management-feature-overview.html
  - title: Managing Customer Access
    link: docs/scos/user/back-office-user-guides/page.version/customer/customers-customer-access-customer-groups/managing-customer-access.html
  - title: Managing Customer Groups
    link: docs/scos/user/back-office-user-guides/page.version/customer/customers-customer-access-customer-groups/managing-customer-groups.html
  - title: Managing Customer Addresses
    link: docs/scos/user/back-office-user-guides/page.version/customer/customers-customer-access-customer-groups/managing-customer-addresses.html
---

This article describes the procedures for creating and managing customers.
***
To start managing customers, navigate to the **Customers > Customers** section.
***
## Creating a Customer

**To create a new customer:**
1. Click **Add Customer** in the top-right corner of the **Customers** page.
2. On the **Add a customer** page, enter the customer information. The customer information must include first name, last name, and the email address that will be linked to the new account. The email address is important for completing the registration (by accessing the link that will be sent by email) or for later use of the forgot password functionality.
3. Send password token by email by selecting the **Send password token through email** checkbox. After saving the customer data, an email will be sent to the customer containing a link. By accessing the link, the customer will be able to set a password for the account.
  {% info_block infoBox "Info" %}

  If you don’t select this option, the customer is still able to set a password for their account, by clicking the reset password link from the online store.

  {% endinfo_block %}

4. To complete the customer creation, click **Save**.

To know more about the attributes you see, select, and enter while creating a customer, see the [Customers: Reference Information](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customers-customer-access-customer-groups/references/customers-reference-information.html) article.

## Editing Customers

**To edit a customer:**
1. For a specific customer, you need to update, click **Edit** in the _Actions_ column on the **Customers** page.
2. On the **Edit Customer** page you see the same attributes as on the **Add a customer** page, but with the following exceptions:
   *  The **Email** field is greyed out and is not available for updates.
   * You see two additional drop-down lists: **Billing Address** and **Shipping Address**. The values in those fields appear only if the addresses were added in the customer profile in the online store, or from the **Back Office > View** specific customer page. Those are not available for modifications from the **Edit Customer** page.
3. Update the needed values and click **Save**.
***

**Tips and tricks**

From the **Edit customer** page you can:
* Switch to the **View** customer page, where you can manage the addresses by adding a new address or updating the existing one (see the _Viewing Customer Details_ section below)
* Delete the customer record (see the _Deleting a Customer Record_ section below)
***

## Viewing Customer Details

The **View customer details** page is designed to serve more purposes than just seeing the details.

On this page, you can view the orders placed by the customer, edit the addresses, or add another address, leave descriptive messages in the **Notes** section.

To know how the customer addresses are managed, see the [Managing Customer Addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customer-addresses.html) article.

### Viewing customer details

**To view customer details:**
1. Click **View** in the list of customers.
OR
2. Click **View** in the top right corner of the **Edit Customer** page.

If the customer has addresses, they can be edited in the **Addresses** section of the **View Customer** page.

### Leaving a note

**To leave a note:**
1. On the **View Customer** page, scroll down to the **Notes** section.
2. In the **Message** box, type your message and click **Add Note**.

### Deleting a customer record

**To delete a customer record:**
1. In the *Actions* column of the **Customers** table, click **View** for the customer record you want to delete.
2. On the **View Customer** page, click **Delete** on top of the page.
3. On the **Customer deletion confirmation** page, click **Delete account**.
OR

1. In the *Actions* column of the **Customers** table, click **Edit** for the customer record you want to delete.
2. On the **Edit Customer** page, click **Delete** on top of the page.
3. On the **Customer deletion confirmation** page, click **Delete account**.
