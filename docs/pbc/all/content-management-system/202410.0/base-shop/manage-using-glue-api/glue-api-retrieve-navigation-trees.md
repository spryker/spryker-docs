---
title: "Glue API: Retrieve navigation trees"
description: The topic demonstrates how to retrieve navigation trees with the help of API endpoints.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-navigation-trees
originalArticleId: 6dba4315-b7d0-485e-880e-b7d4ff125a3a
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/retrieving-navigation-trees.html
  - /docs/scos/dev/glue-api-guides/202311.0/retrieving-navigation-trees.html
  - /docs/pbc/all/content-management-system/202311.0/manage-using-glue-api/retrieve-navigation-trees.html
  - /docs/pbc/all/content-management-system/202311.0/base-shop/manage-using-glue-api/retrieve-navigation-trees.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-navigation-trees.html
related:
  - title: Upgrade the NavigationsRestApi module
    link: docs/pbc/all/content-management-system/page.version/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-navigationsrestapi-module.html
  - title: Retrieving category trees
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/categories/glue-api-retrieve-category-trees.html
---

The Navigation <!-- add link to feature overview later --> feature enables back-end developers to create navigation elements for Storefront. The navigation elements help shop users to navigate the shop and locate the necessary products and other content. Navigation elements can be linked to CMS pages, categories, as well as internal and external links.

A navigation element with its child nodes forms a navigation tree. You can only retrieve the entire navigation tree but not a navigation element.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Navigation](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-navigation-feature.html).

## Retrieving a navigation tree

To retrieve a navigation tree, send the request:

