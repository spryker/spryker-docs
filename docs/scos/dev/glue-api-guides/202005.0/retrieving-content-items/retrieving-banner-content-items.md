---
title: Retrieving Banner Content Item Data
description: Banner API implements REST API endpoint that can retrieve banner content item data available in the storage for all or a specific locale
last_updated: Sep 14, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v5/docs/retrieving-banner-content-item-data-201907
originalArticleId: e88d1d57-9e00-4579-a64d-b646e5d270cd
redirect_from:
  - /v5/docs/retrieving-banner-content-item-data-201907
  - /v5/docs/en/retrieving-banner-content-item-data-201907
related:
  - title: REST API Reference
    link: docs/scos/dev/glue-api-guides/page.version/rest-api-reference.html
  - title: Content Items Feature Overview
    link: docs/scos/user/features/page.version/content-items-feature-overview.html
---

The **Banner API** implements REST API endpoint that provides the possibility to retrieve Banner content item data available in the storage.

In your development, these resources can help you get relevant information for your Banner content item for all or a specific locale. For example, you can view what page address your banner is linked to or what details are displayed for a specific locale.

{% info_block infoBox %}

For more information on creating and managing content items in CMS, see:
* [Creating Content Items](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/creating-content-items.html).
* [Editing Content Items](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/editing-content-items.html).
* [Editing Content Items in CMS Pages and Blocks](/docs/scos/user/back-office-user-guides/{{page.version}}/content/content-items/editing-content-items-in-cms-pages-and-blocks.html).

{% endinfo_block %}

## Installation
For details on the modules that provide the API functionality and how to install them, see [Content Items API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-content-items-feature-integration.html).

## Retrieving Banner Content Item Data
To retrieve the Banner content item data, send a GET request to the following endpoint:

/content-banners/{content_item_key}

Sample request: _GET http://mysprykershop.com/content-banners/br-3_
where **content-banners** is the content item type and **br-3** is the key of the Banner content item you want to retrieve.

{% info_block infoBox %}

The locale must be specified in the **header** of the GET request. If no locale is specified, data from the **default** locale will be returned.

{% endinfo_block %}

If the request is successful and the Banner content item with the specified content item key has been found, the endpoint will respond with **RestContentBannerResponse**.

**Sample response:**

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
			"self": "http://mysprykershop.com/content-banners/br-3"
		}
	}
}
```

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
