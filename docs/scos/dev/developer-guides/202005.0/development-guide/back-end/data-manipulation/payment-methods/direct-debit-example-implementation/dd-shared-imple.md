---
title: Implementation of Direct Debit in the Shared Layer
originalLink: https://documentation.spryker.com/v5/docs/dd-shared-implementation
redirect_from:
  - /v5/docs/dd-shared-implementation
  - /v5/docs/en/dd-shared-implementation
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

After you've completed the front end, back end and shared implementation of the Direct Debit payment method, you can test it. See [Testing your Direct Debit Implementation](https://documentation.spryker.com/docs/en/dd-test-implementation) for information on how to do that.
