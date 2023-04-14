HELP: As example used _includes/pbc/all/install-features/202212.0/install-glue-api/install-the-product-glue-api.md

Follow the steps below to integrate the Glue API: Dynamic Store feature into your project.

## Prerequisites
To start feature integration, overview and install the necessary features:

| NAME | VERSION |  
| --- | --- | --- |
| Spryker Core | {{page.version}} |

## 1) Install the required modules using Composer

Run the following command(s) to install the required modules:

```bash
composer require "spryker-feature/spryker-core":"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules were installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| CountryDataImport | vendor/spryker/country-data-import |
| СountryGui | vendor/spryker/country-gui |
| LocaleDataImport | vendor/spryker/locale-data-import |
| LocaleGui | vendor/spryker/locale-gui |   
| SecurityBlockerStorefrontCustomer  |spryker/security-blocker-storefront-customer | 
| StoreContextGui | vendor/spryker/store-context-gui |
| StoreDataImport | vendor/spryker/store-data-import |
| StoreGui | vendor/spryker/store-gui |

{% endinfo_block %}

### 2) Set up behavior


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

Send a request to the Glue Backend API with the following headers:

```bash
Store: DE
```
Make sure that the store is set correctly.


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

Send a request to the Glue Storefront API with the following headers:

```bash
Store: DE
```
Make sure that the store is set correctly.

{% endinfo_block %}
