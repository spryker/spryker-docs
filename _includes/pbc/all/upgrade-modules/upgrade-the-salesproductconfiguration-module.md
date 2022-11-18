## Upgrading from version 0.2.* to version 1.0.*

*Estimated migration time: 5 minutes*

To upgrade the `SalesProductConfiguration` module from version 0.2.* to version 1.0.*, do the following:

1. Update the `SalesProductConfiguration` module to version 1.0.0:

```bash
composer require "spryker/sales-product-configuration":"^1.0.0" --update-with-dependencies
```


Increased ProductConfiguration module version dependency.
Removed ProductConfigurationOrderSaverPlugin.
Removed ProductConfigurationOrderPostSavePlugin.
Removed CheckoutExtension module version BC.