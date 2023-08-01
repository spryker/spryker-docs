


This document describes how to integrate the Service Points + [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points + Customer Account Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                        | VERSION          | INTEGRATION GUIDE                                                                                                                                                                                            |
|-----------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points              | {{page.version}} | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/unified-commerce/install-the-service-points-feature.html)                                                                      |
| Customer Account Management | {{page.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

## 1) Add translations

1. Append the glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
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

## 3) Set up widgets

Register the following plugins to enable widgets:

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

## 4) Set up FE part

Adjust TWIG templates to display the service point selector.

1. To the `page-layout-main` template of `ShopUi` module, add the `main-overlay` molecule:

```twig
{% raw %}{% block globalComponents %}
    ....
    {% include molecule('main-overlay') only %}
{% endblock %}{% endraw %}
```

2. Add `cross` icon to the `icon-spite` atom in the `ShopUi` module:

```twig
{% raw %}<symbol id=":cross" viewBox="0 0 24 24">
    <path d="M14.8,12l3.6-3.6c0.8-0.8,0.8-2,0-2.8c-0.8-0.8-2-0.8-2.8,0L12,9.2L8.4,5.6c-0.8-0.8-2-0.8-2.8,0   c-0.8,0.8-0.8,2,0,2.8L9.2,12l-3.6,3.6c-0.8,0.8-0.8,2,0,2.8C6,18.8,6.5,19,7,19s1-0.2,1.4-0.6l3.6-3.6l3.6,3.6   C16,18.8,16.5,19,17,19s1-0.2,1.4-0.6c0.8-0.8,0.8-2,0-2.8L14.8,12z"/>
</symbol>{% endraw %}
```

{% info_block infoBox "Info" %}

In case the `cross` icon is already defined in the project, it is not necessary to add it again.

{% endinfo_block %}

3. Adjust `choice_widget_expanded` and `checkbox_widget` blocks for `/resources/form/form.twig` of `ShopUi` module:

```twig
{% raw %}{% block choice_widget_expanded -%}
    ...
    {{- form_widget(child, {
        parent_label_class: label_attr.class|default(''),
        choices_attr: choices_attr | default({}),
    }) -}}
    ...
{%- endblock choice_widget_expanded %}

{%- block checkbox_widget -%}
    ...
    {%- set inputClass = attr.class | default ~ ' ' ~ choices_attr.class | default -%}

    {% define attributes = {
        id: id,
        name: full_name,
        checked: checked | default(false),
        required: required | default(false),
        disabled: disabled ?: attr.disabled | default(false),
        value: value | default(),
    } %}
    ...
{%- endblock -%}{% endraw %}
```

4. Add `ClickCollectServicePointAddressFormWidget` to the `addres` view of the `CheckoutPage` module:

```twig
{% raw %}{% widget 'ClickCollectServicePointAddressFormWidget' args [data.checkoutAddressForm] only %}{% endwidget %}{% endraw %}
```

{% info_block infoBox "Info" %}

In case using `ShipmentTypeAddressFormWidget` widget the `ClickCollectServicePointAddressFormWidget` will be added automatically, so no need to add it manually.

{% endinfo_block %}

5. Build assets:

Enable Javascript and CSS changes:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets were registered:

| MODULE                                    | TEST                                                                            |
|-------------------------------------------|---------------------------------------------------------------------------------|
| ClickCollectServicePointAddressFormWidget | Go to **Address Checkout Step** and make sure that you can select service point. |

{% endinfo_block %}
