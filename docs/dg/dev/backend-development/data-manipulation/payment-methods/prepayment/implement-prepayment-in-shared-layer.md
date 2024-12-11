---
title: Implement prepayment in shared layer
description: Integrate prepayment into Spryker's shared layer with this guide. Discover best practices for seamless payment implementation across your ecommerce platform.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-prepayment-shared
originalArticleId: 2c67a631-daed-4aeb-871b-6a797a8452bb
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-shared-layer.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/prepayment/implementing-prepayment-in-shared-layer.html
related:
  - title: Implement prepayment
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment.html
  - title: Implement prepayment in frontend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-frontend.html
  - title: Implement prepayment in backend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/implement-prepayment-in-backend.html
  - title: Integrate Prepayment into checkout
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/integrate-prepayment-into-checkout.html
  - title: Test the Prepayment implementation
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/prepayment/test-the-prepayment-implementation.html
---

This tutorial shows how to identify the new payment type through some unique constants. Those constants are going to be defined under the Shared namespace because both Yves and Zed need them.

1. Create the `PaymentMethodsConstants` interface under the `Shared` namespace, where you define these unique constants.

**Code sample:**

```php
<?php

namespace Pyz\Shared\PaymentMethods;

interface PaymentMethodsConstants
{

    /**
     * @const string
     */
    const PROVIDER = 'paymentmethods';

    /**
     * @const string
     */
    const PAYMENT_METHOD_PREPAYMENT = 'prepayment';

    /**
     * @const string
     */
    const PAYMENT_PREPAYMENT_FORM_PROPERTY_PATH = static::PROVIDER . static::PAYMENT_METHOD_PREPAYMENT;

}
```

2. Enrich the `Payment` transfer file with a new property that corresponds to the new payment method.

**Code sample:**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="Payment">
        <!-- Should be equal to PaymentMethodsConstants::PAYMENT_PREPAYMENT_FORM_PROPERTY_PATH. Then the form fields can be automatically mapped to the transfer object inside this field. -->
        <property name="paymentmethodsprepayment" type="string"/>
    </transfer>
    </transfers>
```

3. Update the `PaymentTransfer` class:
```bash
vendor/bin/console transfer:generate
```
