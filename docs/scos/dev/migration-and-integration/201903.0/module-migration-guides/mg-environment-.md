---
title: Migration Guide - Environment Configuration
originalLink: https://documentation.spryker.com/v2/docs/mg-environment-config
redirect_from:
  - /v2/docs/mg-environment-config
  - /v2/docs/en/mg-environment-config
---

The environment configuration was restructured to solve a couple of inconsistencies and dependencies within the configuration itself. To untangle some of the configuration options it was necessary to introduce a few new configuration constants. Although the Spryker core should be fully backward compatible it is advised to update project implementations to make use of the new configuration options.

Along with the introduction of the new configuration constants, a couple of unused ones have been marked as deprecated.

## HOST vs. BASE_URL
The configuration contained some inconsistencies in defining a host for `_Yves_` and `_Zed_` and how these got reused to define other configuration options. It was not obvious if these configuration values contained a URL (including schema and/or ports) or a plain host. To decouple this, a set of new configuration constants has been added and the existing `HOST_*` configuration options have been reused to match their actual purpose.

### HOST_YVES and HOST_ZED
They should only define the host for accessing either `_Yves_` or `_Zed_`. They should not include any scheme and port definitions. This makes for reuse for e.g. setting a cookie domain.

### BASE_URL_YVES and BASE_URL_SSL_YVES
These two define the base URLs (including scheme and port) for accessing `_Yves_`. They can be derived from `HOST_YVES`, for example:

```php
<?php

use Spryker\Shared\Application\ApplicationConstants
// ...
$config[ApplicationConstants::BASE_URL_YVES] = sprintf(
    'http://%s:8080',
    $config[ApplicationConstants::HOST_YVES]
);
```

### BASE_URL_ZED and BASE_URL_SSL_ZED
Similar to the two constants above, these two define the base URLs for accessing `_Zed_`. They should include the scheme and optionally port.

```php
<?php

use Spryker\Shared\Application\ApplicationConstants
// ...
$config[ApplicationConstants::BASE_URL_ZED] = sprintf(
    'http://%s:8081',
    $config[ApplicationConstants::HOST_ZED]
);
```

### BASE_URL_STATIC_ASSETS, BASE_URL_STATIC_MEDIA, BASE_URL_SSL_STATIC_ASSETS, and BASE_URL_SSL_STATIC_MEDIA
These ones replace the existing, and now deprecated, constants `HOST_STATIC_ASSETS`, `HOST_STATIC_MEDIA`, `HOST_SSL_STATIC_ASSETS`, and `HOST_SSL_STATIC_MEDIA`. They should include the scheme and optionally a port.

<!--
It might be necessary to update `\Pyz\Yves\Twig\Plugin\TwigAsset` to the latest version from [Demoshop](https://github.com/spryker/demoshop) to have it use the new configuration options.
-->

## Defining Ports
`PORT_YVES`, `PORT_SSL_YVES`, `PORT_ZED`, and `PORT_SSL_ZED` have been added but have not been used by Spryker core yet. They can be defined and reused to set, for example, `BASE_URL_YVES`:

```php
<?php

use Spryker\Shared\Application\ApplicationConstants
// ...
$config[ApplicationConstants::HOST_YVES] = 'www.de.demoshop.local';
$config[ApplicationConstants::PORT_YVES] = ':8080';
$config[ApplicationConstants::BASE_URL_ZED] = sprintf(
    'http://%s:%s',
    $config[ApplicationConstants::HOST_YVES],
    $config[ApplicationConstants::PORT_YVES] ?: ''
);
```

<!--
If it is required to define ports in project implementations, it might be necessary to update `\Pyz\Shared\Application\Business\Routing\UrlGenerator` to the latest version from [Demoshop](https://github.com/spryker/demoshop). Older versions of this class aren't aware of URLs containing ports.
-->

### List of the New Configuration 

* `\Spryker\Shared\Application\ApplicationConstants::PORT_YVES`
* `\Spryker\Shared\Application\ApplicationConstants::PORT_ZED`
* `\Spryker\Shared\Application\ApplicationConstants::PORT_SSL_YVES`
* `\Spryker\Shared\Application\ApplicationConstants::PORT_SSL_ZED`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_YVES`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_ZED`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_STATIC_ASSETS`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_STATIC_MEDIA`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_SSL_YVES`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_SSL_ZED`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_SSL_STATIC_ASSETS`
* `\Spryker\Shared\Application\ApplicationConstants::BASE_URL_SSL_STATIC_MEDIA`
* `\Spryker\Shared\Customer\CustomerConstants::BASE_URL_YVES`
* `\Spryker\Shared\Newsletter\NewsletterConstants::BASE_URL_YVES`
* `\Spryker\Shared\ProductManagement\ProductManagementConstants::BASE_URL_YVES`
* `\Spryker\Shared\ZedRequest\ZedRequestConstants::BASE_URL_ZED_API`
* `\Spryker\Shared\ZedRequest\ZedRequestConstants::BASE_URL_SSL_ZED_API`

### List of the Deprecated Configuration Constants

* `\Spryker\Shared\Application\ApplicationConstants::ZED_RABBITMQ_USERNAME`
* `\Spryker\Shared\Application\ApplicationConstants::ZED_RABBITMQ_PASSWORD`
* `\Spryker\Shared\Application\ApplicationConstants::ZED_RABBITMQ_HOST`
* `\Spryker\Shared\Application\ApplicationConstants::ZED_RABBITMQ_PORT`
* `\Spryker\Shared\Application\ApplicationConstants::ZED_RABBITMQ_VHOST`
* `\Spryker\Shared\Application\ApplicationConstants::CLOUD_ENABLED`
* `\Spryker\Shared\Application\ApplicationConstants::CLOUD_OBJECT_STORAGE_ENABLED`
* `\Spryker\Shared\Application\ApplicationConstants::CLOUD_CDN_ENABLED`
* `\Spryker\Shared\Application\ApplicationConstants::CLOUD_CDN_STATIC_MEDIA_PREFIX`
* `\Spryker\Shared\Application\ApplicationConstants::CLOUD_CDN_STATIC_MEDIA_HTTP`
* `\Spryker\Shared\Application\ApplicationConstants::CLOUD_CDN_STATIC_MEDIA_HTTPS`
* `\Spryker\Shared\Application\ApplicationConstants::CLOUD_CDN_PRODUCT_IMAGES_PATH_NAME`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_ZED_GUI`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_ZED_API`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_STATIC_ASSETS`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_STATIC_MEDIA`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_SSL_YVES`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_SSL_ZED_GUI`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_SSL_ZED_API`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_SSL_STATIC_ASSETS`
* `\Spryker\Shared\Application\ApplicationConstants::HOST_SSL_STATIC_MEDIA`
* `\Spryker\Shared\Customer\CustomerConstants::HOST_YVES`
* `\Spryker\Shared\Newsletter\NewsletterConstants::HOST_YVES`
* `\Spryker\Shared\ProductManagement\ProductManagementConstants::HOST_YVES`
* `\Spryker\Shared\ZedRequest\ZedRequestConstants::HOST_SSL_ZED_API`
