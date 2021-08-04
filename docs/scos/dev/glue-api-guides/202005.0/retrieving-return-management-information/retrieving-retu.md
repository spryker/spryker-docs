---
title: Retrieving Returnable Items
originalLink: https://documentation.spryker.com/v5/docs/retrieving-returnable-items
redirect_from:
  - /v5/docs/retrieving-returnable-items
  - /v5/docs/en/retrieving-returnable-items
---

You can retrieve information about:

* all items from all customer’s orders that can be returned
* items of a specific order that can be returned

## Retrieve returnable items from all orders

To retrieve all returnable items from all customer’s orders, send the request:
***
`GET`**/returnable-items**
***

### Request
Sample request: `GET https://glue.mysprykershop.com/returnable-items`

### Response
<details>
  <summary>Sample response - no returnable items</summary>
  
```json
    {
    "data": [],
    "links": {
        "self": "https://glue.mysprykershop.com/returnable-items"
    }
}
```
</details>

<details>
  <summary>Sample response with returnable items</summary>

```json
{
    "data": [
        {
            "type": "returnable-items",
            "id": "349f3ce2-0396-5ed4-a2df-c9e053cb3350",
            "attributes": {
                "name": "Asus Zenbook US303UB",
                "sku": "141_29380410",
                "sumPrice": 36742,
                "quantity": 1,
                "unitGrossPrice": 36742,
                "sumGrossPrice": 36742,
                "taxRate": "19.00",
                "unitNetPrice": 0,
                "sumNetPrice": 0,
                "unitPrice": 36742,
                "unitTaxAmountFullAggregation": 5280,
                "sumTaxAmountFullAggregation": 5280,
                "refundableAmount": 33068,
                "canceledAmount": 0,
                "sumSubtotalAggregation": 36742,
                "unitSubtotalAggregation": 36742,
                "unitProductOptionPriceAggregation": 0,
                "sumProductOptionPriceAggregation": 0,
                "unitExpensePriceAggregation": 0,
                "sumExpensePriceAggregation": null,
                "unitDiscountAmountAggregation": 3674,
                "sumDiscountAmountAggregation": 3674,
                "unitDiscountAmountFullAggregation": 3674,
                "sumDiscountAmountFullAggregation": 3674,
                "unitPriceToPayAggregation": 33068,
                "sumPriceToPayAggregation": 33068,
                "taxRateAverageAggregation": "19.00",
                "taxAmountAfterCancellation": null,
                "orderReference": "DE--10",
                "uuid": "349f3ce2-0396-5ed4-a2df-c9e053cb3350",
                "isReturnable": true,
                "metadata": {
                    "superAttributes": [],
                    "image": "https://images.icecat.biz/img/gallery_mediums/img_29380410_medium_1480597659_0651_26649.jpg"
                },
                "calculatedDiscounts": [],
                "productOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returnable-items/349f3ce2-0396-5ed4-a2df-c9e053cb3350"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/returnable-items"
    }
}
```
</details>

| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Product name. |
| sku | String | SKU of the product. |
| sumPrice | Integer | Sum of the prices. |
| quantity | Integer | Number of the sales order items. |
| unitGrossPrice | Integer | Single item gross price. |
| sumGrossPrice | Integer | Sum of items gross price. |
| taxRate | Integer | Current tax rate in percentage. |
| unitNetPrice | Integer | Single item net price. |
| sumNetPrice | Integer | Sum of items' net price. |
| unitPrice | Integer | Single item price without assuming if it is new or gross, this value should be used everywhere the price is displayed, it allows switching tax mode without side effects. |
| unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| sumTaxAmountFullAggregation | Integer | Total tax amount for a given sum of items with additions. |
| refundableAmount | Integer | Available refundable amount for an item. |
| canceledAmount | Integer | Total canceled amount for this item. |
| sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| unitSubtotalAggregation | Integer | Subtotal for the given item. |
| unitProductOptionPriceAggregation | Integer | Item total product option price. |
| sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| unitExpensePriceAggregation | Integer | Item expense total for a given item. |
| sumExpensePriceAggregation | Integer | Sum of item expense totals for the items. |
| unitDiscountAmountAggregation | Integer | Item total discount amount. |
|sumDiscountAmountAggregation |Integer |Sum of item total discount amounts. |
| unitDiscountAmountFullAggregation | Integer | Item total discount amount. |
| sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| sumPriceToPayAggregation | Integer | Sum of item total price to pay after discounts with additions. |
| taxRateAverageAggregation | Integer | Item tax rate average, with additions used when recalculating tax amount after cancellation. |
| taxAmountAfterCancellation | Integer | Tax amount after cancellation, recalculated using tax average. |
| orderReference | String | Order reference number. |
| uuid | String | Unique identifier of the order. |
| isReturnable | Boolean | Specifies whether a sales order item is returnable or not. |
| calculatedDiscounts | Array | Specifies the list of calculated discounts. |
| productOptions | Array | Set of product options applied to the product. |
/* The fields mentioned are all attributes in the response. Type and ID are not mentioned.

{% info_block infoBox "Info" %}

To get returnable items of a specific sales order item by the Order Reference(s), you can specify the `orderReferences[]` parameter(s) in your request.

Sample request: `GET https://glue.mysprykershop.com/returnable-items?orderReferences[]=DE--5`

where **DE--5** is the Order Reference of the order you need.

{% endinfo_block %}

## Retrieve returnable items of a specific order
To get returnable items of a specific sales order item by the order ID, send the request:
***
`GET` **/returnable-items/*{% raw %}{{{% endraw %}OrderID{% raw %}}}{% endraw %}***
***

| Path parameter | Description |
| --- | --- |
| {% raw %}{{{% endraw %}OrderID{% raw %}}}{% endraw %} | A unique identifier of an order. [Retrieve all orders](https://documentation.spryker.com/docs/en/retrieving-customers-order-history#retrieving-all-orders) to get it. |

### Request
Sample request: `GET https://glue.mysprykershop.com/returnable-items/14d86bb2-ea23-57ed-904c-eecc63ef10ac`

### Response
Sample Response:
```json
{
    "data": {
        "type": "returnable-items",
        "id": "14d86bb2-ea23-57ed-904c-eecc63ef10ac",
        "attributes": {
            "name": "Samsung Galaxy S5 mini",
            "sku": "066_23294028",
            "sumPrice": 39353,
            "quantity": 1,
            "unitGrossPrice": 39353,
            "sumGrossPrice": 39353,
            "taxRate": "19.00",
            "unitNetPrice": 0,
            "sumNetPrice": 0,
            "unitPrice": 39353,
            "unitTaxAmountFullAggregation": 5655,
            "sumTaxAmountFullAggregation": 5655,
            "refundableAmount": 35418,
            "canceledAmount": 0,
            "sumSubtotalAggregation": 39353,
            "unitSubtotalAggregation": 39353,
            "unitProductOptionPriceAggregation": 0,
            "sumProductOptionPriceAggregation": 0,
            "unitExpensePriceAggregation": 0,
            "sumExpensePriceAggregation": null,
            "unitDiscountAmountAggregation": 3935,
            "sumDiscountAmountAggregation": 3935,
            "unitDiscountAmountFullAggregation": 3935,
            "sumDiscountAmountFullAggregation": 3935,
            "unitPriceToPayAggregation": 35418,
            "sumPriceToPayAggregation": 35418,
            "taxRateAverageAggregation": "19.00",
            "taxAmountAfterCancellation": null,
            "orderReference": "DE--4",
            "uuid": "14d86bb2-ea23-57ed-904c-eecc63ef10ac",
            "isReturnable": true,
            "metadata": {
                "superAttributes": [],
                "image": "https://images.icecat.biz/img/gallery_mediums/23294028_3275.jpg"
            },
            "calculatedDiscounts": [],
            "productOptions": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/returnable-items/14d86bb2-ea23-57ed-904c-eecc63ef10ac"
        }
    }
}
```
For the attributes of the included resources, see [Retrieving returnable items from all orders](#retrieve-returnable-items-from-all-orders).

## Possible Errors

| Code | Reason |
| --- | --- |
| 3603 | Can't find returnable item by the given id. |
