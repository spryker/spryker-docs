---
title: Implement Direct Debit in the shared layer
description: This document provides step-by-step instructions on how to identify the new payment type using some unique constants.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/dd-shared-implementation
originalArticleId: 106f7955-4143-4ed5-890b-f58b6ee24b9f
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-the-shared-layer.html
  - /docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implementation-of-direct-debit-in-the-shared-layer.html
related:
  - title: Implement Direct Debit payment
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-payment.html
  - title: Implement Direct Debit in Yves
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-yves.html
  - title: Implement Direct Debit in Zed
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/implement-direct-debit-in-zed.html
  - title: Integrate Direct Debit into checkout
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/integrate-direct-debit-into-checkout.html
  - title: Test your Direct Debit implementation
    link: docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/test-your-direct-debit-implementation.html
---

This document shows how to identify the new payment type using some unique constants. Those constants are defined under the `Shared` namespace because they're needed both for Yves and Zed.

To identify the new payment type, do the following:

1. In the `Shared` namespace, where you define these unique constants, create the `PaymentMethodsConstants` interface.

**Code sample:**

```php
<?php
namespace Pyz\Shared\PaymentMethods;

interface PaymentMethodsConstants
{
	public const PROVIDER = 'PaymentMethods';
	public const PAYMENT_METHOD_DIRECTDEBIT = 'paymentMethodsDirectDebit';
}
```

2. Enrich the `Payment` transfer file with a new property that corresponds to the new Direct Debit payment method.

**Code sample:**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

    <transfer name="Payment">
        <property name="paymentMethodsDirectDebit" type="PaymentDirectDebit"/>
    </transfer>

    <transfer name="PaymentDirectDebit">
        <property name="idPaymentDirectDebit" type="int"/>
        <property name="fkSalesOrder" type="int"/>

        <property name="bankAccountHolder" type="string"/>
        <property name="bankAccountBic" type="string"/>
        <property name="bankAccountIban" type="string"/>
    </transfer>
```

1. Update `PaymentTransfer`:

```bash
vendor/bin/console transfer:generate
```


**What's next?**

After you've completed the frontend, backend, and shared implementation of the Direct Debit payment method, you can test it. For information on how to do that, see [Test your Direct Debit implementation](/docs/dg/dev/backend-development/data-manipulation/payment-methods/direct-debit-example-implementation/test-your-direct-debit-implementation.html)
