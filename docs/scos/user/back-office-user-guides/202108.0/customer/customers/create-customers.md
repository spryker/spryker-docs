---
title: Managing customers
description: This guide provides instructions on how shop owners can add and manage personal information, customer billing, and shipping addresses in the Back Office.
last_updated: Jul 6, 2021
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customers
originalArticleId: 32a86d51-5bdd-428b-8ae4-5929326f4a26
redirect_from:
  - /2021080/docs/managing-customers
  - /2021080/docs/en/managing-customers
  - /docs/managing-customers
  - /docs/en/managing-customers
  - /docs/scos/user/back-office-user-guides/202108.0/customer/customer-customer-access-customer-groups/managing-customers.html
related:
  - title: Customer Accounts
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/customer-account-management-feature-overview.html
---

This article describes how to create customers.

## Prerequisites

To start managing customers, go to **Customers&nbsp;<span aria-label="and then">></span> Customers**.

Each section contains reference information. Make sure to review it before you start, or look up the necessary information as you go through the process.

## Creating a customer

1. Go to **Customers&nbsp;<span aria-label="and then">></span> Customers**.
2. On the **Customers** page, click **Add Customer**.
3. On the **Add a customer** page, enter an **EMAIL**.
4. Select a **SALUTATION**.
5. Enter a **FIRST NAME**.
6. Enter a **LAST NAME**.
7. Optional: Select a **GENDER**.
8. Optional: Select a **DATE OF BIRTH**.
9. Optional: Enter a **PHONE**.
10. Optional: Enter a **COMPANY**.
11. Optional: Select a **LOCALE**.
12. To send a password change link to the customer's **EMAIL**, select the **SEND PASSWORD TOKEN THROUGH EMAIL** checkbox.
13. Click **Save**.

    This opens the **Customers** page with a success message displayed. The customer is displayed in the list.

**Tips and tricks**

Once you create a customer, a verification email is sent to their email address, while their **STATUS** is **Unverified**. After they click the verification link, their status changes to  **Verified**.

## Reference information: Creating customers

The following table describes the attributes you enter and select when creating a customer.

|ATTRIBUTE| DESCRIPTION|
|---|---|
| EMAIL | Email address that will be linked to the new account. The email address is important for completing the registration (by accessing the link that will be sent by email) or for later use of the forgot password functionality.|
| SALUTATION |Formal salutation for your customer (e.g., Mr, Mrs).|
| FIRST NAME |Customer's first name.|
| LAST NAME |Customer's last name.|
| GENDER |Customer's gender. The drop-down list with the following values available for selection:  Male and Female.|
| DATE OF BIRTH |Customer's date of birth in the format mm/dd/yyyy. Once you click on the field, the calendar opens where you can select the date.|
| PHONE |Customer's phone number.|
| COMPANY | Customer's company.|
| LOCALE |Selected from a drop-down list value defines the locale for your customer.|
| SEND PASSWORD TOKEN THROUGH EMAIL | If you select the checkbox, after saving the customer, an email will be sent to the customer containing a link. By accessing the link, the customer will be able to set a password for the account. If you don’t select this option, the customer will still able to set a password by clicking the reset password link on the Storefront. |
![Add or edit customers page](https://spryker.s3.eu-central-1.amazonaws.com/docs/User+Guides/Back+Office+User+Guides/Customers/Customers%3A+Reference+Information/customers-reference-information.png)

## Viewing customer details

The *View customer details* page is designed to serve more purposes than just seeing the details.

On this page, you can view the orders placed by the customer, edit the addresses, or add another address, leave descriptive messages in the *Notes* section.

To know how the customer addresses are managed, see  [Managing customer addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customers.html).

### Viewing customer details

To view customer details, take one of the following steps:
* Click **View** in the list of customers.
* Click **View** in the top right corner of the *Edit Customer* page.

If the customer has addresses, they can be edited in the *Addresses* section of the *View Customer* page.

### Leaving a note

To leave a note:
1. On the *View Customer* page, scroll down to the *Notes* section.
2. In the **Message** box, type your message and click **Add Note**.

### Deleting a customer record

To delete a customer record:
1. In the *Actions* column of the *Customers* table, click **View** for the customer record you want to delete.
2. On the *View Customer* page, click **Delete** at the top of the page.
3. On the *Customer deletion confirmation* page, click **Delete account**.

OR

1. In the *Actions* column of the *Customers* table, click **Edit** for the customer record you want to delete.
2. On the *Edit Customer* page, click **Delete** on top of the page.
3. On the *Customer deletion confirmation* page, click **Delete account**.

#### Reference information: Viewing customer details

This section lists descriptions of the attributes you see when viewing customer details on the *View Customer* page.

The *Customer* section:

|ATTRIBUTE| DESCRIPTION|
|---|---|
| Salutation | Formal salutation for your customer (e.g., Mr, Mrs).|
| First Name |Customer's first name.|
| Last Name |Customer's last name.|
| Email | Email address that is linked to the customer account.|
| Company | Customer's company.|
| Customer Reference | Unique reference of the customer.|
| Gender |Customer's gender.|
| Locale |Customer's locale.|
| Phone |Customer's phone number.|
| Date of birth |Customer's date of birth.
| Registered date |Customer's registration date.|
| Zed Account Reference |Reference to the customer's zed account.|

The *Addresses* section:

|ATTRIBUTE| DESCRIPTION|
|---|---|
|Salutation<br>First Name<br>Last Name|Customer's salutation. If the other person is the point of contact for this address, you need to populate the fields with the respective data. If the customer is the same, populate the fields with the same values.|
|Address<br>Address (2nd line)<br>Address(3rd line)|Fields with the address information except for the city, zip code, and country.|
|Company|Customer's company.|
|Zip Code<br>City<br>Country| City, zip code, and country of the customer.|
|Actions| Allows you to edit customer addresses. In this field, you can click the *Edit* button next to the address you want to edit. |

The *Orders* section:

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| Order Reference | Unique reference of the order. |
| Order State | Current state of the order. |
| Grant Total | Grand total of the order. |
| Number of Items | Quantity of the items in the order. |
| Actions | Actions you can do on this order. |
