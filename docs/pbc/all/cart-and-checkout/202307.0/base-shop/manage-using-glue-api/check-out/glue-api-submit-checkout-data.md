---
title: "Glue API: Submit checkout data"
description: Submit checkout data and retrieve information needed for completing checkout.
last_updated: Dec 1, 2022
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/submitting-checkout-data
originalArticleId: 86d07f3a-6ef0-4dfe-87e0-322cc4cf42a7
redirect_from:
  - /docs/scos/dev/glue-api-guides/202009.0/checking-out/submitting-checkout-data.html
  - /docs/scos/dev/glue-api-guides/202307.0/checking-out/submitting-checkout-data.html
  - /docs/pbc/all/cart-and-checkout/202307.0/base-shop/manage-using-glue-api/check-out/submit-checkout-data.html
related:
  - title: Check out purchases
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html
  - title: Update payment data
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/check-out/glue-api-update-payment-data.html
---

This endpoint allows submitting checkout data as many times as required. Using the endpoint, you can implement checkout steps in your Glue API client, perform verification steps, and execute other operations that require multiple calls to complete. This endpoint does not allow placing an order.

To help customers select payment and shipment methods, the endpoint allows retrieving all the available methods so that you can display them to the customers. To simplify navigation through all the available methods, you can sort them by any attribute.  

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Checkout Glue API](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-checkout-glue-api.html)
* [Install the Shipment Glue API](/docs/pbc/all/carrier-management/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)


## Submit checkout data

To submit checkout data without order confirmation, send the request:

