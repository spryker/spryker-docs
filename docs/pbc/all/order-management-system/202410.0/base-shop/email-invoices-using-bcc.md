---
title: Email invoices using BCC
description: This document provides detailed instructions on emailing invoices using BCC.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/howto-emailing-invoices-using-bcc
originalArticleId: 5fdd0927-fb7a-43b7-9feb-caa171a3c51a
redirect_from:
  - /2021080/docs/howto-emailing-invoices-using-bcc
  - /2021080/docs/en/howto-emailing-invoices-using-bcc
  - /docs/howto-emailing-invoices-using-bcc
  - /docs/en/howto-emailing-invoices-using-bcc
  - /v6/docs/howto-emailing-invoices-using-bcc
  - /v6/docs/en/howto-emailing-invoices-using-bcc
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-emailing-invoices-using-bcc.html
  - /docs/scos/dev/tutorials-and-howtos/howtos/feature-howtos/howto-email-invoices-using-bcc.html
related:
  - title: Invoice Generation overview
    link: docs/pbc/all/order-management-system/page.version/base-shop/order-management-feature-overview/invoice-generation-overview.html
---

Every time you generate an [invoice for your customer’s orders](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/order-management-feature-overview/invoice-generation-overview.html), it's sent to the customer’s email address. If you also need a copy of the invoice, you can include yourself or your employees to BCC recipients of the emails with the invoices. Since the copy is hidden, when customers receive the email, they do not see other recipients' email addresses.

{% info_block infoBox "Info" %}

BCC is the only way to keep invoices for your reference because the generated invoices are not saved in the Back Office or on the Storefront.

{% endinfo_block %}

To configure emailing BCC for the generated invoice, in `SalesInvoiceConfig.php` file, add the `getOrderInvoiceBcc()` method and specify the email addresses and name of the recipient as shown in the example:

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

You can also force sending the additional copies of all generated invoices to customer’s email and to the email addresses specified in the `getOrderInvoiceBCC()` method:

```bash
console order:invoice --force
```

To send the additional copies for not all, but for specific orders only, specify the order ID after the `force` flag. For example, if you want to receive an additional copy of the invoice for order 1, use this command:

```bash
console order:invoice --force 1
```
