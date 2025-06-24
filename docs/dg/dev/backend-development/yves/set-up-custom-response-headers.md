---
title: Set up custom response headers
description: This HowTo shows how to set up custom response headers to play the full-screen video.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-set-up-custom-response-headers-on-project-level
originalArticleId: afaca4e2-bbaa-4766-b786-dc0490233c69
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-set-up-custom-response-headers-on-project-level.html
---

This document shows how to create customer response headers. As an example, we use a header that allows playing full-screen videos in Chrome.

The purpose of this document is to illustrate the usage of `Symfony\Component\HttpFoundation\Response()` and `ShopApplicationTwigEventSubscriber::createResponse()` to create custom headers.

The procedure described in this document is just an example of what you can do with the customer response headers, so you know where to adjust the headers for the other use cases.

## Prerequisites

Ensure that you have the following:
- Up-to-date Spryker installation
- Browser to test
- CMS page with the video in your Spryker-based shop

## Set up custom response headers

1. For the video example, change the `CmsController` of the respective CMS page:

```php
$response = new \Symfony\Component\HttpFoundation\Response();
        $response->headers->set('Feature-Policy', 'fullscreen *');
        $response->setContent(
            $this->renderView($localeCmsPageDataTransfer->getTemplatePath(), $viewData)
        );
        return $response;
```

2. Optional: to change the header response globally, edit `\SprykerShop\Yves\ShopApplication\Subscriber\ShopApplicationTwigEventSubscriber::createResponse()`

```php
$response->headers->set('Feature-Policy', 'fullscreen *');
```

After this, you can see the video on the full screen.
