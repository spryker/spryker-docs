---
title: Retrieving product offers for a concrete product
description: Retrieve details about product offers in the Spryker Marketplace
template: glue-api-storefront-guide-template
---

:::(Warning) (Warning!)
This endpoint is available only for the Spryker Marketplace shop.
:::

To retrieve information about the existing product offers of a concrete product, send the request:

------

GET **/concrete-products/*{{concrete_product_sku}}*/product-offers**

------

| PATH PARAMETER | DESCRIPTION     |
| ------------- | ---------------------- |
| ***{{concrete_product_sku}}***  | SKU of a concrete product. |

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

| Attribute      | TYPE   | DESCRIPTION   |
| --------------------- | ----------- | --------------------- |
| merchantSku       | String  | SKU of the Merchant the Product Offer belongs to.   |
| merchantReference | String  | Merchant Reference assigned to every Merchant. |
| isDefault         | Boolean | Defines whether the product offer is default or not.  |
