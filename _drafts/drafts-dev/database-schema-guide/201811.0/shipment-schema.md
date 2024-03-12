---last_updated: Oct 18, 2019

title: Shipment Schema
originalLink: https://documentation.spryker.com/v1/docs/db-schema-shipment
originalArticleId: b7a2945b-fa8e-408a-b83e-77b4270e25b1
redirect_from:
  - /v1/docs/db-schema-shipment
  - /v1/docs/en/db-schema-shipment
---


## Shipment

### Shipment carriers, method and price

{% info_block infoBox %}
The customer can select a shipment method and a related carrier during the checkout. Each shipment method has a dedicated price and tax set.
{% endinfo_block %}
![Shipment carriers](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Database+Schema+Guide/Shipment+Schema/shipment-carriers.png)

**Structure**:

* A Shipment Method has a name (e.g. "Express") and a Carrier (e.g. "DHL")
* Each Shipment Method has a default net/gross price per currency and per store
* The `spy_shipment_method::price` field is deprecated

### Shipment Configuration

In some use cases, shipments can become complicated. For this reason, the Shipment Method has three hooks for plugins.

| Optional Plugin | Purpose |
| --- | --- |
|  `availability_plugin` | Determines if the shipment method is selectable for the current quote (Default: Yes) |
|  `price_plugin` | This plugin enables overriding the default prices. For instance, the price of the shipment may depend on the weight of a product or the distance to the customer's shipment address. |
|  `delivery_time_plugin` | Allows defining a delivery date |

