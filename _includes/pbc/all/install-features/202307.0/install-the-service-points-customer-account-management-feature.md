


This document describes how to integrate the Service Points + [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points + Customer Account Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                        | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                            |
|-----------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points              | {{page.version}} | [Service Points feature integration](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-the-service-points-feature.md.html)                                                                      |
| Customer Account Management | {{page.version}} | [Customer Account Management feature integration](/docs/pbc/all/customer-relationship-management/{{page.version}}/install-and-upgrade/install-features/install-the-customer-account-management-feature.md.html) |

## 1) Add translations

1. Append the glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
service_point_widget.validation.error.service_point_not_selected,Please select service point.,en_US
service_point_widget.validation.error.service_point_not_selected,Bitte Servicestelle auswählen.,de_DE
service_point_widget.validation.error.billing_address_not_provided,Please add billing address manually.,en_US
service_point_widget.validation.error.billing_address_not_provided,Bitte fügen Sie die Rechnungsadresse manuell hinzu.,de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

## 2) Set up behavior

Enable the following plugins:

| PLUGIN                                                                   | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                                  |
|--------------------------------------------------------------------------|---------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| ClickCollectServiceTypeCheckoutAddressCollectionFormExpanderPlugin       | Expands the `ServicePoint` subform with pickupable service type.              |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage    |
| ClickCollectServiceTypeCheckoutMultiShippingAddressesFormExpanderPlugin  | Expands `ServicePoint` with pickupable service type.              |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage    |
| ServicePointCheckoutAddressCollectionFormExpanderPlugin                  | Expands checkout address form with `ServicePoint`.                |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage    |
| ServicePointCheckoutMultiShippingAddressesFormExpanderPlugin             | Expands checkout multi-shipping address form with `ServicePoint`. |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage    |
| ServicePointAddressCheckoutAddressCollectionFormExpanderPlugin           | Expands shipments with service point address.                             |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage    |
| ClickCollectServicePointAddressFormWidgetCacheKeyGeneratorStrategyPlugin | Skips caching of the `ClickCollectServicePointAddressFormWidget` widget.      |               | SprykerShop\Yves\ServicePointWidget\Plugin\ShopApplication |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage\ClickCollectServiceTypeCheckoutAddressCollectionFormExpanderPlugin;
use SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage\ClickCollectServiceTypeCheckoutMultiShippingAddressesFormExpanderPlugin;
use SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage\ServicePointAddressCheckoutAddressCollectionFormExpanderPlugin;
use SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage\ServicePointCheckoutAddressCollectionFormExpanderPlugin;
use SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage\ServicePointCheckoutMultiShippingAddressesFormExpanderPlugin;
class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutAddressCollectionFormExpanderPluginInterface>
     */
    protected function getCheckoutAddressCollectionFormExpanderPlugins(): array
    {
        return [
            new ServicePointCheckoutAddressCollectionFormExpanderPlugin(),
            new ServicePointAddressCheckoutAddressCollectionFormExpanderPlugin(),
            new ClickCollectServiceTypeCheckoutAddressCollectionFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutMultiShippingAddressesFormExpanderPluginInterface>
     */
    protected function getCheckoutMultiShippingAddressesFormExpanderPlugins(): array
    {
        return [
            new ServicePointCheckoutMultiShippingAddressesFormExpanderPlugin(),
            new ClickCollectServiceTypeCheckoutMultiShippingAddressesFormExpanderPlugin(),
        ];
    }
}

```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ServicePointWidget\Plugin\ShopApplication\ClickCollectServicePointAddressFormWidgetCacheKeyGeneratorStrategyPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\ShopApplicationExtension\Dependency\Plugin\WidgetCacheKeyGeneratorStrategyPluginInterface>
     */
    protected function getWidgetCacheKeyGeneratorStrategyPlugins(): array
    {
        return [
            new ClickCollectServicePointAddressFormWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
}
```

### 3) Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN                                    | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                  |
|-------------------------------------------|---------------------------------------------------------------|---------------|--------------------------------------------|
| ClickCollectServicePointAddressFormWidget | Enables service point selection during checkout address step. |               | SprykerShop\Yves\ServicePointWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ServicePointWidget\Widget\ClickCollectServicePointAddressFormWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ClickCollectServicePointAddressFormWidget::class,
        ];
    }
}
```

2. Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| MODULE                                    | TEST                                                                            |
|-------------------------------------------|---------------------------------------------------------------------------------|
| ClickCollectServicePointAddressFormWidget | Go to **Address Checkout Step** and make sure that you can select service point. |

{% endinfo_block %}
