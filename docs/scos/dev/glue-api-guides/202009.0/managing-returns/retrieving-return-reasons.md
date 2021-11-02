---
title: Retrieving return reasons
description: In this article, you will find details on how to retrieve the return reasons via the Spryker Glue API.
last_updated: Feb 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-return-reasons
originalArticleId: cc2ec9a6-530f-4c21-9271-24df3d0bbbc7
redirect_from:
  - /v6/docs/retrieving-return-reasons
  - /v6/docs/en/retrieving-return-reasons
related:
  - title: Managing the returns
    link: docs/scos/dev/glue-api-guides/page.version/managing-returns/managing-the-returns.html
---

This endpoint allows retrieving returns reasons.

## Installation
For details on the modules that provide the API functionality and how to install them, see [Glue API: Return Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-return-management-feature-integration.html)

## Retrieve return reasons


To retrieve return reasons, send the request:

***
`GET` **/return-reasons**
***

## Request
Request sample :  `GET https://glue.mysprykershop.com/return-reasons`

## Response


<details open>
    <summary markdown='span'>Response sample</summary>
    
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
    
</details>

| Attribute | Type | Description |
| --- | --- | --- |
| reason | String | Predefined return reason. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

