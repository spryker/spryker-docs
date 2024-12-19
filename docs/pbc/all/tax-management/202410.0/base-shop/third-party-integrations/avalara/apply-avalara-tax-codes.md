---
title: Apply Avalara tax codes
description: Learn how to apply Avalara tax codes to calculate taxes within your Spryker Cloud Commerce OS Project.
last_updated: Aug 3, 2023
template: concept-topic-template
redirect_from:
- /docs/pbc/all/tax-management/202311.0/base-shop/avalara/apply-avalara-tax-codes.html
---

[Avalara tax codes](https://help.avalara.com/Avalara_AvaTax_Update/Avalara_tax_codes) are processed in the background to define taxes for order items, and are not displayed on the Storefront or in the Back Office. Taxes are calculated during the checkout, and, by default, the taxes are shown at the final checkout step.

To automate tax calculations for your shop, you need to apply the tax codes by importing them into your shop. You can import Avalara tax codes for the following entities:

| ENTITY | IMPORT FILE DETAILS |
|-|-|
| Abstract product | [File details: product_abstract.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/products-data-import/import-file-details-product-abstract.csv.html) |
| Product option | [File details: product_option.csv](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/import-and-export-data/product-options/import-file-details-product-option.csv.html) |
| Shipment | [File details: shipment.csv](/docs/pbc/all/tax-management/{{page.version}}/base-shop/import-and-export-data/import-file-details-shipment.csv.html) |

{% info_block infoBox %}

Because shipment and products fall under different taxability categories, the Avalara tax code for shipment is different from that of the abstract product or product option. For details about the codes and categories, see [Avalara tax code search](https://taxcode.avatax.avalara.com/).

{% endinfo_block %}
