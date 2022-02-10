---
title: Enabling filtering of payment methods for Ayden
description: Enable filtering available payment methods depending on the result of /paymentMethods API call in the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/adyen-filter-payment-methods
originalArticleId: 5e090a05-3c2f-43d4-9775-8d9c212f3923
redirect_from:
  - /2021080/docs/adyen-filter-payment-methods
  - /2021080/docs/en/adyen-filter-payment-methods
  - /docs/adyen-filter-payment-methods
  - /docs/en/adyen-filter-payment-methods
related:
  - title: Installing and configuring Adyen
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/adyen/installing-and-configuring-adyen.html
  - title: Integrating Adyen
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/adyen/integrating-adyen.html
  - title: Integrating Adyen payment methods
    link: docs/scos/dev/technology-partner-guides/page.version/payment-partners/adyen/integrating-adyen-payment-methods.html
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
     * @return array<\Spryker\Zed\PaymentExtension\Dependency\Plugin\PaymentMethodFilterPluginInterface>
     */
    protected function getPaymentMethodFilterPlugins(): array
    {
        return [
            ...
            new AdyenPaymentMethodFilterPlugin(),
        ];
    }
}
 ```
