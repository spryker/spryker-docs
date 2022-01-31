---
title: Customer Account Management feature overview
description: Let your customers create an Account to save their contact details, addresses, order history and preferences, such as language and shipping options.
last_updated: Nov 22, 2019
template: concept-topic-template
originalLink: https://documentation.spryker.com/v2/docs/customer-accounts
originalArticleId: 9f79edff-00cb-4f19-8866-3af7ab7c9d82
redirect_from:
  - /v2/docs/customer-accounts
  - /v2/docs/en/customer-accounts
  - /v2/docs/crm
  - /v2/docs/en/crm
---

Let your customers create an Account to save their personal details.

Customer accounts can have the following set of details:

* contact details
* addresses
* order history
*  preferences, such as language and shipping options.

There are slight differences in customer accounts' information for the B2B and B2C shops. The following table describes such differences and similarities:

| Customer Account Sections | B2B Shop | B2C Shop |
| --- | --- | --- |
| Overview | v | v|
| Profile | v | v |
| Addresses | v | v |
| Order History | v | v |
| Newsletter | v | v |
| Shopping Lists | v |  |
| Shopping Carts | v |  |
| Wishlist |  | v |

As a Back Office user, you can view and edit your customer's account details and check their orders and order history.

{% info_block infoBox %}
The customer accounts can be managed by customers directly on the Yves side. If updates are done by a customer, the data is synchronized and shop administrator will see the relevant information in the **Back Office > Customers > Customers** section. The exceptions are newsletter subscription and password change, as this information is not stored in Zed.
{% endinfo_block %}
