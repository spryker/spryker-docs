---
title: Checking out purchases
originalLink: https://documentation.spryker.com/v6/docs/checking-out-purchases
redirect_from:
  - /v6/docs/checking-out-purchases
  - /v6/docs/en/checking-out-purchases
---

This endpoint allows finalizing the checkout process by placing an order. 

After sending a request, the cart is deleted, and you cannot make any changes in the checkout data. Thus, use the endpoint for checkouts that can be performed in one pass or for finalizing a checkout after [submitting checkout data](https://documentation.spryker.com/docs/submitting-checkout-data).  

The endpoint also provides information on whether it is necessary to redirect the user to a third-party page to complete the payment.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Checkout API Feature Integration](https://documentation.spryker.com/docs/glue-api-checkout-feature-integration).



## Place an order

To place an order, send the request:

***
`POST` **/checkout**
***



### Request

{% info_block warningBox "Cart deletion" %}
By default, if checkout is successful, the order is placed, and the cart is deleted automatically.
{% endinfo_block %}

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | String | Required when checking out a [guest cart](https://documentation.spryker.com/docs/managing-guest-carts). | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when checking out a [cart of registered user](https://documentation.spryker.com/docs/managing-carts-of-registered-users). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |



| Query parameter | Description | Possible values |
| --- | --- | --- |
| include | Adds resource relationships to the request.	 | orders |


<details open>
    <summary>Request sample</summary>
`POST https://glue.mysprykershop.com/checkout`
    
```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin"
            },
            "idCart": "fe6969e9-09aa-5183-b911-0a9218ed21bb",
            "billingAddress": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin",
                "address1": "West road",
                "address2": "212",
                "address3": "",
                "zipCode": "61000",
                "city": "Berlin",
                "iso2Code": "DE",
                "company": "Spryker",
                "phone": "+380669455897",
                "isDefaultShipping": true,
                "isDefaultBilling": true
            },
            "shippingAddress": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin",
                "address1": "West road",
                "address2": "212",
                "address3": "",
                "zipCode": "61000",
                "city": "Berlin",
                "iso2Code": "DE",
                "company": "Spryker",
                "phone": "+380669455897",
                "isDefaultShipping": false,
                "isDefaultBilling": false
            },
            "payments": [
                {
                    "paymentMethodName": "invoice",
                    "paymentProviderName": "DummyPayment"
                }
            ],
            "shipment": {
                "idShipmentMethod": 1
            }
        }
    }
}
```

</details>

<details open>
    <summary>Request sample with order information</summary>
`POST https://glue.mysprykershop.com/checkout?include=orders`

```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin"
            },
            "idCart": "fe6969e9-09aa-5183-b911-0a9218ed21bb",
            "billingAddress": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin",
                "address1": "West road",
                "address2": "212",
                "address3": "",
                "zipCode": "61000",
                "city": "Berlin",
                "iso2Code": "DE",
                "company": "Spryker",
                "phone": "+380669455897",
                "isDefaultShipping": true,
                "isDefaultBilling": true
            },
            "shippingAddress": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin",
                "address1": "West road",
                "address2": "212",
                "address3": "",
                "zipCode": "61000",
                "city": "Berlin",
                "iso2Code": "DE",
                "company": "Spryker",
                "phone": "+380669455897",
                "isDefaultShipping": false,
                "isDefaultBilling": false
            },
            "payments": [
                {
                    "paymentMethodName": "invoice",
                    "paymentProviderName": "DummyPayment"
                }
            ],
            "shipment": {
                "idShipmentMethod": 1
            }
        }
    }
}
```
    
</details>


| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| customer | Object | v | A list of attributes describing the [customer](https://documentation.spryker.com/docs/en/customers) to submit checkout data of. |
| customer.salutation | String | v | Salutation to use when addressing the customer. |
| customer.email | String | v | Customer's email address. |
| customer.firstName | String | v | Customer's first name. |
| customer.lastName | String | v | Customer's last name. |
| idCart | String | v | Unique identifier of the customer's [cart](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users) to check out. |
| billingAddress | Object | v | Customer's billing [address](https://documentation.spryker.com/docs/customer-addresses).  |
| shippingAddress | Object | v | Customer's shipping [address](https://documentation.spryker.com/docs/customer-addresses). |
| id | String | | A hyphenated alphanumeric value of an existing customer address. To get it, [submit checkout data](https://documentation.spryker.com/docs/submitting-checkout-data#submit-checkout-data) or [retrieve a customer's addresses](https://documentation.spryker.com/docs/customer-addresses#retrieve-a-customer-s-addresses). If you pass this value for a billing or shipping address, you can fill the rest of the address fields with placeholder values. They are replaced automatically with the values of the respective address. |
| salutation | String | v | Salutation to use when addressing the customer. |
| email | String | v | Customer's email address. |
| firstName | String | v | Customer's first name. |
| lastName | String | v | Customer's last name. |
| address1 | String | v | The 1st line of the customer's address. |
| address2 | String | v | The 2nd line of the customer's address. |
| address3 | String | v | The 3rd line of the customer's address. |
| zipCode | String | v | ZIP code. |
| city | String | v | Specifies the city. |
| iso2Code | String | v | Specifies an ISO 2 Country Code to use. |
| company | String |  | Customer's company. |
| phone | String |  | Customer's phone number. |
| isDefaultShipping | Boolean |  | Defines if the address is a default shipping address of the customer. If the attribute is not defined, the default value is true. |
| isDefaultBilling | Boolean |  | Defines if the address is a default billing address of the customer. If the attribute is not defined, the default value is true. |
| payments | Array | v | A list of payment methods selected for this order. |
| paymentMethodName | String | v | Name of the payment method for this order. |
| paymentProviderName | String | v | Name of the payment provider for this order. | 
| shipment | Object | v | A list of attributes describing the shipping method selected for this order. |
| idShipmentMethod | String | v | Unique identifier of the shipment method for this order. |

{% info_block warningBox "Purchasing a gift card" %}

To prevent fraud, the *invoice* payment method is not accepted if a cart contains a gift card.

{% endinfo_block %}


### Response



<details>
    <summary>Response sample</summary>
    
```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {
            "orderReference": "DE--3",
            "redirectUrl": null,
            "isExternalRedirect": null
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout"
        },
    },
}
```
    
</details>

<details open>
    <summary>Response sample with order information</summary>
    
```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {...},
        "links": {...},
        "relationships": {
            "orders": {
                "data": [
                    {
                        "type": "orders",
                        "id": "DE--3"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "orders",
            "id": "DE--3",
            "attributes": {
                "createdAt": "2019-07-25 09:14:16.274617",
                "totals": {
                    "expenseTotal": 490,
                    "discountTotal": 7143,
                    "taxTotal": 9880,
                    "subtotal": 68530,
                    "grandTotal": 61877,
                    "canceledTotal": 0
                },
                "currencyIsoCode": "EUR",
                "items": [
                    {
                        "name": "Acer Chromebook C730-C8T7",
                        "sku": "136_24425591",
                        "sumPrice": 33265,
                        "sumPriceToPayAggregation": 30938,
                        "quantity": 1,
                        "metadata": {
                            "superAttributes": [],
                            "image": "//images.icecat.biz/img/gallery_mediums/img_24425591_medium_1483525296_3275_9985.jpg"
                        },
                        "calculatedDiscounts": [
                            {
                                "unitAmount": 3327,
                                "sumAmount": 3327,
                                "displayName": "10% Discount for all orders above",
                                "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                                "voucherCode": null,
                                "quantity": 1
                            }
                        ],
                        "unitGrossPrice": 33265,
                        "sumGrossPrice": 33265,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 33265,
                        "unitTaxAmountFullAggregation": 4940,
                        "sumTaxAmountFullAggregation": 4940,
                        "refundableAmount": 30938,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 34265,
                        "unitSubtotalAggregation": 34265,
                        "unitProductOptionPriceAggregation": 1000,
                        "sumProductOptionPriceAggregation": 1000,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 3327,
                        "sumDiscountAmountAggregation": 3327,
                        "unitDiscountAmountFullAggregation": 3327,
                        "sumDiscountAmountFullAggregation": 3327,
                        "unitPriceToPayAggregation": 30938,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null
                    },
                    {
                        "name": "Acer Chromebook C730-C8T7",
                        "sku": "136_24425591",
                        "sumPrice": 33265,
                        "sumPriceToPayAggregation": 30939,
                        "quantity": 1,
                        "metadata": {
                            "superAttributes": [],
                            "image": "//images.icecat.biz/img/gallery_mediums/img_24425591_medium_1483525296_3275_9985.jpg"
                        },
                        "calculatedDiscounts": [
                            {
                                "unitAmount": 3326,
                                "sumAmount": 3326,
                                "displayName": "10% Discount for all orders above",
                                "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                                "voucherCode": null,
                                "quantity": 1
                            }
                        ],
                        "unitGrossPrice": 33265,
                        "sumGrossPrice": 33265,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 33265,
                        "unitTaxAmountFullAggregation": 4940,
                        "sumTaxAmountFullAggregation": 4940,
                        "refundableAmount": 30939,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 34265,
                        "unitSubtotalAggregation": 34265,
                        "unitProductOptionPriceAggregation": 1000,
                        "sumProductOptionPriceAggregation": 1000,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 3326,
                        "sumDiscountAmountAggregation": 3326,
                        "unitDiscountAmountFullAggregation": 3326,
                        "sumDiscountAmountFullAggregation": 3326,
                        "unitPriceToPayAggregation": 30939,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null
                    }
                ],
                "expenses": [
                    {
                        "type": "SHIPMENT_EXPENSE_TYPE",
                        "name": "Standard",
                        "sumPrice": 490,
                        "unitGrossPrice": 490,
                        "sumGrossPrice": 490,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "canceledAmount": null,
                        "unitDiscountAmountAggregation": null,
                        "sumDiscountAmountAggregation": null,
                        "unitTaxAmount": 0,
                        "sumTaxAmount": 0,
                        "unitPriceToPayAggregation": 0,
                        "sumPriceToPayAggregation": 0,
                        "taxAmountAfterCancellation": null
                    }
                ],
                "billingAddress": {
                    "salutation": "Mr",
                    "firstName": "spencor",
                    "middleName": null,
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "company": "Spryker",
                    "city": "Berlin",
                    "zipCode": "61000",
                    "poBox": null,
                    "phone": "+380669455897",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "shippingAddress": {
                    "salutation": "Mr",
                    "firstName": "spencor",
                    "middleName": null,
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "company": "Spryker",
                    "city": "Berlin",
                    "zipCode": "61000",
                    "poBox": null,
                    "phone": "+380669455897",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "priceMode": "GROSS_MODE",
                "payments": [
                    {
                        "amount": 61877,
                        "paymentProvider": "DummyPayment",
                        "paymentMethod": "invoice"
                    }
                ],
                "calculatedDiscounts": [
                    {
                        "unitAmount": null,
                        "sumAmount": 490,
                        "displayName": "Free standard delivery",
                        "description": "Free standard delivery for all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                        "voucherCode": null,
                        "quantity": 1
                    },
                    {
                        "unitAmount": null,
                        "sumAmount": 6653,
                        "displayName": "10% Discount for all orders above",
                        "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                        "voucherCode": null,
                        "quantity": 2
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--3"
            }
        }
    ]
}
```

</details>



| Attribute | Type | Description |
| --- | --- | --- |
| orderReference | String | Unique identifier of the order. |
| redirectUrl | String | The URL to perform the payment verification requested by the selected payment method. After completing verification, ensure to [update payment data](https://documentation.spryker.com/docs/updating-payment-data#update-payment-data). If the value is `null` or empty, no additional verification is reuiqred. |
| isExternalRedirect | Boolean | Defines if the customer is redirected to an external URL. |

For the attributes of included resources, see [Retrieve an order](https://documentation.spryker.com/docs/retrieving-orders#retrieve-an-order)








## Possible errors

| Status | Reason |
| --- | --- |
| 400 | Bad request. This error can occur due to the following reasons:<ul><li>The POST data is incorrect;</li><li>Neither **Authorization** nor **X-Anonymous-Customer-Unique-Id** headers were provided in the request.</li></ul> |
| 404 | Order not found. |
| 422 | Order payment is not updated. Checkout data is incorrect. |


## Next steps

* [Updating payment data](https://documentation.spryker.com/docs/updating-payment-data)

