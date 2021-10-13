---
title: Adyen - Filtering Payment Methods
description: Enable filtering available payment methods depending on the result of /paymentMethods API call in the Spryker Commerce OS.
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/adyen-filter-payment-methods
originalArticleId: f49b4ef8-9548-4181-906c-dc2a3154023e
redirect_from:
  - /v6/docs/adyen-filter-payment-methods
  - /v6/docs/en/adyen-filter-payment-methods
---

Adyen module provides filtering available payment methods depend on result of `/paymentMethods` API call.

To enable this add `\SprykerEco\Zed\Adyen\Communication\Plugin\AdyenPaymentMethodFilterPlugin` to filter plugins list in `src/Pyz/Zed/Payment/PaymentDependencyProvider.php`:

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Payment;

...
use SprykerEco\Zed\Adyen\Communication\Plugin\AdyenPaymentMethodFilterPlugin;

class PaymentDependencyProvider extends SprykerPaymentDependencyProvider
{
    /**
     * @return \Spryker\Zed\Payment\Dependency\Plugin\Payment\PaymentMethodFilterPluginInterface[]
     */
    protected function getPaymentMethodFilterPlugins()
    {
        return [
            ...
            new AdyenPaymentMethodFilterPlugin('toggler-radio'),
        ];
    }
}
 ```

