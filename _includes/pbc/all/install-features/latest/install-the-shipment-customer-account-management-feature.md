


This document describes how to install the [Shipment](/docs/pbc/all/carrier-management/latest/base-shop/shipment-feature-overview.html) + [Customer Account Management](/docs/pbc/all/customer-relationship-management/latest/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html) feature.

## Prerequisites

Install the required features:

| NAME                        | VERSION          | INSTALLATION GUIDE                                                                                                                                                                                            |
|-----------------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Shipment                    | {{page.version}} | [Install the Shipment feature](/docs/pbc/all/carrier-management/latest/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)                                                                      |
| Customer Account Management | {{page.version}} | [Install the Customer Account Management feature](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-features/install-the-customer-account-management-feature.html) |

## 1) Add translations

1. Append the glossary according to your configuration:

**data/import/common/common/glossary.csv**

```csv
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

Make sure the configured data has been added to the `spy_glossary_key` and `spy_glossary_translation` tables.

{% endinfo_block %}

## 2) Set up behavior

Enable the following plugins:

| PLUGIN                                                       | SPECIFICATION                                                             | PREREQUISITES | NAMESPACE                                                  |
|--------------------------------------------------------------|---------------------------------------------------------------------------|---------------|------------------------------------------------------------|
| ShipmentTypeCheckoutAddressCollectionFormExpanderPlugin      | Expands the checkout address form with the `ShipmentType` subform.                |           | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage    |
| ShipmentTypeCheckoutMultiShippingAddressesFormExpanderPlugin | Expands the checkout multi-shipping address form `ShipmentType`. |           | SprykerShop\Yves\ShipmentTypeWidget\Plugin\CustomerPage    |
| ShipmentTypeAddressFormWidgetCacheKeyGeneratorStrategyPlugin | Skips caching of the `ShipmentTypeAddressFormWidget` widget.                  |           | SprykerShop\Yves\ShipmentTypeWidget\Plugin\ShopApplication |

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
| ShipmentTypeAddressFormWidget | Enables shipment type selection at the checkout address step. |           | SprykerShop\Yves\ShipmentTypeWidget\Widget |

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

## 4) Set up the frontend

Adjust TWIG templates to display the shipment types:

1. In `/resources/form/form.twig` of the `ShopUi` module, adjust `choice_widget_expanded` and `checkbox_widget` blocks:

```twig
{% raw %}{% block choice_widget_expanded -%}
    ...
    {{- form_widget(child, {
        parent_label_class: label_attr.class | default,
        choices_attr: choices_attr | default({}),
    }) -}}
    ...
{%- endblock choice_widget_expanded %}

{%- block checkbox_widget -%}
    ...
    {%- set inputClass = attr.class | default ~ ' ' ~ choices_attr.class | default -%}

    {% define attributes = {
        ...
        disabled: disabled ?: attr.disabled | default(false),
        ...
    } %}

    {%- set modifiers = modifiers | merge([attributes.additionalModifier], choices_attr.modifiers | default([])) -%}
    ...
{%- endblock -%}{% endraw %}
```

2. For a single shipment, to the `address` view of the `CheckoutPage` module, add `ShipmentTypeAddressFormWidget`:

```twig
{% raw %}{% widget 'ShipmentTypeAddressFormWidget' args [data.form] with {
    data: {
        deliveryContainerClassName: deliveryContainerClassName,
        billingSameAsShippingContainerClassName: billingSameAsShippingContainerClassName,
        shipmentTypesClassName: validatorTriggerClassName,
        servicePointClassName: shippingValidationContainerClassName,
        deliverySelectClassName: deliverySelectClassName,
    },
} only %}
{% endwidget %}{% endraw %}
```

{% info_block infoBox "Attribute description" %}

- `deliveryContainerClassName`: class name of the container delivery form and address selector.
- `billingSameAsShippingContainerClassName`: container class name for the **Billing same as shipping** checkbox.
- `validatorTriggerClassName`: trigger class name for the `validate-next-checkout-step` molecule.
- `shippingValidationContainerClassName`: container class name for the shipping validation.
- `deliverySelectClassName`: class name of the address selector.

{% endinfo_block %}

2. Optional: For a multi-shipment, adjust the `CheckoutPage` module by following these steps:
    1. To the `address` view, add the `multiple-shipment-toggler` molecule:

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

        - `isMultipleShipmentSelected`: flag that indicates if the multiple shipment is selected.
        - `singleDeliveryContainerClassName`: class name of the container address selector and the `ShipmentTypeAddressFormWidget`.
        - `deliverySelectClassName`: class name of the address selector.

       {% endinfo_block %}

    2. To the `address-item-form-field-list` molecule of the `CheckoutPage` module, add `ShipmentTypeAddressFormWidget`:

        ```twig
        {% raw %}{% widget 'ShipmentTypeAddressFormWidget' args [item] with {
            data: {
                deliveryContainerClassName: deliveryContainerClassName,
                shipmentTypesClassName: data.validatorTriggerClassName,
                servicePointClassName: data.itemShippingClassName,
            },
        } only %}{% endwidget %}{% endraw %}
        ```

    3. Move the `is-next-checkout-step-enabled` and `validate-next-checkout-step` molecules from the `address-item-form-field-list` molecule to the `address` view. Put them before the `address-form-toggler` molecule.

    4. To validate the `pickup` shipment type, adjust the `address` view by adding the `extra-target-selector` attribute property for the `is-next-checkout-step-enabled` molecule:

        ```twig
        {% raw %}{% include molecule('is-next-checkout-step-enabled', 'CheckoutPage') with {
            attributes: {
                'trigger-selector': '.' ~ deliverySelectClassName,
                'target-selector': '.' ~ multishipmentValidatorClassName,
                'extra-target-selector': '.' ~ validatorClassName,
            },
        } only %}{% endraw %}
        ```

    5. To validate the `pickup` shipment type, adjust the `address` view by adding the `extra-container-selector` and `extra-triggers-class-name` attribute properties for the `validate-next-checkout-step` molecule :

        ```twig
        {% raw %}{% include molecule('validate-next-checkout-step', 'CheckoutPage') with {
            class: validatorClassName,
            attributes: {
                'container-selector': '.' ~ shippingValidationContainerClassName,
                'extra-container-selector': '.' ~ deliveryContainerClassName,
                'target-selector': '.' ~ embed.formSubmitClassName,
                'dropdown-trigger-selector': '.' ~ deliverySelectClassName ~ ':not(.' ~ hiddenClassName ~ ')',
                'extra-triggers-class-name': validatorTriggerClassName,
                'parent-target-class-name': singleDeliveryContainerClassName,
                'is-enable': false,
            },
        } only %}{% endraw %}
        ```

3. Build assets:

```bash
console frontend:yves:build
```

{% info_block warningBox "Verification" %}

Make sure the following widget has been registered:

| MODULE                         | VERIFICATION                                                                            |
|--------------------------------|---------------------------------------------------------------------------------|
| ShipmentTypeAddressFormWidget  | Go to **Address Checkout Step** and make sure that you can select a shipment type. |

{% endinfo_block %}