---
`GET`**/navigations/*{% raw %}{{{% endraw %}navigation_key{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}navigation_key{% raw %}}}{% endraw %}*** | Unique identifier of a navigation tree to get information for. It is always case sensitive. |

### Request

Request sample: `GET http://glue.mysprykershop.com/navigations/SOCIAL_LINKS`


| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | category-nodes |

{% info_block infoBox "Performance" %}

If a navigation tree has a category child node, include the `category-nodes` resource to retrieve the category information without extra calls to the `/category-nodes` endpoint. Retrieving the category information can affect the performance of the Navigation API. We recommend doing it only when it's absolutely necessary.

{% endinfo_block %}

### Response

<details>
<summary>Response sample</summary>

```json
{
    "data": {
        "type": "navigations",
        "id": "SOCIAL_LINKS",
        "attributes": {
            "name": "Social links",
            "isActive": true,
            "locale": null,
            "nodes": [
                {
                    "isActive": true,
                    "nodeType": "external_url",
                    "title": "Twitter",
                    "url": "https://twitter.com/sprysys?lang=de",
                    "cssClass": "twitter",
                    "validFrom": null,
                    "validTo": null,
                    "children": []
                },
                {
                    "isActive": true,
                    "nodeType": "external_url",
                    "title": "Xing",
                    "url": "https://www.xing.com/companies/sprykersystemsgmbh",
                    "cssClass": "xing",
                    "validFrom": null,
                    "validTo": null,
                    "children": []
                },
                {
                    "isActive": true,
                    "nodeType": "external_url",
                    "title": "LinkedIn",
                    "url": "https://www.linkedin.com/company/spryker-systems-gmbh",
                    "cssClass": "linkedin",
                    "validFrom": null,
                    "validTo": null,
                    "children": []
                },
                {
                    "isActive": true,
                    "nodeType": "external_url",
                    "title": "YouTube",
                    "url": "https://www.youtube.com/channel/UC6lVOEbqXxUh0W5FMTvlPDQ",
                    "cssClass": "youtube",
                    "validFrom": null,
                    "validTo": null,
                    "children": []
                }
            ]
        },
        "links": {
            "self": "http://glue.mysprykershop.com/navigations/SOCIAL_LINKS"
        }
    }
}
```

</details>

<details>
<summary>Response sample with category nodes</summary>

```json
{
  "data": {
    "type": "navigations",
    "id": "MAIN_NAVIGATION",
    "attributes": {
      "nodes": [
        {
          "resourceId": null,
          "nodeType": "label",
          "children": [
            {
              "resourceId": 6,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Notebooks",
              "url": "/en/computer/notebooks",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 8,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Tablets",
              "url": "/en/computer/tablets",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 12,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Smartphones",
              "url": "/en/telecom-&-navigation/smartphones",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 10,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Smartwatches",
              "url": "/en/smart-wearables/smartwatches",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            }
          ],
          "isActive": true,
          "title": "Top Categories",
          "url": null,
          "cssClass": null,
          "validFrom": null,
          "validTo": null
        },
        {
          "resourceId": 5,
          "nodeType": "category",
          "children": [
            {
              "resourceId": 6,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Notebooks",
              "url": "/en/computer/notebooks",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 7,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Workstations",
              "url": "/en/computer/pc's/workstations",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 8,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Tablets",
              "url": "/en/computer/tablets",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            }
          ],
          "isActive": true,
          "title": "Computer",
          "url": "/en/computer",
          "cssClass": null,
          "validFrom": null,
          "validTo": null
        },
        {
          "resourceId": 2,
          "nodeType": "category",
          "children": [
            {
              "resourceId": 4,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Digital Cameras",
              "url": "/en/cameras-&-camcorders/digital-cameras",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 3,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Camcorders",
              "url": "/en/cameras-&-camcorders/camcorders",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            }
          ],
          "isActive": true,
          "title": "Cameras",
          "url": "/en/cameras-&-camcorders",
          "cssClass": null,
          "validFrom": null,
          "validTo": null
        },
        {
          "resourceId": null,
          "nodeType": "label",
          "children": [
            {
              "resourceId": 11,
              "nodeType": "category",
              "children": [
                {
                  "resourceId": 12,
                  "nodeType": "category",
                  "children": [],
                  "isActive": true,
                  "title": "Smartphones",
                  "url": "/en/telecom-&-navigation/smartphones",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                }
              ],
              "isActive": true,
              "title": "Telecom & Navigation",
              "url": "/en/telecom-&-navigation",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 9,
              "nodeType": "category",
              "children": [
                {
                  "resourceId": 10,
                  "nodeType": "category",
                  "children": [],
                  "isActive": true,
                  "title": "Smartwatches",
                  "url": "/en/smart-wearables/smartwatches",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                }
              ],
              "isActive": true,
              "title": "Smart Wearables",
              "url": "/en/smart-wearables",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            }
          ],
          "isActive": true,
          "title": "Other Categories",
          "url": null,
          "cssClass": null,
          "validFrom": null,
          "validTo": null
        },
        {
          "resourceId": null,
          "nodeType": "label",
          "children": [
            {
              "resourceId": null,
              "nodeType": "label",
              "children": [
                {
                  "resourceId": 2,
                  "nodeType": "cms_page",
                  "children": [],
                  "isActive": true,
                  "title": "GTC",
                  "url": "/en/gtc",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                },
                {
                  "resourceId": 3,
                  "nodeType": "cms_page",
                  "children": [],
                  "isActive": true,
                  "title": "Data privacy",
                  "url": "/en/privacy",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                },
                {
                  "resourceId": 6,
                  "nodeType": "cms_page",
                  "children": [],
                  "isActive": true,
                  "title": "Demo Landing Page",
                  "url": "/en/demo-landing-page",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                }
              ],
              "isActive": true,
              "title": "CMS Pages",
              "url": null,
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": null,
              "nodeType": "label",
              "children": [
                {
                  "resourceId": null,
                  "nodeType": "external_url",
                  "children": [],
                  "isActive": true,
                  "title": "Spryker Tech Blog",
                  "url": "https://tech.spryker.com/",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                },
                {
                  "resourceId": null,
                  "nodeType": "external_url",
                  "children": [],
                  "isActive": true,
                  "title": "Spryker Documentation",
                  "url": "http://spryker.github.io",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                }
              ],
              "isActive": true,
              "title": "External Links",
              "url": null,
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 13,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Product Bundles",
              "url": "/en/product-bundles",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": null,
              "nodeType": "link",
              "children": [],
              "isActive": true,
              "title": "Product Sets",
              "url": "/en/product-sets",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            },
            {
              "resourceId": 14,
              "nodeType": "category",
              "children": [],
              "isActive": true,
              "title": "Variant Showcase",
              "url": "/en/variant-showcase",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            }
          ],
          "isActive": true,
          "title": "More",
          "url": null,
          "cssClass": null,
          "validFrom": null,
          "validTo": null
        },
        {
          "resourceId": null,
          "nodeType": "link",
          "children": [],
          "isActive": true,
          "title": "Sale %",
          "url": "/en/outlet",
          "cssClass": "sale__red",
          "validFrom": null,
          "validTo": null
        },
        {
          "resourceId": null,
          "nodeType": "link",
          "children": [],
          "isActive": true,
          "title": "New",
          "url": "/en/new",
          "cssClass": null,
          "validFrom": null,
          "validTo": null
        }
      ],
      "name": "Top Navigation",
      "isActive": true
    },
    "links": {
      "self": "http://glue.mysprykershop.com/navigations/MAIN_NAVIGATION"
    },
    "relationships": {
      "category-nodes": {
        "data": [
          {
            "type": "category-nodes",
            "id": "13"
          },
          {
            "type": "category-nodes",
            "id": "14"
          },
          {
            "type": "category-nodes",
            "id": "10"
          },
          {
            "type": "category-nodes",
            "id": "12"
          },
          {
            "type": "category-nodes",
            "id": "11"
          },
          {
            "type": "category-nodes",
            "id": "9"
          },
          {
            "type": "category-nodes",
            "id": "4"
          },
          {
            "type": "category-nodes",
            "id": "3"
          },
          {
            "type": "category-nodes",
            "id": "6"
          },
          {
            "type": "category-nodes",
            "id": "7"
          },
          {
            "type": "category-nodes",
            "id": "8"
          },
          {
            "type": "category-nodes",
            "id": "5"
          },
          {
            "type": "category-nodes",
            "id": "2"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "category-nodes",
      "id": "13",
      "attributes": {
        "nodeId": 13,
        "name": "Product Bundles",
        "metaTitle": "Product Bundles",
        "metaKeywords": "Product Bundles",
        "metaDescription": "These are multiple products bundled to a new product.",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 1,
            "name": "Demoshop",
            "metaTitle": "Demoshop",
            "metaKeywords": "English version of Demoshop",
            "metaDescription": "English version of Demoshop",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": null
          }
        ],
        "order": 60
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/13"
      }
    },
    {
      "type": "category-nodes",
      "id": "14",
      "attributes": {
        "nodeId": 14,
        "name": "Variant Showcase",
        "metaTitle": "Variant Showcase"w,
        "metaKeywords": "Variant Showcase",
        "metaDescription": "These are products that have more than 1 variant.",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 1,
            "name": "Demoshop",
            "metaTitle": "Demoshop",
            "metaKeywords": "English version of Demoshop",
            "metaDescription": "English version of Demoshop",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": null
          }
        ],
        "order": 50
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/14"
      }
    },
    {
      "type": "category-nodes",
      "id": "10",
      "attributes": {
        "nodeId": 10,
        "name": "Smartwatches",
        "metaTitle": "Smartwatches",
        "metaKeywords": "Smartwatches",
        "metaDescription": "Smartwatches",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 9,
            "name": "Smart Wearables",
            "metaTitle": "Smart Wearables",
            "metaKeywords": "Smart Wearables",
            "metaDescription": "Smart Wearables",
            "isActive": true,
            "children": [],
            "parents": [
              {
                "nodeId": 1,
                "name": "Demoshop",
                "metaTitle": "Demoshop",
                "metaKeywords": "English version of Demoshop",
                "metaDescription": "English version of Demoshop",
                "isActive": true,
                "children": [],
                "parents": [],
                "order": null
              }
            ],
            "order": 70
          }
        ],
        "order": 70
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/10"
      }
    },
    {
      "type": "category-nodes",
      "id": "12",
      "attributes": {
        "nodeId": 12,
        "name": "Smartphones",
        "metaTitle": "Smartphones",
        "metaKeywords": "Smartphones",
        "metaDescription": "Smartphones",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 11,
            "name": "Telecom & Navigation",
            "metaTitle": "Telecom & Navigation",
            "metaKeywords": "Telecom & Navigation",
            "metaDescription": "Telecom & Navigation",
            "isActive": true,
            "children": [],
            "parents": [
              {
                "nodeId": 1,
                "name": "Demoshop",
                "metaTitle": "Demoshop",
                "metaKeywords": "English version of Demoshop",
                "metaDescription": "English version of Demoshop",
                "isActive": true,
                "children": [],
                "parents": [],
                "order": null
              }
            ],
            "order": 80
          }
        ],
        "order": 80
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/12"
      }
    },
    {
      "type": "category-nodes",
      "id": "11",
      "attributes": {
        "nodeId": 11,
        "name": "Telecom & Navigation",
        "metaTitle": "Telecom & Navigation",
        "metaKeywords": "Telecom & Navigation",
        "metaDescription": "Telecom & Navigation",
        "isActive": true,
        "children": [
          {
            "nodeId": 12,
            "name": "Smartphones",
            "metaTitle": "Smartphones",
            "metaKeywords": "Smartphones",
            "metaDescription": "Smartphones",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": 80
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
            "children": [],
            "parents": [],
            "order": null
          }
        ],
        "order": 80
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/11"
      }
    },
    {
      "type": "category-nodes",
      "id": "9",
      "attributes": {
        "nodeId": 9,
        "name": "Smart Wearables",
        "metaTitle": "Smart Wearables",
        "metaKeywords": "Smart Wearables",
        "metaDescription": "Smart Wearables",
        "isActive": true,
        "children": [
          {
            "nodeId": 10,
            "name": "Smartwatches",
            "metaTitle": "Smartwatches",
            "metaKeywords": "Smartwatches",
            "metaDescription": "Smartwatches",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": 70
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
            "children": [],
            "parents": [],
            "order": null
          }
        ],
        "order": 70
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/9"
      }
    },
    {
      "type": "category-nodes",
      "id": "4",
      "attributes": {
        "nodeId": 4,
        "name": "Digital Cameras",
        "metaTitle": "Digital Cameras",
        "metaKeywords": "Digital Cameras",
        "metaDescription": "Digital Cameras",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 2,
            "name": "Cameras & Camcorders",
            "metaTitle": "Cameras & Camcorders",
            "metaKeywords": "Cameras & Camcorders",
            "metaDescription": "Cameras & Camcorders",
            "isActive": true,
            "children": [],
            "parents": [
              {
                "nodeId": 1,
                "name": "Demoshop",
                "metaTitle": "Demoshop",
                "metaKeywords": "English version of Demoshop",
                "metaDescription": "English version of Demoshop",
                "isActive": true,
                "children": [],
                "parents": [],
                "order": null
              }
            ],
            "order": 90
          }
        ],
        "order": 100
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/4"
      }
    },
    {
      "type": "category-nodes",
      "id": "3",
      "attributes": {
        "nodeId": 3,
        "name": "Camcorders",
        "metaTitle": "Camcorders",
        "metaKeywords": "Camcorders",
        "metaDescription": "Camcorders",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 2,
            "name": "Cameras & Camcorders",
            "metaTitle": "Cameras & Camcorders",
            "metaKeywords": "Cameras & Camcorders",
            "metaDescription": "Cameras & Camcorders",
            "isActive": true,
            "children": [],
            "parents": [
              {
                "nodeId": 1,
                "name": "Demoshop",
                "metaTitle": "Demoshop",
                "metaKeywords": "English version of Demoshop",
                "metaDescription": "English version of Demoshop",
                "isActive": true,
                "children": [],
                "parents": [],
                "order": null
              }
            ],
            "order": 90
          }
        ],
        "order": 90
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/3"
      }
    },
    {
      "type": "category-nodes",
      "id": "6",
      "attributes": {
        "nodeId": 6,
        "name": "Notebooks",
        "metaTitle": "Notebooks",
        "metaKeywords": "Notebooks",
        "metaDescription": "Notebooks",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 5,
            "name": "Computer",
            "metaTitle": "Computer",
            "metaKeywords": "Computer",
            "metaDescription": "Computer",
            "isActive": true,
            "children": [],
            "parents": [
              {
                "nodeId": 1,
                "name": "Demoshop",
                "metaTitle": "Demoshop",
                "metaKeywords": "English version of Demoshop",
                "metaDescription": "English version of Demoshop",
                "isActive": true,
                "children": [],
                "parents": [],
                "order": null
              }
            ],
            "order": 100
          }
        ],
        "order": 100
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/6"
      }
    },
    {
      "type": "category-nodes",
      "id": "7",
      "attributes": {
        "nodeId": 7,
        "name": "Pc's/Workstations",
        "metaTitle": "Pc's/Workstations",
        "metaKeywords": "Pc's/Workstations",
        "metaDescription": "Pc's/Workstations",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 5,
            "name": "Computer",
            "metaTitle": "Computer",
            "metaKeywords": "Computer",
            "metaDescription": "Computer",
            "isActive": true,
            "children": [],
            "parents": [
              {
                "nodeId": 1,
                "name": "Demoshop",
                "metaTitle": "Demoshop",
                "metaKeywords": "English version of Demoshop",
                "metaDescription": "English version of Demoshop",
                "isActive": true,
                "children": [],
                "parents": [],
                "order": null
              }
            ],
            "order": 100
          }
        ],
        "order": 90
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/7"
      }
    },
    {
      "type": "category-nodes",
      "id": "8",
      "attributes": {
        "nodeId": 8,
        "name": "Tablets",
        "metaTitle": "Tablets",
        "metaKeywords": "Tablets",
        "metaDescription": "Tablets",
        "isActive": true,
        "children": [],
        "parents": [
          {
            "nodeId": 5,
            "name": "Computer",
            "metaTitle": "Computer",
            "metaKeywords": "Computer",
            "metaDescription": "Computer",
            "isActive": true,
            "children": [],
            "parents": [
              {
                "nodeId": 1,
                "name": "Demoshop",
                "metaTitle": "Demoshop",
                "metaKeywords": "English version of Demoshop",
                "metaDescription": "English version of Demoshop",
                "isActive": true,
                "children": [],
                "parents": [],
                "order": null
              }
            ],
            "order": 100
          }
        ],
        "order": 80
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/8"
      }
    },
    {
      "type": "category-nodes",
      "id": "5",
      "attributes": {
        "nodeId": 5,
        "name": "Computer",
        "metaTitle": "Computer",
        "metaKeywords": "Computer",
        "metaDescription": "Computer",
        "isActive": true,
        "children": [
          {
            "nodeId": 6,
            "name": "Notebooks",
            "metaTitle": "Notebooks",
            "metaKeywords": "Notebooks",
            "metaDescription": "Notebooks",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": 100
          },
          {
            "nodeId": 7,
            "name": "Pc's/Workstations",
            "metaTitle": "Pc's/Workstations",
            "metaKeywords": "Pc's/Workstations",
            "metaDescription": "Pc's/Workstations",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": 90
          },
          {
            "nodeId": 8,
            "name": "Tablets",
            "metaTitle": "Tablets",
            "metaKeywords": "Tablets",
            "metaDescription": "Tablets",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": 80
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
            "children": [],
            "parents": [],
            "order": null
          }
        ],
        "order": 100
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/5"
      }
    },
    {
      "type": "category-nodes",
      "id": "2",
      "attributes": {
        "nodeId": 2,
        "name": "Cameras & Camcorders",
        "metaTitle": "Cameras & Camcorders",
        "metaKeywords": "Cameras & Camcorders",
        "metaDescription": "Cameras & Camcorders",
        "isActive": true,
        "children": [
          {
            "nodeId": 4,
            "name": "Digital Cameras",
            "metaTitle": "Digital Cameras",
            "metaKeywords": "Digital Cameras",
            "metaDescription": "Digital Cameras",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": 100
          },
          {
            "nodeId": 3,
            "name": "Camcorders",
            "metaTitle": "Camcorders",
            "metaKeywords": "Camcorders",
            "metaDescription": "Camcorders",
            "isActive": true,
            "children": [],
            "parents": [],
            "order": 90
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
            "children": [],
            "parents": [],
            "order": null
          }
        ],
        "order": 90
      },
      "links": {
        "self": "http://glue.mysprykershop.com/category-nodes/2"
      }
    }
  ]
}
```

<br>
</details>

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| name | String | Specifies the tree name. |
| isActive | Boolean | Specifies whether the tree is active.<br>If the value of the field is *true*, the tree should be displayed to the customer. Otherwise, the tree should be hidden. |
| locale | String | Specifies a locale for the tree. |
| nodes | Array | Specifies an array of node elements that comprise the navigation tree. |
| title | String | Specifies the title that should be used to display the node anywhere on the frontend. |
| url | String | Specifies the URL link the node points to.<ul><li>If the `node_type` parameter is set to `cms_page`, `category` or `link`, the URL is relative to the application domain. For example, `/en/product-sets`.</li><li>If the `node_type` parameter is set to external_url, the URL contains an absolute URI. For example, `http://example.com/mypage.html`.</li><li>If the `node_type` parameter is set to label, the URL is always empty, because labels are intended to be text-only elements.</li></ul> |
| isActive | Boolean | Specifies whether the node is active.<br>If the value of the field is true, the node should be displayed to the customer. Otherwise, the node should be hidden. |
| nodeType | String | Specifies the node type. Should be one of the following values:<ul><li>**label**—specifies a simple label (text-only element).</li><li>**cms_page**—specifies a link to a CMS page;</li><li>**category**—specifies a link to a category page.</li><li>**link**—specifies a link to any page within the shop.</li><li>**external_url**—specifies a link to an external web site.</li></ul> |
| cssClass | String | Specifies the CSS class to be used to render the node. |
| validFrom | String | Specifies a date that the node is valid from. |
| validTo | String | Specifies a date that the node is valid to. |
| children | Array | Specifies an array of node elements that are nested within the current element. |

{% include pbc/all/glue-api-guides/{{page.version}}/category-nodes-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/category-nodes-response-attributes.md -->


### Possible errors

| CODE | REASON |
| --- | --- |
| 1601 | Navigation is not found. |
| 1602 | Navigation ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
