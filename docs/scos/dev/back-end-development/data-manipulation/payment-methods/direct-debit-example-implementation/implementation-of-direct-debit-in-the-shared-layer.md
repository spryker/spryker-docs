---
title: Implementation of Direct Debit in the Shared Layer
description: This article provides step-by-step instructions on how to identify the new payment type using some unique constants.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/dd-shared-implementation
originalArticleId: 106f7955-4143-4ed5-890b-f58b6ee24b9f
redirect_from:
  - /2021080/docs/dd-shared-implementation
  - /2021080/docs/en/dd-shared-implementation
  - /docs/dd-shared-implementation
  - /docs/en/dd-shared-implementation
  - /v6/docs/dd-shared-implementation
  - /v6/docs/en/dd-shared-implementation
  - /v5/docs/dd-shared-implementation
  - /v5/docs/en/dd-shared-implementation
  - /v4/docs/dd-shared-implementation
  - /v4/docs/en/dd-shared-implementation
  - /v3/docs/dd-shared-implementation
  - /v3/docs/en/dd-shared-implementation
  - /v2/docs/dd-shared-implementation
  - /v2/docs/en/dd-shared-implementation
  - /v1/docs/dd-shared-implementation
  - /v1/docs/en/dd-shared-implementation
---

This article provides step-by-step instructions on how to identify the new payment type using some unique constants. We are going to define those constants under the `Shared` namespace, since they’re needed both for Yves and Zed.

To identify the new payment type, do the following:
1. Create the `PaymentMethodsConstants` interface under the `Shared` namespace, where you’ll define these unique constants.

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

3. To have the `PaymentTransfer` class updated, run the following command:

```bash
vendor/bin/console transfer:generate
```

***
**What's next?**

After you've completed the front end, back end and shared implementation of the Direct Debit payment method, you can test it. See [Testing your Direct Debit Implementation](/docs/scos/dev/back-end-development/data-manipulation/payment-methods/direct-debit-example-implementation/testing-your-direct-debit-implementation.html) for information on how to do that.
