---
title: "Glue API: Retrieve return reasons"
description: In this article, you will find details on how to retrieve the return reasons via the Spryker Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/return-management/202311.0/manage-using-glue-api/glue-api-retrieve-return-reasons.html
  - /docs/pbc/all/return-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-return-reasons.html
related:
  - title: Managing the returns
    link: docs/pbc/all/return-management/latest/base-shop/manage-using-glue-api/glue-api-manage-returns.html
  - title: Return Management feature overview
    link: docs/pbc/all/return-management/latest/return-management.html
---

{% info_block warningBox "This page is at least 4 years old and thus might contain outdated information." %}

Please raise a support request if you suspect that it requires an update.

{% endinfo_block %}


This endpoint allows retrieving returns reasons.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Install the Return Management Glue API](/docs/pbc/all/return-management/latest/base-shop/install-and-upgrade/install-the-return-management-glue-api.html)

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
<summary>Response sample: retrieve return reasons</summary>

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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
