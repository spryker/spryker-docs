---
title: Retrieving product offers for a concrete product
description: Retrieve details about product offers in the Spryker Marketplace
template: glue-api-storefront-guide-template
---

{% info_block warningBox "Warning" %}

This endpoint is available only for the Spryker Marketplace shop.

{% endinfo_block %}

To retrieve information about the existing product offers of a concrete product, send the request:

---
GET **/concrete-products/{% raw %}*{{concrete_product_sku}}*{% endraw %}/product-offers**

---

| PATH PARAMETER | DESCRIPTION |
| ------------- | ---------------------- |
| {% raw %}***{concrete_product_sku}}***{% endraw %}  | SKU of a concrete product. |

#### Request

Request sample: `GET https://glue.mysprykershop.com/concrete-products/006_30692993/product-offers`

#### Response

Response sample:

```
{
    "data": [
        {
            "type": "product-offers",
            "id": "offer54",
            "attributes": {
                "merchantSku": null,
                "merchantReference": "MER000005",
                "isDefault": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer54"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/concrete-products/006_30692993/product-offers"
    }
}
```

| ATTRIBUTE | TYPE | DESCRIPTION |
| --------------------- | ----------- | --------------------- |
| merchantSku       | String  | SKU of the merchant the product offer belongs to.   |
| merchantReference | String  | Merchant reference assigned to every merchant. |
| isDefault         | Boolean | Defines whether the product offer is default or not.  |
