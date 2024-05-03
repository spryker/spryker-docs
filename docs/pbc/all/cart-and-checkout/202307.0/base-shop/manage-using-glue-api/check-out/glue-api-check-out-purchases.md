---
title: "Glue API: Check out purchases"
description: Learn how to check out purchases via Glue API.
last_updated: Jul 13, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/checking-out-purchases
originalArticleId: 6da60ad5-47a7-4554-a7e7-d662af2295dd
redirect_from:
  - /docs/scos/dev/glue-api-guides/202009.0/checking-out/checking-out-purchases.html
  - /docs/scos/dev/glue-api-guides/202307.0/checking-out/checking-out-purchases.html
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/manage-using-glue-api/check-out/check-out-purchases.html
---

This endpoint allows finalizing the checkout process by placing an order.

After sending a request, the cart is deleted, and you cannot make any further changes in the checkout data. This means the endpoint is best used for checkouts that can be performed in one pass or for finalizing a checkout after [submitting checkout data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-submit-checkout-data.html).  

The endpoint also provides information on whether it is necessary to redirect the user to a third-party page to complete the payment.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html)
* [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)
* [Glue API: Configurable Bundle feature integration](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html)
* [Glue API: Configurable Bundle + Cart feature integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-cart-glue-api.html)
* [Install the Configurable Bundle + Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-configurable-bundle-product-glue-api.html)



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
| X-Anonymous-Customer-Unique-Id | String | Required when checking out a [guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html). | A guest user's unique ID. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when checking out a [cart of registered user](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |



| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request.	 | orders, order-shipments |
{% info_block infoBox "Included resources" %}

To retrieve order shipments, include `orders` and `order-shipments`.

{% endinfo_block %}


<details>
<summary markdown='span'>Request sample: check out with one shipment</summary>

`POST https://glue.mysprykershop.com/checkout`

```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "Spencor",
                "lastName": "Hopkin"
            },
            "idCart": "033ee1ad-c3e9-5d2e-816f-23ff38a58d6d",
            "billingAddress": {
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": "new address",
                "zipCode": "10115",
                "city": "Berlin",
                "iso2Code": "DE",
                "company": "spryker",
                "phone": "+49 (30) 2084 98350"
            },
            "payments": [
                {
                    "paymentMethodName": "Credit Card",
                    "paymentProviderName": "DummyPayment"
                }
            ],
            "shipments": [
                {
                    "items": [
                        "066_23294028"
                    ],
                    "shippingAddress": {
                        "id": null,
                        "salutation": "Mr",
                        "firstName": "Spencor",
                        "lastName": "Hopkin",
                        "address1": "Urbanstraße",
                        "address2": "119",
                        "address3": "Spencor's address",
                        "zipCode": "10967",
                        "city": "Berlin",
                        "iso2Code": "DE",
                        "company": "spryker",
                        "phone": "+49 (30) 2084 98350"
                    },
                    "idShipmentMethod": 1,
                    "requestedDeliveryDate": "2021-09-29"
                }
            ]
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: check out with a split shipment</summary>

`POST https://glue.mysprykershop.com/checkout?include=orders`

```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
                "salutation": "Mr",
                "email": "spencor.hopkin@spryker.com",
                "firstName": "Spencor",
                "lastName": "Hopkin"
            },
            "idCart": "033ee1ad-c3e9-5d2e-816f-23ff38a58d6d",
            "billingAddress": {
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": "new address",
                "zipCode": "10115",
                "city": "Berlin",
                "iso2Code": "DE",
                "company": "spryker",
                "phone": "+49 (30) 2084 98350"
            },
            "payments": [
                {
                    "paymentMethodName": "Credit Card",
                    "paymentProviderName": "DummyPayment"
                }
            ],
            "shipments": [
                {
                    "items": [
                        "066_23294028"
                    ],
                    "shippingAddress": {
                        "id": null,
                        "salutation": "Mr",
                        "firstName": "Spencor",
                        "lastName": "Hopkin",
                        "address1": "Urbanstraße",
                        "address2": "119",
                        "address3": "Spencor's address",
                        "zipCode": "10967",
                        "city": "Berlin",
                        "iso2Code": "DE",
                        "company": "spryker",
                        "phone": "+49 (30) 2084 98350"
                    },
                    "idShipmentMethod": 1,
                    "requestedDeliveryDate": "2021-09-29"
                },
                {
                    "items": [
                        "078_24602396"
                    ],
                    "shippingAddress": {
                        "id": null,
                        "salutation": "Mrs",
                        "firstName": "Sonia",
                        "lastName": "Wagner",
                        "address1": "Julie-Wolfthorn-Straße",
                        "address2": "1",
                        "address3": "Sonia's address",
                        "zipCode": "10115",
                        "city": "Berlin",
                        "iso2Code": "DE",
                        "company": "spryker",
                        "phone": "+49 (30) 2084 98350"
                    },
                    "idShipmentMethod": 2,
                    "requestedDeliveryDate": null
                }
            ]
        }
    }
}
```
</details>


