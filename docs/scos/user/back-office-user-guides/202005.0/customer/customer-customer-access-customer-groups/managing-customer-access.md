---
title: Managing Customer Access
description: The guide provides a procedure on how a shop owner can define restrictions for actions for non-logged in users.
last_updated: Jun 5, 2020
template: back-office-user-guide-template
originalLink: https://documentation.spryker.com/v5/docs/managing-customer-access
originalArticleId: bfde5193-60ce-4e5d-bc84-ecc01e2c70b4
redirect_from:
  - /v5/docs/managing-customer-access
  - /v5/docs/en/managing-customer-access
related:
  - title: Hide Content from Logged out Users Overview
    link: docs/scos/user/features/page.version/customer-access-feature-overview.html
---

The Customer Access page was designed to define what information can be viewed for the not-logged-into online store customers.

To start defining specific restrictions for not logged in customers, go to **Customers** > **Customer Access**.
***
To define the restrictions:
1. In the **Customer Access** section, select one of the following content types under the **Hide the following information from not logged in users**:
    * **price** - if selected, no prices will be shown to not logged in customers
    * **add-to-cart** - if selected, there will be no **Add to Cart** option displayed
    * **wishlist** - if selected, no **Wishlist** option is available
    * **Shopping List** - if selected, no **Add to Shopping List** option is available
    * **Can place an order** - if selected, the not logged in user is not able to place in order.
    
    {% info_block errorBox "**B2B Only**" %}

    This option is selected by default and cannot be deselected.
    
    {% endinfo_block %}
2. Click **Save** to save the changes.
