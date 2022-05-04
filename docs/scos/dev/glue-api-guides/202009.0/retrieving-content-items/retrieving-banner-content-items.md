---
title: Retrieving banner content items
description: Retrieve information about banner content items via Glue API.
last_updated: Feb 1, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-banner-content-items
originalArticleId: 15bb2260-48d3-4535-a3e1-de38fc7dd7e8
redirect_from:
  - /v6/docs/retrieving-banner-content-items
  - /v6/docs/en/retrieving-banner-content-items
related:
  - title: REST API Reference
    link: docs/scos/dev/glue-api-guides/page.version/rest-api-reference.html
  - title: Content Items Feature Overview
    link: docs/scos/user/features/page.version/content-items-feature-overview.html
---

This endpoint allows retrieving information about banner content items.


## Installation
For details on the modules that provide the API functionality and how to install them, see [Content Items API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-content-items-feature-integration.html).

## Retrieve a banner content item
To retrieve information about a banner content item, send the request:

***
`GET` **/content-banners/*{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}***
***

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}content_item_key{% raw %}}}{% endraw %}*** | Unique identifier of the content item to retrieve. |

### Request

| Header key | Required | Description |
| --- | --- | --- |
| locale |  | Defines the locale to retreive the content item information for. If not specified, the endpoint returns the information for the *default* locale.  |

Request sample : `GET https://glue.mysprykershop.com/content-banners/br-3`


### Response 

Response sample:
    
```json
{
	"data": {
		"type": "content-banners",
		"id": "br-3",
		"attributes": {
			"title": "Cameras Winter Collection",
			"subtitle": "The best cameras in winter 2019",
			"imageUrl": "http://d2s0ynfc62ej12.cloudfront.net/b2c/17360369_3328.jpg",
			"clickUrl": "/en/canon-powershot-n-35",
			"altText": "Best selling cameras in winter"
		},
		"links": {
			"self": "https://glue.mysprykershop.com/content-banners/br-3"
		}
	}
}
```

| Attribute | Type | Description |
| --- | --- | --- |
| title |  string| Heading of the banner. |
|subtitle|string  | Secondary message that clarifies a title to shop visitors. |
|imageUrl  | string | Address to where the image element of the banner is stored. |
| clickUrl | string | URL of the target page to which your shop visitors are redirected. |
| altText | string | Text that describes the image. |

## Possible errors

| Code | Reason |
| --- | --- |
| 2201 | Content not found. |
|2202  | Content key is missing. |
| 2203 | Content type is invalid. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

