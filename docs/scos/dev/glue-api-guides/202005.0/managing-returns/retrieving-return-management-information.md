---
title: Retrieving Return Management Information
description: In this article, you will find details on how to retrieve Return Management information via the Spryker Glue API.
last_updated: Aug 11, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v5/docs/retrieving-return-management-information
originalArticleId: 3c3cb4b5-714d-44a4-95b6-8a0c5abb43b7
redirect_from:
  - /v5/docs/retrieving-return-management-information
  - /v5/docs/en/retrieving-return-management-information
related:
  - title: Retrieving Returnable Items
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/retrieving-returnable-items.html
  - title: Creating a Return
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/creating-a-return.html
  - title: Retrieving the Returned Items
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/retrieving-the-returned-items.html
  - title: Retrieving the Return Reasons
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/retrieving-return-reasons.html
---

The Return Management API allows developers to retrieve return information and create a return. The list of retrievable information includes: 

* Sales order items that a Buyer can return
* Returns per customer
* Predefined reasons stored in the database

In your development, the API can help you:

* View order details, including returnable or non-returnable items
* Create returns for the returnable items
* View return details of a specific customer
* Specify reasons for returning the sales order items

 
{% info_block warningBox "Authentication" %}

Since the Return Management feature is available for logged-in users only, the endpoints provided by the API cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token in your REST requests. For details on how to authenticate a user and retrieve the token, see Authentication and Authorization.

{% endinfo_block %}


{% info_block infoBox "Info" %}

The response code samples and their attributes in this section are subject to change and should be used for reference purposes only.

{% endinfo_block %}

### Installation
For details on the modules that provide the API functionality and how to install them, see Glue: Return Management Feature Integration. <!-- add a link -->
