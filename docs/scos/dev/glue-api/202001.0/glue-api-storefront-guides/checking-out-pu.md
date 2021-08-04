---
title: Checking Out Purchases and Getting Checkout Data
originalLink: https://documentation.spryker.com/v4/docs/checking-out-purchases-and-getting-checkout-data-201907
redirect_from:
  - /v4/docs/checking-out-purchases-and-getting-checkout-data-201907
  - /v4/docs/en/checking-out-purchases-and-getting-checkout-data-201907
---

The **Checkout API** provides endpoints for placing, updating and retrieving checkout information.

In order to create a checkout experience, we offer an endpoint that allows placing orders and an additional endpoint that allows retrieving and updating checkout information. The data exposed by the endpoints is based not only on the shopping cart that is being checked out but also on the customers themselves. For registered customers, the API provides their registered addresses as well as the applicable payment and shipment methods.

If necessary, checkout data can be updated each time additional checkout information is provided. For example, for the purposes of fraud protection, specific payment methods can be disallowed for certain delivery addresses. In this case, a second call may be necessary to perform verification of payment method restrictions.

Apart from that, the API also supports redirecting to third party websites for additional checkout procession. Such a possibility may be needed, for example, when a customer pays with the help of an external payment system. For this purpose, the API allows generating a payload in the format and with the data as required by the third party, as well as processing the response received from it.

{% info_block errorBox %}
It is the responsibility of the API Client to redirect to the third party web site, send the payload and receive it (if necessary
{% endinfo_block %}. The API is only responsible for generating a redirect URL, as well as generating and processing the payloads.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Checkout API Feature Integration](/docs/scos/dev/developer-guides/202001.0/development-guide/front-end/yves/atomic-frontend/managing-the-components/t-create-compon).

## Checkout Workflow
There are three endpoints provided to implement checkout via the API:
* `/checkout-data` - allows submitting checkout data as many times as you need. Using the endpoint, you can implement checkout steps in your Glue API client, perform verification steps and execute other operations that require multiple calls to complete. The endpoint does not allow placing an order.

{% info_block infoBox "Info" %}
For usage information, see section *Submitting Checkout Data*.
{% endinfo_block %}

* `/checkout` - finalizes the checkout process and places an order. The cart is deleted automatically, and you cannot make any changes in the checkout data. Thus, the endpoint can be used for checkouts that can be performed in one pass or for finalizing a checkout after using `/checkout-data`.

{% info_block infoBox "Info" %}
For usage information, see section *Placing Orders*.
{% endinfo_block %}

The endpoint also provides information on whether it is necessary to redirect the user to a third party page to complete the payment.

* `/order-payments` - allows completing the payment with payment verification on a third party page.

{% info_block infoBox "Info" %}
For usage information, see sections *Redirecting the User for Payment Confirmation* and *Updating Payment Data*.
{% endinfo_block %}

A typical API Client workflow is as follows:
![Workflow](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Checking+Out+Purchases+and+Getting+Checkout+Data/checkout-payment-process.png){height="" width=""}

## Submitting Checkout Data
To submit checkout data without order confirmation, you need to use the `/checkout-data` endpoint:

