---
title: Retrieving product labels
originalLink: https://documentation.spryker.com/v6/docs/retrieving-product-labels
redirect_from:
  - /v6/docs/retrieving-product-labels
  - /v6/docs/en/retrieving-product-labels
---

[Product labels](https://documentation.spryker.com/docs/product-label-feature-overview#product-label) are used to draw your customers' attention to some specific products. Each of them has a name, a priority, and a validity period. The Product Labels API provides endpoints for getting labels via the REST HTTP requests.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Product Labels feature integration](https://documentation.spryker.com/docs/glue-api-product-labels-feature-integration). 

## Retrieve a product label

To retrieve a product label, send the request:

---
`GET` **/product-labels/*{% raw %}{{{% endraw %}product_label_id{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}product_label_id{% raw %}}}{% endraw %}*** | ID of a product label to retrieve. You can check it in the Back Office > **Products** > **Product Labels** |


### Request

Request sample: `GET http://glue.mysprykershop.com/product-labels/3`


### Response

<details open>
    <summary>Response sample</summary>

```json
{
    "data": {
        "type": "product-labels",
        "id": "3",
        "attributes": {
            "name": "Standard Label",
            "isExclusive": false,
            "position": 3,
            "frontEndReference": ""
        },
        "links": {
            "self": "http://glue.mysprykershop.com/product-labels/3"
        }
    }
}
```

</details>

<a name="product-labels-response-attributes"></a>
| Attribute | Type | Description |
| --- | --- | --- |
| name | String | Specifies the label name. |
| isExclusive | Boolean | Indicates whether the label is `exclusive`.</br>If the attribute is set to true, the current label takes precedence over other labels the product might have. This means that only the current label should be displayed for the product, and all other possible labels should be hidden. |
| position | Integer | Indicates the label priority.</br>Labels should be indicated on the frontend according to their priority, from the highest (**1**) to the lowest, unless a product has a label with the `isExclusive` attribute set.|
| frontEndReference | String |Specifies the label custom label type (CSS class).</br>If the attribute is an empty string, the label should be displayed using the default CSS style. |


## Other management options

Apart from using this dedicated endpoint, you can retrieve product lables as an included resource as follows:
* [Retrieve an abstract product](https://documentation.spryker.com/docs/retrieving-abstract-products#retrieve-an-abstract-product)
* [Retrieve a concrete product](https://documentation.spryker.com/docs/retrieving-concrete-products#retrieve-a-concrete-product)
* [Retrieve a guest cart](https://documentation.spryker.com/docs/managing-guest-carts#retrieve-a-guest-cart)
* [Retreive a registered user's carts](https://documentation.spryker.com/docs/managing-carts-of-registered-users#retrieve-a-registered-user-s-carts)
* [Retrieve a registered user's cart](https://documentation.spryker.com/docs/managing-carts-of-registered-users#retrieve-a-registered-users-cart)
* [Retrieve wishlists](https://documentation.spryker.com/docs/managing-wishlists#retrieve-wishlists)
* [Retrieve a wishlist](https://documentation.spryker.com/docs/managing-wishlists#retrieve-a-wishlist)


## Possible errors
| Code | Reason |
| --- | --- |
| 1201 | A label with the specified ID does not exist. |
| 1202 | Product label ID is not specified. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).


