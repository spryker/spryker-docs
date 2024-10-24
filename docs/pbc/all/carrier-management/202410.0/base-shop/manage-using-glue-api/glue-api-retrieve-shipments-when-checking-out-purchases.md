---
title: "Glue API: Retrieve shipments when checking out purchases"
description: Learn how to retrieve shipments when checking out via Glue API.
last_updated: July 28, 2022
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/carrier-management/manage-via-glue-api/retrieve-shipments-when-checking-out-purchases.html
  - /docs/pbc/all/carrier-management/202311.0/base-shop/manage-via-glue-api/retrieve-shipments-when-checking-out-purchases.html
  - /docs/pbc/all/carrier-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-shipments-when-checking-out-purchases.html
---

This document describes how to retrieve order shipments when checking out through the Glue API. For full information about the endpoint, see [Check out purchases](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html)


This endpoint allows finalizing the checkout process by placing an order. After sending a request, the cart is deleted, and you cannot make any changes in the checkout data. Use this endpoint for checkouts that can be performed in one pass or for finalizing a checkout after [Submit checkout data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-submit-checkout-data.html).  

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html)
* [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-the-shipment-glue-api.html)

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
| X-Anonymous-Customer-Unique-Id | String | Required when checking out a [guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html). | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when checking out a [cart of registered user](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |



| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request.	 | orders, order-shipments |
{% info_block infoBox "Included resources" %}

To retrieve order shipments, include `orders` and `order-shipments`.

{% endinfo_block %}


<details>
<summary>Request sample: check out with one shipment, order information, and shipment information</summary>

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
                "address1": "Julie-Wolfthorn-Strasse",
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
                        "address1": "Julie-Wolfthorn-Strasse",
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


{% include pbc/all/glue-api-guides/{{page.version}}/checkout-request-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/checkout-request-attributes.md -->



### Response

<details>
<summary>Response sample: check out with a split shipment, order information, and shipment information</summary>

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
                    "address1": "Julie-Wolfthorn-Strasse",
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
                    "address1": "Julie-Wolfthorn-Strasse",
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



| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| orderReference | String | The unique identifier of the order. |
| redirectUrl | String | The URL to perform the payment verification requested by the selected payment method. After completing verification, ensure to [update payment data](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html#update-payment-data). If the value is `null` or empty, no additional verification is required. |
| isExternalRedirect | Boolean | If true, the customer is redirected to an external URL. |

{% include pbc/all/glue-api-guides/{{page.version}}/order-shipments-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/order-shipments-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/orders-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/orders-response-attributes.md -->

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
