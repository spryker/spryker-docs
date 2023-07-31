{% info_block warningBox %}

Please note that Dynamic Multistore is currently running under an Early Access Release. Early Access Releases are subject to specific legal terms, they are unsupported and do not provide production-ready SLAs. They can also be deprecated without a General Availability Release. Nevertheless, we welcome feedback from early adopters on these cutting-edge, exploratory features.

{% endinfo_block %} 

Follow the steps below to integrate the Glue API: Dynamic Store feature into your project.

## Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION |  
| --- | --- | --- |
| Spryker Core | {{page.version}} |


### Set up behavior


Activate the following plugins:

| PLUGIN | SPECIFICATION                                                                                                                                  | PREREQUISITES | NAMESPACE                                                 |
| --- |------------------------------------------------------------------------------------------------------------------------------------------------| --- |-----------------------------------------------------------|
| StoreHttpHeaderApplicationPlugin | Gets the name of the store from the Request parameter or the Request header used for the Glue Application. If both are defined, the Request parameter has more priority. - | None | Spryker\Glue\StoresRestApi\Plugin\Application             |
| StoreApplicationPlugin | Gets the name of the store from the Request parameter or the Request header used for the Storefront API. If both are defined, the Request parameter has more priority. -   | None | Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication                 |
| StoreApplicationPlugin |  Gets the name of the store from the Request parameter or the Request header used for the Storefront API. If both are defined, the Request parameter has more priority. -   | None | Spryker\Glue\StoresBackendApi\Plugin\GlueBackendApiApplication          |
| LocaleApplicationPlugin | Gets locale name from the Request header.                                                                                                      | None | Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication |

{% info_block warningBox "Warning" %}

`StoreHttpHeaderApplicationPlugin` is deprecated, please use `\Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication\StoreApplicationPlugin` instead.

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

If everything is set up correctly, a request to `https://glue.mysprykershop.com` with the header `[{"key":"Accept-Language","value":"de_DE"},{"key":"Store","value":"DE"}]` or `https://glue.mysprykershop.com?_store=DE`  with the header `[{"key":"Accept-Language","value":"de_DE"}]` should result in a response without any errors and contain the `content-language` header set to **de_DE**.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the store and locale are set correctly.

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

If everything is set up correctly, a request to `https://glue-backend.mysprykershop.com` with the header `[{"key":"Accept-Language","value":"de_DE"},{"key":"Store","value":"DE"}]` or `https://glue.mysprykershop.com?_store=DE`  with the header `[{"key":"Accept-Language","value":"de_DE"}]` should result in a response without any errors and contain the `content-language` header set to **de_DE**.

An example for testing with a Store header: 

```bash
curl --location --request POST 'http://glue-backend.eu.mysprykershop.com/token' \
--header 'Store: DE' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grantType=password' \
--data-urlencode 'username={USERNAME}' \
--data-urlencode 'password={PASSWORD}'

```

An example for testing with a Store Request parameter:

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

If everything is set up correctly, a request to `https://glue-storefront.mysprykershop.com` with the header `[{"key":"Accept-Language","value":"de_DE"},{"key":"Store","value":"DE"}]` or `https://glue.mysprykershop.com?_store=DE`  with the header `[{"key":"Accept-Language","value":"de_DE"}]` should result in a response without any errors and contain the `content-language` header set to **de_DE**.

{% endinfo_block %}
