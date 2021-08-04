---
title: HowTo - Set up custom response headers on project level
originalLink: https://documentation.spryker.com/2021080/docs/howto-set-up-custom-response-headers-on-project-level
redirect_from:
  - /2021080/docs/howto-set-up-custom-response-headers-on-project-level
  - /2021080/docs/en/howto-set-up-custom-response-headers-on-project-level
---

This HowTo will teach you how to create customer response headers in your Spryker project. We use a header that allows playing full-screen videos in Chrome is used as an example.

The purpose of this article  is to illustrate the usage of `Symfony\Component\HttpFoundation\Response()` and `ShopApplicationTwigEventSubscriber::createResponse()` to create custom headers.

{% info_block infoBox "Info" %}

The procedure described in this HowTo is just an example of what you can do with the customer response headers, so you know where to adjust the headers for the other use cases.

{% endinfo_block %}

## Prerequisites
Ensure that you have:

* Up-to-date Spryker installation
* Browser to test
* CMS page with the video in your Spryker-based shop

## Setting up custom response headers
To set up custom response headers:

1. For the video example, change the CmsController of the respective CMS page:
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

You should now be able to see the video on the full screen. 

