

## Upgrading from version 2.* to version 3.*

In this new version of the `CheckoutPage` module, we have added support of split delivery. You can find more details about the changes on the[CheckoutPage module release page](https://github.com/spryker-shop/checkout-page/releases).

{% info_block infoBox %}

This release is a part of the **Split delivery** concept migration. When you upgrade this module version, you should also update all other installed modules in your project to use the same concept as well as to avoid inconsistent behavior. For more information, see [Split Delivery Migration Concept](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/split-delivery-migration-concept.html).

{% endinfo_block %}

*Estimated migration time: 5 min*

To upgrade to the new version of the module, do the following:

1. Upgrade the `CheckoutPage` module to the new version:

```bash
composer require spryker-shop/checkout-page: "^3.0.0" --update-with-dependencies
```

2. Generate the transfer objects:

```bash
console transfer:generate
```


## Upgrading from version 1.* to version 2.*

In this new version of the `CheckoutPage` module, we have:

* Integrated Gift Card related functionality.
* Added "no shipment" shipment method handling in case only gift cards are to be ordered.
* Added "no payment" payment method handling in case the price to pay of a cart is 0.
* Added filtering logic of selectable payment methods.

You can find more details about the changes on [CheckoutPage module release page](https://github.com/spryker-shop/checkout-page/releases).

To upgrade to the new version of the module, do the following:

1. Upgrade the `CheckoutPage` module to version 2.0.0:

```bash
composer require spryker-shop/checkout-page: "^2.0.0" --update-with-dependencies
```

2. Generate transfer objects:

```bash
console transfer:generate
```

3. Extend your project with the following configuration:

```php
<?php

use Spryker\Shared\Kernel\KernelConstants;
use Spryker\Shared\Nopayment\NopaymentConfig;

// ---------- Dependency injector
$config[KernelConstants::DEPENDENCY_INJECTOR_YVES] = [
    'CheckoutPage' => [
        NopaymentConfig::PAYMENT_PROVIDER_NAME,
    ],
];
```
