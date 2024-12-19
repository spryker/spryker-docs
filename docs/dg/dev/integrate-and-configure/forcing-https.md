---
title: Forcing HTTPS
description: Learn with this guide to configure HTTPs and HTTP for your pages within your Spryker project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-force-https
originalArticleId: ba400e70-5a29-4899-996a-08f3f9bdd793
redirect_from:
- /docs/scos/dev/tutorials-and-howtos/howtos/howto-force-https.html
---

This guide shows how you can force to use HTTPS on your pages.

{% info_block infoBox "Load balancer" %}

If your servers are behind a load balancer, and the load balancer is doing the redirects from HTTP to HTTPS, you don't need to configure the application.

{% endinfo_block %}

Perform the following steps to configure the application to use HTTPS.

## Force HTTPS for all pages

Set `$config[ApplicationConstants::(YVES|ZED)_SSL_ENABLED]` to `true`. The application forces HTTPS on all pages.

**Configuration**

```php
<?php

use Spryker\Shared\Application\ApplicationConstants;

// Zed
$config[ApplicationConstants::ZED_SSL_ENABLED] = true;

// Yves
$config[ApplicationConstants::YVES_SSL_ENABLED] = true;
```

Before a controller is resolved, the application checks if the request is secure and that the requested resource is not excluded from HTTPS.

{% info_block infoBox "Info" %}

If the request is not secure and not excluded from HTTPS, the application returns a redirect response if the page is requested with HTTP.<br>If the request is secure and the page is excluded from HTTPS, the application allows requests with HTTP.

{% endinfo_block %}

## Allow pages to use HTTP

You can also allow some of your pages not to use HTTPS.

To allow some pages to use HTTP, add them to `$config[ApplicationConstants::(YVES|ZED)_SSL_EXCLUDED]` and set only `$config[ApplicationConstants::(YVES|ZED)_SSL_ENABLED]` to `true`. The key in this array is the route name, and the value is the URL.

**Configuration**

```php
<?php

use Spryker\Shared\Application\ApplicationConstants;

// Zed
$config[ApplicationConstants::ZED_SSL_ENABLED] = true;
$config[ApplicationConstants::ZED_SSL_EXCLUDED] = [
    'route-name' => '/url'
];

// Yves
$config[ApplicationConstants::YVES_SSL_ENABLED] = true;
$config[ApplicationConstants::YVES_SSL_EXCLUDED] = [
    'route-name' => '/url'
];
```

## When is a request secure?

Two options identify if a request is secure or not:

1. When the value of `$request->server->get('REMOTE_ADDR')` is found in the configured trusted proxies, and the value of `$request->header->get('X_FORWARDED_PROTO')` is `HTTPS`.
2. When the value of `$request->server->get('HTTPS')` is `HTTPS`.

The checks for a secure request are made in this order.

## Trusted proxy configuration

Both applications have a configuration for trusted proxies. To use trusted proxies, configure `$config[ApplicationConstants::(YVES|ZED)_TRUSTED_PROXIES]`:

**Configuration**

```php
<?php

use Spryker\Shared\Application\ApplicationConstants;

// Zed
$config[ApplicationConstants::ZED_TRUSTED_PROXIES] = [
    // the IP address (or range) of your proxy
    '192.0.0.1',
    '10.0.0.0/8',
];

// Yves
$config[ApplicationConstants::YVES_TRUSTED_PROXIES] = [
    // the IP address (or range) of your proxy
    '192.0.0.1',
    '10.0.0.0/8',
];
```

As described in the preceding section, the application checks if the value of `$request->server->get('REMOTE_ADDR')` can be found in your configured trusted proxies. If so, the current request is marked secure when the value of `$request->header->get('X_FORWARDED_PROTO')` is HTTPS.
