---
title: Avalara
description: Avalara technology partner
last_updated: Jun 18, 2021
template: concept-topic-template
redirect_from:
  - /docs/scos/user/technology-partners/202212.0/taxes/avalara.html
  - /docs/pbc/all/tax-management/202212.0/base-shop/third-party-integrations/avalara.html
---

=============== ADD AVALARA HERO PICTURE

*Avalara AvaTax* is a cloud-based software delivers the latest sales and use tax calculations to your shopping cart or invoicing system at the point of purchase, while accounting for:

* Tax rates for each state, county, and city  
* Laws, rules, and jurisdiction boundaries  
* Special circumstances like tax holidays and product exemptions

To use *Avalara AvaTax*, [set up the AvaTax platform](https://help.avalara.com/Avalara_AvaTax_Update/Set_up_AvaTax_Update) for your application and [integrate Avalara](/docs/scos/dev/technology-partner-guides/{{site.version}}/taxes/avalara/integrating-avalara.html) into your project. Once you do that, you can [apply Avalara tax codes](https://help.avalara.com/Avalara_AvaTax_Update/Avalara_tax_codes) to automate tax calculations for your shop.

You can set the Avalara tax codes for the following entities by importing the codes:

* Abstract product: For details about import, see [File details: product_abstract.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/products-data-import/file-details-product-abstract.csv.html).
* Product option: For details about import, see [File details: product_option.csv](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/import-and-export-data/product-options/file-details-product-option.csv.html).
* Shipment: For details about import, see [File details: shipment.csv](/docs/scos/dev/data-import/{{site.version}}/data-import-categories/commerce-setup/file-details-shipment.csv.html).

{% info_block infoBox %}

Since shipment and products fall under different taxability categories, Avalara tax code for shipment is different from that of the abstract product or product option. For details about the codes and categories, see [Avalara tax code search](https://taxcode.avatax.avalara.com/).

{% endinfo_block %}

The Avalara codes are not displayed on the Storefront or in the Back Office. They are processed in the background to define taxes for order items. Avalara calculates taxes during the checkout, and, by default, the taxes are shown at the final checkout step.

When calculating taxes, Avalara takes the items' [warehouse addresses](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/inventory-management-feature-overview.html#defining-a-warehouse-address) into account. Therefore, each order item you calculate a tax for with Avalara, must have a warehouse assigned. To learn how warehouses are assigned to order items by default, see [Warehouse assignment to order items (with Avalara integration only)](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/inventory-management-feature-overview.html#warehouse-assignment-to-order-items-with-avalara-integration-only).

## Next steps

[Integrate Avalara](/docs/pbc/all/tax-management/{{site.version}}/avalara/integrate-avalara.html)