[/checkout-data](https://documentation.spryker.com/v4/docs/rest-api-reference#/checkout-data){target="_blank"}

Sample request: *POST http://glue.mysprykershop.com/checkout-data*

### Request
A request should contain the ID of the customer's cart that is being checked out. All other fields are optional.

{% info_block infoBox "Info" %}
To submit a request, the customer needs to have at least one cart with products in it.
{% endinfo_block %}

**Request Attributes**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| customer | RestCustomerTransfer | x | Information about the customer.</br>For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom){target="_blank"}. |
| idCart | RestAddressTransfer | v | ID of the customer's cart.</br> For details, see [Managing Carts of Registered Users](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-carts/managing-carts-){target="_blank"}. |
| billingAddress | RestAddressTransfer | x | Customer's billing address.</br>For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom){target="_blank"}. |
| shippingAddress | RestAddressesRequestData | x | Customer's shipping address.</br>For details, see [Managing Customers.](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom){target="_blank"} |
| payments | RestPayment | x | Payment options, such as the payment system, method of payment, etc.</br>For details, see [Payment Step](https://documentation.spryker.com/v4/docs/checkout-steps-201903#payment-step){target="_blank"}. |
| shipment | RestShipmentTransfer | x | Shipment details.</br>For details, see [Shipment Step](https://documentation.spryker.com/v4/docs/checkout-steps-201903#shipment-step){target="_blank"}. |

**Body Sample**
    
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

In your request, you can use the addresses stored in a customer's account rather than specify them explicitly. To do so, pass the address identifier as a part of the **billingAddress** or the **shippingAddress** fields.

{% info_block infoBox "Info" %}
The address identifiers will be available in the **addresses** field of the endpoint response. For details, see subsection *Response*.</br>You can also retrieve the IDs by querying the `/customers/{% raw %}{{{% endraw %}customer_reference{% raw %}}}{% endraw %}/addresses` endpoint. For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom
{% endinfo_block %}{target="_blank"}.)

{% info_block warningBox "Note" %}
The following address parts are compulsory: **salutation**, **firstName**, **lastName**, **address1**, **address2**, **zipCode**, **city**, **iso2Code**. If you are using an address ID, you can pass dummy values for the address parts. When resolving the ID, they will be replaced with the actual values of the customer account.
{% endinfo_block %}

**Body Sample**
    
```json
{
    "data": {
        "type": "checkout-data",
        "attributes": {
            "idCart": "d69fc8d2-acc9-5b32-81b6-103618e94fc9",
            "billingAddress": {
                "id": "22d78681-9885-5b47-8916-42f9e72b29ff",
                "salutation": "dummyValue",
                "firstName": "dummyValue",
                "lastName": "dummyValue",
                "address1": "dummyValue",
                "address2": "dummyValue",
                "zipCode": "dummyValue",
                "city": "dummyValue",
                "iso2Code": "dummyValue"
            }
        }
    }
}
```

**User Identification**
In order to access the endpoint, you need to identify the user whose cart you are checking out:
* If you are checking out a cart of a registered user, you need to include the user's authorization token in the request. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-){target="_blank"}.
* If you are checking out a guest cart, you need to include the guest user identifier in the **X-Anonymous-Customer-Unique-Id** header. For details, see [Managing Guest Carts](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-carts/managing-guest-){target="_blank"}.

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.</br>Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

### Response
In case of a successful update, the endpoint responds with information that can help you fill in the missing checkout data, such as the customer's addresses, available payment and shipment methods, etc.

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
            "self": "http://glue.mysprykershop.com/checkout-data"
        }
    }
}
```
    
</br>
</details>

| Attribute* | Description |
| --- | --- |
| addresses | An array of customer addresses that can be used for billing and shipping.</br>For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom){target="_blank"}.  |
| paymentProviders | An array of payment providers that can be used for the checkout</br></br>  **Deprecated. For details on how to get information on payment providers, see section Selecting Payment and Shipment Methods.** LINK</br> </br>The following information is available for each payment provider:<ul><li>paymentProviderName - specifies the provider name;</li><li>paymentMethods - specifies an array of payment methods. Each method exposes the following fields:<ul><li>paymentMethodName - specifies the method name;</li><li>requiredRequestData - specifies an array of fields required to complete the payment. The actual field list depends on a specific payment provider.</li></ul></li></ul> For details, see [Payment Step](https://documentation.spryker.com/v4/docs/checkout-steps-201903#payment-step){target="_blank"}.|
| shipmentMethods | Provides information on the available Shipment Methods.</br></br>  **Deprecated. For details on how to get information on payment providers, see section Selecting Payment and Shipment Methods.** LINK</br> </br>Each method exposes the following details:<ul><li>carrierName - specifies the carrier name;</li><li>id - specifies the method ID;</li><li>name - specifies the method name;</li><li>price - specifies the price for this method of shipment;</li><li>taxRate - specifies the tax rate;</li><li>deliveryTime - specifies the delivery time.</li></ul>For details, see [Shipment Step](https://documentation.spryker.com/v4/docs/checkout-steps-201903#shipment-step){target="_blank"}.</br>You can use the ID provided to use a certain method of payment. |
|  selectedShipmentMethods | Specifies the selected shipment methods. </br>The following attributes are available for each method:<ul><li>id - ID of the method.</li> <li> name - method name.</li><li>price - price of delivery, in cents.</li><li>taxRate - tax rate, in cents. **Deprecated**.</li><li>deliveryTime - desired delivery time, if available.</li><li>defaultGrossPrice -  default gross price, in cents.</li><li>defaultNetPrice - default net price, in cents.</li><li>currencyIsoCode - specifies the ISO 4217 code of the currency in which the prices are specified.</li></ul> |
|  selectedPaymentMethods | Specifies the selected payment methods. </br>The following attributes are available for each method:<ul><li>id - ID of the method.</li> <li> name and paymentMethodName - method name.</li><li>paymentProviderName - provider name.</li><li>priority - specifies the priority.</li><li>requiredRequestData -array of attributes required by the given method to effectuate a purchase. The exact attribute list depends on the specific provider.</li></ul> |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

### Possible Errors

| Status | Reason |
| --- | --- |
| 400 | Bad request. This error can occur due to the following reasons:<ul><li>The POST data is incorrect;</li><li>Neither **Authorization** nor **X-Anonymous-Customer-Unique-Id** headers were provided in the request.</li></ul> |
| 422 | The checkout data is incorrect. |

## Selecting Payment and Shipment Methods
During checkout, customers need to specify the payment and shipment details for their purchases. For this purpose, they need to specify, for each purchase, the payment provider and the payment method, as well as the shipment method. To facilitate their choice, the endpoints allow you to retrieve the lists of the providers available in the system so that you can display them to the customer.

If you opt to fetch such information, the details include not only the provider names but also such details as the availability, cost, duration of shipment and other important pieces of information that can help customers in making their choice.

To fetch the available payment methods, include the **payment-methods** resource relationship in the response of the *checkout-data* endpoint: 
**POST http://glue.mysprykershop.com/checkout-data?include=payment-methods**

<details open>
<summary>Response sample</summary>
   
```
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
                "self": "http://glue.mysprykershop.com/payment-methods/1"
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
                "self": "http://glue.mysprykershop.com/payment-methods/2"
            }
        }
    ]
}
```
 <br>
</details>

| Attribute* | Type | Description |
| --- | --- | --- |
| paymentMethodName | String | Payment method name. |
| paymentProviderName | String | Payment provider name. |
| priority | String | Priority of the payment method. |
| requiredRequestData | Object | Array of attributes required by the given method to effectuate a purchase. The exact attribute list depends on the specific provider. |

To retrieve shipment methods, include the **shipment-methods** resource relationship:
**POST http://glue.mysprykershop.com/checkout-data?include=shipment-methods**

<details open>
<summary>Response sample</summary>
   
```
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
                "self": "http://glue.mysprykershop.com/shipment-methods/1"
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
                "self": "http://glue.mysprykershop.com/shipment-methods/2"
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
                "self": "http://glue.mysprykershop.com/shipment-methods/3"
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
                "self": "http://glue.mysprykershop.com/shipment-methods/4"
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
                "self": "http://glue.mysprykershop.com/shipment-methods/5"
            }
        }
    ]
}
```
 <br>
</details>


| Attribute* | Type | Description |
| --- | --- | --- |
| name | String | Shipment method name. |
| carrierName | String | Carrier name. |
| deliveryTime | Integer | Estimated delivery time. |
| defaultGrossPrice | Integer | Default gross price, in cents. |
| defaultNetPrice | Integer | Default net price, in cents. |
| currencyIsoCode | String | ISO 4217 code of the currency in which the prices are specified. |

To further assist users with selecting the payment and shipment methods they want to use, you can sort them by any attribute. For this purpose, use the **sort** URL parameter in your requests. For example, you can request sorting of shipment methods by price to help users select the cheapest one.

| Sort Parameter | Meaning |
| --- | --- |
| sort=attribute | Sort by attribute, **ascending**. |
| sort=-attribute | Sort by attribute, **descending**. |
| sort=attribute1,-attribute2 | Sort by 2 parameters:<ul><li>attribute1, **ascending**.</li><li>attribute2, **descending**.</li></ul> |

In the following example request, shipment methods are sorted by attributes carrierName (**ascending**) and defaultNetPrice (**descending**):

**POST http://glue.mysprykershop.com/checkout-data?include=shipment-methods&sort=shipment-methods.carrierName,-shipment-methods.defaultNetPrice**

If the payment and/or shipment methods have been specified in the request to the /checkout-data endpoint, they are returned in the `selectedPaymentMethods` and the `selectedShipmentMethods` attribute, respectively:

<details open>
<summary>Response sample with shipment and payment methods selected</summary>
   
```
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "addresses": [...],
            "paymentProviders": [...],
            "shipmentMethods": [...],
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
        "links": {...}
    }
}
```
 <br>
</details>


## Placing Orders
To finalize checkout and place an order, send a POST request to the following endpoint:

[/checkout](https://documentation.spryker.com/v4/docs/rest-api-reference#/checkout){target="_blank"}

Sample request: *POST http://glue.mysprykershop.com/checkout*

### Request
A request should contain:
* valid customer information (e.g. first name, last name, salutation etc);
* payment and shipment methods (they should exist in the system);
* valid shipping and billing addresses;
* ID of the customer's cart that is being checked out.

{% info_block infoBox "Info" %}
To submit a request, the customer needs to have at least one cart with products in it.
{% endinfo_block %}

{% info_block warningBox "Note" %}
By default, if the checkout is successful, the order is placed and the shopping cart is deleted automatically.
{% endinfo_block %}

**Request Attributes**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| customer | RestCustomerTransfer | v | Information about the customer.</br>For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom){target="_blank"}. |
| idCart | string | v | ID of the customer's cart.</br>For details, see [Managing Carts of Registered Users](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-carts/managing-carts-){target="_blank"}. |
| billingAddress | RestAddressTransfer | v | Customer's billing address.</br>For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom){target="_blank"}. |
| shippingAddress | RestAddressesRequestData | v | Customer's shipping address.</br>For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom){target="_blank"}. |
| payments | RestPayment | v | Payment options, such as the payment system, method of payment, etc.</br>For details, see [Payment Step](https://documentation.spryker.com/v4/docs/checkout-steps-201903#payment-step){target="_blank"}. |
| shipment | RestShipmentTransfer | v | Shipment details.</br>For details, see [Shipment Step](https://documentation.spryker.com/v4/docs/checkout-steps-201903#shipment-step){target="_blank"}. |

**Body Sample**
    
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

In your request, you can use the addresses stored in a customer's account rather than specify them explicitly. To do so, pass the address identifier as a part of the **billingAddress** or the **shippingAddress** fields.

{% info_block infoBox "Info" %}
The address identifiers will be available in the **addresses** field  of the `/checkout-data` endpoint response. For details, see subsection *Response*.</br>You can also retrieve the IDs by querying the `/customers/{% raw %}{{{% endraw %}customer_reference{% raw %}}}{% endraw %}/addresses` endpoint. For details, see [Managing Customers](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-custom
{% endinfo_block %}{target="_blank"}.)

{% info_block warningBox "Note" %}
The following address parts are compulsory: **salutation**, **firstName**, **lastName**, **address1**, **address2**, **zipCode**, **city**, **iso2Code**. If you are using an address ID, you can pass dummy values for the address parts. The **iso2Code** must be a valid code, for example, DE. When resolving the ID, they will be replaced with the actual values of the customer account.
{% endinfo_block %}

**Body Sample**
    
```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            "customer": {
                "salutation": "Mr",
                "email": "spencor.hopkin.new.address@spryker.com",
                "firstName": "spencor",
                "lastName": "hopkin"
            },
            "idCart": "d69fc8d2-acc9-5b32-81b6-103618e94fc9",
            "billingAddress": {
                "id": "22d78681-9885-5b47-8916-42f9e72b29ff",
                "salutation": "dummyValue",
                "firstName": "dummyValue",
                "lastName": "dummyValue",
                "address1": "dummyValue",
                "address2": "dummyValue",
                "zipCode": "dummyValue",
                "city": "dummyValue",
                "iso2Code": "DE"
            },
            "shippingAddress": {
            	"id": "22d78681-9885-5b47-8916-42f9e72b29ff",
                "salutation": "dummyValue",
                "firstName": "dummyValue",
                "lastName": "dummyValue",
                "address1": "dummyValue",
                "address2": "dummyValue",
                "zipCode": "dummyValue",
                "city": "dummyValue",
                "iso2Code": "DE"
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

**User Identification**
In order to access the endpoint, you need to identify the user whose cart you are checking out:
* If you are checking out a cart of a registered user, you need to include the user's authorization token in the request.</br>For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-){target="_blank"}.
* If you are checking out a guest cart, you need to include the guest user identifier in the **X-Anonymous-Customer-Unique-Id** header.</br>For details, see [Managing Guest Carts](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-carts/managing-guest-){target="_blank"}.

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.</br>Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

### Response
The endpoint responds with the checkout information.

{% info_block infoBox "Info" %}
Among the attributes returned, there is **orderReference** that can be used to reference the associated order in the future.
{% endinfo_block %}

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| orderReference | String | Specifies a reference that can be used to access the order in the future. |
| redirectUrl | String | Specifies a URL where the customer needs to be redirected to perform additional verification, if necessary. |
| isExternalRedirect | Boolean | Indicates whether the customer is redirected to an external URL. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

**Response Sample**
    
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
            "self": "http://glue.mysprykershop.com/checkout"
        },
    },
}
```

You can extend the response with the **orders** resource relationship in order to obtain detailed order information.

{% info_block infoBox "Info" %}
For detailed information and a list of attributes, see section [Retrieving Specific Order](https://documentation.spryker.com/v4/docs/retrieving-order-history#retrieving-specific-order
{% endinfo_block %}{target="_blank"}.)

Sample request: *POST http://glue.mysprykershop.com/checkout?include=orders*

**Response Sample**
    
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
                "self": "http://glue.mysprykershop.com/orders/DE--3"
            }
        }
    ]
}
```

