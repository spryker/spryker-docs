---
title: "Customer module overview: reference information"
last_updated: Aug 13, 2021
description: This document describes how new customers can be created and managed and how to enable specific features related to customers.
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/feature-walkthroughs/202200.0/customer-account-management-feature-walkthrough/reference-information-customer-module-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/customer-account-management-feature-walkthrough/reference-information-customer-module-overview.html
  - /docs/scos/dev/feature-walkthroughs/202311.0/customer-account-management-feature-walkthrough/reference-information-customer-module-overview.html
  - /docs/scos/dev/feature-walkthroughs/202204.0/customer-account-management-feature-walkthrough/customer-module-overview-reference-information.html
  - /docs/pbc/all/customer-relationship-management/latest/base-shop/domain-model-and-relationships/customer-module-overview-reference-information.html
---

The Customer entity wraps data around registered customers. Customer data is managed from the Back Office by the shop administrator and from the shop website itself by customers. This document describes how new customers can be created and managed and how to enable specific features related to customers.

## Customer registration

Customer registration requires two steps:

1. Creating a new customer: This step can be done from both the backend and frontend applications. Customers are created in the database if the entered details are valid. A registration key is generated for each customer and used as a token for customer registration confirmation. The key is embedded in the confirmation link sent by email.
2. Confirming customer registration: Only a customer can confirm registration through the frontend application. The customer accesses the link received in the email sent after the customer creation. When opening the link, an update is triggered that sets the customer as registered.

After these two steps are performed, the customer can use the account.

![customer.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Customer+Relationship+Management/Customer+Groups/Customer+Module+Overview/customer.png)

## Customer address

One customer can have many customer addresses stored in the database.

There are two types of customer addresses:

- Billing Address: the address to which the invoice or bill is registered.
- Shipping Address: the address to where the order is shipped.

Customers are assigned a default billing and a default shipping address. Customers can update their addresses through their account (from Yves) or have them updated by the Back Office user (from the Back Office).

## Password recovery

Similar to the customer registration flow, password restore makes use of a token that acts as a temporary password for the customer. An email is sent to the user to reset the password. The mail contains a link where the password recovery token is embedded. This token is generated specifically for this request. After the customer accesses the URL and enters necessary confirmation data, the customer's password is updated.

Out of the box, Spryker provides the plugin `CustomerRestorePasswordMailTypePlugin` (Customer module) to handle a restore password email template. To enable it, register this plugin in your `MailDependencyProvider`—for example, `Pyz/Zed/Mail/MailDependencyProvider`).

{% info_block infoBox "Token link generation" %}

By default, the `Customer` module leads to `'‹YVES HOST›/password/restore?token='`. If it's different in your project, configure the generation of restore links in `Spryker/Zed/Customer/CustomerConfig::getCustomerPasswordRestoreTokenUrl()`

{% endinfo_block %}

## Delete customer

Customers can remove themselves by clicking **Delete Account** on the Yves Profile page. In addition, this functionality is also available in the Back Office (**Customer > View > Delete**).

Complete removal from the customer table is strictly prohibited as it could affect the database consistency of e-commerce projects or even be illegal in terms of tax reporting and auditing. In Spryker, we don't remove identifiers from a customer table, but instead anonymize private information. Information related to orders and bills will stay untouched.

{% info_block errorBox "Error" %}

We use irreversible algorithms to make it impossible to repair deleted data.

{% endinfo_block %}

After the deletion, customers can use an old email for registration, as the new registration does not have any connections to an old one (anonymized).

To prevent missing any customer-related information, do the following:

1. Process removal for related customer objects. Here you could take care of information stored in dependent bundles or custom relations. To do so, implement the `CustomerAnonymizerPluginInterface`. As an example, take a look at the Newsletter module plugin for unsubscribing a customer from newsletters before removal `Spryker/Zed/Newsletter/Business/Anonymizer/SubscriptionAnonymizer`.
2. Anonymize customer address information.
3. Anonymize private customer information. Information directly related to customer fields—for example, first name, last name, and date of birth.

{% info_block errorBox "Information privacy law " %}

When creating a custom implementation, check and follow the applicable legislation in your country.

{% endinfo_block %}

## Customer experience

Spryker consistently delivers the scalable operating system without coupling it to a project infrastructure. As a consequence, the project should take care of the impact of the **Customer Delete** functionality on customer experience. Read more about session-sensitive actions in [Upgrade the Customer module](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-customer-module.html).

### Case insensitive queries for email

From version 7.0.0, on case-insensitive queries, using the `filterByEmail` conditions are enabled by default. If your version of the **Customer** module is older, you are still able to use this feature.

To enable case insensitive fields in Propel for filtering queries, update the `PropelOrm` module to the 1.5.0 version.

When the feature is enabled, add an attribute `caseInsensitive="true"` into the customer schema file on the project level (usually `src/Pyz/Zed/Customer/Persistence/Propel/Schema/spy_customer.schema.xml`).

Finally, run `vendor/bin/console propel:diff` and `vendor/bin/console propel:model:build` to update Propel models.

### Orders display on Customer View page

From Customer module 7.6.0 (along with Sales module version 8.7.0), we support the display of customer orders in the **Customers** section of the Back Office. The **Customers View** page now has the Orders table listing all the orders of a respective customer.

To enable the feature to see extra blocks on the **Customer View** page in the Back Office, go to the `CustomerConfig` class in the `Customer` module and add the `getCustomerDetailExternalBlocksUrls` function. This function should return an array where the key is the block name and the value is the URL where this block exists. As for the orders, they are in `/sales/customer/customer-orders`, which in our routing architecture points to Sales `module` -> `CustomerController` -> `CustomerOrdersAction`. If this behavior needs to be extended further, all that's needed is more key-value pairs for more controller actions that provide the data.
