

{% info_block errorBox %}

This feature integration guide expects the basic feature to be in place.
The current feature integration guide adds the Dynamic cart page update functionality.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the frontend of the functionality.

### Prerequisites

Install the required features:


| NAME                | VERSION          | INSTALLATION GUIDE                                                                                                                              |
|---------------------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Configurable Bundle | {{page.version}} | [Install the Configurable Bundle feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/install-the-order-management-feature.html) |

## 1) Install the required modules

```bash
composer require spryker-shop/configurable-bundle-note-widget:"{{page.version}}" --update-with-dependencies
```

Make sure the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                                  |
|------------------------------|-----------------------------------------------------|
| ConfigurableBundleNoteWidget | vendor/spryker-shop/configurable-bundle-note-widget |

## 2) Enable controllers

Register the following route providers on the Storefront:

| PROVIDER                               | NAMESPACE                                     |
|----------------------------------------|-----------------------------------------------|
| ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin | SprykerShop\Yves\ConfigurableBundleNoteWidget\Plugin\Router |

**src/Pyz/Yves/Router/RouterDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\Router;

use SprykerShop\Yves\ConfigurableBundleNoteWidget\Plugin\Router\ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin;

class RouterDependencyProvider extends SprykerRouterDependencyProvider
{
    /**
     * @return list<\Spryker\Yves\RouterExtension\Dependency\Plugin\RouteProviderPluginInterface>
     */
    protected function getRouteProvider(): array
    {
        return [
            new ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

- Verify the `ConfigurableBundleNoteWidgetAsyncRouteProviderPlugin` by adding a configurable item note with cart actions AJAX mode enabled.

{% endinfo_block %}