***
`POST` **/checkout-data**
***


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | String | Required when submitting data of a [guest cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-guest-carts/glue-api-manage-guest-carts.html). | A guest user's unique ID. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when submitting data of a [registered user's cart](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| Include | Adds resource relationships to the request.	 | payment-methods, shipments, shipment-methods, addresses, company-business-unit-addresses, carts, guest-carts |
| sort | Sorts included shipment and payment methods by an attribute. | {% raw %}{{{% endraw %}included_resource{% raw %}}}{% endraw %}.{% raw %}{{{% endraw %}attribute{% raw %}}}{% endraw %}, {% raw %}{{{% endraw %}included_resource{% raw %}}}{% endraw %}.{% raw %}{{{% endraw %}attribute{% raw %}}}{% endraw %} |

{% info_block infoBox "Included resources" %}

To retrieve all available shipment methods, submit checkout data with one or more shipments and include `shipments` and `shipment-methods` resources.

{% endinfo_block %}


| REQUEST | USAGE |
| --- | --- |
| `POST https://glue.mysprykershop.com/checkout-data` | Submit checkout data. |
| `POST https://glue.mysprykershop.com/checkout-data?include=payment-methods` | Submit checkout data and include all available payment methods in the response. |
| `POST https://glue.mysprykershop.com/checkout-data?include=addresses` | Submit checkout data and include the logged-in customer's addresses in the response. |
| `POST https://glue.mysprykershop.com/checkout-data?include=shipments` | Submit checkout data and include all the order shipments in the response. |
| `POST https://glue.mysprykershop.com/checkout-data?include=shipments,shipment-methods` | Submit checkout data and include all the order shipments and all available shipment methods in the response. |
| `POST https://glue.mysprykershop.com/checkout-data?include=company-business-unit-addresses` | Submit checkout data and include the logged-in company users' company business unit addresses in the response. |
| `POST https://glue.mysprykershop.com/checkout-data?include=shipment-methods&sort=shipment-methods.carrierName,-shipment-methods.defaultNetPrice` | Submit checkout data and include all available shipment methods in the response. Sort the returned shipment methods `carrierName` in ascending order and by `defaultNetPrice` in descending order. |
| `POST https://glue.mysprykershop.com/checkout-data?include=carts`  | Submit checkout data and include the logged-in customer's cart data in the response. |
| `POST https://glue.mysprykershop.com/checkout-data?include=guest-carts`  | Submit checkout data and include the guest customer's cart data in the response. |



<details>
<summary markdown='span'>Request sample: submit checkout data with one shipment</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "idCart": "1c0860e3-ebf5-52e6-b4bf-25eba6987c25",
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
                        "078_24602396"
                    ],
                    "shippingAddress": {
                        "id": null,
                        "salutation": "Mr",
                        "firstName": "Spencor",
                        "lastName": "Hopkin",
                        "address1": "Julie-Wolfthorn-Straße",
                        "address2": "1",
                        "address3": "new one",
                        "zipCode": "10115",
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
<summary markdown='span'>Request sample: submit checkout data with a split shipment</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "idCart": "bb5660b1-5267-5b75-8f5a-6dc4d8a21304",
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
                        "078_24602396"
                    ],
                    "shippingAddress": {
                        "id": null,
                        "salutation": "Mr",
                        "firstName": "Spencor",
                        "lastName": "Hopkin",
                        "address1": "Julie-Wolfthorn-Straße",
                        "address2": "1",
                        "address3": "new one",
                        "zipCode": "10115",
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
                        "066_23294028"
                    ],
                    "shippingAddress": {
                        "id": null,
                        "salutation": "Mrs",
                        "firstName": "Sonia",
                        "lastName": "Wagner",
                        "address1": "Julie-Wolfthorn-Straße",
                        "address2": "26",
                        "address3": "new one",
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
<summary markdown='span'>Request sample: submit checkout data with a split shipment and addresses passed as IDs</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "idCart": "2f0a0b59-b988-5829-8fd3-6d636fc8ea33",
            "billingAddress": {
                "id": "f4cfa794-3c5d-58b9-8485-20d52c541d1d"
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
                        "id": "f4cfa794-3c5d-58b9-8485-20d52c541d1d"
                    },
                    "idShipmentMethod": 1,
                    "requestedDeliveryDate": "2021-09-29"
                },
                {
                    "items": [
                        "078_24602396"
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

<details>
<summary markdown='span'>Request sample: submit checkout data with the logged-in customer's cart data.</summary>

```json
{"data":
    {"type": "checkout-data",
    "attributes":
        {
            "idCart": "9743f227-97ec-5d89-8679-bc5ee7a9ea17",
            "shipment": {
                "idShipmentMethod": 1
            }
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Request sample: submit checkout data with the guest customer's cart data.</summary>

```json
{"data":
    {"type": "checkout-data",
    "attributes":
        {
            "idCart": "9743f227-97ec-5d89-8679-bc5ee7a9ea17",
            "shipment": {
                "idShipmentMethod": 1
            }
        }
    }
}
```
</details>

{% include pbc/all/glue-api-guides/202307.0/submit-checkout-data-request-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/submit-checkout-data-request-attributes.md -->


### Response

In case of a successful update, the endpoint responds with information that can help you fill in the missing checkout data, like the customer's addresses, available payment and shipment methods.

<details>
<summary markdown='span'>Response sample: submit checkout data with one shipment</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [],
            "selectedPaymentMethods": [
                {
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider"
                    ]
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample: submit checkout data with a split shipment</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [],
            "selectedPaymentMethods": [
                {
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider"
                    ]
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data?include=shipments"
        },
        "relationships": {
            "shipments": {
                "data": [
                    {
                        "type": "shipments",
                        "id": "c59584148dea4773f061ceaddeefae03"
                    },
                    {
                        "type": "shipments",
                        "id": "abc6af81d38661048b561871623196d5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "shipments",
            "id": "c59584148dea4773f061ceaddeefae03",
            "attributes": {
                "items": [
                    "078_24602396"
                ],
                "requestedDeliveryDate": "2021-09-29",
                "shippingAddress": {
                    "id": null,
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "lastName": "Hopkin",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "new one",
                    "zipCode": "10115",
                    "city": "Berlin",
                    "country": null,
                    "iso2Code": "DE",
                    "company": "spryker",
                    "phone": "+49 (30) 2084 98350",
                    "isDefaultBilling": null,
                    "isDefaultShipping": null,
                    "idCompanyBusinessUnitAddress": null
                },
                "selectedShipmentMethod": {
                    "id": 1,
                    "name": "Standard",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 490,
                    "taxRate": "19.00",
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipments/c59584148dea4773f061ceaddeefae03"
            }
        },
        {
            "type": "shipments",
            "id": "abc6af81d38661048b561871623196d5",
            "attributes": {
                "items": [
                    "066_23294028"
                ],
                "requestedDeliveryDate": null,
                "shippingAddress": {
                    "id": null,
                    "salutation": "Mrs",
                    "firstName": "Sonia",
                    "lastName": "Wagner",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "26",
                    "address3": "new one",
                    "zipCode": "10115",
                    "city": "Berlin",
                    "country": null,
                    "iso2Code": "DE",
                    "company": "spryker",
                    "phone": "+49 (30) 2084 98350",
                    "isDefaultBilling": null,
                    "isDefaultShipping": null,
                    "idCompanyBusinessUnitAddress": null
                },
                "selectedShipmentMethod": {
                    "id": 2,
                    "name": "Express",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 590,
                    "taxRate": "19.00",
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipments/abc6af81d38661048b561871623196d5"
            }
        }
    ]
}
```
</details>

<details>
<summary markdown='span'>Response sample: submit checkout data with a split shipment, shipments, and shipment methods</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [],
            "selectedPaymentMethods": [
                {
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider"
                    ]
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data?include=shipments,shipment-methods"
        },
        "relationships": {
            "shipments": {
                "data": [
                    {
                        "type": "shipments",
                        "id": "c59584148dea4773f061ceaddeefae03"
                    },
                    {
                        "type": "shipments",
                        "id": "abc6af81d38661048b561871623196d5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "shipment-methods",
            "id": "1",
            "attributes": {
                "name": "Standard",
                "carrierName": "Spryker Dummy Shipment",
                "deliveryTime": null,
                "price": 490,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-methods/1"
            }
        },
        {
            "type": "shipment-methods",
            "id": "2",
            "attributes": {
                "name": "Express",
                "carrierName": "Spryker Dummy Shipment",
                "deliveryTime": null,
                "price": 590,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-methods/2"
            }
        },
        {
            "type": "shipment-methods",
            "id": "3",
            "attributes": {
                "name": "Air Standard",
                "carrierName": "Spryker Drone Shipment",
                "deliveryTime": null,
                "price": 500,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-methods/3"
            }
        },
        {
            "type": "shipment-methods",
            "id": "4",
            "attributes": {
                "name": "Air Sonic",
                "carrierName": "Spryker Drone Shipment",
                "deliveryTime": null,
                "price": 1000,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-methods/4"
            }
        },
        {
            "type": "shipment-methods",
            "id": "5",
            "attributes": {
                "name": "Air Light",
                "carrierName": "Spryker Drone Shipment",
                "deliveryTime": null,
                "price": 1500,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-methods/5"
            }
        },
        {
            "type": "shipments",
            "id": "c59584148dea4773f061ceaddeefae03",
            "attributes": {
                "items": [
                    "078_24602396"
                ],
                "requestedDeliveryDate": "2021-09-29",
                "shippingAddress": {
                    "id": null,
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "lastName": "Hopkin",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "new one",
                    "zipCode": "10115",
                    "city": "Berlin",
                    "country": null,
                    "iso2Code": "DE",
                    "company": "spryker",
                    "phone": "+49 (30) 2084 98350",
                    "isDefaultBilling": null,
                    "isDefaultShipping": null,
                    "idCompanyBusinessUnitAddress": null
                },
                "selectedShipmentMethod": {
                    "id": 1,
                    "name": "Standard",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 490,
                    "taxRate": "19.00",
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipments/c59584148dea4773f061ceaddeefae03"
            },
            "relationships": {
                "shipment-methods": {
                    "data": [
                        {
                            "type": "shipment-methods",
                            "id": "1"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "2"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "3"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "4"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "5"
                        }
                    ]
                }
            }
        },
        {
            "type": "shipments",
            "id": "abc6af81d38661048b561871623196d5",
            "attributes": {
                "items": [
                    "066_23294028"
                ],
                "requestedDeliveryDate": null,
                "shippingAddress": {
                    "id": null,
                    "salutation": "Mrs",
                    "firstName": "Sonia",
                    "lastName": "Wagner",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "26",
                    "address3": "new one",
                    "zipCode": "10115",
                    "city": "Berlin",
                    "country": null,
                    "iso2Code": "DE",
                    "company": "spryker",
                    "phone": "+49 (30) 2084 98350",
                    "isDefaultBilling": null,
                    "isDefaultShipping": null,
                    "idCompanyBusinessUnitAddress": null
                },
                "selectedShipmentMethod": {
                    "id": 2,
                    "name": "Express",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 590,
                    "taxRate": "19.00",
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipments/abc6af81d38661048b561871623196d5"
            },
            "relationships": {
                "shipment-methods": {
                    "data": [
                        {
                            "type": "shipment-methods",
                            "id": "1"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "2"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "3"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "4"
                        },
                        {
                            "type": "shipment-methods",
                            "id": "5"
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
<summary markdown='span'>Response sample: submit checkout data with customer addresses</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [],
            "selectedPaymentMethods": [
                {
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider"
                    ]
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data?include=addresses"
        },
        "relationships": {
            "addresses": {
                "data": [
                    {
                        "type": "addresses",
                        "id": "f4cfa794-3c5d-58b9-8485-20d52c541d1d"
                    },
                    {
                        "type": "addresses",
                        "id": "904827b4-2b6d-537c-b621-6a1fe2965b4c"
                    },
                    {
                        "type": "addresses",
                        "id": "70ea4850-1092-54ed-aa81-0257ee60ae8a"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "addresses",
            "id": "f4cfa794-3c5d-58b9-8485-20d52c541d1d",
            "attributes": {
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": "new address",
                "zipCode": "10115",
                "city": "Berlin",
                "country": "Germany",
                "iso2Code": "DE",
                "company": "spryker",
                "phone": "+49 (30) 2084 98350",
                "isDefaultShipping": true,
                "isDefaultBilling": true
            },
            "links": {
                "self": "https://glue.mysprykershop.com/customers/DE--21/addresses/f4cfa794-3c5d-58b9-8485-20d52c541d1d"
            }
        },
        {
            "type": "addresses",
            "id": "904827b4-2b6d-537c-b621-6a1fe2965b4c",
            "attributes": {
                "salutation": "Mrs",
                "firstName": "Sonia",
                "lastName": "Wagner",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "25",
                "address3": "new one",
                "zipCode": "10115",
                "city": "Berlin",
                "country": "Germany",
                "iso2Code": "DE",
                "company": "spryker",
                "phone": "+49 (30) 2084 98350",
                "isDefaultShipping": false,
                "isDefaultBilling": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/customers/DE--21/addresses/904827b4-2b6d-537c-b621-6a1fe2965b4c"
            }
        },
        {
            "type": "addresses",
            "id": "70ea4850-1092-54ed-aa81-0257ee60ae8a",
            "attributes": {
                "salutation": "Mrs",
                "firstName": "Sonia",
                "lastName": "Wagner",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "25",
                "address3": "new one",
                "zipCode": "10115",
                "city": "Berlin",
                "country": "Germany",
                "iso2Code": "DE",
                "company": "spryker",
                "phone": "+49 (30) 2084 98350",
                "isDefaultShipping": false,
                "isDefaultBilling": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/customers/DE--21/addresses/70ea4850-1092-54ed-aa81-0257ee60ae8a"
            }
        }
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: submit checkout data with company business unit addresses</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [
                {
                    "id": 1,
                    "name": "Standard",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 490,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            ],
            "selectedPaymentMethods": [
                {
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider"
                    ]
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data?include=company-business-unit-addresses"
        },
        "relationships": {
            "company-business-unit-addresses": {
                "data": [
                    {
                        "type": "company-business-unit-addresses",
                        "id": "19a55c0d-7bf0-580c-a9e8-6edacdc1ecde"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "company-business-unit-addresses",
            "id": "19a55c0d-7bf0-580c-a9e8-6edacdc1ecde",
            "attributes": {
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "zipCode": "10247",
                "city": "Berlin",
                "phone": "4902890031",
                "iso2Code": "DE",
                "comment": ""
            },
            "links": {
                "self": "https://glue.mysprykershop.com/company-business-unit-addresses/19a55c0d-7bf0-580c-a9e8-6edacdc1ecde"
            }
        }
    ]
}
```
</details>


<details>
<summary markdown='span'>Response sample: submit checkout data with payment methods</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [],
            "selectedPaymentMethods": [
                {
                    "paymentMethodName": "Invoice",
                    "paymentProviderName": "DummyPayment",
                    "requiredRequestData": [
                        "paymentMethod",
                        "paymentProvider"
                    ]
                }
            ]
        },
        "links": {
            "self": "<https://glue.mysprykershop.com/checkout-data?include=addresses">
        },
        "relationships": {
            "payment-methods": {
                "data": [
                    {
                        "type": "payment-methods",
                        "id": "1"
                    },
                    {
                        "type": "payment-methods",
                        "id": "2"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "payment-methods",
            "id": "1",
            "attributes": {
                "paymentMethodName": "Invoice",
                "paymentProviderName": "DummyPayment",
                "priority": 1,
                "requiredRequestData": [
                    "paymentMethod",
                    "paymentProvider",
                    "dummyPaymentInvoice.dateOfBirth"
                ]
            },
            "links": {
                "self": "<https://glue.mysprykershop.com/payment-methods/1">
            }
        },
        {
            "type": "payment-methods",
            "id": "2",
            "attributes": {
                "paymentMethodName": "Credit Card",
                "paymentProviderName": "DummyPayment",
                "priority": 2,
                "requiredRequestData": [
                    "paymentMethod",
                    "paymentProvider",
                    "dummyPaymentCreditCard.cardType",
                    "dummyPaymentCreditCard.cardNumber",
                    "dummyPaymentCreditCard.nameOnCard",
                    "dummyPaymentCreditCard.cardExpiresMonth",
                    "dummyPaymentCreditCard.cardExpiresYear",
                    "dummyPaymentCreditCard.cardSecurityCode"
                ]
            },
            "links": {
                "self": "<https://glue.mysprykershop.com/payment-methods/2">
            }
        }
    ]
}       
```
</details>

<details>
<summary markdown='span'>Response sample: submit checkout data with the logged-in customer's cart data.</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [
                {
                    "id": 1,
                    "name": "Standard",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 490,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            ],
            "selectedPaymentMethods": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data?include=carts"
        },
        "relationships": {
            "carts": {
                "data": [
                    {
                        "type": "carts",
                        "id": "482bdbd6-137f-5b58-bd1c-37f3fa735a16"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "carts",
            "id": "482bdbd6-137f-5b58-bd1c-37f3fa735a16",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Test1",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 490,
                    "discountTotal": 0,
                    "taxTotal": 78,
                    "subtotal": 0,
                    "grandTotal": 490,
                    "priceToPay": 490,
                    "shipmentTotal": 490
                },
                "discounts": [],
                "thresholds": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/482bdbd6-137f-5b58-bd1c-37f3fa735a16"
            }
        }
    ]
}
```

</details>

<details>
<summary markdown='span'>Response sample: submit checkout data with the guest customer's cart data.</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [],
            "paymentProviders": [],
            "shipmentMethods": [],
            "selectedShipmentMethods": [
                {
                    "id": 1,
                    "name": "Standard",
                    "carrierName": "Spryker Dummy Shipment",
                    "price": 490,
                    "taxRate": null,
                    "deliveryTime": null,
                    "currencyIsoCode": "EUR"
                }
            ],
            "selectedPaymentMethods": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data?include=guest-carts"
        },
        "relationships": {
            "guest-carts": {
                "data": [
                    {
                        "type": "guest-carts",
                        "id": "9743f227-97ec-5d89-8679-bc5ee7a9ea17"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "guest-carts",
            "id": "9743f227-97ec-5d89-8679-bc5ee7a9ea17",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "name": "Shopping cart",
                "isDefault": true,
                "totals": {
                    "expenseTotal": 490,
                    "discountTotal": 0,
                    "taxTotal": 489,
                    "subtotal": 6277,
                    "grandTotal": 6767,
                    "priceToPay": 6767,
                    "shipmentTotal": 490
                },
                "discounts": [],
                "thresholds": [
                    {
                        "type": "soft-minimum-threshold",
                        "threshold": 100000,
                        "fee": 0,
                        "deltaWithSubtotal": 93723,
                        "message": "You need to add items for €1,000.00 to pass a recommended threshold, but if you want can proceed to checkout."
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/guest-carts/9743f227-97ec-5d89-8679-bc5ee7a9ea17"
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/202307.0/submit-checkout-data-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202307.0/submit-checkout-data-response-attributes.md -->


| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| payment-methods | paymentMethodName | String | The name of the payment method. |
| payment-methods | paymentProviderName | String | The name of the payment provider. |
| payment-methods | priority | String | Defines the order of returned payment methods in ascending order. |
| payment-methods | requiredRequestData | Object | An array of attributes required by the given method to effectuate a purchase. The exact attribute list depends on the specific provider. |
| shipment-methods | name | String | The name of the shipment method. |
| shipment-methods | id | String | The unique ID of the shipment method. |
| shipment-methods | name | String | The name of the shipment method. |
| shipment-methods | carrierName | String | The name of the carrier.. |
| shipment-methods | deliveryTime | Integer | The estimated delivery time. |
| shipment-methods | defaultGrossPrice | Integer | Default gross price, in cents. |
| shipment-methods | defaultNetPrice | Integer | Default net price, in cents. |
| shipment-methods | currencyIsoCode | String | ISO 4217 code of the currency in which the prices are specified. |
| addresses | salutation | String | The salutation to use when addressing the customer. |
| addresses |  firstName | String | The customer's first name. |
| addresses | lastName | String | The customer's last name. |
| addresses | address1 | String | The 1st line of the customer's address. |
| addresses | address2 | String | The 2nd line of the customer's address. |
| addresses | address3 | String | The 3rd line of the customer's address. |
| addresses | zipCode | String | ZIP code. |
| addresses | city | String |The name of the city. |
| addresses | country | String | The name of the country. |
| addresses | iso2Code | String | Specifies an ISO 2 Country Code to use. |
| addresses | company | String | Specifies the customer's company. |
| addresses | phone | String | Specifies the customer's phone number. |
| addresses | isDefaultShipping | String | Defines if it is the default shipping address of the customer. |
| addresses | isDefaultBilling | String | Defines if it is the default billing address of the customer. |
| shipments | Items | Array | A list of items in the shipment. |
| shipments | requestedDeliveryDate | Date | Desired delivery date. |
| shipments | shippingAddress | Object | The address to which this shipment will be delivered. |
| shipments | shippingAddress.id | String | The unique ID of a customer's address. |
| shipments | shippingAddress.salutation | String | The salutation to use when addressing the customer. |
| shipments | shippingAddress.firstName | String | The customer's first name. |
| shipments | shippingAddress.lastName | String | The customer's last name. |
| shipments | shippingAddress.address1 | String | The 1st line of the customer's address. |
| shipments | shippingAddress.address2 | String | The 2nd line of the customer's address. |
| shipments | shippingAddress.address3 | String | The 3rd line of the customer's address. |
| shipments | shippingAddress.zipCode | String | ZIP code. |
| shipments | shippingAddress.city | String | The name of the city. |
| shipments | shippingAddress.country | String | The name of the country. |
| shipments | shippingAddress.iso2Code | String | Specifies an ISO 2 Country Code to use. |
| shipments | shippingAddress.company | String | Specifies the customer's company. |
| shipments | shippingAddress.phone | String | Specifies the customer's phone number. |
| shipments | shippingAddress.isDefaultShipping | Boolean | If true, this is the default shipping address of the customer. |
| shipments | shippingAddress.isDefaultBilling | Boolean | If true, this is the default billing address of the customer. |
| shipments | shippingAddress.idCompanyBusinessUnitAddress | String | The unique ID of the business unit address used for this shipment. |
| shipments | selectedShipmentMethod | Object | Describes the shipment method for the shipment. |
| shipments | selectedShipmentMethod.id | String | The unique ID of the shipment method. |
| shipments | selectedShipmentMethod.name | String | The name of the shipment method. |
| shipments | selectedShipmentMethod.carrierName | String | The name of the shipment method provider. |
| shipments | selectedShipmentMethod.price | String | The price of the shipment method. |
| shipments | selectedShipmentMethod.taxRate | String | The tax rate for this shipment method. |
| shipments | selectedShipmentMethod.deliveryTime | String | The estimated delivery time provided by the shipment method provider. |
| shipments | selectedShipmentMethod.currencyIsoCode | String | The ISO 4217 code of the currency in which the price is specified. |
| shipment-methods | name | String | Shipment method name. |
| shipment-methods | id | String | The unique ID of the shipment method. |
| shipment-methods | carrierName | String | The name of the carrier. |
| shipment-methods | deliveryTime | Integer | Estimated delivery time. |
| shipment-methods | Price | Integer | Price of the shipment method. |
| shipment-methods | currencyIsoCode | String |The ISO 4217 code of the currency in which the price is specified. |
| company-business-unit-addresses | address1 | String | The 1st line of the customer's address. |
| company-business-unit-addresses | address2 | String | The 2nd line of the customer's address. |
| company-business-unit-addresses | address3 | String | The 3rd line of the customer's address. |
| company-business-unit-addresses | zipCode | String | The ZIP code. |
| company-business-unit-addresses | city | String | The name of the city. |
| company-business-unit-addresses | iso2Code | String | Specifies an ISO 2 Country Code to use. |
| company-business-unit-addresses | phone | String | Specifies the customer's phone number. |
| company-business-unit-addresses | comment | String | Comment of the business unit address. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 400 | Bad request. This error can occur due to the following reasons:<ul><li>The POST data is incorrect.</li><li>Neither **Authorization** nor **X-Anonymous-Customer-Unique-Id** headers were provided in the request.</li></ul> |
| 422 | The checkout data is incorrect. |
| 1101 | Checkout data is invalid. |
| 1102 | Order cannot be placed. |
| 1103 | Cart not found. |
| 1104 | Cart is empty. |
| 1105 | One of Authorization or X-Anonymous-Customer-Unique-Id   headers is required. |
| 1106 | Unable to delete cart. |
| 1107 | Multiple payments are not allowed. |
| 1108 | Payment method "%s" of payment provider   "%s" is invalid. |

## Next steps

[Check out purchases](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/check-out/glue-api-check-out-purchases.html)
