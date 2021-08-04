---
title: HowTo - Import Payment Method Store Relation Data
originalLink: https://documentation.spryker.com/v5/docs/ht-import-payment-method-store-relation-data
redirect_from:
  - /v5/docs/ht-import-payment-method-store-relation-data
  - /v5/docs/en/ht-import-payment-method-store-relation-data
---

This HowTo article describes the procedures on how to:

* import payment methods defined as active or inactive in a .CSV file
* import payment methods assigned to specific stores
***
 
Besides managing the payment methods in the Back Office <!-- link -->, you can import the payment method details via a .CSV file.

**To import the payment methods:**

1. Prepare the **payment_method.csv** file where you can indicate whether a payment method is active or not. The file can contain the following fields:

| Property | Transcription | Example |
| --- | --- | --- |
| `payment_method_key` | Unique identifier of the payment method. | `dummyPaymentInvoice` |
| `payment_method_name` | Name for a payment method you want to create.  | `Invoice` |
| `payment_provider_key` | Unique identifier of the payment provider. | `dummyPayment` |
| `payment_provider_name` | Name of the payment provider offering this payment method. | `Dummy Payment` |
| `is_active` | Status of the payment method: **1** means that the payment method is available in the Storefront, and **0** means that the payment method is unavailable in the Storefront. | `1` or `0` |

2. Fill in the necessary data and save the changes.
3. Upload the file to `PaymentDataImport/data/import`. 
4. To import the data, run the following console command:

```bash
console data:import:payment-method
```
The imported data should appear in the `spy_payment_method` and `spy_payment_provider` tables and in the **Back Office > Administration > Payment Management > Payment Methods** section.

## Importing Payment Methods Assigned to Stores
To import payment methods assigned to specific stores:

1. Prepare the **payment_method_store.cs**v file containing the following fields:


| Property | Transcription | Example |
| --- | --- | --- |
| `payment_method_key` | Payment method that should be assigned to a store. | `dummyPaymentInvoice` |
| `store` | Store that you want your payment method to be assigned to.  | `DE` |

2. Fill in the necessary data and save the changes.
3. Upload the file to `PaymentDataImport/data/import`.
4. To import the payment methods with the stores assigned, run the following console command:

```bash
console data:import:payment-method-store
```
The file should be successfully imported to the `spy_payment_method_store` table and appear in the **Back Office > Administration > Payment Management > Payment Methods** section. 
