


This document describes how to install the Service Points + [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature.

## Prerequisites

To start feature installation, install the required features:

| NAME                        | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                            |
|-----------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points              | {{page.version}} | [Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)                                                                      |
| Customer Account Management | {{page.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

## 1) Install the required modules

To install the the demo Click&Collect functionalities, install the module using Composer:

```bash
composer require spryker-shop/click-and-collect-page-example: "^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following module has been installed:

| MODULE                     | EXPECTED DIRECTORY                                 |
|----------------------------|----------------------------------------------------|
| ClickAndCollectPageExample | vendor/spryker-shop/click-and-collect-page-example |

{% endinfo_block %}

## 2) Add translations

1. Append the glossary according to your configuration:

**data/import/common/common/glossary.csv**

```csv
service_point_widget.validation.error.service_point_not_selected,Please select service point.,en_US
service_point_widget.validation.error.service_point_not_selected,Bitte Servicestelle auswählen.,de_DE
service_point_widget.validation.error.billing_address_not_provided,Please add billing address manually.,en_US
service_point_widget.validation.error.billing_address_not_provided,Bitte fügen Sie die Rechnungsadresse manuell hinzu.,de_DE
service_point_widget.select_location_action,Select a location,en_US
service_point_widget.select_location_action,Wählen Sie einen Standort,de_DE
service_point_widget.change_action,Change,en_US
service_point_widget.change_action,Ändern,de_DE
service_point_widget.location_label,Location:,en_US
service_point_widget.location_label,Standort:,de_DE
service_point_widget.select_your_store_title,Select your store,en_US
service_point_widget.select_your_store_title,Wählen Sie Ihren Store,de_DE
service_point_widget.search,"Search for Store, zip code or city...",en_US
service_point_widget.search,"Suche nach Store, PLZ oder Stadt...",de_DE
service_point_widget.select_store_action,Select store,en_US
service_point_widget.select_store_action,Store auswählen,de_DE
service_point_widget.no_results,"Nothing found...",en_US
service_point_widget.no_results,"Nichts gefunden...",de_DE
```

2. Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data is added to the `spy_glossary_key` and `spy_glossary_translation` tables in the database.

{% endinfo_block %}

## 3) Set up behavior

Enable the following plugins:

| PLUGIN                                                                       | SPECIFICATION                                                               | PREREQUISITES | NAMESPACE                                                          |
|------------------------------------------------------------------------------|-----------------------------------------------------------------------------|---------------|--------------------------------------------------------------------|
| ClickAndCollectServiceTypeCheckoutAddressCollectionFormExpanderPlugin        | Expands the `ServicePoint` subform with a pickupable service type.          |               | SprykerShop\Yves\ClickAndCollectPageExample\Plugin\CustomerPage    |
| ClickAndCollectServiceTypeCheckoutMultiShippingAddressesFormExpanderPlugin   | Expands `ServicePoint` with a pickupable service type.                      |               | SprykerShop\Yves\ClickAndCollectPageExample\Plugin\CustomerPage    |
| ServicePointCheckoutAddressCollectionFormExpanderPlugin                      | Expands the checkout address form with `ServicePoint`.                          |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage            |
| ServicePointCheckoutMultiShippingAddressesFormExpanderPlugin                 | Expands the checkout multi-shipping address form with `ServicePoint`.           |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage            |
| ServicePointAddressCheckoutAddressCollectionFormExpanderPlugin               | Expands shipments with the service point address.                               |               | SprykerShop\Yves\ServicePointWidget\Plugin\CustomerPage            |
| ClickAndCollectServicePointAddressFormWidgetCacheKeyGeneratorStrategyPlugin  | Skips the caching of the `ClickAndCollectServicePointAddressFormWidget` widget. |               | SprykerShop\Yves\ClickAndCollectPageExample\Plugin\ShopApplication |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\ClickAndCollectPageExample\Plugin\CustomerPage\ClickAndCollectServiceTypeCheckoutAddressCollectionFormExpanderPlugin;
use SprykerShop\Yves\ClickAndCollectPageExample\Plugin\CustomerPage\ClickAndCollectServiceTypeCheckoutMultiShippingAddressesFormExpanderPlugin;
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
            new ClickAndCollectServiceTypeCheckoutAddressCollectionFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutMultiShippingAddressesFormExpanderPluginInterface>
     */
    protected function getCheckoutMultiShippingAddressesFormExpanderPlugins(): array
    {
        return [
            new ServicePointCheckoutMultiShippingAddressesFormExpanderPlugin(),
            new ClickAndCollectServiceTypeCheckoutMultiShippingAddressesFormExpanderPlugin(),
        ];
    }
}

```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ServicePointWidget\Plugin\ShopApplication\ClickAndCollectServicePointAddressFormWidgetCacheKeyGeneratorStrategyPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\ShopApplicationExtension\Dependency\Plugin\WidgetCacheKeyGeneratorStrategyPluginInterface>
     */
    protected function getWidgetCacheKeyGeneratorStrategyPlugins(): array
    {
        return [
            new ClickAndCollectServicePointAddressFormWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
}
```

## 4) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN                                       | SPECIFICATION                                                      | PREREQUISITES  | NAMESPACE                                          |
|----------------------------------------------|--------------------------------------------------------------------|----------------|----------------------------------------------------|
| ClickAndCollectServicePointAddressFormWidget | Turns on service point selection during the checkout address step. |                | SprykerShop\Yves\ClickAndCollectPageExample\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ServicePointWidget\Widget\ClickAndCollectServicePointAddressFormWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ClickAndCollectServicePointAddressFormWidget::class,
        ];
    }
}
```

## 5) Set up the FE part

Adjust TWIG templates to display the service point selector:

1. To the `page-layout-main` template of the `ShopUi` module, add the `main-overlay` molecule:

```twig
{% raw %}{% block globalComponents %}
    ....
    {% include molecule('main-overlay') with {
        attributes: {
            'is-open': data.isOverlayOpen,
        },
    } only %}
{% endblock %}{% endraw %}
```

2. In the `ShopUi` module, to the `icon-spite` atom, add the `cross` icon:

```twig
{% raw %}<symbol id=":cross" viewBox="0 0 24 24">
    <path d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"/>
</symbol>{% endraw %}
```

{% info_block infoBox "The cross icon is already defined" %}

If the `cross` icon is already defined in the project, it's not necessary to add it again.

{% endinfo_block %}

3. In `tsconfig.yves.json` of the `ShopUi` module, adjust the `paths` section:

```json
{
    "compilerOptions": {
        "paths": {
          ...
          "ServicePointWidget/*": [
            "./vendor/spryker-shop/service-point-widget/src/SprykerShop/Yves/ServicePointWidget/Theme/default/*"
          ]
        }
    }
}
```

4. To the `address` view of the `CheckoutPage` module, add `ClickAndCollectServicePointAddressFormWidget`:

```twig
{% raw %}{% widget 'ClickAndCollectServicePointAddressFormWidget' args [data.form] only %}{% endwidget %}{% endraw %}
```

{% info_block infoBox "Adding of ClickAndCollectServicePointAddressFormWidget is automated" %}

If you are using `ShipmentTypeAddressFormWidget`, `ClickAndCollectServicePointAddressFormWidget` is added automatically.

{% endinfo_block %}

5. Optional: For a multi-shipment, to the `address-item-form-field-list` molecule of the `CheckoutPage` module, add `ClickAndCollectServicePointAddressFormWidget`:

```twig
{% raw %}{% widget 'ClickAndCollectServicePointAddressFormWidget' args [item] only %}{% endwidget %}{% endraw %}
```

{% info_block infoBox "Adding of ClickAndCollectServicePointAddressFormWidget is automated" %}

If using the `ShipmentTypeAddressFormWidget` widget, the `ClickAndCollectServicePointAddressFormWidget` is added automatically. Therefore, you don't need to add it manually.

{% endinfo_block %}

6. Build assets:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE                                       | TEST                                                                             |
|----------------------------------------------|----------------------------------------------------------------------------------|
| ClickAndCollectServicePointAddressFormWidget | Go to the address checkout step and make sure you can select a service point. |

{% endinfo_block %}
