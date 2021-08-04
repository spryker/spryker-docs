---
title: Retrieving banner content items
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-banner-content-items
redirect_from:
  - /2021080/docs/retrieving-banner-content-items
  - /2021080/docs/en/retrieving-banner-content-items
---

This endpoint allows retrieving information about banner content items.


## Installation
For details on the modules that provide the API functionality and how to install them, see [Content Items API](https://documentation.spryker.com/docs/content-items-api-feature-integration).

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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

