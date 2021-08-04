---
title: Invoice Generation overview
originalLink: https://documentation.spryker.com/2021080/docs/invoice-generation-overview
redirect_from:
  - /2021080/docs/invoice-generation-overview
  - /2021080/docs/en/invoice-generation-overview
---

Invoices can be generated and sent to customer’s email every time they place an order in the shop.

{% info_block infoBox "Info" %}

You can send a hidden copy of the invoice to yourself or your employees. Keep in mind that sending the hidden copy to yourself is the only way to keep invoices for your reference, as for now, the generated invoices are not saved in the Back Office or on the Storefront.

{% endinfo_block %}

It is possible to generate an invoice only once the order has acquired the `confirmed` state. The invoice generation and sending are triggered in the Back Office by initiating the `invoice-generate` event on the *View Order* page. See [Changing order statuses](https://documentation.spryker.com/docs/managing-orders#changing-order-statuses) for details on how a Back Office User initiates events for orders. After generating the invoice, the OMS state of the order changes to `exported`. 

{% info_block infoBox "Info" %}

You can use the default OMS states to be displayed on the *Order Details* pages on the Storefront or set custom states so they would make more sense for the Storefront users. For details on how to set the custom states for orders on the Storefront, see [HowTo - Display Custom Names for Order Item States on the Storefront](https://documentation.spryker.com/docs/howto-display-custom-names-for-order-item-states-on-the-storefront).

{% endinfo_block %}
By default, the invoice can be generated only for the whole order (not for individual order items) and only once. However, on the project level, you can set up a configuration that forces the repeated invoice generation by running a console command. See [HowTo - Emailing Invoices Using BCC](https://documentation.spryker.com/docs/howto-emailing-invoices-using-bcc)  for details.


## Invoice template
The invoice template is not provided out of the box and needs to be added in the SalesInvoiceConfig.php file. Otherwise, the exception is thrown, and the invoice is not generated.

Check out the example of the Spryker invoice template:
![Generated Invoice](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Order+Management/Invoice+Generation/generated-invoice.png){height="" width=""}

In the generated invoice template, the following data is **not hardcoded**:

* Customer billing address
* Invoice creation date
* Invoice number
* All order data in the table

All other text is hardcoded. This text is glossary keys, and you can change them for your project as you want. 

{% info_block infoBox "Product bundles" %}

Keep in mind that bundled product itself always has a 0 tax rate. However, all of the bundled items are represented separately in the invoice and can have their own tax rates which are reflected in the invoice. For example, in the image above, Sony Bundle is the bundled product with a 0% tax rate, and *Sony HDR-AS20*, *Sony SmartWatch 3*, *Sony Xperia Z3 Compact* are its bundled items with their tax rates.

{% endinfo_block %}

## Current constraints

* Product options are not fully supported in the generated invoice for now. If product options have one tax rate and the product itself another, the tax rate difference is not reflected in the invoice. The invoice shows prices that already include tax rates of products and product options.
* .pdf files of the invoices are not generated.


## If you are:

<div class="mr-container">
    <div class="mr-list-container">
        <!-- col1 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-green">
                <li class="mr-title">Developer</li>
                <li><a href="https://documentation.spryker.com/docs/order-management-feature-integration" class="mr-link">Enable invoice generation by integrating the Order Management feature into your project </a></li>
                <li><a href="https://documentation.spryker.com/docs/howto-emailing-invoices-using-bcc" class="mr-link">Configure emailing of invoices using BCC</a></li> 
            </ul>
        </div>
        <!-- col2 -->
        <div class="mr-col">
            <ul class="mr-list mr-list-blue">
                <li class="mr-title"> Back Office User</li>
                <li><a href="https://documentation.spryker.com/docs/en/managing-orders#changing-order-statuses" class="mr-link">Trigger invoice generation in the Back Office</a></li>
            </ul>
        </div>
    </div>
</div>
