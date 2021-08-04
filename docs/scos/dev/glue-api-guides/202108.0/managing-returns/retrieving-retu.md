---
title: Retrieving return reasons
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-return-reasons
redirect_from:
  - /2021080/docs/retrieving-return-reasons
  - /2021080/docs/en/retrieving-return-reasons
---

This endpoint allows retrieving returns reasons.

## Installation
For details on the modules that provide the API functionality and how to install them, see [Glue API: Return Management feature integration](https://documentation.spryker.com/docs/glue-api-return-management-feature-integration)

## Retrieve return reasons


To retrieve return reasons, send the request:

***
`GET` **/return-reasons**
***

## Request
Request sample :  `GET https://glue.mysprykershop.com/return-reasons`

## Response


<details open>
    <summary>Response sample</summary>
    
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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

