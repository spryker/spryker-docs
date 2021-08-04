---
title: Customer Management
originalLink: https://documentation.spryker.com/v5/docs/customer-management
redirect_from:
  - /v5/docs/customer-management
  - /v5/docs/en/customer-management
---

Customer Accounts is the area of the Back Office where you can view and edit customer accounts, see details, and check order history. From Customer Accounts, you can group customers to target them for exclusive or limited offers.

## How are Accounts Created?
Customers can create an account from the Shop Application to save their contact details, addresses, order history, and preferences, such as language and shipping options. The minimal information you need is an email address and a password, and additional details can be requested depending on your business needs.

With the Spryker Commerce OS, you can tailor customer registration to your needs. A customer can simply register with an email address and a password or you can choose to ask for more details. Once a customer enters the required information, a customer account is created. All accounts are password protected and passwords can easily be restored with a restore password link.

Accounts can be assigned to groups for targeting products, discounts, languages, and many other types of categorization. Authorization can be handled directly in the shop and items such as subscriptions and passwords can be managed via email. All customer activity can be monitored and configured from the Back Office.

Out-of-the-box customer information includes:

* Phone Number
* Date of Birth
* Locale, Company
* Phone Number
* Date of Birth
* Company
* Locale

To comply with international regulations, customers can be deleted by request from the customer. Shop owners can also delete a customer account through the Back Office.

{% info_block infoBox %}
Please note that this action does not affect billing and order related information. Deleting an account anonymizes customer information and address data. Out-of-the box customer email addresses are anonymized making it possible for customers to return and re-register with a completely new account.
{% endinfo_block %}

For internal references, each customer's account can be enhanced with notes. This will allow an easier customer management in your organization.

A Back Office user can leave a note to a customer on the Customer details page.

{% info_block infoBox %}
This comment will be available only for Shop Administrators.
{% endinfo_block %}

All in all, the Customer Management feature ensures the following functionality:

* Adding notes attached for customers
* Setting a preferred locale per customer
* Deleting customer data via an anonymization mechanism
* Configuring non-linear customer reference for external communication
* Setting address books with default addresses for billing and shipping
* Sending password token through email
* Checking last orders in a shop

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/en/customer-module-overview" class="mr-link">Get a general idea of the Customer feature</a></li>
                 <li><a href="https://documentation.spryker.com/docs/en/mg-customer" class="mr-link">Migrate the Customer module from version 6.* to version 7.0</a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/en/customer-module-overview" class="mr-link">Get a general idea of the Customer feature</a></li>
                <li><a href="https://documentation.spryker.com/docs/en/customers" class="mr-link">Create and manage customers through the Back Office</a></li>
            </ul>
        </div>
        </div>
</div>