<details>
<summary markdown='span'>Request sample: check out with one shipment, order information, and shipment information</summary>

`POST https://glue.mysprykershop.com/checkout?include=orders,order-shipments`

```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
            "salutation": "Mr",
            "email": "sonia@spryker.com",
            "firstName": "Sonia",
            "lastName": "Wagner"
            },
            "idCart": "fe660d66-b7ec-5d88-8cd2-1a9a004c90b5",
            "billingAddress": {
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": "new address",
                "zipCode": "10115",
                "city": "Berlin",
                "iso2Code": "DE",
                "company": "spryker",
                "phone": "+49 (30) 2084 98350"
            },
            "payments": [
                {
                    "dummyPaymentInvoice": {
                        "dateOfBirth": "08.04.1986"
                    },
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment"
                }
            ],
            "shipments": [
                {
                    "items": [
                        "066_23294028"
                    ],
                    "shippingAddress": {
                        "salutation": "Mrs",
                        "firstName": "Sonia",
                        "lastName": "Wagner",
                        "address1": "Julie-Wolfthorn-Straße",
                        "address2": "1",
                        "address3": "new one",
                        "zipCode": "10115",
                        "city": "Berlin",
                        "iso2Code": "DE",
                        "company": "spryker",
                        "phone": "+49 (30) 2084 98350"
                    },
                    "idShipmentMethod": 2,
                    "requestedDeliveryDate": "2021-09-29"
                }
            ]
        }
    }
}
```
</details>


<details>
<summary markdown='span'>Request sample: check out with a split shipment and addresses passed as IDs</summary>

`POST https://glue.mysprykershop.com/checkout`

```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
            "salutation": "Mr",
            "email": "sonia@spryker.com",
            "firstName": "Sonia",
            "lastName": "Wagner"
            },
            "idCart": "16a0b623-4b4d-5e78-9fe8-3415b7717aa7",
            "billingAddress.id": "f4cfa794-3c5d-58b9-8485-20d52c541d1d"
            "payments": [
                {
                    "dummyPaymentInvoice": {
                        "dateOfBirth": "08.04.1986"
                    },
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment"
                }
            ],
            "shipments": [
                {
                    "items": [
                        "078_24602396"
                    ],
                    "shippingAddress": {
                        "id": "f4cfa794-3c5d-58b9-8485-20d52c541d1d"
                    },
                    "idShipmentMethod": 1,
                    "requestedDeliveryDate": "2021-09-29"
                },
                {
                    "items": [
                        "066_23294028"
                    ],
                    "shippingAddress": {
                        "idCompanyBusinessUnitAddress": "19a55c0d-7bf0-580c-a9e8-6edacdc1ecde"
                    },
                    "idShipmentMethod": 2,
                    "requestedDeliveryDate": null
                }
            ]
        }
    }
}
```
</details>

