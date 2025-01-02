---
title: "Glue API: Retrieve return reasons"
description: In this article, you will find details on how to retrieve the return reasons via the Spryker Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-return-reasons
originalArticleId: 469a4a94-e7b3-4c0c-a814-837f20bdc9e4
redirect_from:
  - /docs/pbc/all/return-management/202311.0/manage-using-glue-api/glue-api-retrieve-return-reasons.html
  - /docs/pbc/all/return-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-return-reasons.html
related:
  - title: Managing the returns
    link: docs/pbc/all/return-management/page.version/base-shop/manage-using-glue-api/glue-api-manage-returns.html
  - title: Return Management feature overview
    link: docs/pbc/all/return-management/page.version/return-management.html
---

This endpoint allows retrieving returns reasons.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Install the Return Management Glue API](/docs/pbc/all/return-management/{{page.version}}/base-shop/install-and-upgrade/install-the-return-management-glue-api.html)

## Retrieve return reasons

To retrieve return reasons, send the request:

***
`GET` **/return-reasons**
***

## Request

Request sample: retrieve return reasons

`GET https://glue.mysprykershop.com/return-reasons`

## Response

<details>
<summary>Response sample: retrieve return reasons
</summary>

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

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| reason | String | Predefined return reason. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
