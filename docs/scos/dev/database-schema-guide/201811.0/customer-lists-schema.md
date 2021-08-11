---
title: Customer Lists Schema
originalLink: https://documentation.spryker.com/v1/docs/db-schema-customer-lists
redirect_from:
  - /v1/docs/db-schema-customer-lists
  - /v1/docs/en/db-schema-customer-lists
---


## Customer Lists

### Shopping List

{% info_block infoBox %}
Company users use shopping lists to prepare and manage orders that they do regularly. For example, a restaurant can prepare lists for their regular orders of meat, vegetables, and drinks. These lists can be merged into one cart, adjusted and checked out by the chef on a daily basis.
{% endinfo_block %}
![Shopping lists](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Customer+Lists+Schema/shopping-list.png){height="" width=""}

**Structure**:

* A Shopping List has a name, a description, an owner and can be shared with others

  - *customer_reference* - This is the Customer who is the owner of the list. This is a soft relation which is not visible in the schema.
  - The Shopping List can be **shared** with Company Users and Company Business Units.


### Wishlist

{% info_block infoBox %}
Customers can create one or multiple wishlists, add products to them and transfer wishlists to carts.
{% endinfo_block %}
![Wishlist](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Customer+Lists+Schema/wishlist.png){height="" width=""}

**Structure**:

* A Wishlist is owned by a Customer.
* A Wishlist Item is related to a Product but without Quantity or Product Options.
