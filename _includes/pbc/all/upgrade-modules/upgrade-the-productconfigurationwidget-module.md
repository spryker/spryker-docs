

## Upgrading from version 0.1.* to version 0.2.*

*Estimated migration time: 5 minutes*

To upgrade the `ProductConfigurationWidget` module from version 0.1.* to version 0.2.*, do the following:

1. Update the `ProductConfigurationWidget` module to version 0.2.0:

```bash
composer require spryker-shop/product-configuration-widget:"^0.2.0" --update-with-dependencies
```

2. Re-generate transfer classes:

```bash
console transfer:generate
```

3. From `\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider`, remove the widgets:

    - `SprykerShop\Yves\ProductConfigurationWidget\Widget\ProductConfigurationCartItemDisplayWidget` (should be replaced with `SprykerShop\Yves\ProductConfigurationCartWidget\Widget\ProductConfigurationCartItemDisplayWidget`)
    - `SprykerShop\Yves\ProductConfigurationWidget\Widget\ProductConfigurationCartPageButtonWidget` (should be replaced with `SprykerShop\Yves\ProductConfigurationCartWidget\Widget\ProductConfigurationCartPageButtonWidget`)
    - `SprykerShop\Yves\ProductConfigurationWidget\Widget\ProductConfigurationQuoteValidatorWidget` (should be replaced with `SprykerShop\Yves\ProductConfigurationCartWidget\Widget\ProductConfigurationQuoteValidatorWidget`)
