---
title: Customer Schema
originalLink: https://documentation.spryker.com/2021080/docs/db-schema-customer
redirect_from:
  - /2021080/docs/db-schema-customer
  - /2021080/docs/en/db-schema-customer
---


## Customer Schema

### Customer with Addresses

Customers can register themselves directly or during the checkout. They can log in and log out to the shop and use the password forgotten mechanism.
![Customer with addresses](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Customer+Schema/customer-with-address.png){height="" width=""}

**Structure**:

* **Customer**: Here we save the basic information like the name and the preferred locale.

  - *spy_customer::customer_reference* - the Public reference to the customer which does not allow conclusions on the number of customers in the database.

* **Address**: Each customer can have multiple addresses while only one of them can be the default billing and shipping address.

### Customer Groups

Customers can be grouped so that they qualify for specific discounts. This feature can also be used for other use cases like "customer-group specific prices".
![Customer groups](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Customer+Schema/customer-groups.png){height="" width=""}

### Newsletter

Shop users can subscribe to the newsletter.
![Newsletter](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Customer+Schema/newsletter.png){height="" width=""}

* **Structure**:
* Newsletter subscribers are saved into *spy_newsletter_subscriber*.
* Subscribers can be related to existing customers or they can be standalone.
* Subscribers can be related to one or multiple subscriptions.

{% info_block warningBox %}
Spryker does not have a newsletter sending mechanism. The data need to be exported to an external tool.
{% endinfo_block %}

### Zed Users

{% info_block infoBox %}
Customers can be related to Zed Users. This is used for rendering CMS Page reviews which regular users cannot see.
{% endinfo_block %}
![Zed users](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Customer+Schema/zed-users.png){height="" width=""}
