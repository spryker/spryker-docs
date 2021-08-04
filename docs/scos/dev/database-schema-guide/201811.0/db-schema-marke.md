---
title: Marketplace Schema
originalLink: https://documentation.spryker.com/v1/docs/db-schema-marketplace
redirect_from:
  - /v1/docs/db-schema-marketplace
  - /v1/docs/en/db-schema-marketplace
---


## Merchant

### Merchant and Merchant Relationships

A Merchant is someone who sells Products on a Marketplace. Merchants sometimes have special agreements with their customers. This agreement is represented as Merchant Relationship in Spryker.

{% info_block warningBox %}
This feature is being developed.
{% endinfo_block %}
![Merchant and merchant relationships](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Marketplace+Schema/merchant-and-relationship.png){height="" width=""}

**Structure**:

* A Merchant is identified by the name.
* The schema shows that a Merchant can have multiple Merchant Relationships.

### Merchant Relationship to Company Business Units

{% info_block infoBox %}
In a B2B context, there are special agreements between a Merchant and "his" customers which are represented as Company Business Users in Spryker.
{% endinfo_block %}

{% info_block warningBox %}
It may happen that a Business Unit gets contradicting Relationships with the same Merchant. This has to be obeyed in all use cases.
{% endinfo_block %}
![Merchant Relationship to Company Business Units](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Marketplace+Schema/merchant-relationship-company-business-units.png){height="" width=""}

**Structure**:

* The Merchant has Relationships with Company Business Units

  - There is a one-to-many direct relation (*spy_merchant_relationship::fk_company_business_unit*) which defines the Company Business Unit that owns the Relationship to the Merchant and is able to manage it (e.g. "Hotel Management).
  - There is also a many-to-many relation between the Merchant Relationship and the Company Business Unit which defines which Company Business Units are affected by the Relationship (e.g. "Hotel Bar", "Hotel Restaurant", "Hotel Spa").

* The Relationships can be used for several uses cases:

  1. To restrict the products (from the Merchant) which the customers (~ Users of the related Company Business Unit) are allowed to see in the shop.
  2. To define a dedicated Price for the products (from the Merchant) which the customers (~ Users of the related Company Business Unit) are paying.