{% include pbc/all/glue-api-guides/202307.0/check-out-purchases-request-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/check-out-purchases-request-attributes.md -->


### Response



<details>
<summary markdown='span'>Response sample: check out with one shipment</summary>

```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {
            "orderReference": "DE--1",
            "redirectUrl": null,
            "isExternalRedirect": null
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: check out with a split shipment</summary>

```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {
            "orderReference": "DE--1",
            "redirectUrl": null,
            "isExternalRedirect": null
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: check out with a split shipment, order information, and shipment information</summary>

```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {
            "orderReference": "DE--10",
            "redirectUrl": null,
            "isExternalRedirect": null
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout?include=orders,order-shipments"
        },
        "relationships": {
            "orders": {
                "data": [
                    {
                        "type": "orders",
                        "id": "DE--10"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "order-shipments",
            "id": "18",
            "attributes": {
                "itemUuids": [
                    "34d4ea2b-7327-5fe3-843f-ca7e27fa1e81"
                ],
                "methodName": "Express",
                "carrierName": "Spryker Dummy Shipment",
                "requestedDeliveryDate": "2021-09-29",
                "shippingAddress": {
                    "salutation": "Mrs",
                    "firstName": "Sonia",
                    "middleName": null,
                    "lastName": "Wagner",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "new one",
                    "company": "spryker",
                    "city": "Berlin",
                    "zipCode": "10115",
                    "poBox": null,
                    "phone": "+49 (30) 2084 98350",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/order-shipments/18"
            }
        },
        {
            "type": "orders",
            "id": "DE--10",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "payment pending"
                ],
                "createdAt": "2021-01-18 13:07:24.000000",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 590,
                    "discountTotal": 0,
                    "taxTotal": 6377,
                    "subtotal": 39353,
                    "grandTotal": 39943,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                },
                "billingAddress": {
                    "salutation": "Mr",
                    "firstName": "Sonia",
                    "middleName": null,
                    "lastName": "Wagner",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "new address",
                    "company": "spryker",
                    "city": "Berlin",
                    "zipCode": "10115",
                    "poBox": null,
                    "phone": "+49 (30) 2084 98350",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "shippingAddress": null,
                "items": [
                    {
                        "merchantReference": null,
                        "state": "payment pending",
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
                        "unitTaxAmountFullAggregation": 6283,
                        "sumTaxAmountFullAggregation": 6283,
                        "refundableAmount": 39353,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 39353,
                        "unitSubtotalAggregation": 39353,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 39353,
                        "sumPriceToPayAggregation": 39353,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "34d4ea2b-7327-5fe3-843f-ca7e27fa1e81",
                        "isReturnable": false,
                        "idShipment": 18,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": null,
                        "salesOrderConfiguredBundleItem": null,
                        "metadata": {
                            "superAttributes": {
                                "color": "Blue"
                            },
                            "image": "https://images.icecat.biz/img/gallery_mediums/23294028_3275.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    }
                ],
                "expenses": [
                    {
                        "type": "SHIPMENT_EXPENSE_TYPE",
                        "name": "Express",
                        "sumPrice": 590,
                        "unitGrossPrice": 590,
                        "sumGrossPrice": 590,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "canceledAmount": null,
                        "unitDiscountAmountAggregation": null,
                        "sumDiscountAmountAggregation": null,
                        "unitTaxAmount": 94,
                        "sumTaxAmount": 94,
                        "unitPriceToPayAggregation": 590,
                        "sumPriceToPayAggregation": 590,
                        "taxAmountAfterCancellation": null,
                        "idShipment": 18,
                        "idSalesExpense": 18
                    }
                ],
                "payments": [
                    {
                        "amount": 39943,
                        "paymentProvider": "DummyPayment",
                        "paymentMethod": "Invoice"
                    }
                ],
                "shipments": [
                    {
                        "shipmentMethodName": "Express",
                        "carrierName": "Spryker Dummy Shipment",
                        "deliveryTime": null,
                        "defaultGrossPrice": 590,
                        "defaultNetPrice": 0,
                        "currencyIsoCode": "EUR"
                    }
                ],
                "calculatedDiscounts": [],
                "bundleItems": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--10"
            },
            "relationships": {
                "order-shipments": {
                    "data": [
                        {
                            "type": "order-shipments",
                            "id": "18"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: check out with configurable bundles</summary>

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
            "self": "https://glue.mysprykershop.com/checkout?include=orders"
        },
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
                "merchantReferences": [],
                "itemStates": [
                    "payment pending"
                ],
                "createdAt": "2021-01-06 11:38:13.249588",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 980,
                    "discountTotal": 0,
                    "taxTotal": 3812,
                    "subtotal": 197788,
                    "grandTotal": 198768,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                },
                "billingAddress": {
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "middleName": null,
                    "lastName": "Hopkin",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "new address",
                    "company": "spryker",
                    "city": "Berlin",
                    "zipCode": "10115",
                    "poBox": null,
                    "phone": "+49 (30) 2084 98350",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "shippingAddress": null,
                },
                "items": [
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Acer Extensa M2610",
                        "sku": "112_312526171",
                        "sumPrice": 43723,
                        "quantity": 1,
                        "unitGrossPrice": 43723,
                        "sumGrossPrice": 43723,
                        "taxRate": "0.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 43723,
                        "unitTaxAmountFullAggregation": 0,
                        "sumTaxAmountFullAggregation": 0,
                        "refundableAmount": 43723,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 43723,
                        "unitSubtotalAggregation": 43723,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 43723,
                        "sumPriceToPayAggregation": 43723,
                        "taxRateAverageAggregation": "0.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "dedc66da-9af9-504f-bdfc-e45b23118786",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 3,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 3,
                            "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Black",
                                "processor_cache": "3 MB"
                            },
                            "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    },
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Acer Extensa M2610",
                        "sku": "112_312526171",
                        "sumPrice": 43723,
                        "quantity": 1,
                        "unitGrossPrice": 43723,
                        "sumGrossPrice": 43723,
                        "taxRate": "0.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 43723,
                        "unitTaxAmountFullAggregation": 0,
                        "sumTaxAmountFullAggregation": 0,
                        "refundableAmount": 43723,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 43723,
                        "unitSubtotalAggregation": 43723,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 43723,
                        "sumPriceToPayAggregation": 43723,
                        "taxRateAverageAggregation": "0.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "93b87cb5-fc00-562f-a799-3ec28695ca51",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 4,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 4,
                            "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Black",
                                "processor_cache": "3 MB"
                            },
                            "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    },
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Samsung Galaxy S6",
                        "sku": "047_26408568",
                        "sumPrice": 5724,
                        "quantity": 1,
                        "unitGrossPrice": 5724,
                        "sumGrossPrice": 5724,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 5724,
                        "unitTaxAmountFullAggregation": 914,
                        "sumTaxAmountFullAggregation": 914,
                        "refundableAmount": 5724,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 5724,
                        "unitSubtotalAggregation": 5724,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 5724,
                        "sumPriceToPayAggregation": 5724,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "c319e465-5160-59f1-a5b8-85073d1472b7",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 3,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 3,
                            "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Gold"
                            },
                            "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    },
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Samsung Galaxy S6",
                        "sku": "047_26408568",
                        "sumPrice": 5724,
                        "quantity": 1,
                        "unitGrossPrice": 5724,
                        "sumGrossPrice": 5724,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 5724,
                        "unitTaxAmountFullAggregation": 914,
                        "sumTaxAmountFullAggregation": 914,
                        "refundableAmount": 5724,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 5724,
                        "unitSubtotalAggregation": 5724,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 5724,
                        "sumPriceToPayAggregation": 5724,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "7ab614ca-d564-5292-8931-60f2c52c140d",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 4,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 4,
                            "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Gold"
                            },
                            "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    },
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Acer Extensa M2610",
                        "sku": "112_312526171",
                        "sumPrice": 43723,
                        "quantity": 1,
                        "unitGrossPrice": 43723,
                        "sumGrossPrice": 43723,
                        "taxRate": "0.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 43723,
                        "unitTaxAmountFullAggregation": 0,
                        "sumTaxAmountFullAggregation": 0,
                        "refundableAmount": 43723,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 43723,
                        "unitSubtotalAggregation": 43723,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 43723,
                        "sumPriceToPayAggregation": 43723,
                        "taxRateAverageAggregation": "0.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "3b0d7d32-c519-5eea-92f1-408c54113c25",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 5,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 5,
                            "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Black",
                                "processor_cache": "3 MB"
                            },
                            "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    },
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Acer Extensa M2610",
                        "sku": "112_312526171",
                        "sumPrice": 43723,
                        "quantity": 1,
                        "unitGrossPrice": 43723,
                        "sumGrossPrice": 43723,
                        "taxRate": "0.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 43723,
                        "unitTaxAmountFullAggregation": 0,
                        "sumTaxAmountFullAggregation": 0,
                        "refundableAmount": 43723,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 43723,
                        "unitSubtotalAggregation": 43723,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 43723,
                        "sumPriceToPayAggregation": 43723,
                        "taxRateAverageAggregation": "0.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "b39c7e1c-12ba-53d3-8d81-5c363d5307e9",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 6,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 6,
                            "configurableBundleTemplateSlotUuid": "9626de80-6caa-57a9-a683-2846ec5b6914"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Black",
                                "processor_cache": "3 MB"
                            },
                            "image": "https://images.icecat.biz/img/gallery_mediums/31252617_9321.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    },
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Samsung Galaxy S6",
                        "sku": "047_26408568",
                        "sumPrice": 5724,
                        "quantity": 1,
                        "unitGrossPrice": 5724,
                        "sumGrossPrice": 5724,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 5724,
                        "unitTaxAmountFullAggregation": 914,
                        "sumTaxAmountFullAggregation": 914,
                        "refundableAmount": 5724,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 5724,
                        "unitSubtotalAggregation": 5724,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 5724,
                        "sumPriceToPayAggregation": 5724,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "b189d4f2-da12-59f3-8e05-dfb4d95b1781",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 5,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 5,
                            "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Gold"
                            },
                            "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
                    },
                    {
                        "merchantReference": null,
                        "state": "payment pending",
                        "name": "Samsung Galaxy S6",
                        "sku": "047_26408568",
                        "sumPrice": 5724,
                        "quantity": 1,
                        "unitGrossPrice": 5724,
                        "sumGrossPrice": 5724,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 5724,
                        "unitTaxAmountFullAggregation": 914,
                        "sumTaxAmountFullAggregation": 914,
                        "refundableAmount": 5724,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 5724,
                        "unitSubtotalAggregation": 5724,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 5724,
                        "sumPriceToPayAggregation": 5724,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "orderReference": null,
                        "uuid": "349f3ce2-0396-5ed4-a2df-c9e053cb3350",
                        "isReturnable": false,
                        "idShipment": 3,
                        "bundleItemIdentifier": null,
                        "relatedBundleItemIdentifier": null,
                        "salesOrderConfiguredBundle": {
                            "idSalesOrderConfiguredBundle": 6,
                            "configurableBundleTemplateUuid": "c8291fd3-c6ca-5b8f-8ff5-eccd6cb787de",
                            "name": "Smartstation Kit",
                            "quantity": 1
                        },
                        "salesOrderConfiguredBundleItem": {
                            "idSalesOrderConfiguredBundle": 6,
                            "configurableBundleTemplateSlotUuid": "2a5e55b1-993a-5510-864c-a4a18558aa75"
                        },
                        "metadata": {
                            "superAttributes": {
                                "color": "Gold"
                            },
                            "image": "https://images.icecat.biz/img/norm/medium/26408568-7449.jpg"
                        },
                        "salesUnit": null,
                        "calculatedDiscounts": [],
                        "productOptions": [],
                        "amount": null
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
                        "unitTaxAmount": 78,
                        "sumTaxAmount": 78,
                        "unitPriceToPayAggregation": 490,
                        "sumPriceToPayAggregation": 490,
                        "taxAmountAfterCancellation": null,
                        "idShipment": 3,
                        "idSalesExpense": 3
                    }
                ],
                "payments": [
                    {
                        "amount": 198768,
                        "paymentProvider": "DummyPayment",
                        "paymentMethod": "Invoice"
                    }
                ],
                "shipments": [
                    {
                        "shipmentMethodName": "Standard",
                        "carrierName": "Spryker Dummy Shipment",
                        "deliveryTime": null,
                        "defaultGrossPrice": 490,
                        "defaultNetPrice": 0,
                        "currencyIsoCode": "EUR"
                    }
                ],
                "calculatedDiscounts": [],
                "bundleItems": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--3"
            }
        }
    ]
}
```    
</details>



| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| orderReference | String | The unique ID of the order. |
| redirectUrl | String | The URL to perform the payment verification requested by the selected payment method. After completing verification, ensure to [update payment data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html#update-payment-data). If the value is `null` or empty, no additional verification is required. |
| isExternalRedirect | Boolean | If true, the customer is redirected to an external URL. |

{% include pbc/all/glue-api-guides/202307.0/check-out-puchases-response-attributes-of-included-resources.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/check-out-puchases-response-attributes-of-included-resources.md -->

For the attributes of other included resources, see [Retrieve customer's order](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html)

## Possible errors

| STATUS | REASONS |
| --- | --- |
| 400 | Bad request. This error can occur due to the following reasons:<ul><li>The POST data is incorrect;</li><li>Neither **Authorization** nor **X-Anonymous-Customer-Unique-Id** headers were provided in the request.</li></ul> |
| 404 | Order not found. |
| 422 | Order payment is not updated. Checkout data is incorrect. |
| 1101 | Checkout data is invalid. |
| 1102 | Order cannot be placed. |
| 1103 | Cart not found. |
| 1104 | Cart is empty. |
| 1105 | One of Authorization or X-Anonymous-Customer-Unique-Id   headers is required. |
| 1106 | Unable to delete cart. |
| 1107 | Multiple payments are not allowed. |
| 1108 | Payment method "%s" of payment provider "%s" is invalid. |


## Next steps

* [Update payment data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html)
