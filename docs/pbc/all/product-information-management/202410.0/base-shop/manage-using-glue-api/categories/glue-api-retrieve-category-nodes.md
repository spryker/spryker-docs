---
title: "Glue API: Retrieving category nodes"
description: Retrieve information about category nodes within your Spryker Cloud Commerce OS Project using the Spryker GLUE API
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-category-nodes
originalArticleId: 1e544fa3-90d1-449f-8d32-54a18f9b2631
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/retrieving-categories/retrieving-category-nodes.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-nodes.html
related:
  - title: Retrieving category trees
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html
  - title: Category Management feature overview
    link: docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/category-management-feature-overview.html
---

This endpoint allows retrieving category nodes.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Category API Feature Integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-category-management-feature.html).

## Retrieve a category node

To retrieve a category node, send the request:

---
`GET` **/category-nodes/*{% raw %}{{{% endraw %}node_id{% raw %}}}{% endraw %}***

---

|PATH PARAMETER | DESCRIPTION |
|---|---|
| ***node_id*** | ID of a node to get information for. [Retrieve a category tree](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html#retrieve-a-category-tree) to get a full list of node IDs. |

### Request

Request sample: retrieve a category node

`GET http://glue.mysprykershop.com/category-nodes/5`

### Response

<details>
<summary>Response sample: retrieve a category node</summary>

```json
{
    "data": {
        "type": "category-nodes",
        "id": "5",
        "attributes": {
            "nodeId": 5,
            "name": "Computer",
            "metaTitle": "Computer",
            "metaKeywords": "Computer",
            "metaDescription": "Computer",
            "isActive": true,
            "order": 100,
            "url": "/en/computer",
            "children": [
                {
                    "nodeId": 6,
                    "name": "Notebooks",
                    "metaTitle": "Notebooks",
                    "metaKeywords": "Notebooks",
                    "metaDescription": "Notebooks",
                    "isActive": true,
                    "order": 100,
                    "url": "/en/computer/notebooks",
                    "children": [],
                    "parents": []
                },
                {
                    "nodeId": 7,
                    "name": "Pc's/Workstations",
                    "metaTitle": "Pc's/Workstations",
                    "metaKeywords": "Pc's/Workstations",
                    "metaDescription": "Pc's/Workstations",
                    "isActive": true,
                    "order": 90,
                    "url": "/en/computer/pc's/workstations",
                    "children": [],
                    "parents": []
                },
                {
                    "nodeId": 8,
                    "name": "Tablets",
                    "metaTitle": "Tablets",
                    "metaKeywords": "Tablets",
                    "metaDescription": "Tablets",
                    "isActive": true,
                    "order": 80,
                    "url": "/en/computer/tablets",
                    "children": [],
                    "parents": []
                }
            ],
            "parents": [
                {
                    "nodeId": 1,
                    "name": "Demoshop",
                    "metaTitle": "Demoshop",
                    "metaKeywords": "English version of Demoshop",
                    "metaDescription": "English version of Demoshop",
                    "isActive": true,
                    "order": null,
                    "url": "/en",
                    "children": [],
                    "parents": []
                }
            ]
        },
        "links": {
            "self": "http://glue.mysprykershop.com/category-nodes/5"
        }
    }
}
```

</details>

{% include /pbc/all/glue-api-guides/{{page.version}}/category-nodes-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/{{page.version}}/category-nodes-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 701 | Node ID not specified or invalid. |
| 703 | Node with the specified ID was not found. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
