---
title: Managing agent requests for quote
description: This endpoint allows managing agent requests for quote.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
---

This endpoint lets you manage agent requests for quote.

## Installation

For details on the modules that provide the API functionality and how to install them, see <!--paste a link to an IG-->

## Create a request for quote

<!-- We can't send this request as the request is bugged. -->
To create a request for quote for an agent, send the following request:

---
`POST` **/agent-quote-requests**

---

## Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

{% info_block infoBox "Included resources" %}

To retrieve relationships to customers, company users, company business units, or concrete products, include  `customers`, `company-users`, `company-business-units`, or `concrete-products` respectively.

{% endinfo_block %}

Request sample: `POST https://glue.mysprykershop.com/agent-quote-requests`

<!-- the following request body has a bug - it should have a cart id attribute to identify for which cart the request is going to be grated -->

```json
{
    "data": {
        "type": "agent-quote-requests",
        "attributes": {
            "companyUserUuid": "b46c8c2c-a343-5c29-a222-117292a8fdad",
            "meta": {
                "purchase_order_number": "7711",
                "delivery_date": "2021-12-31",
                "note": "consider the quotation request"
            }
        }
    }
}
```

| REQUEST SAMPLE | USAGE |
|-|-|
| `POST https://glue.mysprykershop.com/agent-quote-requests?include=customers` | Create a request for quote with customer information included.  |
| `POST https://glue.mysprykershop.com/agent-quote-requests?include=company-users`  | Create a request for quote with company user information included. |
| `POST https://glue.mysprykershop.com/agent-quote-requests?include=company-business-units`  | Create a request for quote with information about company business units included.  |
| `POST https://glue.mysprykershop.com/agent-quote-requests?include=concrete-products`  | Create a request for quote with information about concrete products included. |

| ATTRIBUTE | REQUIRED | TYPE | DESCRIPTION |
|---|---|---|---|
| companyUserUuid | &check; | String | Company user ID. |
| purchase_order_number |   | Integer | Purchase order number. |
| delivery_date |   | String | Product delivery date. |
| note |   | String | Notes or comments left by a customer or Back Office user. |

### Response

<details><summary>Response sample</summary>

<!--incorrect response because of the bug
```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-22",
        "attributes": {
            "quoteRequestReference": "DE--21-22",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-12 12:16:37.000000",
            "validUntil": null,
            "versions": [
                "DE--21-22-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-22-1",
                "createdAt": "2021-11-12 12:16:39.000000",
                "metadata": [],
                "cart": {
                    "priceMode": null,
                    "store": null,
                    "currency": null,
                    "totals": null,
                    "billingAddress": null,
                    "items": [],
                    "discounts": [],
                    "shipments": []
                }
            }
        },
        "links": {
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-22"
        }
    }
}
```
-->
</details>

<details><summary>Response sample with company-users</summary>
<!--incorrect response because of the bug
```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-22",
        "attributes": {
            "quoteRequestReference": "DE--21-22",
            "status": "in-progress",
            "isLatestVersionVisible": false,
            "createdAt": "2021-11-12 12:49:30",
            "validUntil": null,
            "versions": [
                "DE--21-22"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-22-1",
                "createdAt": "2021-11-12 12:49:30",
                "metadata": [],
                "cart": {
                    "priceMode": null,
                    "store": null,
                    "currency": null,
                    "totals": null,
                    "billingAddress": null,
                    "items": [],
                    "discounts": [],
                    "shipments": []
                }
            }
        },
        "links": {
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-22"
        },
        "relationships": {
            "company-users": {
                "data": [
                    {
                        "type": "company-users",
                        "id": "2816dcbd-855e-567e-b26f-4d57f3310bb8"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "company-users",
            "id": "2816dcbd-855e-567e-b26f-4d57f3310bb8",
            "attributes": {
                "isActive": null,
                "isDefault": null
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/company-users/2816dcbd-855e-567e-b26f-4d57f3310bb8"
            }
        }
    ]
}
```
-->
</details>

