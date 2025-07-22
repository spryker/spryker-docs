---
title: Enable filtering of payment methods for Ayden
description: Enable filtering available payment methods depending on the result of /paymentMethods API call in the Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/adyen-filter-payment-methods
originalArticleId: 5e090a05-3c2f-43d4-9775-8d9c212f3923
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202311.0/payment-partners/adyen/enabling-filtering-of-payment-methods-for-adyen.html
  - /docs/pbc/all/payment-service-provider/202311.0/third-party-integrations/adyen/enable-filtering-of-payment-methods-for-adyen.html
  - /docs/scos/dev/technology-partner-guides/202204.0/payment-partners/adyen/enabling-filtering-of-payment-methods-for-adyen.html
related:
  - title: Installing and configuring Adyen
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/adyen/install-and-configure-adyen.html
  - title: Integrating Adyen
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/adyen/integrate-adyen.html
  - title: Integrating Adyen payment methods
    link: docs/pbc/all/payment-service-provider/page.version/base-shop/third-party-integrations/adyen/integrate-adyen-payment-methods.html
---

Adyen module provides filtering available payment methods depend on result of `/paymentMethods` API call.

To enable this add `\SprykerEco\Zed\Adyen\Communication\Plugin\AdyenPaymentMethodFilterPlugin` to filter plugins list in `src/Pyz/Zed/Payment/PaymentDependencyProvider.php`:

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information,  view the LICENSE file that was distributed with this source code.
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
