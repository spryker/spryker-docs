---
title: Retrieving the Return Reasons
description: In this article, you will find details on how to retrieve the return reasons via the Spryker Glue API.
last_updated: Aug 11, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v5/docs/retrieving-the-return-reasons
originalArticleId: 6013be3e-9de7-40ec-88f6-e68b39454d5a
redirect_from:
  - /v5/docs/retrieving-the-return-reasons
  - /v5/docs/en/retrieving-the-return-reasons
related:
  - title: Retrieving Returnable Items
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/retrieving-returnable-items.html
  - title: Retrieving Return Management Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/retrieving-return-management-information.html
  - title: Retrieving the Returned Items
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/retrieving-the-returned-items.html
  - title: Creating a Return
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/creating-a-return.html
---

To retrieve a list of predefined return reasons, send the request:
***
`GET` **/return-reasons**
***
## Request
Sample request:  `GET https://glue.mysprykershop.com/return-reasons`

## Response
Sample response: 
```json
{
    "data": [
        {
            "type": "return-reasons",
            "id": null,
            "attributes": {
                "reason": "Damaged"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/return-reasons"
            }
        },
        {
            "type": "return-reasons",
            "id": null,
            "attributes": {
                "reason": "Wrong Item"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/return-reasons"
            }
        },
        {
            "type": "return-reasons",
            "id": null,
            "attributes": {
                "reason": "No longer needed"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/return-reasons"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/return-reasons"
    }
}
```

| Attribute* | Type | Description |
| --- | --- | --- |
| reason | String | Predefined return reason. |
/* The fields mentioned are all attributes in the response. Type and ID are not mentioned.
