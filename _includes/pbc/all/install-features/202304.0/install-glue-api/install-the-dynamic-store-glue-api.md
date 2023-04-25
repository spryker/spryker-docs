
Follow the steps below to integrate the Glue API: Dynamic Store feature into your project.

## Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION |  
| --- | --- | --- |
| Spryker Core | {{page.version}} |


### 1) Set up behavior


Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| StoreHttpHeaderApplicationPlugin | Gets store name from the Request header. | None | Spryker\Glue\StoresRestApi\Plugin\Application |
| LocaleApplicationPlugin | Gets locale name from the Request header. | None | Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication |


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

If everything is set up correctly, a request to `https://glue.mysprykershop.com` with the header `[{"key":"Accept-Language","value":"de_DE"},{"key":"Store","value":"DE"}]` should result in a response whithout any errors and contains the `content-language` header set to **de_DE**.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Send a request to the Glue API with the following headers:

```bash
Store: DE
```

Make sure that the store and locale are set correctly.

{% endinfo_block %}

**src/Pyz/Glue/GlueBackendApiApplication/GlueBackendApiApplicationDependencyProvider.php**


```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;
use Spryker\Glue\StoresRestApi\Plugin\Application\StoreHttpHeaderApplicationPlugin;
 

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new StoreHttpHeaderApplicationPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

If everything is set up correctly, a request to `https://glue-backend.mysprykershop.com` with the header `[{"key":"Store","value":"DE"}]` should result in a response without any errors.

Example for test: 

```bash
curl --location --request POST 'http://glue-backend.eu.mysprykershop.com/token' \
--header 'Store: DE' \
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
use Spryker\Glue\StoresRestApi\Plugin\Application\StoreHttpHeaderApplicationPlugin;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getApplicationPlugins(): array
    {
        return [
            new HttpApplicationPlugin(),
            new StoreHttpHeaderApplicationPlugin(),
            new LocaleApplicationPlugin(),
        ];
}

```

{% info_block warningBox "Verification" %}

If everything is set up correctly, a request to `https://glue-storefront.mysprykershop.com` with the header `[{"key":"accept-language","value":"de_DE"},{"key":"Store","value":"DE"}]` should result in a response whithout any errors and contains the `content-language` header set to **de_DE**.

{% endinfo_block %}
