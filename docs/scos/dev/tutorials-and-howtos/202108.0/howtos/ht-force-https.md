---
title: HowTo - Force HTTPS
originalLink: https://documentation.spryker.com/2021080/docs/ht-force-https
redirect_from:
  - /2021080/docs/ht-force-https
  - /2021080/docs/en/ht-force-https
---

The following article describes how you can force to use HTTPS in your pages.
{% info_block infoBox "Load balancer" %}
If your servers are behind a load balancer and the load balancer is doing the redirects from HTTP to HTTPS, you don't need to further configure the application.
{% endinfo_block %}

## Application Configuration
### Force HTTPS For All Pages
To force HTTPS on all pages, you have to set `$config[ApplicationConstants::(YVES|ZED)_SSL_ENABLED]` to `true`. The application will then always force HTTPS on all pages.

**Configuration:**
    
```php
<?php

use Spryker\Shared\Application\ApplicationConstants;

// Zed
$config[ApplicationConstants::ZED_SSL_ENABLED] = true;

// Yves
$config[ApplicationConstants::YVES_SSL_ENABLED] = true;
```

Before a controller is resolved, the application will check if the request is secure and that the requested resource is not excluded from HTTPS.

{% info_block infoBox "Info" %}
If the request is not secure and not excluded from HTTPS, the application will return a redirect response if the page was requested with HTTP.</br>If the request is secure and the page is excluded from HTTPS, the application will allow requests with HTTP.
{% endinfo_block %}

### Allow Pages to Use HTTP
You can also allow some of your pages not to use HTTPS. If you want to allow some pages to use HTTP you can add them to `$config[ApplicationConstants::(YVES|ZED)_SSL_EXCLUDED]` and only set `$config[ApplicationConstants::(YVES|ZED)_SSL_ENABLED]` to `true`. The
 key in this array is the route name and the value is the URL.

**Configuration:**

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

## When Is a Request Secure?
There are two options that identify if a request is secure or not.

1. When the value of `$request->server->get('REMOTE_ADDR')` is found in the configured trusted proxies and the value of `$request->header->get('X_FORWARDED_PROTO')` is HTTPS.
2. When the value of `$request->server->get('HTTPS')` is HTTPS.

The checks for a secure request will be made in this order.

## Trusted Proxy Configuration
Both applications have a configuration for trusted proxies. To use trusted proxies, configure `$config[ApplicationConstants::(YVES|ZED)_TRUSTED_PROXIES]`.

**Configuration:**

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

As described above, the application will check if the value of `$request->server->get('REMOTE_ADDR')` can be found in your configured trusted proxies. If so, the current request will be marked as secure when the value of `$request->header->get('X_FORWARDED_PROTO')` is HTTPS.
