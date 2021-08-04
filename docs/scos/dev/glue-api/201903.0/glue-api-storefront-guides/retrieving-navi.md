---
title: Retrieving Navigation Trees
originalLink: https://documentation.spryker.com/v2/docs/retrieving-navigation-trees-201903
redirect_from:
  - /v2/docs/retrieving-navigation-trees-201903
  - /v2/docs/en/retrieving-navigation-trees-201903
---

Spryker offers the navigation feature, which enables shoppers to quickly navigate the shop and easily locate the necessary products and other content. For this purpose, backoffice users can create any number of navigations. Navigations come in a tree structure and can incorporate links to CMS pages, categories, as well as any other internal and external links.

The **Navigation API** provides the possibility to retrieve any navigation tree configured in Spryker.

{% info_block infoBox %}
The resources exposed by the API provide access to complete navigation trees only. Access to specific navigation elements is not supported.
{% endinfo_block %}

In your development, these resources can help you to retrieve all kinds of navigations available in Spryker and build navigation menus to guide customers through.

{% info_block infoBox %}
For more details on managing navigation trees, see [Navigation](/docs/scos/dev/features/201903.0/navigation/navigation
{% endinfo_block %}.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Navigation](https://documentation.spryker.com/v2/docs/navigation-api-feature-integration-1).

## Usage
To retrieve a navigation tree with detailed information on each node, send a GET request to the following endpoint:
`/navigations/{% raw %}{{{% endraw %}navigation_id{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/navigations/SOCIAL_LINKS`
where `SOCIAL_LINKS` is the ID of the navigation tree you want to retrieve.

{% info_block infoBox %}
Navigation IDs are case sensitive.
{% endinfo_block %}
If the request was successful, the resource responds with a **RestNavigationResponse**.

#### Response Fields
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Specifies the tree name. |
| isActive | Boolean | Specifies whether the tree is active.<br>If the value of the field is true, the tree should be displayed to the customer. Otherwise, the tree should be hidden.<br>locale | String | Specifies a locale for the tree. |
| nodes | Array | Specifies an array of node elements that comprise the navigation tree. |

In addition to that, each node element exposes the following fields:
| Field* | Type | Description |
| --- | --- | --- |
| title | String | Specifies the title that should be used to display the node anywhere on the frontend. |
| url | String | Specifies the URL link the node points to.<br>If the **node_type** parameter is set to **cms_page**, **category** or link, the URL is relative to the application domain. For example, `/en/product-sets`.<br><ul><li>If the **node_type** parameter is set to **external_url**, the URL contains an absolute URI. For example, `http://example.com/mypage.html`.</li><li>If the **node_type** parameter is set to **external_url**, the URL contains an absolute URI. For example, `http://example.com/mypage.html`.</li><li>If the **node_type** parameter is set to label, the URL is always empty, because labels are intended to be text-only elements.</li></ul> | 
| isActive | Boolean | Specifies whether the node is active.<br>If the value of the field is true, the node should be displayed to the customer. Otherwise, the node should be hidden. |
| nodeType | String | Specifies the node type. Should be one of the following values:<br><ul><li>**label** - specifies a simple label (text-only element);</li><li>**cms_page** - specifies a link to a CMS page;</li><li>**category** - specifies a link to a category page;</li><li>**link** - specifies a link to any page within the shop;</li><li>**external_url** - specifies a link to an external web site.</li></ul>|
| cssClass | String | Specifies the CSS class to be used to render the node. |
| validFrom | String | Specifies a date that the node is valid **from**. |
| validTo | String | Specifies a date that the node is valid **to**. |
| children | Array | Specifies an array of **node** elements that are nested within the current element. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

#### Sample Response

```js
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
            "self": "http://mysprykershop.com/navigations/SOCIAL_LINKS"
        }
    }
}
```

{% info_block infoBox %}
You can also use the **Accept-Language** header to specify the locale.<br>Sample header:<br>`[{"key":"Accept-Language","value":"de, en;q=0.9"}]`<br>where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}.)

## Possible Errors
| Code | Reason |
| --- | --- |
| 400 | Navigation ID is not specified. |
| 404 | Navigation not found. |
