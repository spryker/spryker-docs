---
title: Retrieving category trees
description: Retrieve a full navigation tree with child category nodes.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-category-trees
originalArticleId: 058b2860-6041-49c4-8d02-dd236447c329
redirect_from:
  - /2021080/docs/retrieving-category-trees
  - /2021080/docs/en/retrieving-category-trees
  - /docs/retrieving-category-trees
  - /docs/en/retrieving-category-trees
related:
  - title: Category Management feature overview
    link: docs/scos/user/features/page.version/category-management-feature-overview.html
---

By means of the category API, you are able to retrieve the exact structure of your category tree with its hierarchical characteristics.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Category API Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/category-management-feature-integration.html).

## Retrieve a category tree

To retrieve a full category tree, containing all available nodes and their children, send the request:

---
`GET` **/category-trees**

---

### Request

Sample request: `GET http://glue.mysprykershop.com/category-trees`

### Reponse

<details>
<summary markdown='span'>Response sample </summary>

```json
{
    "data": [
        {
            "type": "category-trees",
            "id": null,
            "attributes": {
                "categoryNodesStorage": [
                    {
                        "nodeId": 5,
                        "order": 100,
                        "name": "Computer",
                        "url": "/en/computer",
                        "children": [
                            {
                                "nodeId": 6,
                                "order": 100,
                                "name": "Notebooks",
                                "url": "/en/computer/notebooks",
                                "children": []
                            },
                            {
                                "nodeId": 7,
                                "order": 90,
                                "name": "Pc's/Workstations",
                                "url": "/en/computer/pc's/workstations",
                                "children": []
                            },
                            {
                                "nodeId": 8,
                                "order": 80,
                                "name": "Tablets",
                                "url": "/en/computer/tablets",
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 2,
                        "order": 90,
                        "name": "Cameras & Camcorders",
                        "url": "/en/cameras-&-camcorders",
                        "children": [
                            {
                                "nodeId": 4,
                                "order": 100,
                                "name": "Digital Cameras",
                                "url": "/en/cameras-&-camcorders/digital-cameras",
                                "children": []
                            },
                            {
                                "nodeId": 3,
                                "order": 90,
                                "name": "Camcorders",
                                "url": "/en/cameras-&-camcorders/camcorders",
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 15,
                        "order": 80,
                        "name": "Cables",
                        "url": "/en/cables",
                        "children": []
                    },
                    {
                        "nodeId": 11,
                        "order": 80,
                        "name": "Telecom & Navigation",
                        "url": "/en/telecom-&-navigation",
                        "children": [
                            {
                                "nodeId": 12,
                                "order": 80,
                                "name": "Smartphones",
                                "url": "/en/telecom-&-navigation/smartphones",
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 9,
                        "order": 70,
                        "name": "Smart Wearables",
                        "url": "/en/smart-wearables",
                        "children": [
                            {
                                "nodeId": 10,
                                "order": 70,
                                "name": "Smartwatches",
                                "url": "/en/smart-wearables/smartwatches",
                                "children": []
                            }
                        ]
                    },
                    {
                        "nodeId": 16,
                        "order": 50,
                        "name": "Fish",
                        "url": "/en/fish",
                        "children": [
                            {
                                "nodeId": 18,
                                "order": 50,
                                "name": "Vegetables",
                                "url": "/en/fish/vegetables",
                                "children": []
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/category-trees"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/category-trees"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| nodeId | String | Category node ID |
| order | Integer | Digits between 1 and 100, with 100 ranking the highest (on one level under the parent node) |
| name | String | Name of category associated with the node |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

## Next steps

[Retrieve a category node](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-categories/retrieving-category-nodes.html)
