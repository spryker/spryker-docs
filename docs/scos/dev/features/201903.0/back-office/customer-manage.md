---
title: Customer Management
originalLink: https://documentation.spryker.com/v2/docs/customer-management
redirect_from:
  - /v2/docs/customer-management
  - /v2/docs/en/customer-management
---

Customer Accounts are the area of the Administration Interface where you can view and edit customer accounts, see details and check order history. From Customer Accounts you can group customers to target them for exclusive or limited offers.

## How are Accounts Created?
Customers can create an account from the Shop Application to save their contact details, addresses, order history and preferences, such as language and shipping options. The minimal information you need is an email address and a password, and additional details can be requested depending on your business needs.

With the Spryker Commerce OS, you can tailor customer registration to your needs. Once a customer enters the required information, a customer account is created. All accounts are password protected and passwords can easily be restored with a restore-password link.

Accounts can be assigned to groups for targeting products, discounts, languages and many other types of categorization. Authorization can be handled directly in the shop and items such as subscriptions and passwords can be managed via email. All customer activity can be monitored and configured from the Administration Interface.

Out-of-the-box customer information includes:

* Phone Number
* Date of Birth
* Locale, Company
* Phone Number
* Date of Birth
* Company
* Locale

To comply with international regulations customers can be deleted by request from the customer. Shop owners can also delete a customer account through the Administration Interface.

{% info_block infoBox %}
However, this action does not affect billing and order related information. Deleting an account anonymizes customer information and address data. Out-of-the box customer email addresses are anonymized making it possible for customers to return and re-register with a completely new account.
{% endinfo_block %}

For internal references, each customer's account can be enhanced with notes. This will allow an easier customer management in your organization.

Shop Administrator is able to leave a note to a customer on customer details page.

{% info_block infoBox %}
This comment will be available only for Shop Administrators.
{% endinfo_block %}


To finalize the Customer Management feature characteristics, the following can be outlined:

* Allows to add notes attached for customers
* Preferred locale per customer
* Customer data can be deleted via an anonymization mechanism
* Non-linear customer reference for external communication
* Address books with default addresses for billing and shipping
* Send password token through email
* See last orders in shop

## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/v2/docs/customer-module-overview" class="mr-link">Manage customers and customer addresses</a></li>
                <li><a href="https://documentation.spryker.com/v2/docs/customer-module-overview#password-restore" class="mr-link">Enable Password Restore functionality for customers</a></li>
                <li><a href="https://documentation.spryker.com/v2/docs/customer-module-overview#delete-customer" class="mr-link">Prevent loosing customer-related information after deleting a customer</a></li>
                 <li><a href="https://documentation.spryker.com/v2/docs/customer-module-overview#case-insensitive-queries-for-email" class="mr-link">Enable case insensitive fields in Propel for filtering queries</a></li>
                 <li><a href="https://documentation.spryker.com/v2/docs/mg-customer" class="mr-link">Migrate to a newer version of the Customer module </a></li>
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/v2/docs/customer-module-overview" class="mr-link">Manage customers and customer addresses</a></li>
                <li><a href="https://documentation.spryker.com/v2/docs/customers" class="mr-link">Create and manage customers through the Back Office</a></li>
            </ul>
        </div>
        </div>
</div>
