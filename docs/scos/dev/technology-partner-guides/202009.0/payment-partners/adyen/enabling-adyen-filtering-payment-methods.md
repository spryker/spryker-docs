---
title: Enabling Ayden filtering payment methods
description: Enable filtering available payment methods depending on the result of /paymentMethods API call in the Spryker Commerce OS.
last_updated: Aug 27, 2020
template: concept-topic-template
originalLink: https://documentation.spryker.com/v6/docs/adyen-filter-payment-methods
originalArticleId: f49b4ef8-9548-4181-906c-dc2a3154023e
redirect_from:
  - /v6/docs/adyen-filter-payment-methods
  - /v6/docs/en/adyen-filter-payment-methods
related:
  - title: Installing and configuring Ayden
    link: docs/scos/user/technology-partners/page.version/payment-partners/adyen/adyen-installation-and-configuration.html
  - title: Integrating Ayden
    link: docs/scos/user/technology-partners/page.version/payment-partners/adyen/adyen-integration-into-a-project.html
  - title: Integrating Ayden payment methods
    link: docs/scos/user/technology-partners/page.version/payment-partners/adyen/adyen-provided-payment-methods.html
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
