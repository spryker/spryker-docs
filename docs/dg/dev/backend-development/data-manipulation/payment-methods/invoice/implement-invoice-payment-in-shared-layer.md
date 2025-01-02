---
title: Implement invoice payment in shared layer
description: Integrate invoice payment into Spryker's shared layer with detailed steps. Enhance backend capabilities for seamless ecommerce payment integration.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/ht-invoice-payment-fe-be-shared
originalArticleId: ddb4c3f0-4ea8-4cda-82a2-0ffd4fecac99
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-shared-layer.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/invoice/implementing-invoice-payment-in-shared-layer.html
related:
  - title: Implement invoice payment
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/implement-invoice-payment.html
  - title: Implement invoice payment in frontend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-frontend.html
  - title: Implement invoice payment in backend
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/implement-invoice-payment-in-backend.html
  - title: Integrate invoice payment into checkout
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/integrate-invoice-payment-into-checkout.html
  - title: Test the invoice payment implementation
    link: docs/dg/dev/backend-development/data-manipulation/payment-methods/invoice/test-the-invoice-payment-implementation.html
---

This tutorial helps you identify the new payment type through some unique constants. Those constants are going to be defined in the `Shared` namespace, since they're needed both by Yves and Zed.

1. Create the `PaymentMethodsConstants` interface under the `Shared` namespace, where you define these unique constants.

<details>
<summary>Code sample:</summary>

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
    const PAYMENT_METHOD_INVOICE = 'invoice';

    /**
     * @const string
     */
    const PAYMENT_INVOICE_FORM_PROPERTY_PATH = static::PROVIDER . static::PAYMENT_METHOD_INVOICE;

}
```
</details>

2. Enrich the `Payment` transfer file with a new property that corresponds to the new payment method. Add `Shared/PaymentMethods/Transfer/invoicepayment.transfer.xml` file with the following content:

<details>
<summary>Code sample:</summary>

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="Payment">
        <!-- Should be equal to PaymentMethodsConstants::PAYMENT_INVOICE_FORM_PROPERTY_PATH.
		Then the form fields can be automatically mapped to the transfer object inside this field. -->
        <property name="paymentmethodsinvoice" type="string"/>
    </transfer>
    </transfers>
```
</details>

3. Update the `PaymentTransfer` class:
```
vendor/bin/console transfer:generate
``