<a name="create-request-for-quote-response"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
| quoteRequestReference | String | Request for quote ID  |
| status | String | Request for quote status. For possible values, see [RFQ Statuses](/docs/scos/user/features/{{page.version}}/quotation-process-feature-overview.html#rfq-statuses)   |
| isLatestVersionVisible | Boolean  | Defines if the latest version of the request for quote is visible or not:<div><ul><li>`true`—the latest version is shown.</li><li>`false`—the latest version is hidden.</li></ul></div>  |
| createdAt | String  | Request for quote creation date.  |
| validUntil | String  | Request for quote validity date. |
| versions | Array  | Array of all request for quote versions. |
| version | String  | Request for quote current version.  |
| versionReference | String  | Request for quote version ID.  |
| createdAt | String  | Request for quote creation date.  |
| metadata | Object  | Request for quote metadata. |

For attribute descriptions of a cart, see [Managing carts of registered users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html).

For attribute descriptions of shipments, see [Managing customer addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customer-addresses.html).

For attribute descriptions of concrete products, see [Retrieving concrete products](https://docs.spryker.com/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-concrete-products.html#response).

For attribute descriptions of customers, see [Managing customers](https://docs.spryker.com/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html).

For attribute descriptions of business units, see [Retrieving business units](https://docs.spryker.com/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-units.html).

## Retrieve requests for quote

To retrieve requests for quote, send the following request:

---
`GET` **/agent-quote-requests**

---

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

{% info_block infoBox "Included resources" %}

To retrieve relationships to customers, company users, company business units, or concrete products, include  `customers`, `company-users`, `company-business-units`, or `concrete-products` respectively.

{% endinfo_block %}

Request sample: `GET https://glue.mysprykershop.com/agent-quote-requests`

REQUEST SAMPLE | USAGE |
|-|-|
| `GET https://glue.mysprykershop.com/agent-quote-requests?include=customers` | Retrieve a request for quote with customer information included.  |
| `GET https://glue.mysprykershop.com/agent-quote-requests?include=company-users`  | Retrieve a request for quote with company user information included. |
| `GET https://glue.mysprykershop.com/agent-quote-requests?include=company-business-units`  | Retrieve a request for quote with information about company business units included.  |
| `GET https://glue.mysprykershop.com/agent-quote-requests?include=concrete-products`  | Retrieve a request for quote with information about concrete products included. |

## Response

<details><summary>Response sample</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=customers"
    },
}
```

</details>

<!-- add the following responses -->
<details><summary>Response sample with customers</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "customers": {
                    "data": [
                        {
                            "type": "customers",
                            "id": "DE--21"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=customers"
    },
    "included": [
        {
            "type": "customers",
            "id": "DE--21",
            "attributes": {
                "firstName": "Sonia",
                "lastName": "Wagner",
                "email": "sonia@spryker.com",
                "gender": "Female",
                "dateOfBirth": null,
                "salutation": "Ms",
                "createdAt": "2021-12-22 10:40:04.000000",
                "updatedAt": "2021-12-22 10:40:04.000000"
            },
            "links": {
                "self": "http://glue.de.spryker.local/customers/DE--21"
            }
        }
    ]
}
```
</details>

<details><summary>Response sample with company-users</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "company-users": {
                    "data": [
                        {
                            "type": "company-users",
                            "id": "ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=company-users"
    },
    "included": [
        {
            "type": "company-users",
            "id": "ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.de.spryker.local/company-users/ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
            }
        }
    ]
}
```
</details>

<details><summary>Response sample with company-business-units</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "company-business-units": {
                    "data": [
                        {
                            "type": "company-business-units",
                            "id": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=company-business-units"
    },
    "included": [
        {
            "type": "company-business-units",
            "id": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2",
            "attributes": {
                "defaultBillingAddress": null,
                "name": "Spryker Systems HR department",
                "email": "HR@spryker.com",
                "phone": "4902890031",
                "externalUrl": "",
                "bic": "",
                "iban": ""
            },
            "links": {
                "self": "http://glue.de.spryker.local/company-business-units/5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with concrete-products</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "115_27295368"
                        },
                        {
                            "type": "concrete-products",
                            "id": "118_29804739"
                        },
                        {
                            "type": "concrete-products",
                            "id": "124_31623088"
                        },
                        {
                            "type": "concrete-products",
                            "id": "126_26280142"
                        },
                        {
                            "type": "concrete-products",
                            "id": "119_29804808"
                        },
                        {
                            "type": "concrete-products",
                            "id": "128_29955336"
                        },
                        {
                            "type": "concrete-products",
                            "id": "127_20723326"
                        },
                        {
                            "type": "concrete-products",
                            "id": "122_22308524"
                        },
                        {
                            "type": "concrete-products",
                            "id": "117_30585828"
                        },
                        {
                            "type": "concrete-products",
                            "id": "129_30706500"
                        },
                        {
                            "type": "concrete-products",
                            "id": "131_24872891"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=concrete-products"
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "044_31040076",
            "attributes": {
                "sku": "044_31040076",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "044",
                "name": "Samsung Galaxy S7",
                "description": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curved front and back fit in your palm just right. It's as beautiful to look at as it is to use. We spent a long time perfecting the curves of the Galaxy S7 edge and S7. Using a proprietary process called 3D Thermoforming, we melted 3D glass to curve with such precision that it meets the curved metal alloy to create an exquisitely seamless and strong unibody. The dual-curve backs on the Galaxy S7 edge and S7 are the reason why they feel so comfortable when you hold them. Everything about the design, from the naturally flowing lines to the thin form factor, come together to deliver a grip that's so satisfying, you won't want to let go.",
                "attributes": {
                    "usb_version": "2",
                    "os_version": "6",
                    "max_memory_card_size": "200 GB",
                    "weight": "152 g",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Samsung Galaxy S7",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curv",
                "attributeNames": {
                    "usb_version": "USB version",
                    "os_version": "OS version",
                    "max_memory_card_size": "Max memory card size",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/044_31040076"
            }
        },
        {
            "type": "concrete-products",
            "id": "115_27295368",
            "attributes": {
                "sku": "115_27295368",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "115",
                "name": "DELL OptiPlex 3020",
                "description": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and easy serviceability. Stop advanced threats and zero-day attacks with Dell Data Protection | Protected Workspace — a proactive, real-time solution for malware protection. Ensure authorized access through multifactor, single sign-on (SSO) and preboot authentication with Dell Data Protection | Security Tools. Streamline administration with integration into Dell KACE appliances, Microsoft System Center and industry-standard tools. Deploy with flexibility through multiple chassis options. Select the small form factor chassis, optimized for constrained workspaces, or the expandable mini tower with support for up to four PCIe cards.",
                "attributes": {
                    "processor_cache": "3 MB",
                    "bus_type": "DMI",
                    "processor_threads": "2",
                    "tcase": "72 °",
                    "brand": "DELL",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_cache",
                    "processor_frequency"
                ],
                "metaTitle": "DELL OptiPlex 3020",
                "metaKeywords": "DELL,Tax Exempt",
                "metaDescription": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and ",
                "attributeNames": {
                    "processor_cache": "Processor cache type",
                    "bus_type": "Bus type",
                    "processor_threads": "Processor Threads",
                    "tcase": "Tcase",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/115_27295368"
            }
        },
        {
            "type": "concrete-products",
            "id": "118_29804739",
            "attributes": {
                "sku": "118_29804739",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "118",
                "name": "Fujitsu ESPRIMO E420",
                "description": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E420 features proven technology regarding Intel® chipset and processor and an 85% energy efficient power supply. Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT.",
                "attributes": {
                    "processor_cache": "6 MB",
                    "bus_type": "DMI",
                    "processor_model": "i5-4590",
                    "product_type": "PC",
                    "brand": "Fujitsu",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "processor_cache",
                    "color"
                ],
                "metaTitle": "Fujitsu ESPRIMO E420",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficien",
                "attributeNames": {
                    "processor_cache": "Processor cache type",
                    "bus_type": "Bus type",
                    "processor_model": "Processor model",
                    "product_type": "Product type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/118_29804739"
            }
        },
        {
            "type": "concrete-products",
            "id": "124_31623088",
            "attributes": {
                "sku": "124_31623088",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "124",
                "name": "HP ProDesk 400 G3",
                "description": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with essential security and manageability features, the HP ProDesk 400 helps keep your business growing. New 6th Gen Intel® Core™ processors bring powerful processing with Intel® HD 530 Graphics. Available DDR4 memory helps meet the demands of today’s businesses. HP ProDesks are rigorously tested to help ensure reliability. During the HP Total Test Process, PCs experience 120,000 hours of performance trials to help get you through your business day. The HP ProDesk 400 SFF helps affordably build a solid IT infrastructure for your growing business and fits in smaller workspaces for easy deployment.",
                "attributes": {
                    "processor_codename": "Skylake",
                    "bus_type": "DMI3",
                    "processor_threads": "4",
                    "processor_cores": "2",
                    "brand": "HP",
                    "total_storage_capacity": "128 GB"
                },
                "superAttributesDefinition": [
                    "total_storage_capacity"
                ],
                "metaTitle": "HP ProDesk 400 G3",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with ess",
                "attributeNames": {
                    "processor_codename": "Processor codename",
                    "bus_type": "Bus type",
                    "processor_threads": "Processor Threads",
                    "processor_cores": "Processor cores",
                    "brand": "Brand",
                    "total_storage_capacity": "Total storage capacity"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/124_31623088"
            }
        },
        {
            "type": "concrete-products",
            "id": "126_26280142",
            "attributes": {
                "sku": "126_26280142",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "126",
                "name": "HP Z 440",
                "description": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation delivering support for up to 8 cores of processing power. Add in powerful graphics and performance features like optional Thunderbolt™ 23, HP Z Turbo Drive4, and HP Remote Graphics Software, and you get a world-class workstation experience that never slows you down.    Take your business to the next level of performance, expandability, and no compromise reliability in one complete package. Featuring a perfect mix of HP Z DNA in a performance workstation package with up to 8 discrete processor cores, up to 128 GB of RAM, and multiple storage and PCIe configuration options. Protect your investment and make downtime a thing of the past. Get no-compromise reliability and a standard 3/3/3 limited warranty from the HP Z440 Workstation.",
                "attributes": {
                    "fsb_parity": "no",
                    "bus_type": "QPI",
                    "processor_cores": "8",
                    "processor_threads": "16",
                    "brand": "HP",
                    "processor_frequency": "2.8 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "HP Z 440",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation deliveri",
                "attributeNames": {
                    "fsb_parity": "FSB Parity",
                    "bus_type": "Bus type",
                    "processor_cores": "Processor cores",
                    "processor_threads": "Processor Threads",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/126_26280142"
            }
        },
        {
            "type": "concrete-products",
            "id": "119_29804808",
            "attributes": {
                "sku": "119_29804808",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "119",
                "name": "Fujitsu ESPRIMO E920",
                "description": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT. As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E920 features latest technology regarding Intel® chipset and processor and optional an up to 94% energy efficient power supply. Furthermore it delivers enhanced power management settings and optional 0-Watt power consumption in off-mode.",
                "attributes": {
                    "internal_memory": "32 GB",
                    "intel_smart_cache": "yes",
                    "product_type": "PC",
                    "processor_cache": "6 MB",
                    "brand": "Fujitsu",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_cache",
                    "color"
                ],
                "metaTitle": "Fujitsu ESPRIMO E920",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to min",
                "attributeNames": {
                    "internal_memory": "Max internal memory",
                    "intel_smart_cache": "Intel Smart Cache",
                    "product_type": "Product type",
                    "processor_cache": "Processor cache type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/119_29804808"
            }
        },
        {
            "type": "concrete-products",
            "id": "128_29955336",
            "attributes": {
                "sku": "128_29955336",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "128",
                "name": "Lenovo ThinkCentre E73",
                "description": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep your business-critical information safe through USB port disablement and the password-protected BIOS and HDD. You can also safeguard your hardware by physically securing your mouse and keyboard, while the Kensington slot enables you to lock down your E73. Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology.",
                "attributes": {
                    "processor_threads": "8",
                    "pci_express_slots_version": "3",
                    "internal_memory": "8 GB",
                    "stepping": "C0",
                    "brand": "Lenovo",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCentre E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "pci_express_slots_version": "PCI Express slots version",
                    "internal_memory": "Max internal memory",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/128_29955336"
            }
        },
        {
            "type": "concrete-products",
            "id": "127_20723326",
            "attributes": {
                "sku": "127_20723326",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "127",
                "name": "HP Z 620",
                "description": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of computing and visualization power into a quiet, compact footprint. This dual-socket system helps you boost productivity with next-generation Intel® Xeon® processors and support for up to 8 displays. Get massive system performance with a small footprint. The HP Z620 features the next evolution in processor technology and system architecture, setting the standard for versatility with support for a single Intel E5-1600 Series Xeon® processor or dual Intel E5-2600 Series Xeon® processors. With 800W 90% efficient power supply and support for up to 8 displays, the HP Z620 gives you the freedom of doing and seeing more.",
                "attributes": {
                    "processor_frequency": "2.1 GHz",
                    "processor_cache": "15 MB",
                    "processor_threads": "12",
                    "fsb_parity": "no",
                    "brand": "HP",
                    "total_storage_capacity": "1000 GB"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "processor_cache",
                    "total_storage_capacity"
                ],
                "metaTitle": "HP Z 620",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of com",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cache": "Processor cache type",
                    "processor_threads": "Processor Threads",
                    "fsb_parity": "FSB Parity",
                    "brand": "Brand",
                    "total_storage_capacity": "Total storage capacity"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/127_20723326"
            }
        },
        {
            "type": "concrete-products",
            "id": "122_22308524",
            "attributes": {
                "sku": "122_22308524",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "122",
                "name": "HP EliteDesk 800 G1 Mini",
                "description": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serviceable design with integrated wireless antenna allows flexible deployment options1 to help optimize the workspace. Keep productivity high and downtime low with HP BIOSphere firmware-level automation. Your PCs have extra protection thanks to automatic updates and security checks. Enjoy customization that allows your PC to evolve with your business.",
                "attributes": {
                    "processor_cores": "2",
                    "processor_codename": "Haswell",
                    "processor_threads": "4",
                    "bus_type": "DMI",
                    "brand": "HP",
                    "processor_frequency": "2.9 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "HP EliteDesk 800 G1 Mini",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serv",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "processor_codename": "Processor codename",
                    "processor_threads": "Processor Threads",
                    "bus_type": "Bus type",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/122_22308524"
            }
        },
        {
            "type": "concrete-products",
            "id": "117_30585828",
            "attributes": {
                "sku": "117_30585828",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "117",
                "name": "Fujitsu ESPRIMO D556",
                "description": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity needed for daily operations. Your valuable business data is protected by the latest TPM controller and the Erasedisk option. To meet your specific hardware needs it can be either individually configured or customized.",
                "attributes": {
                    "processor_frequency": "3.7 GHz",
                    "processor_cores": "2",
                    "bus_type": "DMI3",
                    "tcase": "65 °",
                    "brand": "Fujitsu",
                    "internal_memory": "4 GB"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "internal_memory"
                ],
                "metaTitle": "Fujitsu ESPRIMO D556",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity n",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cores": "Processor cores",
                    "bus_type": "Bus type",
                    "tcase": "Tcase",
                    "brand": "Brand",
                    "internal_memory": "Max internal memory"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/117_30585828"
            }
        },
        {
            "type": "concrete-products",
            "id": "129_30706500",
            "attributes": {
                "sku": "129_30706500",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "129",
                "name": "Lenovo ThinkCenter E73",
                "description": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology. With 10% more processing power, 4th generation Intel® Core™ processors deliver the performance to increase business productivity for your business. They can also guard against identity theft and ensure safe access to your network with built-in security features.",
                "attributes": {
                    "processor_threads": "8",
                    "processor_cores": "4",
                    "processor_codename": "Haswell",
                    "pci_express_slots_version": "3",
                    "brand": "Lenovo",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCenter E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "processor_cores": "Processor cores",
                    "processor_codename": "Processor codename",
                    "pci_express_slots_version": "PCI Express slots version",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/129_30706500"
            }
        },
        {
            "type": "concrete-products",
            "id": "131_24872891",
            "attributes": {
                "sku": "131_24872891",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "131",
                "name": "Lenovo ThinkStation P900",
                "description": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — and a direct cooling air baffle directs fresh air into the CPU and memory. ThinkStation P900 delivers new technologies and design to keep your workstation cool and quiet. The innovative Flex Module lets you customize I/O ports, so you add only what you need. Using the 5.25\" bays, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA. The Flex Connector is a mezzanine card that fits into the motherboard and allows for expanded storage and I/O, without sacrificing the use of rear PCI. It supports SATA/SAS/PCIe advanced RAID solution. ThinkStation P900 includes two available connectors (enabled with each CPU).",
                "attributes": {
                    "processor_frequency": "2.4 GHz",
                    "processor_cores": "6",
                    "processor_threads": "12",
                    "stepping": "R2",
                    "brand": "Lenovo",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "metaTitle": "Lenovo ThinkStation P900",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — an",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cores": "Processor cores",
                    "processor_threads": "Processor Threads",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/131_24872891"
            }
        }
    ]
}
```

</details>


For descriptions of response attribute, see [Create a request for quote: Response](#create-request-for-quote-response)

## Retrieve a request for quote

To retrieve a request for quote, send the following request:

`GET` **/agent-quote-requests/*{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}***

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier to manage requests for quotes. To get it, [create a quote request](#create-a-request-for-quote). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

{% info_block infoBox "Included resources" %}

To retrieve relationships to customers, company users, company business units, or concrete products, include  `customers`, `company-users`, `company-business-units`, or `concrete-products` respectively.

{% endinfo_block %}

Sample request: `GET https://glue.mysprykershop.com/agent-quote-requests/DE--21-22`

REQUEST SAMPLE | USAGE |
|-|-|
| `GET https://glue.mysprykershop.com/agent-quote-requests/DE--21-1?include=customers` | Retrieve a request for quote with customer information included.  |
| `GET https://glue.mysprykershop.com/agent-quote-requests/DE--21-1?include=company-users`  | Retrieve a request for quote with company user information included. |
| `GET https://glue.mysprykershop.com/agent-quote-requests/DE--21-1?include=company-business-units`  | Retrieve a request for quote with information about company business units included.  |
| `GET https://glue.mysprykershop.com/agent-quote-requests/DE--21-1?include=concrete-products`  | Retrieve a request for quote with information about concrete products included. |

## Response

<details><summary>Response sample</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-22",
            "attributes": {
                "quoteRequestReference": "DE--21-22",
                "status": "draft",
                "isLatestVersionVisible": true,
                "createdAt": "2021-11-12 12:16:37.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-22-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-22",
                    "createdAt": "2021-11-12 12:16:39.000000",
                    "metadata": [],
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 0,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 2708
                            },
                            "subtotal": 41393,
                            "grandTotal": 41393,
                            "priceToPay": 41393
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "089_29634947",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "089_29634947",
                                "quantity": 1,
                                "abstractSku": "089",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-22"
            }
        }
    ],
    "links": {
        "self": "https://glue.de.69-new.demo-spryker.com/agent-quote-requests?page"
    }
}
```

</details>


<details><summary>Response sample with customers</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "customers": {
                    "data": [
                        {
                            "type": "customers",
                            "id": "DE--21"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=customers"
    },
    "included": [
        {
            "type": "customers",
            "id": "DE--21",
            "attributes": {
                "firstName": "Sonia",
                "lastName": "Wagner",
                "email": "sonia@spryker.com",
                "gender": "Female",
                "dateOfBirth": null,
                "salutation": "Ms",
                "createdAt": "2021-12-22 10:40:04.000000",
                "updatedAt": "2021-12-22 10:40:04.000000"
            },
            "links": {
                "self": "http://glue.de.spryker.local/customers/DE--21"
            }
        }
    ]
}
```
</details>

<details><summary>Response sample with company-users</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "company-users": {
                    "data": [
                        {
                            "type": "company-users",
                            "id": "ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=company-users"
    },
    "included": [
        {
            "type": "company-users",
            "id": "ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.de.spryker.local/company-users/ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
            }
        }
    ]
}
```
</details>

<details><summary>Response sample with company-business-units</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "company-business-units": {
                    "data": [
                        {
                            "type": "company-business-units",
                            "id": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=company-business-units"
    },
    "included": [
        {
            "type": "company-business-units",
            "id": "5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2",
            "attributes": {
                "defaultBillingAddress": null,
                "name": "Spryker Systems HR department",
                "email": "HR@spryker.com",
                "phone": "4902890031",
                "externalUrl": "",
                "bic": "",
                "iban": ""
            },
            "links": {
                "self": "http://glue.de.spryker.local/company-business-units/5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with concrete-products</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "115_27295368"
                        },
                        {
                            "type": "concrete-products",
                            "id": "118_29804739"
                        },
                        {
                            "type": "concrete-products",
                            "id": "124_31623088"
                        },
                        {
                            "type": "concrete-products",
                            "id": "126_26280142"
                        },
                        {
                            "type": "concrete-products",
                            "id": "119_29804808"
                        },
                        {
                            "type": "concrete-products",
                            "id": "128_29955336"
                        },
                        {
                            "type": "concrete-products",
                            "id": "127_20723326"
                        },
                        {
                            "type": "concrete-products",
                            "id": "122_22308524"
                        },
                        {
                            "type": "concrete-products",
                            "id": "117_30585828"
                        },
                        {
                            "type": "concrete-products",
                            "id": "129_30706500"
                        },
                        {
                            "type": "concrete-products",
                            "id": "131_24872891"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=concrete-products"
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "044_31040076",
            "attributes": {
                "sku": "044_31040076",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "044",
                "name": "Samsung Galaxy S7",
                "description": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curved front and back fit in your palm just right. It's as beautiful to look at as it is to use. We spent a long time perfecting the curves of the Galaxy S7 edge and S7. Using a proprietary process called 3D Thermoforming, we melted 3D glass to curve with such precision that it meets the curved metal alloy to create an exquisitely seamless and strong unibody. The dual-curve backs on the Galaxy S7 edge and S7 are the reason why they feel so comfortable when you hold them. Everything about the design, from the naturally flowing lines to the thin form factor, come together to deliver a grip that's so satisfying, you won't want to let go.",
                "attributes": {
                    "usb_version": "2",
                    "os_version": "6",
                    "max_memory_card_size": "200 GB",
                    "weight": "152 g",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Samsung Galaxy S7",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curv",
                "attributeNames": {
                    "usb_version": "USB version",
                    "os_version": "OS version",
                    "max_memory_card_size": "Max memory card size",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/044_31040076"
            }
        },
        {
            "type": "concrete-products",
            "id": "115_27295368",
            "attributes": {
                "sku": "115_27295368",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "115",
                "name": "DELL OptiPlex 3020",
                "description": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and easy serviceability. Stop advanced threats and zero-day attacks with Dell Data Protection | Protected Workspace — a proactive, real-time solution for malware protection. Ensure authorized access through multifactor, single sign-on (SSO) and preboot authentication with Dell Data Protection | Security Tools. Streamline administration with integration into Dell KACE appliances, Microsoft System Center and industry-standard tools. Deploy with flexibility through multiple chassis options. Select the small form factor chassis, optimized for constrained workspaces, or the expandable mini tower with support for up to four PCIe cards.",
                "attributes": {
                    "processor_cache": "3 MB",
                    "bus_type": "DMI",
                    "processor_threads": "2",
                    "tcase": "72 °",
                    "brand": "DELL",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_cache",
                    "processor_frequency"
                ],
                "metaTitle": "DELL OptiPlex 3020",
                "metaKeywords": "DELL,Tax Exempt",
                "metaDescription": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and ",
                "attributeNames": {
                    "processor_cache": "Processor cache type",
                    "bus_type": "Bus type",
                    "processor_threads": "Processor Threads",
                    "tcase": "Tcase",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/115_27295368"
            }
        },
        {
            "type": "concrete-products",
            "id": "118_29804739",
            "attributes": {
                "sku": "118_29804739",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "118",
                "name": "Fujitsu ESPRIMO E420",
                "description": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E420 features proven technology regarding Intel® chipset and processor and an 85% energy efficient power supply. Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT.",
                "attributes": {
                    "processor_cache": "6 MB",
                    "bus_type": "DMI",
                    "processor_model": "i5-4590",
                    "product_type": "PC",
                    "brand": "Fujitsu",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "processor_cache",
                    "color"
                ],
                "metaTitle": "Fujitsu ESPRIMO E420",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficien",
                "attributeNames": {
                    "processor_cache": "Processor cache type",
                    "bus_type": "Bus type",
                    "processor_model": "Processor model",
                    "product_type": "Product type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/118_29804739"
            }
        },
        {
            "type": "concrete-products",
            "id": "124_31623088",
            "attributes": {
                "sku": "124_31623088",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "124",
                "name": "HP ProDesk 400 G3",
                "description": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with essential security and manageability features, the HP ProDesk 400 helps keep your business growing. New 6th Gen Intel® Core™ processors bring powerful processing with Intel® HD 530 Graphics. Available DDR4 memory helps meet the demands of today’s businesses. HP ProDesks are rigorously tested to help ensure reliability. During the HP Total Test Process, PCs experience 120,000 hours of performance trials to help get you through your business day. The HP ProDesk 400 SFF helps affordably build a solid IT infrastructure for your growing business and fits in smaller workspaces for easy deployment.",
                "attributes": {
                    "processor_codename": "Skylake",
                    "bus_type": "DMI3",
                    "processor_threads": "4",
                    "processor_cores": "2",
                    "brand": "HP",
                    "total_storage_capacity": "128 GB"
                },
                "superAttributesDefinition": [
                    "total_storage_capacity"
                ],
                "metaTitle": "HP ProDesk 400 G3",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with ess",
                "attributeNames": {
                    "processor_codename": "Processor codename",
                    "bus_type": "Bus type",
                    "processor_threads": "Processor Threads",
                    "processor_cores": "Processor cores",
                    "brand": "Brand",
                    "total_storage_capacity": "Total storage capacity"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/124_31623088"
            }
        },
        {
            "type": "concrete-products",
            "id": "126_26280142",
            "attributes": {
                "sku": "126_26280142",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "126",
                "name": "HP Z 440",
                "description": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation delivering support for up to 8 cores of processing power. Add in powerful graphics and performance features like optional Thunderbolt™ 23, HP Z Turbo Drive4, and HP Remote Graphics Software, and you get a world-class workstation experience that never slows you down.    Take your business to the next level of performance, expandability, and no compromise reliability in one complete package. Featuring a perfect mix of HP Z DNA in a performance workstation package with up to 8 discrete processor cores, up to 128 GB of RAM, and multiple storage and PCIe configuration options. Protect your investment and make downtime a thing of the past. Get no-compromise reliability and a standard 3/3/3 limited warranty from the HP Z440 Workstation.",
                "attributes": {
                    "fsb_parity": "no",
                    "bus_type": "QPI",
                    "processor_cores": "8",
                    "processor_threads": "16",
                    "brand": "HP",
                    "processor_frequency": "2.8 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "HP Z 440",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation deliveri",
                "attributeNames": {
                    "fsb_parity": "FSB Parity",
                    "bus_type": "Bus type",
                    "processor_cores": "Processor cores",
                    "processor_threads": "Processor Threads",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/126_26280142"
            }
        },
        {
            "type": "concrete-products",
            "id": "119_29804808",
            "attributes": {
                "sku": "119_29804808",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "119",
                "name": "Fujitsu ESPRIMO E920",
                "description": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT. As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E920 features latest technology regarding Intel® chipset and processor and optional an up to 94% energy efficient power supply. Furthermore it delivers enhanced power management settings and optional 0-Watt power consumption in off-mode.",
                "attributes": {
                    "internal_memory": "32 GB",
                    "intel_smart_cache": "yes",
                    "product_type": "PC",
                    "processor_cache": "6 MB",
                    "brand": "Fujitsu",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_cache",
                    "color"
                ],
                "metaTitle": "Fujitsu ESPRIMO E920",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to min",
                "attributeNames": {
                    "internal_memory": "Max internal memory",
                    "intel_smart_cache": "Intel Smart Cache",
                    "product_type": "Product type",
                    "processor_cache": "Processor cache type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/119_29804808"
            }
        },
        {
            "type": "concrete-products",
            "id": "128_29955336",
            "attributes": {
                "sku": "128_29955336",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "128",
                "name": "Lenovo ThinkCentre E73",
                "description": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep your business-critical information safe through USB port disablement and the password-protected BIOS and HDD. You can also safeguard your hardware by physically securing your mouse and keyboard, while the Kensington slot enables you to lock down your E73. Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology.",
                "attributes": {
                    "processor_threads": "8",
                    "pci_express_slots_version": "3",
                    "internal_memory": "8 GB",
                    "stepping": "C0",
                    "brand": "Lenovo",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCentre E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "pci_express_slots_version": "PCI Express slots version",
                    "internal_memory": "Max internal memory",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/128_29955336"
            }
        },
        {
            "type": "concrete-products",
            "id": "127_20723326",
            "attributes": {
                "sku": "127_20723326",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "127",
                "name": "HP Z 620",
                "description": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of computing and visualization power into a quiet, compact footprint. This dual-socket system helps you boost productivity with next-generation Intel® Xeon® processors and support for up to 8 displays. Get massive system performance with a small footprint. The HP Z620 features the next evolution in processor technology and system architecture, setting the standard for versatility with support for a single Intel E5-1600 Series Xeon® processor or dual Intel E5-2600 Series Xeon® processors. With 800W 90% efficient power supply and support for up to 8 displays, the HP Z620 gives you the freedom of doing and seeing more.",
                "attributes": {
                    "processor_frequency": "2.1 GHz",
                    "processor_cache": "15 MB",
                    "processor_threads": "12",
                    "fsb_parity": "no",
                    "brand": "HP",
                    "total_storage_capacity": "1000 GB"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "processor_cache",
                    "total_storage_capacity"
                ],
                "metaTitle": "HP Z 620",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of com",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cache": "Processor cache type",
                    "processor_threads": "Processor Threads",
                    "fsb_parity": "FSB Parity",
                    "brand": "Brand",
                    "total_storage_capacity": "Total storage capacity"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/127_20723326"
            }
        },
        {
            "type": "concrete-products",
            "id": "122_22308524",
            "attributes": {
                "sku": "122_22308524",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "122",
                "name": "HP EliteDesk 800 G1 Mini",
                "description": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serviceable design with integrated wireless antenna allows flexible deployment options1 to help optimize the workspace. Keep productivity high and downtime low with HP BIOSphere firmware-level automation. Your PCs have extra protection thanks to automatic updates and security checks. Enjoy customization that allows your PC to evolve with your business.",
                "attributes": {
                    "processor_cores": "2",
                    "processor_codename": "Haswell",
                    "processor_threads": "4",
                    "bus_type": "DMI",
                    "brand": "HP",
                    "processor_frequency": "2.9 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "HP EliteDesk 800 G1 Mini",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serv",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "processor_codename": "Processor codename",
                    "processor_threads": "Processor Threads",
                    "bus_type": "Bus type",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/122_22308524"
            }
        },
        {
            "type": "concrete-products",
            "id": "117_30585828",
            "attributes": {
                "sku": "117_30585828",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "117",
                "name": "Fujitsu ESPRIMO D556",
                "description": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity needed for daily operations. Your valuable business data is protected by the latest TPM controller and the Erasedisk option. To meet your specific hardware needs it can be either individually configured or customized.",
                "attributes": {
                    "processor_frequency": "3.7 GHz",
                    "processor_cores": "2",
                    "bus_type": "DMI3",
                    "tcase": "65 °",
                    "brand": "Fujitsu",
                    "internal_memory": "4 GB"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "internal_memory"
                ],
                "metaTitle": "Fujitsu ESPRIMO D556",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity n",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cores": "Processor cores",
                    "bus_type": "Bus type",
                    "tcase": "Tcase",
                    "brand": "Brand",
                    "internal_memory": "Max internal memory"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/117_30585828"
            }
        },
        {
            "type": "concrete-products",
            "id": "129_30706500",
            "attributes": {
                "sku": "129_30706500",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "129",
                "name": "Lenovo ThinkCenter E73",
                "description": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology. With 10% more processing power, 4th generation Intel® Core™ processors deliver the performance to increase business productivity for your business. They can also guard against identity theft and ensure safe access to your network with built-in security features.",
                "attributes": {
                    "processor_threads": "8",
                    "processor_cores": "4",
                    "processor_codename": "Haswell",
                    "pci_express_slots_version": "3",
                    "brand": "Lenovo",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCenter E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "processor_cores": "Processor cores",
                    "processor_codename": "Processor codename",
                    "pci_express_slots_version": "PCI Express slots version",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/129_30706500"
            }
        },
        {
            "type": "concrete-products",
            "id": "131_24872891",
            "attributes": {
                "sku": "131_24872891",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "131",
                "name": "Lenovo ThinkStation P900",
                "description": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — and a direct cooling air baffle directs fresh air into the CPU and memory. ThinkStation P900 delivers new technologies and design to keep your workstation cool and quiet. The innovative Flex Module lets you customize I/O ports, so you add only what you need. Using the 5.25\" bays, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA. The Flex Connector is a mezzanine card that fits into the motherboard and allows for expanded storage and I/O, without sacrificing the use of rear PCI. It supports SATA/SAS/PCIe advanced RAID solution. ThinkStation P900 includes two available connectors (enabled with each CPU).",
                "attributes": {
                    "processor_frequency": "2.4 GHz",
                    "processor_cores": "6",
                    "processor_threads": "12",
                    "stepping": "R2",
                    "brand": "Lenovo",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "metaTitle": "Lenovo ThinkStation P900",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — an",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cores": "Processor cores",
                    "processor_threads": "Processor Threads",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/131_24872891"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with concrete-products</summary>

```json
{
    "data": [
        {
            "type": "quote-requests",
            "id": "DE--21-1",
            "attributes": {
                "quoteRequestReference": "DE--21-1",
                "status": "closed",
                "isLatestVersionVisible": true,
                "createdAt": "2021-12-22 10:40:43.000000",
                "validUntil": null,
                "versions": [
                    "DE--21-1-1"
                ],
                "shownVersion": {
                    "version": 1,
                    "versionReference": "DE--21-1-1",
                    "createdAt": "2021-12-22 10:40:43.000000",
                    "metadata": {
                        "purchase_order_number": 228,
                        "delivery_date": null,
                        "note": "test"
                    },
                    "cart": {
                        "priceMode": "GROSS_MODE",
                        "store": "DE",
                        "currency": "EUR",
                        "totals": {
                            "expenseTotal": 0,
                            "discountTotal": 14341,
                            "taxTotal": {
                                "tax_rate": null,
                                "amount": 0
                            },
                            "subtotal": 143412,
                            "grandTotal": 129071,
                            "priceToPay": 129071
                        },
                        "billingAddress": null,
                        "items": [
                            {
                                "groupKey": "115_27295368",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "115_27295368",
                                "quantity": 1,
                                "abstractSku": "115",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "118_29804739",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "118_29804739",
                                "quantity": 1,
                                "abstractSku": "118",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "124_31623088",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "124_31623088",
                                "quantity": 1,
                                "abstractSku": "124",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "126_26280142",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "126_26280142",
                                "quantity": 1,
                                "abstractSku": "126",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "119_29804808",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "119_29804808",
                                "quantity": 1,
                                "abstractSku": "119",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "128_29955336",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "128_29955336",
                                "quantity": 1,
                                "abstractSku": "128",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "127_20723326",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "127_20723326",
                                "quantity": 1,
                                "abstractSku": "127",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "122_22308524",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "122_22308524",
                                "quantity": 1,
                                "abstractSku": "122",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "117_30585828",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "117_30585828",
                                "quantity": 1,
                                "abstractSku": "117",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "129_30706500",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "129_30706500",
                                "quantity": 1,
                                "abstractSku": "129",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            },
                            {
                                "groupKey": "131_24872891",
                                "productOfferReference": null,
                                "merchantReference": null,
                                "sku": "131_24872891",
                                "quantity": 1,
                                "abstractSku": "131",
                                "amount": null,
                                "configuredBundle": null,
                                "configuredBundleItem": null,
                                "salesUnit": null,
                                "calculations": null,
                                "selectedProductOptions": []
                            }
                        ],
                        "discounts": [],
                        "shipments": []
                    }
                }
            },
            "links": {
                "self": "http://glue.de.spryker.local/quote-requests/DE--21-1"
            },
            "relationships": {
                "concrete-products": {
                    "data": [
                        {
                            "type": "concrete-products",
                            "id": "115_27295368"
                        },
                        {
                            "type": "concrete-products",
                            "id": "118_29804739"
                        },
                        {
                            "type": "concrete-products",
                            "id": "124_31623088"
                        },
                        {
                            "type": "concrete-products",
                            "id": "126_26280142"
                        },
                        {
                            "type": "concrete-products",
                            "id": "119_29804808"
                        },
                        {
                            "type": "concrete-products",
                            "id": "128_29955336"
                        },
                        {
                            "type": "concrete-products",
                            "id": "127_20723326"
                        },
                        {
                            "type": "concrete-products",
                            "id": "122_22308524"
                        },
                        {
                            "type": "concrete-products",
                            "id": "117_30585828"
                        },
                        {
                            "type": "concrete-products",
                            "id": "129_30706500"
                        },
                        {
                            "type": "concrete-products",
                            "id": "131_24872891"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.spryker.local/agent-quote-requests?include=concrete-products"
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "044_31040076",
            "attributes": {
                "sku": "044_31040076",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "044",
                "name": "Samsung Galaxy S7",
                "description": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curved front and back fit in your palm just right. It's as beautiful to look at as it is to use. We spent a long time perfecting the curves of the Galaxy S7 edge and S7. Using a proprietary process called 3D Thermoforming, we melted 3D glass to curve with such precision that it meets the curved metal alloy to create an exquisitely seamless and strong unibody. The dual-curve backs on the Galaxy S7 edge and S7 are the reason why they feel so comfortable when you hold them. Everything about the design, from the naturally flowing lines to the thin form factor, come together to deliver a grip that's so satisfying, you won't want to let go.",
                "attributes": {
                    "usb_version": "2",
                    "os_version": "6",
                    "max_memory_card_size": "200 GB",
                    "weight": "152 g",
                    "brand": "Samsung",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Samsung Galaxy S7",
                "metaKeywords": "Samsung,Communication Electronics",
                "metaDescription": "Smart Design The beauty of what we've engineered is to give you the slimmest feel in your hand without compromising the big screen size. The elegantly curv",
                "attributeNames": {
                    "usb_version": "USB version",
                    "os_version": "OS version",
                    "max_memory_card_size": "Max memory card size",
                    "weight": "Weight",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/044_31040076"
            }
        },
        {
            "type": "concrete-products",
            "id": "115_27295368",
            "attributes": {
                "sku": "115_27295368",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "115",
                "name": "DELL OptiPlex 3020",
                "description": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and easy serviceability. Stop advanced threats and zero-day attacks with Dell Data Protection | Protected Workspace — a proactive, real-time solution for malware protection. Ensure authorized access through multifactor, single sign-on (SSO) and preboot authentication with Dell Data Protection | Security Tools. Streamline administration with integration into Dell KACE appliances, Microsoft System Center and industry-standard tools. Deploy with flexibility through multiple chassis options. Select the small form factor chassis, optimized for constrained workspaces, or the expandable mini tower with support for up to four PCIe cards.",
                "attributes": {
                    "processor_cache": "3 MB",
                    "bus_type": "DMI",
                    "processor_threads": "2",
                    "tcase": "72 °",
                    "brand": "DELL",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_cache",
                    "processor_frequency"
                ],
                "metaTitle": "DELL OptiPlex 3020",
                "metaKeywords": "DELL,Tax Exempt",
                "metaDescription": "Great performance. Outstanding value Get the job done with business-ready desktops offering superb value with strong performance, exceptional security and ",
                "attributeNames": {
                    "processor_cache": "Processor cache type",
                    "bus_type": "Bus type",
                    "processor_threads": "Processor Threads",
                    "tcase": "Tcase",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/115_27295368"
            }
        },
        {
            "type": "concrete-products",
            "id": "118_29804739",
            "attributes": {
                "sku": "118_29804739",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "118",
                "name": "Fujitsu ESPRIMO E420",
                "description": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E420 features proven technology regarding Intel® chipset and processor and an 85% energy efficient power supply. Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT.",
                "attributes": {
                    "processor_cache": "6 MB",
                    "bus_type": "DMI",
                    "processor_model": "i5-4590",
                    "product_type": "PC",
                    "brand": "Fujitsu",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "processor_cache",
                    "color"
                ],
                "metaTitle": "Fujitsu ESPRIMO E420",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "Energy Efficiency As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficien",
                "attributeNames": {
                    "processor_cache": "Processor cache type",
                    "bus_type": "Bus type",
                    "processor_model": "Processor model",
                    "product_type": "Product type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/118_29804739"
            }
        },
        {
            "type": "concrete-products",
            "id": "124_31623088",
            "attributes": {
                "sku": "124_31623088",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "124",
                "name": "HP ProDesk 400 G3",
                "description": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with essential security and manageability features, the HP ProDesk 400 helps keep your business growing. New 6th Gen Intel® Core™ processors bring powerful processing with Intel® HD 530 Graphics. Available DDR4 memory helps meet the demands of today’s businesses. HP ProDesks are rigorously tested to help ensure reliability. During the HP Total Test Process, PCs experience 120,000 hours of performance trials to help get you through your business day. The HP ProDesk 400 SFF helps affordably build a solid IT infrastructure for your growing business and fits in smaller workspaces for easy deployment.",
                "attributes": {
                    "processor_codename": "Skylake",
                    "bus_type": "DMI3",
                    "processor_threads": "4",
                    "processor_cores": "2",
                    "brand": "HP",
                    "total_storage_capacity": "128 GB"
                },
                "superAttributesDefinition": [
                    "total_storage_capacity"
                ],
                "metaTitle": "HP ProDesk 400 G3",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "New powerful processors Give your business the strong foundation it needs for growth with the affordable and reliable HP ProDesk 400 SFF. Designed with ess",
                "attributeNames": {
                    "processor_codename": "Processor codename",
                    "bus_type": "Bus type",
                    "processor_threads": "Processor Threads",
                    "processor_cores": "Processor cores",
                    "brand": "Brand",
                    "total_storage_capacity": "Total storage capacity"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/124_31623088"
            }
        },
        {
            "type": "concrete-products",
            "id": "126_26280142",
            "attributes": {
                "sku": "126_26280142",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "126",
                "name": "HP Z 440",
                "description": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation delivering support for up to 8 cores of processing power. Add in powerful graphics and performance features like optional Thunderbolt™ 23, HP Z Turbo Drive4, and HP Remote Graphics Software, and you get a world-class workstation experience that never slows you down.    Take your business to the next level of performance, expandability, and no compromise reliability in one complete package. Featuring a perfect mix of HP Z DNA in a performance workstation package with up to 8 discrete processor cores, up to 128 GB of RAM, and multiple storage and PCIe configuration options. Protect your investment and make downtime a thing of the past. Get no-compromise reliability and a standard 3/3/3 limited warranty from the HP Z440 Workstation.",
                "attributes": {
                    "fsb_parity": "no",
                    "bus_type": "QPI",
                    "processor_cores": "8",
                    "processor_threads": "16",
                    "brand": "HP",
                    "processor_frequency": "2.8 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "HP Z 440",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Get the job done fast Cross items off your to-do list fast. Achieve massive computational performance with a single processor personal workstation deliveri",
                "attributeNames": {
                    "fsb_parity": "FSB Parity",
                    "bus_type": "Bus type",
                    "processor_cores": "Processor cores",
                    "processor_threads": "Processor Threads",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/126_26280142"
            }
        },
        {
            "type": "concrete-products",
            "id": "119_29804808",
            "attributes": {
                "sku": "119_29804808",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "119",
                "name": "Fujitsu ESPRIMO E920",
                "description": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to minimize risk to end users and to the environment. This strategy is captured in Environmental Guideline FTS03230 and forms the basis on which all Fujitsu's products are designed. Especially for Fujitsu ESPRIMO PCs this means that all used printed circuit boards are halogen free. Furthermore they are compliant with several certificates awarding environmental conscience such as ENERGY STAR® and EPEAT. As energy saving is one of the core components of Fujitsu’ approach to the environment, we permanently try to improve the energy efficiency of our products. The Fujitsu ESPRIMO E920 features latest technology regarding Intel® chipset and processor and optional an up to 94% energy efficient power supply. Furthermore it delivers enhanced power management settings and optional 0-Watt power consumption in off-mode.",
                "attributes": {
                    "internal_memory": "32 GB",
                    "intel_smart_cache": "yes",
                    "product_type": "PC",
                    "processor_cache": "6 MB",
                    "brand": "Fujitsu",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_cache",
                    "color"
                ],
                "metaTitle": "Fujitsu ESPRIMO E920",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "Green IT Fujitsu is committed to eliminating the use of harmful and potentially harmful substances in its products and production processes in order to min",
                "attributeNames": {
                    "internal_memory": "Max internal memory",
                    "intel_smart_cache": "Intel Smart Cache",
                    "product_type": "Product type",
                    "processor_cache": "Processor cache type",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/119_29804808"
            }
        },
        {
            "type": "concrete-products",
            "id": "128_29955336",
            "attributes": {
                "sku": "128_29955336",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "128",
                "name": "Lenovo ThinkCentre E73",
                "description": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep your business-critical information safe through USB port disablement and the password-protected BIOS and HDD. You can also safeguard your hardware by physically securing your mouse and keyboard, while the Kensington slot enables you to lock down your E73. Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology.",
                "attributes": {
                    "processor_threads": "8",
                    "pci_express_slots_version": "3",
                    "internal_memory": "8 GB",
                    "stepping": "C0",
                    "brand": "Lenovo",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "internal_memory",
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCentre E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Small Form Factor Small Form Factor desktops provide the ultimate performance with full-featured scalability, yet weigh as little as 13.2 lbs / 6 kgs. Keep",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "pci_express_slots_version": "PCI Express slots version",
                    "internal_memory": "Max internal memory",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/128_29955336"
            }
        },
        {
            "type": "concrete-products",
            "id": "127_20723326",
            "attributes": {
                "sku": "127_20723326",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "127",
                "name": "HP Z 620",
                "description": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of computing and visualization power into a quiet, compact footprint. This dual-socket system helps you boost productivity with next-generation Intel® Xeon® processors and support for up to 8 displays. Get massive system performance with a small footprint. The HP Z620 features the next evolution in processor technology and system architecture, setting the standard for versatility with support for a single Intel E5-1600 Series Xeon® processor or dual Intel E5-2600 Series Xeon® processors. With 800W 90% efficient power supply and support for up to 8 displays, the HP Z620 gives you the freedom of doing and seeing more.",
                "attributes": {
                    "processor_frequency": "2.1 GHz",
                    "processor_cache": "15 MB",
                    "processor_threads": "12",
                    "fsb_parity": "no",
                    "brand": "HP",
                    "total_storage_capacity": "1000 GB"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "processor_cache",
                    "total_storage_capacity"
                ],
                "metaTitle": "HP Z 620",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Big Possibilities. Compact Form Factor. More versatile than ever before. With up to 16 discrete processor cores, the HP Z620 Workstation packs a ton of com",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cache": "Processor cache type",
                    "processor_threads": "Processor Threads",
                    "fsb_parity": "FSB Parity",
                    "brand": "Brand",
                    "total_storage_capacity": "Total storage capacity"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/127_20723326"
            }
        },
        {
            "type": "concrete-products",
            "id": "122_22308524",
            "attributes": {
                "sku": "122_22308524",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "122",
                "name": "HP EliteDesk 800 G1 Mini",
                "description": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serviceable design with integrated wireless antenna allows flexible deployment options1 to help optimize the workspace. Keep productivity high and downtime low with HP BIOSphere firmware-level automation. Your PCs have extra protection thanks to automatic updates and security checks. Enjoy customization that allows your PC to evolve with your business.",
                "attributes": {
                    "processor_cores": "2",
                    "processor_codename": "Haswell",
                    "processor_threads": "4",
                    "bus_type": "DMI",
                    "brand": "HP",
                    "processor_frequency": "2.9 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "HP EliteDesk 800 G1 Mini",
                "metaKeywords": "HP,Tax Exempt",
                "metaDescription": "Big power. Space saving design. Smaller than some desk phones, this Desktop Mini can fit almost anywhere vertically or horizontally. The clean, easily serv",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "processor_codename": "Processor codename",
                    "processor_threads": "Processor Threads",
                    "bus_type": "Bus type",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/122_22308524"
            }
        },
        {
            "type": "concrete-products",
            "id": "117_30585828",
            "attributes": {
                "sku": "117_30585828",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "117",
                "name": "Fujitsu ESPRIMO D556",
                "description": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity needed for daily operations. Your valuable business data is protected by the latest TPM controller and the Erasedisk option. To meet your specific hardware needs it can be either individually configured or customized.",
                "attributes": {
                    "processor_frequency": "3.7 GHz",
                    "processor_cores": "2",
                    "bus_type": "DMI3",
                    "tcase": "65 °",
                    "brand": "Fujitsu",
                    "internal_memory": "4 GB"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "internal_memory"
                ],
                "metaTitle": "Fujitsu ESPRIMO D556",
                "metaKeywords": "Fujitsu,Tax Exempt",
                "metaDescription": "The FUJITSU ESPRIMO  Desktop provides high-quality computing for your daily office tasks. It supports attractive price points and delivers the continuity n",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cores": "Processor cores",
                    "bus_type": "Bus type",
                    "tcase": "Tcase",
                    "brand": "Brand",
                    "internal_memory": "Max internal memory"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/117_30585828"
            }
        },
        {
            "type": "concrete-products",
            "id": "129_30706500",
            "attributes": {
                "sku": "129_30706500",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "129",
                "name": "Lenovo ThinkCenter E73",
                "description": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is also ENERGY STAR compliant, EPEAT® Gold and Cisco EnergyWise™ certified—so you can feel good about the planet and your bottom line. With SuperSpeed USB 3.0, transfer data up to 10 times faster than previous USB technologies. You can also connect to audio- and video-related devices with WiFi and Bluetooth® technology. With 10% more processing power, 4th generation Intel® Core™ processors deliver the performance to increase business productivity for your business. They can also guard against identity theft and ensure safe access to your network with built-in security features.",
                "attributes": {
                    "processor_threads": "8",
                    "processor_cores": "4",
                    "processor_codename": "Haswell",
                    "pci_express_slots_version": "3",
                    "brand": "Lenovo",
                    "processor_frequency": "3.2 GHz"
                },
                "superAttributesDefinition": [
                    "processor_frequency"
                ],
                "metaTitle": "Lenovo ThinkCenter E73",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Eco-friendly and Energy Efficient Lenovo Desktop Power Manager lets you balance power management and performance to save energy and lower costs. The E73 is",
                "attributeNames": {
                    "processor_threads": "Processor Threads",
                    "processor_cores": "Processor cores",
                    "processor_codename": "Processor codename",
                    "pci_express_slots_version": "PCI Express slots version",
                    "brand": "Brand",
                    "processor_frequency": "Processor frequency"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/129_30706500"
            }
        },
        {
            "type": "concrete-products",
            "id": "131_24872891",
            "attributes": {
                "sku": "131_24872891",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "131",
                "name": "Lenovo ThinkStation P900",
                "description": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — and a direct cooling air baffle directs fresh air into the CPU and memory. ThinkStation P900 delivers new technologies and design to keep your workstation cool and quiet. The innovative Flex Module lets you customize I/O ports, so you add only what you need. Using the 5.25\" bays, you can mix and match components including an ultraslim ODD, 29-in-1 media card reader, Firewire, and eSATA. The Flex Connector is a mezzanine card that fits into the motherboard and allows for expanded storage and I/O, without sacrificing the use of rear PCI. It supports SATA/SAS/PCIe advanced RAID solution. ThinkStation P900 includes two available connectors (enabled with each CPU).",
                "attributes": {
                    "processor_frequency": "2.4 GHz",
                    "processor_cores": "6",
                    "processor_threads": "12",
                    "stepping": "R2",
                    "brand": "Lenovo",
                    "color": "Silver"
                },
                "superAttributesDefinition": [
                    "processor_frequency",
                    "color"
                ],
                "metaTitle": "Lenovo ThinkStation P900",
                "metaKeywords": "Lenovo,Tax Exempt",
                "metaDescription": "Thermal Design: Elegant & Efficient. Patented tri-channel cooling with just 3 system fans – as opposed to 10 that other workstations typically rely on — an",
                "attributeNames": {
                    "processor_frequency": "Processor frequency",
                    "processor_cores": "Processor cores",
                    "processor_threads": "Processor Threads",
                    "stepping": "Stepping",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "http://glue.de.spryker.local/concrete-products/131_24872891"
            }
        }
    ]
}
```

</details>

For descriptions of response attributes, see the [Response](#create-request-for-quote-response) section of Create a request for quote.


## Revise a request for quote

To revise a request for quote, send the request:

`POST` **/agent-quote-requests/{% raw %}{{{% endraw %}*QuotationRequestID*{% raw %}}}{% endraw %}/agent-quote-request-revise**

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier to manage requests for quotes. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

`POST https://glue.mysprykershop.com/agent-quote-requests/DE--21-11/agent-quote-request-revise`

```json
{
    "data": {
        "type": "agent-quote-request-revise",
        "attributes": {}
    }
}
```

### Response

<details><summary>Response sample</summary>
```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-11",
        "attributes": {
            "quoteRequestReference": "DE--21-11",
            "status": "in-progress",
            "isLatestVersionVisible": false,
            "createdAt": "2021-12-22 12:44:32.000000",
            "validUntil": null,
            "versions": [],
            "shownVersion": {
                "version": 2,
                "versionReference": "DE--21-11-2",
                "createdAt": "2021-12-22 12:46:38",
                "metadata": {
                    "purchase_order_number": "111",
                    "delivery_date": "Dec. 24, 2021",
                    "note": "Notes"
                },
                "cart": {
                    "priceMode": "GROSS_MODE",
                    "store": "DE",
                    "currency": "EUR",
                    "totals": {
                        "expenseTotal": 0,
                        "discountTotal": 0,
                        "taxTotal": {
                            "tax_rate": null,
                            "amount": 5133
                        },
                        "subtotal": 32149,
                        "grandTotal": 32149,
                        "priceToPay": 32149
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "044_31040076",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "044_31040076",
                            "quantity": 1,
                            "abstractSku": "044",
                            "amount": null,
                            "configuredBundle": null,
                            "configuredBundleItem": null,
                            "salesUnit": null,
                            "calculations": null,
                            "selectedProductOptions": []
                        }
                    ],
                    "discounts": [],
                    "shipments": []
                }
            }
        },
        "links": {
            "self": "http://glue.de.spryker.local/quote-requests/DE--21-11"
        }
    }
}
```
</details>

## Send a revised request for quote back to customer

To send a revised request for quote back to customer, send the request

`POST` **/agent-quote-requests/{% raw %}{{{% endraw %}*QuotationRequestID*{% raw %}}}{% endraw %}/agent-quote-request-send-to-customer**

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier to manage requests for quotes. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

```json
{
    "data": {
        "type": "agent-quote-request-send-to-customer",
        "attributes": {}
    }
}
```

## Response

In case of the successful request, `1` is sent in response.

## Cancel a request for quote

<!-- check if it works at all -->

To cancel a request for quote, send the request:

`POST` **/agent-quote-requests/{% raw %}{{{% endraw %}*QuotationRequestID*{% raw %}}}{% endraw %}/agent-quote-request-cancel**

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier to manage requests for quotes. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

Request sample: `POST https://glue.mysprykershop.com/quote-requests/DE--21-34/agent-quote-request-cancel`

```json
{
    "data": {
        "type": "agent-quote-request-cancel",
        "attributes": {}
    }
}
```

### Response

In case of the successful request, `1` is sent in response.

## Possible errors

| CODE | REASON |
|---|---|
| 001 | Access token is invalid |
| 002 | Access token is missing |
| 101 | Cart with the given UUID is not found. |
| 102 | Failed to add an item to cart. |
| 1401 | Rest user is not a company user (wrong access token) |  
| 4501 | Quote request is not found. |
| 4502 | Quote request reference is required. |
| 4503 | Cart is empty. |
| 4504 | Wrong Quote Request status for this operation. |
| 4505 | Quote Request could not be updated due to parallel-customer interaction. |
| 4506 | Something went wrong. |
| 4507 | Something went wrong with agent. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
