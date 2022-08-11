---
title: Retrieve shipments and shipment methods when submitting checkout data
description: Learn how to submit check out data with shipment and shipment methods.
last_updated: Jul 28, 2022
template: glue-api-storefront-guide-template
---

This document describes how retrieve shipments and shipment methods when submitting checkout data. For full information about the endpoint, see [Submit checkout data](/docs/scos/dev/glue-api-guides/{{site.version}}/checking-out/submitting-checkout-data.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Checkout feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-checkout-feature-integration.html)
* [Glue API: Shipment feature integration](/docs/pbc/all/carrier-management/install-and-upgrade/integrate-the-shipment-glue-api.html)


## Submit checkout data

To submit checkout data without order confirmation, send the request:

***
`POST` **/checkout-data**
***


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | String | Required when submitting data of a [guest cart](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-carts/guest-carts/managing-guest-carts.html). | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when submitting data of a [registered user's cart](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{site.version}}/managing-customers/authenticating-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| Include | Adds resource relationships to the request.	 | shipments, shipment-methods |
| sort | Sorts included shipment and payment methods by an attribute. | {% raw %}{{{% endraw %}included_resource{% raw %}}}{% endraw %}.{% raw %}{{{% endraw %}attribute{% raw %}}}{% endraw %}, {% raw %}{{{% endraw %}included_resource{% raw %}}}{% endraw %}.{% raw %}{{{% endraw %}attribute{% raw %}}}{% endraw %} |
{% info_block infoBox "Included resources" %}

To retrieve all available shipment methods, submit checkout data with one or more shipments and include `shipments` and `shipment-methods` resources.

{% endinfo_block %}


| REQUEST | USAGE |
| --- | --- |
| POST https://glue.mysprykershop.com/checkout-data?include=shipments | Submit checkout data and include all the order shipments in the response. |
| POST https://glue.mysprykershop.com/checkout-data?include=shipments,shipment-methods | Submit checkout data and include all the order shipments and all available shipment methods in the response. |
| POST https://glue.mysprykershop.com/checkout-data?include=shipment-methods&sort=shipment-methods.carrierName,-shipment-methods.defaultNetPrice | Submit checkout data and include all available shipment methods in the response. Sort the returned shipment methods `carrierName` in ascending order and by `defaultNetPrice` in descending order. |


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




{% include pbc/all/glue-api-guides/submit-checkout-data-request-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/submit-checkout-data-request-attributes.md -->



### Response

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



{% include pbc/all/glue-api-guides/submit-checkout-data-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/submit-checkout-data-response-attributes.md -->


| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| shipment-methods | name | String | Shipment method name. |
| shipment-methods | id | String | Unique identifier of the shipment method. |
| shipment-methods | name | String | Shipment method name. |
| shipment-methods | carrierName | String | Carrier name. |
| shipment-methods | deliveryTime | Integer | Estimated delivery time. |
| shipment-methods | defaultGrossPrice | Integer | Default gross price, in cents. |
| shipment-methods | defaultNetPrice | Integer | Default net price, in cents. |
| shipment-methods | currencyIsoCode | String | ISO 4217 code of the currency in which the prices are specified. |
| shipments | Items | Array | A list of items in the shipment. |
| shipments | requestedDeliveryDate | Date | Desired delivery date. |
| shipments | shippingAddress | Object | The address to which this shipment will be delivered. |
| shipments | shippingAddress.id | String | Unique identifier of a customer address. |
| shipments | shippingAddress.salutation | String | Salutation to use when addressing the customer. |
| shipments | shippingAddress.firstName | String | Customer's first name. |
| shipments | shippingAddress.lastName | String | Customer's last name. |
| shipments | shippingAddress.address1 | String | The 1st line of the customer's address. |
| shipments | shippingAddress.address2 | String | The 2nd line of the customer's address. |
| shipments | shippingAddress.address3 | String | The 3rd line of the customer's address. |
| shipments | shippingAddress.zipCode | String | ZIP code. |
| shipments | shippingAddress.city | String | City. |
| shipments | shippingAddress.country | String | Country. |
| shipments | shippingAddress.iso2Code | String | Specifies an ISO 2 Country Code to use. |
| shipments | shippingAddress.company | String | Specifies the customer's company. |
| shipments | shippingAddress.phone | String | Specifies the customer's phone number. |
| shipments | shippingAddress.isDefaultShipping | Boolean | Defines if it is the default shipping address of the customer. |
| shipments | shippingAddress.isDefaultBilling | Boolean | Defines if it is the default billing address of the customer. |
| shipments | shippingAddress.idCompanyBusinessUnitAddress | String | Unique identifier of a business unit address used for this shipment. |
| shipments | selectedShipmentMethod | Object | Describes the shipment method for the shipment. |
| shipments | selectedShipmentMethod.id | String | Unique identifier of the shipment method. |
| shipments | selectedShipmentMethod.name | String | Name of the shipment method. |
| shipments | selectedShipmentMethod.carrierName | String | Name of the shipment method provider. |
| shipments | selectedShipmentMethod.price | String | Price of the shipment method. |
| shipments | selectedShipmentMethod.taxRate | String | Tax rate for this shipment method. |
| shipments | selectedShipmentMethod.deliveryTime | String | Estimated delivery time provided by the shipment method provider. |
| shipments | selectedShipmentMethod.currencyIsoCode | String | ISO 4217 code of the currency in which the price is specified. |
| shipment-methods | name | String | Shipment method name. |
| shipment-methods | id | String | Unique identifier of the shipment method. |
| shipment-methods | carrierName | String | Carrier name. |
| shipment-methods | deliveryTime | Integer | Estimated delivery time. |
| shipment-methods | Price | Integer | Price of the shipment method. |
| shipment-methods | currencyIsoCode | String | ISO 4217 code of the currency in which the price is specified. |

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

[Retrieve shipments when checking out purchases](/docs/pbc/all/carrier-management/manage-via-glue-api/retrieve-shipments-when-checking-out-purchases.html)
