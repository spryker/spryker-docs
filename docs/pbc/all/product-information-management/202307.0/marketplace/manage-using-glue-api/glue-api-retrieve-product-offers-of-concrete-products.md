---
title: "Glue API: Retrieve product offers of concrete products"
description: Retrieve details about product offers via Glue API
template: glue-api-storefront-guide-template
last_updated: Nov 15, 2023
redirect_from:
  - /docs/pbc/all/product-information-management/202307.0/marketplace/manage-using-glue-api/retrieve-product-offers-of-concrete-products.html
related:
  - title: "Glue API: Retrieve concrete products"
    link: docs/pbc/all/product-information-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html
---


To retrieve the product offers of a concrete product, send the request:

***
`GET` {% raw %}**/concrete-products/*{{concrete_product_sku}}*/product-offers**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| ------------- | ---------------------- |
| {% raw %}***{concrete_product_sku}}***{% endraw %}  | SKU of a concrete product to retrieve the product offers of. |

## Request

Request sample: retrieve the product offers of a concrete product

`GET https://glue.mysprykershop.com/concrete-products/006_30692993/product-offers`

## Response

Response sample: retrieve the product offers of a concrete product

```json
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
| merchantReference | String  | Unique identifier of the merchant. |
| isDefault         | Boolean | Defines if the product offer is default.  |
