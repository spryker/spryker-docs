---
title: HowTo - Emailing Invoices Using BCC
originalLink: https://documentation.spryker.com/2021080/docs/howto-emailing-invoices-using-bcc
redirect_from:
  - /2021080/docs/howto-emailing-invoices-using-bcc
  - /2021080/docs/en/howto-emailing-invoices-using-bcc
---

Every time you generate an[ invoice for your customer’s orders](https://documentation.spryker.com/docs/en/invoice-generation-feature-overview), it is sent to the customer’s email address. If you also need a copy of the invoice, you can include yourself or your employees to BCC recipients of the emails with the invoices. Since the copy is hidden, when customers receive the email, they do not see other recipients' email addresses. 

{% info_block infoBox "Info" %}

Currently, BCC is the only way to keep invoices for your reference, as for now, the generated invoices are not saved in the Back Office or on the Storefront.

{% endinfo_block %}

To configure emailing BCC for the generated invoice, in `SalesInvoiceConfig.php` file, add the `getOrderInvoiceBcc()` method and specify email addresses and name of the recipient as shown in the example: 

```php
namespace Pyz\Zed\SalesInvoice;

...
    public function getOrderInvoiceBcc(): string
    {
        return [
           (new \Generated\Shared\Transfer\MailRecipientTransfer())
               ->setEmail(email: 'sales@test.com')
               ->setName(name: 'Sales team'),
        ];
    }
}
```

When configured, this method sends a hidden copy of each invoice to the specified email address.

You can also force sending the additional copies of all generated invoices to customer’s email and to the email addresses specified in the `getOrderInoiceBCC()` method. To achieve this, run the command:
```bash
console order:invoice --force
```

If you want to send the additional copies for not all, but for specific orders only, specify the order ID after the `force` flag. For example, if you want to receive an additional copy of the invoice for order 1, your command will look like this:
```bash
console order:invoice --force 1
```
