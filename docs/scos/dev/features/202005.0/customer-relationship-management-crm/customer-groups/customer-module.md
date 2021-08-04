---
title: Customer Module Overview
originalLink: https://documentation.spryker.com/v5/docs/customer-module-overview
redirect_from:
  - /v5/docs/customer-module-overview
  - /v5/docs/en/customer-module-overview
---

The Customer entity wraps data around registered customers. Customer data is managed from the Back Office by the shop administrator and from the shop website itself by customers. This article describes how new customers can be created and managed and how to enable specific features related to customers.

## Customer Registration
Customer registration requires two steps:

1. Creating a new customer: This step can be done from both the back-end and front-end applications. Customers are created in the database if the entered details are valid. A registration key is generated for each customer and used as a token for customer registration confirmation. The key is embedded in the confirmation link sent by email.
2. Confirming customer registration: Only customer can confirm registration through the front-end application. The customer accesses the link received in the email sent after the customer creation. When opening the link, an update is triggered that sets the customer as registered.

After these two steps are performed, the customer can use the account.

![customer.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Groups/Customer+Module+Overview/customer.png){height="" width=""}

## Customer Address

One customer can have many customer addresses stored in the database.

There are two types of customer addresses:

* Billing Address: the address to which the invoice or bill is registered
* Shipping Address: the address to where the order is shipped

Customers are assigned a default billing and a default shipping address. Customers can update their addresses through their account (from Yves) or have them updated by the Back Office user (from the Back Office).

## Password Restore

Similar to the customer registration flow, password restore makes use of a token that acts as a temporary password for the customer. An email is sent to the user to reset the password. The mail contains a link where password restore token is embedded. This token is generated specifically for this request. After the customer accesses the URL and enters necessary confirmation data, the customer password is updated.

Out of the box Spryker provides the plugin `CustomerRestorePasswordMailTypePlugin` (Customer module) to handle a restore password email template. To enable it, register this plugin in your `MailDependencyProvider` (eg. `Pyz\Zed\Mail\MailDependencyProvider`).

{% info_block infoBox "Token link generation" %}
By default, the **Customer** module will lead to `'‹YVES HOST›/password/restore?token='`. If it's different in your project, you should configure generation of restore links in `Spryker\Zed\Customer\CustomerConfig::getCustomerPasswordRestoreTokenUrl(
{% endinfo_block %}`)

## Delete Customer
Customers can remove themselves by clicking **Delete Account** on the Yves Profile page. In addition, this functionality is also available in the Back Office (**Customer > View > Delete**).

Complete removal from the customer table is strictly prohibited as it could affect the database consistency of e-commerce projects or even be illegal in terms of tax reporting and auditing. In Spryker we don't remove identifiers from a customer table, but anonymize private information. Information related to orders and bills will stay untouched.

{% info_block errorBox %}
We use irreversible algorithms to make it impossible to repair deleted data.
{% endinfo_block %}

After the deletion, customers can use an old email for registration, as the new registration does not have any connections to an old one (anonymized).

To prevent missing any customer related information, do the following:

1. Process removal for related customer objects. Here you could take care of information stored in dependent bundles or custom relations. To do so, implement the `CustomerAnonymizerPluginInterface`. As an example, take a look at the Newsletter module plugin for unsubscribing a customer from newsletters before removal `Spryker\Zed\Newsletter\Business\Anonymizer\SubscriptionAnonymizer`.
2. Anonymize customer address information.
3. Anonymize customer private information. Information directly related to customer fields (first name, last name, date of birth etc.).

{% info_block errorBox "Information privacy law " %}
When creating a custom implementation, check and follow the applicable legislation in your country.
{% endinfo_block %}

## Customer Experience

Spryker consistently delivers the scalable operating system without coupling it to a project infrastructure. As a consequence, the project should take care of impact of the **Customer Delete** functionality on customer experience. Read more about session sensitive actions in [Migration Guide - Customer](https://documentation.spryker.com/docs/en/mg-customer).

### Case insensitive queries for email

From version 7.0.0 on case insensitive queries using the `filterByEmail` conditions are enabled by default. If your version of the **Customer** module is lower you are still able to use this feature.

To enable case insensitive fields in Propel for filtering queries update PropelOrm module to 1.5.0 version.

When feature is enabled, add an attribute `caseInsensitive="true"` into customer schema file on project level (usually `src/Pyz/Zed/Customer/Persistence/Propel/Schema/spy_customer.schema.xml`).

Finally run `vendor/bin/console propel:diff` and `vendor/bin/console propel:model:build` to update Propel models.

### Orders Display on Customer View Page

From Customer module 7.6.0 (along with Sales module version 8.7.0) we support display of customer orders in the Customers section of the Back Office. The **Customers View** page now has Orders table listing all the orders of a respective customer.

To enable the feature to see extra blocks on the Customer View page in the Back Office, go to the `CustomerConfig` class in the `Customer` module and add `getCustomerDetailExternalBlocksUrls` function . This function should return an array where the key is the block name and the value is the URL where this block exists. As for the orders, they are in `/sales/customer/customer-orders` which in our routing architecture points to Sales `module` -> `CustomerController` -> `CustomerOrdersAction`. If this behavior needs to be extended further, all that’s needed is more key-value pairs for more controller actions that provide the data.
