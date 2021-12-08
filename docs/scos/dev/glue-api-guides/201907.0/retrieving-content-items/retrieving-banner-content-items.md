---
title: Retrieving Banner Content Item Data
last_updated: Jan 27, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v3/docs/retrieving-banner-content-item-data-201907
originalArticleId: f47ffa45-8710-4058-b8e0-241e574f6c83
redirect_from:
  - /v3/docs/retrieving-banner-content-item-data-201907
  - /v3/docs/en/retrieving-banner-content-item-data-201907
related:
  - title: REST API Reference
    link: docs/scos/dev/glue-api-guides/page.version/rest-api-reference.html
---

The **Banner API** implements REST API endpoint that provides the possibility to retrieve Banner content item data available in the storage.

In your development, these resources can help you get relevant information for your Banner content item for all or a specific locale. For example, you can view what page address your banner is linked to or what details are displayed for a specific locale.

{% info_block infoBox %}

For more information on creating and managing content items in CMS, see [Content Items](/docs/scos/user/back-office-user-guides/{{page.version}}/content-management/content-items/content-items.html).

{% endinfo_block %}

## Installation
For details on the modules that provide the API functionality and how to install them, see [Content Items API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/content-items-apifeature-integration.html).

## Retrieving Banner Content Item Data
To retrieve the Banner content item data, send a GET request to the following endpoint:

/content-banners/{content_item_key}

Sample request: _GET http://mysprykershop.com/content-banners/br-3_
where **content-banners** is the content item type and **br-3** is the key of the Banner content item you want to retrieve.

{% info_block infoBox %}

The locale must be specified in the **header** of the GET request. If no locale is specified, data from the **default** locale will be returned.

{% endinfo_block %}

If the request is successful and the Banner content item with the specified content item key has been found, the endpoint will respond with **RestContentBannerResponse**.

<details open>
<summary markdown='span'>Sample response:</summary>

```php
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
			"self": "http://glue.de.suite.local/content-banners/br-3"
		}
	}
}
```

<br>
</details>


| Field* | Type | Description |
| --- | --- | --- |
| title |  string| Heading of the banner. |
|subtitle|string  | Secondary message that clarifies a title to shop visitors. |
|imageUrl  | string | Address to where the image element of the banner is stored. |
| clickUrl | string | URL of the target page to which your shop visitors are redirected. |
| altText | string | Text that describes the image. |

* The fields mentioned are all attributes in the response. Type and ID are not mentioned.

| Code | Reason |
| --- | --- |
| 2201 | Content not found. |
|2202  | Content key is missing. |
| 2203 | Content type is invalid. |
