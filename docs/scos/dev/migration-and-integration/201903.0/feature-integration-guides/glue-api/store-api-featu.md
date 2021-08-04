---
title: Store API Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/store-api-feature-integration
redirect_from:
  - /v2/docs/store-api-feature-integration
  - /v2/docs/en/store-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name |  Version |
| --- | --- |
| Spryker Core | 2018.12.0 |

## 1) Install the required modules using composer
Run the following command to install the required modules:

```bash
composer require spryker/stores-rest-api:"^1.0.2" --update-with-dependencies
```

{% info_block infoBox "Verification" %}
Make sure that the following module is installed:
{% endinfo_block %}

| Module | Expected directory |
| --- | --- |
| `StoresRestApi` | `vendor/spryker/stores-rest-api` |

## 2) Set up Transfer objects
Run the following command:

```bash
console transfer:generate
```

{% info_block infoBox "Verification" %}
Make sure that the following changes are present in the transfer objects:
{% endinfo_block %}

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `StoresRestAttributesTransfer` |class  |created  | `src/Generated/Shared/Transfer/StoresRestAttributesTransfer` |
| `StoreCountryRestAttributesTransfer` | class |created  | `src/Generated/Shared/Transfer/StoreCountryRestAttributesTransfer` |
|`StoreRegionRestAttributesTransfer`  |class  |created  |`src/Generated/Shared/Transfer/StoreRegionRestAttributesTransfer`  |
| `StoreLocaleRestAttributesTransfer` |class  | created | `src/Generated/Shared/Transfer/StoreLocaleRestAttributesTransfer` |
| `StoreCurrencyRestAttributesTransfer` |class  |created  |`src/Generated/Shared/Transfer/StoreCurrencyRestAttributesTransfer`  |

## 3) Set up behavior
### Enable resource
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `StoresResourceRoutePlugin` |Registers orders resource.  |None  | `Spryker\Glue\StoresRestApi\Plugin` |

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\StoresRestApi\Plugin\StoresResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new StoresResourceRoutePlugin(),
        ];
    }
}
              ...
```

{% info_block infoBox "Verification" %}
Make sure that following endpoint is available:<br>`http://example.org/stores`
{% endinfo_block %}

<!--**See also:**
[Glue API Storefront Guides](https://documentation.spryker.com/glue_rest_api/glue_api_storefront_guides/glue-api-storefront-guides.htm)
 -->
_Last review date: Feb 12, 2019_ 

[//]: # (by Tihran Voitov, Dmitry Beirak)
