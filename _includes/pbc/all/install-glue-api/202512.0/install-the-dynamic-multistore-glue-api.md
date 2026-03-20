This document describes how to install the Dynamic Multistore Glue API.

## Prerequisites

Install the required features:

| NAME | VERSION |  
| --- | --- |
| Spryker Core | 202507.0 |


## Set up behavior


Activate the following plugins:

| PLUGIN | SPECIFICATION                                                                                                                                  | PREREQUISITES | NAMESPACE                                                 |
| --- |------------------------------------------------------------------------------------------------------------------------------------------------| --- |-----------------------------------------------------------|
| StoreHttpHeaderApplicationPlugin | Retrieves the name of the store from the `Request` parameter or the `Request` header used for the Glue Application. If both are defined, the `Request` parameter has more priority. |   | Spryker\Glue\StoresRestApi\Plugin\Application             |
| StoreApplicationPlugin | Retrieves the name of the store from the `Request` parameter or the `Request` header used for the Storefront API. If both are defined, the `Request` parameter has more priority.  |   | Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication                 |
| StoreApplicationPlugin |  Retrieves the name of the store from the `Request` parameter or the `Request` header used for the Storefront API. If both are defined, the `Request` parameter has more priority.   |   | Spryker\Glue\StoresBackendApi\Plugin\GlueBackendApiApplication          |
| LocaleApplicationPlugin | Retrieves locale name from the `Request` header.                                                                                                      |   | Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication |

{% info_block warningBox "Warning" %}

`StoreHttpHeaderApplicationPlugin` is deprecated. Use `\Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication\StoreApplicationPlugin` instead.

{% endinfo_block %}

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**


```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
use Spryker\Glue\Locale\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Glue\StoresRestApi\Plugin\Application\StoreHttpHeaderApplicationPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface>
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
            new StoreHttpHeaderApplicationPlugin(),
            new LocaleApplicationPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Send one of the following requests:

| ENDPOINT | HEADER |
|-|-|
| `https://glue.mysprykershop.com` | [{"key":"Accept-Language","value":"de_DE"},{"key":"Store","value":"DE"}] |
| `https://glue.mysprykershop.com?_store=DE` | [{"key":"Accept-Language","value":"de_DE"}] |

Make sure the response contains the following:
- The `content-language` header set to `de_DE`.
- Proper locale and stores header.

{% endinfo_block %}

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**


```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\StoresBackendApi\Plugin\GlueBackendApiApplication\StoreApplicationPlugin;


class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new StoreApplicationPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Send one of the following requests:

| ENDPOINT | HEADER |
|-|-|
| `https://glue-backend.mysprykershop.com` | [{"key":"Accept-Language","value":"de_DE"},{"key":"Store","value":"DE"}] |
| `https://glue.mysprykershop.com?_store=DE` | [{"key":"Accept-Language","value":"de_DE"}] |

Make sure you get a response containing the `content-language` header set to `de_DE`.

Example for testing with the `Store` header:

```bash
curl --location --request POST 'http://glue-backend.eu.mysprykershop.com/token' \
--header 'Store: DE' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grantType=password' \
--data-urlencode 'username={USERNAME}' \
--data-urlencode 'password={PASSWORD}'

```

Example for testing with the `store` request parameter:

```bash
curl --location --request POST 'http://glue-backend.eu.mysprykershop.com/token?_store=DE' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grantType=password' \
--data-urlencode 'username={USERNAME}' \
--data-urlencode 'password={PASSWORD}'

```

{% endinfo_block %}


**src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;
use Spryker\Glue\Http\Plugin\Application\HttpApplicationPlugin;
use Spryker\Glue\Locale\Plugin\Application\LocaleApplicationPlugin;
use Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication\StoreApplicationPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new HttpApplicationPlugin(),
            new StoreApplicationPlugin(),
            new LocaleApplicationPlugin(),
        ];
}

```

{% info_block warningBox "Verification" %}

Send one of the following requests:

| ENDPOINT | HEADER |
|-|-|
| `https://glue-storefront.mysprykershop.com` | [{"key":"Accept-Language","value":"de_DE"},{"key":"Store","value":"DE"}] |
| `https://glue.mysprykershop.com?_store=DE` | [{"key":"Accept-Language","value":"de_DE"}] |

Make sure you get a response containing the `content-language` header set to `de_DE`


{% endinfo_block %}
