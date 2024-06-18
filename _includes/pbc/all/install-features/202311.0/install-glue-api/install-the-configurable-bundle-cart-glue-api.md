



This document describes how to install the Glue API: Configurable Bundle + Cart feature.

## Prerequisites

To start the feature integration, overview and install the necessary features:


| FEATURE | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Configurable Bundle | {{page.version}} | [Configurable Bundle feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-configurable-bundle-feature.html) |
|Cart |  {{page.version}} | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html) |

## 1) Install the required modules

Install the required modules using Composer:
```bash
composer require spryker/configurable-bundle-carts-rest-api:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ConfigurableBundleCartsRestApi | vendor/spryker/configurable-bundle-carts-rest-api |

{% endinfo_block %}

## 2) Set up configuration

Enable validation of the `X-Anonymous-Customer-Unique-Id` guest header for the new resource: `guest-configured-bundles`.

**src/Pyz/Glue/CartsRestApi/CartsRestApiConfig.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiConfig as SprykerCartsRestApiConfig;
use Spryker\Glue\ConfigurableBundleCartsRestApi\ConfigurableBundleCartsRestApiConfig;

class CartsRestApiConfig extends SprykerCartsRestApiConfig
{
    protected const GUEST_CART_RESOURCES = [
        self::RESOURCE_GUEST_CARTS,
        self::RESOURCE_GUEST_CARTS_ITEMS,
        ConfigurableBundleCartsRestApiConfig::RESOURCE_GUEST_CONFIGURED_BUNDLES,
    ];
}
```

## 3) Set up transfer objects

Set up transfer objects:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in the transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestConfiguredBundlesAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestConfiguredBundlesAttributesTransfer |
| RestConfiguredBundleItemsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestConfiguredBundleItemsAttributesTransfer |
| CreateConfiguredBundleRequestTransfer | class | created | src/Generated/Shared/Transfer/CreateConfiguredBundleRequestTransfer |
| UpdateConfiguredBundleRequestTransfer |  class |  created| src/Generated/Shared/Transfer/UpdateConfiguredBundleRequestTransfer |
| QuoteTransfer | class | created | src/Generated/Shared/Transfer/QuoteTransfer |
| CustomerTransfer | class | created | src/Generated/Shared/Transfer/CustomerTransfer |
| ConfiguredBundleTransfer | class | created | src/Generated/Shared/Transfer/ConfiguredBundleTransfer |
| ConfiguredBundleItemTransfer | class | created | src/Generated/Shared/Transfer/ConfiguredBundleItemTransfer |
| ConfigurableBundleTemplateTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateTransfer |
| ConfigurableBundleTemplateSlotTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateSlotTransfer|
| RestItemsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestItemsAttributesTransfer |
| RestConfiguredBundleTransfer | class | created | src/Generated/Shared/Transfer/RestConfiguredBundleTransfer |
| RestConfiguredBundleItemTransfer | class | created | src/Generated/Shared/Transfer/RestConfiguredBundleItemTransfer |
| RestConfigurableBundleTemplateTransfer | class | created| src/Generated/Shared/Transfer/RestConfigurableBundleTemplateTransfer
| RestConfigurableBundleTemplateSlotTransfer | class | created | src/Generated/Shared/Transfer/RestConfigurableBundleTemplateSlotTransfer |
| RestErrorMessageTransfer | class | created | src/Generated/Shared/Transfer/RestErrorMessageTransfer |
| ItemTransfer.configuredBundle | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| ItemTransfer.configuredBundleItem | property | created | src/Generated/Shared/Transfer/ItemTransfer |
| QuoteErrorTransfer | class | created | src/Generated/Shared/Transfer/QuoteErrorTransfer |
| QuoteResponseTransfer | class | created | src/Generated/Shared/Transfer/QuoteResponseTransfer |
| RestUserTransfer | class | created | src/Generated/Shared/Transfer/RestUserTransfer|
| ConfigurableBundleTemplateStorageTransfer | class | created | src/Generated/Shared/Transfer/ConfigurableBundleTemplateStorageTransfer |
| PersistentCartChangeTransfer | class | created | src/Generated/Shared/Transfer/PersistentCartChangeTransfer |
| CompanyUserTransfer | class | created | src/Generated/Shared/Transfer/CompanyUserTransfer |
| QuoteCriteriaFilterTransfer | class | created | src/Generated/Shared/Transfer/QuoteCriteriaFilterTransfer |
| QuoteCollectionTransfer | class | created | src/Generated/Shared/Transfer/QuoteCollectionTransfer |
| CurrencyTransfer | class | created | src/Generated/Shared/Transfer/CurrencyTransfer |
| StoreTransfer | class | created | src/Generated/Shared/Transfer/StoreTransfer|

{% endinfo_block %}

## 4) Set up behavior


Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConfiguredBundlesResourceRoutePlugin | Provides the `configured-bundles` resource route. | None | Spryker\Glue\ConfigurableBundleCartsRestApi\Plugin\GlueApplication |
| GuestConfiguredBundlesResourceRoutePlugin |Provides the `guest-configured-bundles` resource route. | None | Spryker\Glue\ConfigurableBundleCartsRestApi\Plugin\GlueApplication |
| ConfiguredBundleItemsAttributesMapperPlugin | Maps the additional information from `ItemTransfer` to `RestItemsAttributesTransfer`. | None | Spryker\Glue\ConfigurableBundleCartsRestApi\Plugin\CartsRestApi |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\ConfigurableBundleCartsRestApi\Plugin\GlueApplication\ConfiguredBundlesResourceRoutePlugin;
use Spryker\Glue\ConfigurableBundleCartsRestApi\Plugin\GlueApplication\GuestConfiguredBundlesResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ConfiguredBundlesResourceRoutePlugin(),
            new GuestConfiguredBundlesResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that:

* The `configured-bundles` resource is available by sending the request: `POST https://glue.mysprykershop.com/carts/:uuid/configured-bundles`.
* The `guest-configured-bundles` resource is available by sending the request: `POST https://glue.mysprykershop.com/guest-carts/:uuid/guest-configured-bundles`.

{% endinfo_block %}


**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\ConfigurableBundleCartsRestApi\Plugin\CartsRestApi\ConfiguredBundleItemsAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartItemsAttributesMapperPluginInterface[]
     */
    protected function getRestCartItemsAttributesMapperPlugins(): array
    {
        return [
            new ConfiguredBundleItemsAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1.  Create a guest cart with a configurable bundle.

2.  Retrieve the guest cart with the items included by sending the request: `https://glue.mysprykershop.com/guest-carts/:uuid?include=guest-cart-items`.  
    Make sure that the endpoint returns the sections: `data.attributes.items.configuredBundle` and `data.attributes.items.configuredBundleItem`.

3.  Create a cart with a configurable bundle.

4.  Retrieve the guest cart with the items included by sending the request: `https://glue.mysprykershop.com/carts/:uuid?include=items`.  
    Make sure that the endpoint returns the sections: `data.attributes.items.configuredBundle` and `data.attributes.items.configuredBundleItem`.

{% endinfo_block %}


## Install related features

Integrate the following related features:

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INSTALLATION GUIDE |
| --- | --- | --- |
| Glue API: Configurable Bundle Feature | ✓ | [Glue API: Configurable Bundle feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html) |
| Glue API: Configurable Bundle + Product Feature | ✓ |  [Install the Configurable Bundle + Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-product-glue-api.html) |
