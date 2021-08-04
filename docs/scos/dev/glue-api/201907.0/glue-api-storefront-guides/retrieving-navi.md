---
title: Retrieving Navigation Trees
originalLink: https://documentation.spryker.com/v3/docs/retrieving-navigation-trees-201907
redirect_from:
  - /v3/docs/retrieving-navigation-trees-201907
  - /v3/docs/en/retrieving-navigation-trees-201907
---

Spryker offers the navigation feature, which enables shoppers to quickly navigate the shop and easily locate the necessary products and other content. For this purpose, backoffice users can create any number of navigations. Navigations come in a tree structure and can incorporate links to CMS pages, categories, as well as any other internal and external links.
        
The **Navigation API** provides the possibility to retrieve any navigation tree configured in Spryker.

{% info_block infoBox "Info" %}
The resources exposed by the API provide access to complete navigation trees only. Access to specific navigation elements is not supported.
{% endinfo_block %}

In your development, these resources can help you to retrieve all kinds of navigations available in Spryker and build navigation menus to guide customers through.

{% info_block infoBox "Info" %}
For more details on managing navigation trees, see [Navigation](/docs/scos/dev/features/202001.0/navigation/navigation
{% endinfo_block %}.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Navigation]<!-- (https://documentation.spryker.com/v3/docs/navigation-feature-integration-201907).-->

## Usage
To retrieve a navigation tree with detailed information on each node, send a GET request to the following endpoint:

[/navigations/{% raw %}{{{% endraw %}navigation_id{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/navigations)

Sample request: GET *http://glue.mysprykershop.com/navigations/**SOCIAL_LINKS***

where **SOCIAL_LINKS** is the ID of the navigation tree you want to retrieve.

{% info_block infoBox "Info" %}
Navigation IDs are case sensitive.
{% endinfo_block %}

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.</br>Sample header:</br>`[{"key":"Accept-Language","value":"de, en;q=0.9"}]`where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}.)

If the request was successful, the resource responds with a **RestNavigationResponse**.

**Response Fields**

| Field* | Type | Description |
| --- | --- | --- |
| name | String | Specifies the tree name. |
| isActive | Boolean | Specifies whether the tree is active.</br>If the value of the field is *true*, the tree should be displayed to the customer. Otherwise, the tree should be hidden. |
| locale | String | Specifies a locale for the tree. |
| nodes | Array | Specifies an array of node elements that comprise the navigation tree. |

In addition to that, each node element exposes the following fields:

| Field* | Type | Description |
| --- | --- | --- |
| title | String | Specifies the title that should be used to display the node anywhere on the frontend. |
| url | String | Specifies the URL link the node points to.<ul><li>If the `node_type` parameter is set to `cms_page`, `category` or `link`, the URL is relative to the application domain. For example, `/en/product-sets`.</li><li>If the `node_type` parameter is set to external_url, the URL contains an absolute URI. For example, `http://example.com/mypage.html`.</li><li>If the `node_type` parameter is set to label, the URL is always empty, because labels are intended to be text-only elements.</li></ul> |
| isActive | Boolean | Specifies whether the node is active.</br>If the value of the field is true, the node should be displayed to the customer. Otherwise, the node should be hidden. |
| nodeType | String | Specifies the node type. Should be one of the following values:<ul><li>**label** - specifies a simple label (text-only element);</li><li>**cms_page** - specifies a link to a CMS page;</li><li>**category** - specifies a link to a category page;</li><li>**link** - specifies a link to any page within the shop;</li><li>**external_url** - specifies a link to an external web site.</li></ul> |
| cssClass | String | Specifies the CSS class to be used to render the node. |
| validFrom | String | Specifies a date that the node is valid from. |
| validTo | String | Specifies a date that the node is valid to. |
| children | Array | Specifies an array of node elements that are nested within the current element. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample Response</summary>
    
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
    
</br>
</details>

In case if a navigation node represents a category and the value of its `nodeType` property is category, you can retrieve the category information without any extra calls to the `/category-nodes` endpoint. By doing so, you can save time and network traffic.

{% info_block infoBox "Performance Note" %}
Fetching the category information can affect the performance of the Navigation API. For this reason, it is recommended to fetch category information only when it is absolutely necessary.
{% endinfo_block %}

To include the category information, you need to extend the response of the resource with the `category-nodes` resource relationship. In this case, a set of attributes will be added for each category included in the response.

**Attribute List**

| Resource | Attributes* | Type | Description |
| --- | --- | --- | --- |
| category-nodes | nodeId | String | Category node ID. |
| category-nodes | name | String | Name of the category associated with the node. |
| category-nodes | metaTitle | String | Meta title of the category. |
| category-nodes | metaKeywords | String | Meta keywords of the category. |
| category-nodes | metaDescription | String | Meta description of the category. |
| category-nodes | isActive | Boolean | Specifies whether the category is active. |
| category-nodes | order | Integer | Category rank.</br>Allowed range: 1-100, where 100 is the highest rank (located on the same level as the parent node). |
| category-nodes | children | Array | Specifies an array of node elements that are nested within the current category. |
| category-nodes | parents | Array | Specifies an array of node elements that are parents for the current category. |

Sample Request: GET *http://glue.mysprykershop.com/navigations/MAIN_NAVIGATION?**include=category-nodes***

<details open>
<summary>Sample Response</summary>
    
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
              "url": "/en/telecom-&amp;-navigation/smartphones",
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
              "url": "/en/cameras-&amp;-camcorders/digital-cameras",
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
              "url": "/en/cameras-&amp;-camcorders/camcorders",
              "cssClass": null,
              "validFrom": null,
              "validTo": null
            }
          ],
          "isActive": true,
          "title": "Cameras",
          "url": "/en/cameras-&amp;-camcorders",
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
                  "url": "/en/telecom-&amp;-navigation/smartphones",
                  "cssClass": null,
                  "validFrom": null,
                  "validTo": null
                }
              ],
              "isActive": true,
              "title": "Telecom &amp; Navigation",
              "url": "/en/telecom-&amp;-navigation",
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
        "metaTitle": "Variant Showcase",
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
            "name": "Telecom &amp; Navigation",
            "metaTitle": "Telecom &amp; Navigation",
            "metaKeywords": "Telecom &amp; Navigation",
            "metaDescription": "Telecom &amp; Navigation",
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
        "name": "Telecom &amp; Navigation",
        "metaTitle": "Telecom &amp; Navigation",
        "metaKeywords": "Telecom &amp; Navigation",
        "metaDescription": "Telecom &amp; Navigation",
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
            "name": "Cameras &amp; Camcorders",
            "metaTitle": "Cameras &amp; Camcorders",
            "metaKeywords": "Cameras &amp; Camcorders",
            "metaDescription": "Cameras &amp; Camcorders",
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
            "name": "Cameras &amp; Camcorders",
            "metaTitle": "Cameras &amp; Camcorders",
            "metaKeywords": "Cameras &amp; Camcorders",
            "metaDescription": "Cameras &amp; Camcorders",
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
        "name": "Cameras &amp; Camcorders",
        "metaTitle": "Cameras &amp; Camcorders",
        "metaKeywords": "Cameras &amp; Camcorders",
        "metaDescription": "Cameras &amp; Camcorders",
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
    
</br>
</details>

### Possible Errors

| Status | Reason |
| --- | --- |
| 400 | Navigation ID is not specified. |
| 404 | Navigation not found. |