### Possible Errors

| Status | Reason |
| --- | --- |
| 400 | Bad request. This error can occur due to the following reasons:<ul><li>The POST data is incorrect;</li><li>Neither **Authorization** nor **X-Anonymous-Customer-Unique-Id** headers were provided in the request.</li></ul> |
| 422 | The checkout data is incorrect. |

## Redirecting the User for Payment Confirmation
When placing an order, you need to check the value of the **redirectURL** attribute. If the value is null or empty, this means that the payment method selected by the customer does not require additional verification. If verification is necessary, the attribute will contain a URL to redirect the customer to.

{% info_block warningBox "Note" %}
It is the responsibility of the API Client to redirect the customer to the page and capture the response. For information on how to process it, see information on the payment service provider's API.
{% endinfo_block %}

The formats of the payloads used in the request and response to the third party page are defined by the respective **Eco** layer module that implements the interaction with the payment provider. For details, see section **3. Implement Payload Processor Plugin** in [Interacting with Third Parties via Glue API](https://documentation.spryker.com/v4/docs/t-interacting-with-third-party-payment-providers-via-glue-api#3--implement-payload-processor-plugin){target="_blank"}.

**Interaction Diagram**

![Interaction diagram](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Checking+Out+Purchases+and+Getting+Checkout+Data/multi-step-checkout-glue-storefront.png){height="" width=""}

## Updating Payment Data
If the user is redirected to a third-party page for payment verification, you need to update the payment with the payload received from the payment provider. To do so, post the payload to the following endpoint:

[/order-payments](https://documentation.spryker.com/v4/docs/rest-api-reference#/order-payments){target="_blank"}

Sample request: *POST http://glue.mysprykershop.com/order-payments*

### Request
Your request should contain the payload related to the order. The request can include an optional payment identifier, if necessary.

{% info_block infoBox "Info" %}
The identifier is specified in the **orderReference** attribute of the `/checkout` endpoint response.
{% endinfo_block %}

**Attributes**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| paymentIdentifier | String | x | Payment ID.</br>The value of the payment identifier depends on the payment services provider plugin used to process the payment. For details, see section **3. Implement Payload Processor Plugin** in [Interacting with Third Parties via Glue API](https://documentation.spryker.com/v4/docs/t-interacting-with-third-party-payment-providers-via-glue-api#3--implement-payload-processor-plugin){target="_blank"}. |
| dataPayload | Array | v | Payload received from the payment service provider. |

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.</br>Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

**Sample Request Body**
    
```json
{
  "data": {
    "type": "order-payments",
    "attributes": {
      "paymentIdentifier": "1ce91011-8d60-59ef-9fe0-4493ef36bbfe",
      "dataPayload": [
         {
            "type": "payment-confirmation",
            "hash": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1Ni"
         }
      ]
    }
  }
}
```

### Response
If the request was successful, the endpoint will respond with a 201 Created status code and a new payload, if it is necessary to pass it to a third party provider. If there is no new payload, the **dataPayload** is null.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| paymentIdentifier | String | Payment ID |
| dataPayload | Array | Payload |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

**Response Sample**
    
```json
{
  "data": {
    "type": "order-payments",
    "id": "86791011-8d60-59ef-9fe0-4493ef36bbfe",
    "attributes": {
      "paymentIdentifier": "1ce91011-8d60-59ef-9fe0-4493ef36bbfe",
      "dataPayload": [
         {
            "type": "payment-confirmation",
            "hash": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1Ni"
         }
      ]
    },
    "links": {
      "self": "http://glue.mysprykershop.com/order-payments/1ce91011-8d60-59ef-9fe0-4493ef36bbfe"
    }
  },
  "links": {
    "self": "http://glue.mysprykershop.com/order-payments/86791011-8d60-59ef-9fe0-4493ef36bbfe"
  }
}
```

### Possible Errors

| Status | Reason |
| --- | --- |
| 404 | Order not found. |
| 422 | Order payment is not updated. |

