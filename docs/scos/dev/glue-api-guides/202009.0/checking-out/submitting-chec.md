---
title: Submitting checkout data
originalLink: https://documentation.spryker.com/v6/docs/submitting-checkout-data
redirect_from:
  - /v6/docs/submitting-checkout-data
  - /v6/docs/en/submitting-checkout-data
---

This endpoint allows submitting checkout data as many times as you need. Using the endpoint, you can implement checkout steps in your Glue API client, perform verification steps and execute other operations that require multiple calls to complete. The endpoint does not allow placing an order. 

To help customers select payment and shipment methods, the endpoint allows retrieving all the available methods so that you can display them to the customers. To simplify navigation through all the available methods, you can sort them by any attribute. 

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Checkout API Feature Integration](https://documentation.spryker.com/docs/glue-api-checkout-feature-integration).


## Submit checkout data

To submit checkout data without order confirmation, send the request:

***
`POST` **/checkout-data**
***


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| X-Anonymous-Customer-Unique-Id | String | Required when submitting data of a [guest cart](https://documentation.spryker.com/docs/managing-guest-carts). | A guest user's unique identifier. For security purposes, we recommend passing a hyphenated alphanumeric value, but you can pass any. If you are sending automated requests, you can configure your API client to generate this value. |
| Authorization | String | Required when submitting data of a [registered user's cart](https://documentation.spryker.com/docs/managing-carts-of-registered-users). | An alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |




| Query parameter | Description | Possible values |
| --- | --- | --- |
| Include | Adds resource relationships to the request.	 | payment-methods, shipment-methods, addresses |
| sort | Sorts included shipment and payment methods by an attribute. | {% raw %}{{{% endraw %}included_resource{% raw %}}}{% endraw %}.{% raw %}{{{% endraw %}attribute{% raw %}}}{% endraw %}, -{% raw %}{{{% endraw %}included_resource{% raw %}}}{% endraw %}.{% raw %}{{{% endraw %}attribute{% raw %}}}{% endraw %} |



| Request | Usage |
| --- | --- |
| POST https://glue.mysprykershop.com/checkout-data | Submit checkout data. |
| POST https://glue.mysprykershop.com/checkout-data?include=payment-methods | Submit checkout data and include all available payment methods in the response. |
| POST https://glue.mysprykershop.com/checkout-data?include=shipment-methods | Submit checkout data and include all available shipment methods in the response. |
| POST https://glue.mysprykershop.com/checkout-data?include=addresses | Submit checkout data and include the logged-in customer's addresses in the response. |
| POST https://glue.mysprykershop.com/checkout-data?include=company-business-unit-addresses | Submit checkout data and include the logged-in company users' company business unit addresses in the response. |
| POST https://glue.mysprykershop.com/checkout-data?include=shipment-methods&sort=shipment-methods.carrierName,-shipment-methods.defaultNetPrice | Submit checkout data and include all available shipment methods in the response. Sort the returned shipment methods `carrierName` in ascending order and by `defaultNetPrice` in descending order.  |



<details open>
    <summary>Request sample</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "customer": {
                "salutation": "Mr",
                "email": "spencor.hopkin.new.address@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin"
            },
            "idCart": "d69fc8d2-acc9-5b32-81b6-103618e94fc9",
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
| email | String | v | Customer's email address. |
| firstName | String | v | Customer's first name. |
| lastName | String | v | Customer's last name. |
| idCart | String | v | The ID of the customer's [cart](https://documentation.spryker.com/docs/en/managing-carts-of-registered-users). |
| billingAddress | Object |  | Customer's billing [address](https://documentation.spryker.com/docs/customer-addresses).  |
| shippingAddress | Object |  | Customer's shipping [address](https://documentation.spryker.com/docs/customer-addresses). |
| id | String |. | A hyphenated alphanumeric value of an existing customer address. To get it, include the `addresses` resource into your request or [retrieve a customer's addresses](https://documentation.spryker.com/docs/customer-addresses#retrieve-a-customer-s-addresses). If you pass this value for a billing or shipping address, you can fill the rest of the address fields with placeholder values. They are replaced automatically with the values of the respective address. |
| salutation | String | v | Salutation to use when addressing the customer. |
| email | String | v | Customer's email address. |
| firstName | String | v | Customer's first name. |
| lastName | String | v | Customer's last name. |
| address1 | String | v | The 1st line of the customer's address. |
| address2 | String | v | The 2nd line of the customer's address. |
| address3 | String |  | The 3rd line of the customer's address. |
| zipCode | String | v | ZIP code. |
| city | String | v | Specifies the city. |
| iso2Code | String | v | Specifies an ISO 2 Country Code to use. |
| company | String |  | Customer's company. |
| phone | String |  | Customer's phone number. |
| isDefaultShipping | Boolean |  | Specifies if it is the default shipping address of the customer. If the parameter is not set, the default value is `true`. |
| isDefaultBilling | Boolean |  | Specifies if it is the default billing address of the customer. If the parameter is not set, the default value is `true`.|
| payments | Array |  | Payment options, such as the payment system, method of payment, etc.</br>For details, see [Payment Step](https://documentation.spryker.com/docs/en/payment-step-shop-guide-201911). |
| shipment | Object |  | Shipment details.</br>For details, see [Shipment Step](https://documentation.spryker.com/docs/en/shipment-step-shop-guide-201911). |



### Response
In case of a successful update, the endpoint responds with information that can help you fill in the missing checkout data, like the customer's addresses, available payment and shipment methods.

<details open>
<summary>Response sample</summary>
    
```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [
                {
                    "id": "22d78681-9885-5b47-8916-42f9e72b29ff",
                    "salutation": "Mr",
                    "firstName": "spencor",
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "zipCode": "61000",
                    "city": "Berlin",
                    "country": {
                        "id_country": 60,
                        "iso2_code": "DE",
                        "iso3_code": "DEU",
                        "name": "Germany",
                        "postal_code_mandatory": true,
                        "postal_code_regex": "\\d{5}",
                        "regions": []
                    },
                    "iso2Code": "DE",
                    "company": "Spryker",
                    "phone": "+380669455897",
                    "isDefaultBilling": false,
                    "isDefaultShipping": false
                }
            ],
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
                    "defaultGrossPrice": 490,
                    "defaultNetPrice": 390,
                    "currencyIsoCode": "EUR"
                }
            ],
            "selectedPaymentMethods": [
                {
                    "name": "credit card",
                    "paymentMethodName": "credit card",
                    "paymentProviderName": "DummyPayment",
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



<details open>
<summary>Response sample with payment methods</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {...},
        "links": {...},
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
                "self": "https://glue.mysprykershop.com/payment-methods/1"
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
                "self": "https://glue.mysprykershop.com/payment-methods/2"
            }
        }
    ]
}       
```

</details>

<details open>
<summary>Response sample with shipment methods</summary>

```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {...},
        "links": {...},
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
    "included": [
        {
            "type": "shipment-methods",
            "id": "1",
            "attributes": {
                "name": "Standard",
                "carrierName": "Spryker Dummy Shipment",
                "deliveryTime": null,
                "defaultGrossPrice": 490,
                "defaultNetPrice": 390,
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
                "defaultGrossPrice": 590,
                "defaultNetPrice": 490,
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
                "defaultGrossPrice": 500,
                "defaultNetPrice": 450,
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
                "defaultGrossPrice": 1000,
                "defaultNetPrice": 800,
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
                "defaultGrossPrice": 1500,
                "defaultNetPrice": 1200,
                "currencyIsoCode": "EUR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-methods/5"
            }
        }
    ]
}
```

</details>

<details open>
<summary>Response sample with customer addresses</summary>

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


<details open>
<summary>Response sample with company business unit addresses</summary>

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

| Attribute | Type | Description |
| --- | --- | --- |
| addresses | Array | A list of customer addresses that can be used for billing or shipping. This attribute is deprecated. To retrieve all available addresses, include the `addresses` resource into your request. |
| paymentProviders | Array | Payment providers that can be used for the checkout. This attribute is deprecated. To retrieve all the available payment methods, include the `payment-methods` resource in your request. |
| shipmentMethods | Array | A list of available shipment methods. This attribute is deprecated. To retrieve all the available shipment methods, include the `shipment-methods` resource in your request. |
| selectedShipmentMethods | Array | The shipment methods selected for this order. |
| id | String | Unique shipment method identifier. |
| name | String | Shipment method name. |
| carrierName | String | Name of the shipment method provider. |
| price | String | Price of this shipment method in cents. |
| taxRate | String | Tax rate for this shipment method. This functionality is deprecated. |
| deliveryTime | String | The desired delivery time selected by the customer. |
| defaultGrossPrice | String | Default gross price of this shipment method in cents. |
| defaultNetPrice | String | Default net price of this shipment method in cents. |
| currencyIsoCode | String |  ISO 4217 code of the currency in which the prices are specified. |
| selectedPaymentMethods | Array | Payment methods selected for this order. |
| name | String | Payment method name. |
| paymentMethodName | String | Payment method name. |
| paymentProviderName | String | Name of the payment provider for this payment method. |
| priority | String | Defines the order of returned payment methods in ascending order.  |
| requiredRequestData | Array | A list of attributes required by the given method to effectuate a purchase. The actual list depends on the specific provider. |

| Included resource | Attribute | Type | Description |
| --- | --- | --- | --- |
| payment-methods | paymentMethodName | String | Payment method name. |
| payment-methods | paymentProviderName | String | Payment provider name. |
| payment-methods | priority | String | Defines the order of returned payment methods in ascending order. |
| payment-methods | requiredRequestData | Object | An array of attributes required by the given method to effectuate a purchase. The exact attribute list depends on the specific provider. |
| shipment-methods | name | String | Shipment method name. |
| shipment-methods | id | String | Unique identifier of the shipment method. |
| shipment-methods | name | String | Shipment method name. |
| shipment-methods | carrierName | String | Carrier name. |
| shipment-methods | deliveryTime | Integer | Estimated delivery time. |
| shipment-methods | defaultGrossPrice | Integer | Default gross price, in cents. |
| shipment-methods | defaultNetPrice | Integer | Default net price, in cents. |
| shipment-methods | currencyIsoCode | String | ISO 4217 code of the currency in which the prices are specified. |
| addresses | salutation | String | Salutation to use when addressing the customer. |
| addresses |  firstName | String | Customer's first name. |
| addresses | lastName | String | Customer's last name. |
| addresses | address1 | String | The 1st line of the customer's address. |
| addresses | address2 | String | The 2nd line of the customer's address. |
| addresses | address3 | String | The 3rd line of the customer's address. |
| addresses | zipCode | String | ZIP code. |
| addresses | city | String | City. |
| addresses | country | String | Country. |
| addresses | iso2Code | String  | Specifies an ISO 2 Country Code to use. |
| addresses | company | String | Specifies the customer's company. |
| addresses | phone | String | Specifies the customer's phone number. |
| addresses | isDefaultShipping | String | Defines if it is the default shipping address of the customer. |
| addresses | isDefaultBilling | String | Defines if it is the default billing address of the customer.  | 

## Possible errors

| Status | Reason |
| --- | --- |
| 400 | Bad request. This error can occur due to the following reasons:<ul><li>The POST data is incorrect;</li><li>Neither **Authorization** nor **X-Anonymous-Customer-Unique-Id** headers were provided in the request.</li></ul> |
| 422 | The checkout data is incorrect. |

## Next steps

* [Checking out purchases](https://documentation.spryker.com/docs/checking-out-purchases)

