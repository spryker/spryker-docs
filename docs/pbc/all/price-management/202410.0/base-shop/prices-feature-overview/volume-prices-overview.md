---
title: Volume Prices overview
description: Volume pricing helps the merchants to gain the commitment of the customers. Providing volume discounts results in increasing the placement of large orders.
last_updated: Jul 9, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/volume-prices-overview
originalArticleId: f02ffa98-7d76-4d7d-8dbb-b96f46754627
redirect_from:
  - /2021080/docs/volume-prices-overview
  - /2021080/docs/en/volume-prices-overview
  - /docs/volume-prices-overview
  - /docs/en/volume-prices-overview
  - /docs/scos/user/features/202311.0/prices-feature-overview/volume-prices-overview.html
  - /docs/pbc/all/price-management/prices-feature-overview/volume-prices-overview.html
  - /docs/pbc/all/price-management/202204.0/base-shop/prices-feature-overview/volume-prices-overview.html
---

In highly competitive markets, the business tactic is made compelling by issuing drastic discounts when buying products in large quantities or volumes.

Volume pricing helps the merchants to gain the commitment of the customers. Providing volume discounts result in increasing the placement of large orders with the small ones. Large orders are preferred as they reduce the expenses incurred by the company.

Such incentives allow a business company to purchase additional inventory at a reduced cost and allow sellers or manufacturers to reduce the products by selling more units and increase their revenues per transaction.

The following schema illustrates the connection between `spy_price_product_store` table links `spy_price_product_merchant_relationship` with the `spy_currency` and `spy_store` tables.

![Database schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Volume+Prices/Volume+Prices+Feature+Overview/volume-prices-dbschema.png)

`price_data` in`spy_price_product_store` table contains a JSON with prices per mode, currency and type.

{% info_block infoBox %}

The "price_data" field is a JSON with attributes such as volume prices, merchant prices, customer prices and then a specific set of prices inside its price type (["QTY" => 10, "GROSS(DEFAULT)" => 100, "NET(DEFAULT)" => 90]).

{% endinfo_block %}


The following is an example of JSON:

```js
[
	"EUR" => [
		"GROSS_MODE" => [
		"DEFAULT" => 9999,
		"ORIGINAL" => 12564,
	],
		"NET_MODE" => [
		"DEFAULT" => 8999,
		"ORIGINAL" => 11308,
	],

		"price_data" => ["QTY" => 10, "GROSS(DEFAULT)" => 100, "NET(DEFAULT)" => 90], ["QTY" => 20, "GROSS(DEFAULT)" => 90, "NET(DEFAULT)" => 80]
	],
		"CHF" => [
		"GROSS_MODE" => [
		"DEFAULT" => 11499,
		"ORIGINAL" => 14449,
		],
		"NET_MODE" => [
		"DEFAULT" => 10349,
		"ORIGINAL" => 13004,
		],
	],
],
```

Volume prices are configured per store and per currency, and a shop administrator can set volume prices for every locale.

Volume prices are set for both gross and net mode and are either inherited from the abstract product or specified directly for a standalone concrete product.

{% info_block infoBox %}

The concrete product can also have its own volume prices different from its abstract (if they are explicitly defined per `concrete_sku`).

{% endinfo_block %}

A specific volume price for a concrete product has a higher priority over an inherited one from its abstract product.

The volume prices are imported using [data importer](https://github.com/spryker/price-product-data-import/blob/master/data/import/product_price.csv). The JSON with volume prices is added to the `price_data.volume_prices` column as shown in the example:

![CSV file containing volume prices](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Volume+Prices/Volume+Prices+Feature+Overview/volume-prices-csv.png)

After the import is completed the volume prices are shown on the product detail page:

![Volume prices displayed on the product detail page](https://spryker.s3.eu-central-1.amazonaws.com/docs/Features/Price/Volume+Prices/Volume+Prices+Feature+Overview/volume-prices-pdp.png)

Once the product is added to the shopping list or to the cart, the item price corresponding to the volume price is displayed for that quantity. If the user increases or decreases the quantity in cart (but not in shopping list since here we don't really change quantities), the price is updated once the user goes over or under a threshold defined by the volume prices.

## Threshold

Volume pricing is applied when a certain threshold is reached.

Threshold is a minimum value that serves as a benchmark/boundary for a discounted price when the product is dependent on the volume bought—for example, the number of units of the product.

{% info_block infoBox %}

This means that if you buy more quantity of products or sometimes may be group of products, you would get discount based on the volume of purchase. All of the individual products exceeding the threshold will receive the special price.

{% endinfo_block %}

The volume price is applicable only if the shopper exceeds a certain quantity threshold—the number of units the customer chooses to buy.

The following table illustrates a typical volume pricing model:

| Quantity of products | Price per products | Total Price |
| --- | --- | --- |
| 1 | $100 | $100 |
| 5 | $70 | $350 |
| 10 | $50 | $500 |
| 20 | $40 | $800 |

The new price will go into effect after 5 units are purchased and only apply to the units beyond that threshold. The buyer would still pay full price for the first 5 units they procured.

{% info_block infoBox %}

If the customer selects five, each unit will cost $70. If the customer selects 12, each unit will cost $50.

{% endinfo_block %}

Volume prices can also mean higher prices per item at increasing thresholds.

{% info_block infoBox %}

That is a particular case of electricity bills where you pay more if you use more.

{% endinfo_block %}

## Current Constraints

{% info_block infoBox %}

The feature has the following functional constraints which are going to be resolved in the future.

{% endinfo_block %}

- Unlike other prices in Spryker which support both price types (DEFAULT and ORIGINAL), volume price supports only DEFAULT price type.

- As volume price does not support ORIGINAL price type, you cannot define a promotion for a volume price.

- Volume prices cannot be applied to the [prices per merchant relation](/docs/pbc/all/price-management/{{site.version}}/base-shop/merchant-custom-prices-feature-overview.html).

## Related Business User documents

|BACK OFFICE USER GUIDES|
|---|
| [Add volume prices to abstract products](/docs/pbc/all/price-management/{{site.version}}/base-shop/manage-in-the-back-office/add-volume-prices-to-abstract-products-and-product-bundles.html)  |
