---
title: Creating a Return
originalLink: https://documentation.spryker.com/v5/docs/creating-a-return
redirect_from:
  - /v5/docs/creating-a-return
  - /v5/docs/en/creating-a-return
---

You can create a return for one or multiple sales order items.

To create a return for a registered user, send the request:
***
`POST` **/returns**
***
## Request

Sample request: `POST https://glue.mysprykershop.com/returns`

```json
{
    "data": {
        "type": "returns",
        "attributes": {
            "store": "DE",
			"returnItems": [
				{
					"salesOrderItemUuid": "b39c7e1c-12ba-53d3-8d81-5c363d5307e9",
					"reason": "0"
				},
				{
					"salesOrderItemUuid": "b189d4f2-da12-59f3-8e05-dfb4d95b1781",
					"reason": "Custom reason"
				}
			]
        }
    }
}
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| store | String | ✓ | Store in which the order has been placed. |
| returnItems | cell | ✓ | Set of return items. |
| salesOrderItemUuid | String | ✓ | UUID of the sales order item included in the return. |
| reason | String | x | Reason to return the item. |

## Response
<details>
  <summary>Sample response</summary>

```json
{
    "data": {
        "type": "returns",
        "id": "DE--1-R3",
        "attributes": {
            "returnReference": "DE--1-R3",
            "store": "DE",
            "customerReference": "DE--1",
            "returnTotals": {
                "refundTotal": 0,
                "remunerationTotal": 49798
            },
            "returnItems": [
                {
                    "uuid": "3071bef7-f26f-5be4-b9e7-bef1d670a94b",
                    "reason": "0",
                    "orderItem": {
                        "name": "Sony Xperia Z3 Compact",
                        "sku": "078_24602396",
                        "sumPrice": 25584,
                        "quantity": 1,
                        "unitGrossPrice": 25584,
                        "sumGrossPrice": 25584,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 25584,
                        "unitTaxAmountFullAggregation": 3676,
                        "sumTaxAmountFullAggregation": 3676,
                        "refundableAmount": 23026,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 25584,
                        "unitSubtotalAggregation": 25584,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 2558,
                        "sumDiscountAmountAggregation": 2558,
                        "unitDiscountAmountFullAggregation": 2558,
                        "sumDiscountAmountFullAggregation": 2558,
                        "unitPriceToPayAggregation": 23026,
                        "sumPriceToPayAggregation": 23026,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": "DE--8",
                        "uuid": "b39c7e1c-12ba-53d3-8d81-5c363d5307e9",
                        "isReturnable": false,
                        "metadata": {
                            "superAttributes": [],
                            "image": "https://images.icecat.biz/img/norm/medium/24602396-8292.jpg"
                        },
                        "calculatedDiscounts": [],
                        "productOptions": []
                    }
                },
                {
                    "uuid": "b3c46290-2eaa-5b37-bba2-60171638fabb",
                    "reason": "Custom reason",
                    "orderItem": {
                        "name": "Canon PowerShot N",
                        "sku": "035_17360369",
                        "sumPrice": 29747,
                        "quantity": 1,
                        "unitGrossPrice": 29747,
                        "sumGrossPrice": 29747,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 29747,
                        "unitTaxAmountFullAggregation": 4275,
                        "sumTaxAmountFullAggregation": 4275,
                        "refundableAmount": 26772,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 29747,
                        "unitSubtotalAggregation": 29747,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 2975,
                        "sumDiscountAmountAggregation": 2975,
                        "unitDiscountAmountFullAggregation": 2975,
                        "sumDiscountAmountFullAggregation": 2975,
                        "unitPriceToPayAggregation": 26772,
                        "sumPriceToPayAggregation": 26772,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": "DE--9",
                        "uuid": "b189d4f2-da12-59f3-8e05-dfb4d95b1781",
                        "isReturnable": false,
                        "metadata": {
                            "superAttributes": [],
                            "image": "https://images.icecat.biz/img/gallery_mediums/17360369_3328.jpg"
                        },
                        "calculatedDiscounts": [],
                        "productOptions": []
                    }
                }
            ]
        },
        "links": {
            "self": "http://glue.myspykershop.com/returns/DE--1-R2"
        }
    }
}
```
</details>

| Attribute* | Type | Description |
| --- | --- | --- |
| returnReference | String | Unique identifier of the return in the system. You can get it when creating the return. |
| store | String | Store for which the return was created. |
| customerReference | String | Unique identifier of the customer in the system. |
| returnTotals | Object | List of totals to return. |
| refundTotal | Integer | Total sum of refunds. |
| remunerationTotal | Integer | Total sum of remuneration. |
| returnItems | Array | Set of return items. |
| uuid | String | Unique identifier of the returned item. |
| reason | String | Predefined reason why the return was created.|
| orderItem | Object | Information about the returned item. |
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
| sumDiscountAmountAggregation |Integer |Sum of item total discount amounts. |
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

If you want to adjust results number per page, use the limit parameter, that returns the number of results for a single page, and the offset parameter, that returns results starting from a particular page. See [Paging Through Orders](https://documentation.spryker.com/docs/en/retrieving-order-history#paging-through-orders) for more details.

{% endinfo_block %}

## Possible Errors

| Code | Reason |
| --- | --- |
| 3601 | Return can't be created. |
