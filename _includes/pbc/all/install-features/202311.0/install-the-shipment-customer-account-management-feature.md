


This document describes how to integrate the [Shipment](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/shipment-feature-overview.html) + [Customer Account Management](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Shipment + Customer Account Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME                        | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                            |
|-----------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Shipment                    | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/install-and-upgrade/install-the-shipment-feature.html)                                                                      |
| Customer Account Management | {{page.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

## 1) Add translations

1. Append the glossary according to your configuration:

**data/import/common/common/glossary.csv**

```
page.checkout.address.single_address,Single address,en_US
page.checkout.address.single_address,Eine Adresse,de_DE
page.checkout.address.multiple_addresses,Multiple addresses,en_US
page.checkout.address.multiple_addresses,Mehrere Adressen,de_DE
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

| PLUGIN                                                       | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                                  |
|--------------------------------------------------------------|---------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin      | Expands the checkout address form with the `ShipmentType` subform.                | None          | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage    |
| ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin | Expands the checkout multi-shipping address form `ShipmentType`. | None          | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage    |
| ShipmentTypeAddressFormWidgetCacheKeyGeneratorStrategyPlugin | Skips caching of the `ShipmentTypeAddressFormWidget` widget.                  | None          | SprykerShop\Yves\ShipmentTypeWidget\Plugin\ShopApplication |

**src/Pyz/Yves/CustomerPage/CustomerPageDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\CustomerPage;

use SprykerShop\Yves\CustomerPage\CustomerPageDependencyProvider as SprykerShopCustomerPageDependencyProvider;
use SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage\ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin;
use SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage\ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin;

class CustomerPageDependencyProvider extends SprykerShopCustomerPageDependencyProvider
{
    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutAddressCollectionFormExpanderPluginInterface>
     */
    protected function getCheckoutAddressCollectionFormExpanderPlugins(): array
    {
        return [
            new ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin(),
        ];
    }

    /**
     * @return list<\SprykerShop\Yves\CustomerPageExtension\Dependency\Plugin\CheckoutMultiShippingAddressesFormExpanderPluginInterface>
     */
    protected function getCheckoutMultiShippingAddressesFormExpanderPlugins(): array
    {
        return [
            new ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShipmentTypeWidget\Plugin\ShopApplication\ShipmentTypeAddressFormWidgetCacheKeyGeneratorStrategyPlugin;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<\SprykerShop\Yves\ShopApplicationExtension\Dependency\Plugin\WidgetCacheKeyGeneratorStrategyPluginInterface>
     */
    protected function getWidgetCacheKeyGeneratorStrategyPlugins(): array
    {
        return [
            new ShipmentTypeAddressFormWidgetCacheKeyGeneratorStrategyPlugin(),
        ];
    }
}
```

## 3) Set up widgets

Register the following plugins to enable widgets:

| PLUGIN                        | SPECIFICATION                                                 | PREREQUISITES | NAMESPACE                                  |
|-------------------------------|---------------------------------------------------------------|---------------|--------------------------------------------|
| ShipmentTypeAddressFormWidget | Enables shipment type selection during the checkout address step. | None          | SprykerShop\Yves\ShipmentTypeWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShipmentTypeWidget\Widget\ShipmentTypeAddressFormWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return string[]
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ShipmentTypeAddressFormWidget::class,
        ];
    }
}
```

## 4) Set up the FE part

Adjust TWIG templates to display the shipment types:

1. For a single shipment, to the `address` view of the `CheckoutPage` module, add `ShipmentTypeAddressFormWidget`:

```twig
{% raw %}{% widget 'ShipmentTypeAddressFormWidget' args [data.form] with {
    data: {
        deliveryContainerClassName: deliveryContainerClassName,
        billingSameAsShippingContainerClassName: embed.jsAddressClass ~ '__wrapper-billingSameAsShipping',
    },
} only %}
{% endwidget %}{% endraw %}
```

{% info_block infoBox "Attribute description" %}

* `deliveryContainerClassName`: class name of the container delivery form and address selector.
* `embed.jsAddressClass ~ '__wrapper-billingSameAsShipping'`: container class name for the **Billing same as shipping** checkbox.

{% endinfo_block %}

2. (Optional) For a multi-shipment, follow these steps:
    1. Add the `ShipmentTypeAddressFormWidget` widget, as described in step 1 (for the single shipment).
    2. To the `address` view of the `CheckoutPage` module, add the `multiple-shipment-toggler` molecule:

         ```twig
         {% raw %}{% include molecule('multiple-shipment-toggler', 'CheckoutPage') with {
             data: {
                 isMultipleShipmentSelected: isMultipleShipmentSelected,
             },
             attributes: {
                 'toggle-targets-class-name': singleDeliveryContainerClassName,
                 'select-class-name': deliverySelectClassName,
             },
         } only %}{% endraw %}
         ```

   {% info_block infoBox "Attribute description" %}

    * `isMultipleShipmentSelected`: flag that indicates if the multiple shipment is selected.
    * `singleDeliveryContainerClassName`: class name of the container address selector and the `ShipmentTypeAddressFormWidget`.
    * `deliverySelectClassName`: class name of the address selector.

   {% endinfo_block %}

    3. To the `address-item-form-field-list` molecule of the `CheckoutPage` module, add `ShipmentTypeAddressFormWidget`:

         ```twig
         {% raw %}{% widget 'ShipmentTypeAddressFormWidget' args [item] with {
             data: {
                 deliveryContainerClassName: deliveryContainerClassName,
                 shipmentTypesClassName: data.validatorTriggerClassName,
                 servicePointClassName: data.itemShippingClassName,
             },
         } only %}{% endwidget %}{% endraw %}
         ```

    4. In the `CheckoutPage` module, adjust the `address-item-form` molecule by adding the `extra-triggers-class-name` attribute property for the `validate-next-checkout-step` molecule to validate `pickup` shipment type:

         ```twig
         {% raw %}{% include molecule('validate-next-checkout-step', 'CheckoutPage') with {
             class: validatorClassName,
             attributes: {
                 'container-selector': '.' ~ itemShippingClassName,
                 'target-selector': '.' ~ data.jsAddressClass ~ '__form-submit',
                 'dropdown-trigger-selector': '.' ~ addressSelectClassName ~ ':not(.' ~ data.hiddenClassName ~ ')',
                 'extra-triggers-class-name': validatorTriggerClassName,
                 'parent-target-class-name': config.jsName ~ '__items',
                 'is-enable': false,
             },
         } only %}{% endraw %}
         ```

3. Build assets:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widgets were registered:

| MODULE                         | TEST                                                                            |
|--------------------------------|---------------------------------------------------------------------------------|
| ShipmentTypeAddressFormWidget  | Go to **Address Checkout Step** and make sure that you can select shipment type. |

{% endinfo_block %}
