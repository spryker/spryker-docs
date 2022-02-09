---
title: Managing customer requests for quote
description: This endpoint allows managing customer requests for quote.
last_updated: Nov 15, 2021
template: glue-api-storefront-guide-template
---

This endpoint lets you manage customer requests for quote (RFQs).


## Installation

For details on the modules that provide the API functionality and how to install them, see <!--paste a link to an IG-->

## Create a request for quote

To create a request for quote, send the request:

---
`POST` **/quote-requests**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

{% info_block infoBox "Included resources" %}

To retrieve relationships to customers, company users, company business units, or concrete products, include  `customers`, `company-users`, `company-business-units`, or `concrete-products` respectively.

{% endinfo_block %}

Request sample:

`POST https://glue.mysprykershop.com/quote-requests`

```json
{
    "data": {
        "type": "quote-requests",
        "attributes": {
            "cartUuid": "b46c8c2c-a343-5c29-a222-117292a8fdad",
            "meta": {
                "purchase_order_number": "7711",
                "delivery_date": "2021-12-31",
                "note": "consider the request for quote"
            }
        }
    }
}
```

| REQUEST SAMPLE | USAGE |
|-|-|
| `POST https://glue.mysprykershop.com/quote-requests?include=customers`  | Create a request for quote with customer information included.  |
| `POST https://glue.mysprykershop.com/quote-requests?include=company-users`  | Create a request for quote with company user information included. |
| `POST https://glue.mysprykershop.com/quote-requests?include=company-business-units`  | Create a request for quote with information about company business units included.  |
| `POST https://glue.mysprykershop.com/quote-requests?include=concrete-products`  | Create a request for quote with information about concrete products included. |

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| companyUserUuid | String | &check; | Company user ID. |
| purchase_order_number |  Integer |  | Purchase order number. |
| delivery_date | String |  | Product delivery date. |
| note | String  |  | Notes or comments left by a customer or Back Office user. |

### Response

<details><summary>Response sample</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:00:10",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:00:11",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10"
        }
    }
}
```

</details>

<details><summary>Response sample with customers</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:04:26",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:04:27",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=customers"
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
                "createdAt": "2021-11-09 12:57:02.000000",
                "updatedAt": "2021-11-09 12:57:02.000000"
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/customers/DE--21"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with company-users</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:05:45",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:05:46",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=company-users"
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
                "self": "https://glue.de.69-new.demo-spryker.com/company-users/ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with company-business-units</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:06:38",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:06:39",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=company-business-units"
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
                "self": "https://glue.de.69-new.demo-spryker.com/company-business-units/5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with concrete-products</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:07:09",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:07:10",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=concrete-products"
        },
        "relationships": {
            "concrete-products": {
                "data": [
                    {
                        "type": "concrete-products",
                        "id": "089_29634947"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "089_29634947",
            "attributes": {
                "sku": "089_29634947",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "089",
                "name": "Sony SWR12",
                "description": "Be more you SmartBand 2 keeps an eye on your pulse and stress level, checking how your energy rises and falls. Then you can see what keeps you calm, what makes you excited and everything in between. So you can start doing more of what makes you, you. With an inbuilt heart rate monitor, the SmartBand 2 constantly checks your pulse, whether you’re on the move or sitting at a desk. See what activities raise your heart rate, and how your heart returns to its normal resting rate. Walking, running or just rushing between meetings. However you move, the SmartBand 2 captures it all so you can see how active you’ve been. Even while you sleep the tracker is still working hard, monitoring how long and how sound your zzz really is. Check SmartBand 2 data from the past week, month, year and beyond on the Lifelog app. View on the timeline alongside other Lifelog entries, including events, photos and music. See how different activities, like a holiday or listening to your favourite tune, can alter your pulse and stress levels and learn how to balance your life.",
                "attributes": {
                    "processor_cores": "2",
                    "weight": "63.5 g",
                    "clock_mode": "12h",
                    "internal_ram": "512 MB",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SWR12",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Be more you SmartBand 2 keeps an eye on your pulse and stress level, checking how your energy rises and falls. Then you can see what keeps you calm, what m",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "weight": "Weight",
                    "clock_mode": "Clock mode",
                    "internal_ram": "Internal RAM",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/concrete-products/089_29634947"
            }
        }
    ]
}
```

</details>

<a name="response-attributes"></a>

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

For attribute description of a cart, see [Managing carts of registered users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html).

For attribute descriptions of shipments, see [Managing customer addresses](/docs/scos/user/back-office-user-guides/{{page.version}}/customer/customer-customer-access-customer-groups/managing-customer-addresses.html).

For attribute description of concrete products, see [Retrieving concrete products](https://docs.spryker.com/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/concrete-products/retrieving-concrete-products.html#response).

For attribute description of customers, see [Managing customers](https://docs.spryker.com/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html).

For attribute description of business units, see [Retrieving business units](https://docs.spryker.com/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-units.html).

## Retrieve requests for quote

To retrieve requests for quote, send the request:

---
`GET` **/quote-requests**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |


| REQUEST SAMPLE | USAGE |
|-|-|
| `GET https://glue.mysprykershop.com/quote-requests`  | Retrieve quote requests  |
| `GET https://glue.mysprykershop.com/quote-requests?include=customers`  | Retrieve quote requests with customer information included.  |
| `GET https://glue.mysprykershop.com/quote-requests?include=company-users`  | Retrieve quote requests with company user information included.  |
| `GET https://glue.mysprykershop.com/quote-requests?include=company-business-units`  | Retrieve quote requests with information about company business units included.  |
| `GET https://glue.mysprykershop.com/quote-requests?include=concrete-products`  | Retreieve quote requests with information about concrete products units included. |

### Response

<details><summary>Response sample</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:00:10",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:00:11",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10"
        }
    }
}
```

</details>

<details><summary>Response sample with customers</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:04:26",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:04:27",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=customers"
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
                "createdAt": "2021-11-09 12:57:02.000000",
                "updatedAt": "2021-11-09 12:57:02.000000"
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/customers/DE--21"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with company-users</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:05:45",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:05:46",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=company-users"
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
                "self": "https://glue.de.69-new.demo-spryker.com/company-users/ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with company-business-units</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:06:38",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:06:39",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=company-business-units"
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
                "self": "https://glue.de.69-new.demo-spryker.com/company-business-units/5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with concrete-products</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:07:09",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:07:10",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=concrete-products"
        },
        "relationships": {
            "concrete-products": {
                "data": [
                    {
                        "type": "concrete-products",
                        "id": "089_29634947"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "089_29634947",
            "attributes": {
                "sku": "089_29634947",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "089",
                "name": "Sony SWR12",
                "description": "Be more you SmartBand 2 keeps an eye on your pulse and stress level, checking how your energy rises and falls. Then you can see what keeps you calm, what makes you excited and everything in between. So you can start doing more of what makes you, you. With an inbuilt heart rate monitor, the SmartBand 2 constantly checks your pulse, whether you’re on the move or sitting at a desk. See what activities raise your heart rate, and how your heart returns to its normal resting rate. Walking, running or just rushing between meetings. However you move, the SmartBand 2 captures it all so you can see how active you’ve been. Even while you sleep the tracker is still working hard, monitoring how long and how sound your zzz really is. Check SmartBand 2 data from the past week, month, year and beyond on the Lifelog app. View on the timeline alongside other Lifelog entries, including events, photos and music. See how different activities, like a holiday or listening to your favourite tune, can alter your pulse and stress levels and learn how to balance your life.",
                "attributes": {
                    "processor_cores": "2",
                    "weight": "63.5 g",
                    "clock_mode": "12h",
                    "internal_ram": "512 MB",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SWR12",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Be more you SmartBand 2 keeps an eye on your pulse and stress level, checking how your energy rises and falls. Then you can see what keeps you calm, what m",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "weight": "Weight",
                    "clock_mode": "Clock mode",
                    "internal_ram": "Internal RAM",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/concrete-products/089_29634947"
            }
        }
    ]
}
```

</details>

For attribute descriptions of response samples, see [Create a request for quote: Response](#response-attributes) in the Create a request for quote section.

## Retrieve a request for quote

To retrieve a request for quote for a customer, send the following request:

---
`GET` **/quote-requests/*{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

| REQUEST SAMPLE | USAGE |
|-|-|
| `GET https://glue.mysprykershop.com/quote-requests/DE--21-10` | Retrieve a quote request with the `DE--21-10` ID  |
| `GET https://glue.mysprykershop.com/quote-requests/DE--21-10?include=customers`  | Retrieve a quote request with the `DE--21-10` ID and with customer information included.  |
| `GET https://glue.mysprykershop.com/quote-requests/DE--21-10?include=company-users`  | Retrieve a quote request with the `DE--21-10` ID and with company user information included.  |
| `GET https://glue.mysprykershop.com/quote-requests/DE--21-10?include=company-business-units`  | Retrieve a quote request with the `DE--21-10` ID and with information about company business units included.  |
| `GET https://glue.mysprykershop.com/quote-requests/DE--21-10?include=concrete-products`  | Retrieve a quote request with the `DE--21-10` ID and with information about concrete products included. |

### Response

<details><summary>Response sample</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:00:10.000000",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:00:11.000000",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10"
        }
    }
}
```

</details>

<details><summary>Response sample with customers</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:00:10.000000",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:00:11.000000",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=customers"
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
                "createdAt": "2021-11-09 12:57:02.000000",
                "updatedAt": "2021-11-09 12:57:02.000000"
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/customers/DE--21"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with company-users</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:00:10.000000",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:00:11.000000",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=company-users"
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
                "self": "https://glue.de.69-new.demo-spryker.com/company-users/ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with company-business-units</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:00:10.000000",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:00:11.000000",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=company-business-units"
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
                "self": "https://glue.de.69-new.demo-spryker.com/company-business-units/5b9c6fc4-bf5d-5b53-9ca9-1916657e6fb2"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample with concrete-products</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-10",
        "attributes": {
            "quoteRequestReference": "DE--21-10",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-11-11 15:00:10.000000",
            "validUntil": null,
            "versions": [
                "DE--21-10-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-10-1",
                "createdAt": "2021-11-11 15:00:11.000000",
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
                            "amount": 5416
                        },
                        "subtotal": 82786,
                        "grandTotal": 82786,
                        "priceToPay": 82786
                    },
                    "billingAddress": null,
                    "items": [
                        {
                            "groupKey": "089_29634947",
                            "productOfferReference": null,
                            "merchantReference": null,
                            "sku": "089_29634947",
                            "quantity": 2,
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
            "self": "https://glue.de.69-new.demo-spryker.com/quote-requests/DE--21-10?include=concrete-products"
        },
        "relationships": {
            "concrete-products": {
                "data": [
                    {
                        "type": "concrete-products",
                        "id": "089_29634947"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "concrete-products",
            "id": "089_29634947",
            "attributes": {
                "sku": "089_29634947",
                "isDiscontinued": false,
                "discontinuedNote": null,
                "averageRating": null,
                "reviewCount": 0,
                "productAbstractSku": "089",
                "name": "Sony SWR12",
                "description": "Be more you SmartBand 2 keeps an eye on your pulse and stress level, checking how your energy rises and falls. Then you can see what keeps you calm, what makes you excited and everything in between. So you can start doing more of what makes you, you. With an inbuilt heart rate monitor, the SmartBand 2 constantly checks your pulse, whether you’re on the move or sitting at a desk. See what activities raise your heart rate, and how your heart returns to its normal resting rate. Walking, running or just rushing between meetings. However you move, the SmartBand 2 captures it all so you can see how active you’ve been. Even while you sleep the tracker is still working hard, monitoring how long and how sound your zzz really is. Check SmartBand 2 data from the past week, month, year and beyond on the Lifelog app. View on the timeline alongside other Lifelog entries, including events, photos and music. See how different activities, like a holiday or listening to your favourite tune, can alter your pulse and stress levels and learn how to balance your life.",
                "attributes": {
                    "processor_cores": "2",
                    "weight": "63.5 g",
                    "clock_mode": "12h",
                    "internal_ram": "512 MB",
                    "brand": "Sony",
                    "color": "Black"
                },
                "superAttributesDefinition": [
                    "color"
                ],
                "metaTitle": "Sony SWR12",
                "metaKeywords": "Sony,Smart Electronics",
                "metaDescription": "Be more you SmartBand 2 keeps an eye on your pulse and stress level, checking how your energy rises and falls. Then you can see what keeps you calm, what m",
                "attributeNames": {
                    "processor_cores": "Processor cores",
                    "weight": "Weight",
                    "clock_mode": "Clock mode",
                    "internal_ram": "Internal RAM",
                    "brand": "Brand",
                    "color": "Color"
                },
                "productConfigurationInstance": null
            },
            "links": {
                "self": "https://glue.de.69-new.demo-spryker.com/concrete-products/089_29634947"
            }
        }
    ]
}
```

</details>

For attribute descriptions of response samples, see [Create a request for quote: Response](#response-attributes) in the Create a request for quote section.

## Update a request for quote

<!-- check requests and responses for this section with Dev or QA. Then finish this section-->

To update a request for quote for a customer, send the request:

`PATCH` **/quote-requests/*{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

Request sample: `PATCH https://glue.mysprykershop.com/quote-requests/DE--21-8/`

```json
{
    "data": {
        "type": "quote-requests",
        "attributes": {
            "cartUuid": "8fc45eda-cddf-5fec-8291-e2e5f8014398",
            "metadata": {
                "purchase_order_number": "3",
                "delivery_date": "28-12-2021",
                "note": "Update"
            }
        }
    }
}
```

### Response

<details><summary>Response sample</summary>

```json
{
    "data": {
        "type": "quote-requests",
        "id": "DE--21-8",
        "attributes": {
            "quoteRequestReference": "DE--21-8",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-12-22 11:19:42.000000",
            "validUntil": null,
            "versions": [
                "DE--21-8-1"
            ],
            "shownVersion": {
                "version": 1,
                "versionReference": "DE--21-8-1",
                "createdAt": "2021-12-22 11:19:44.000000",
                "metadata": {
                    "purchase_order_number": "3",
                    "delivery_date": "28-12-2021",
                    "note": "Update"
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
            "self": "http://glue.de.spryker.local/quote-requests/DE--21-8"
        }
    }
}
```
</details>

For attribute descriptions of response samples, see [Create a request for quote: Response](#response-attributes) in the Create a request for quote section.

## Revise a request for quote

To revise a request for quote, send the request:

`POST` **/quote-requests/*{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*/quote-request-revise**

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

Request sample: `POST https://glue.mysprykershop.com/quote-requests/DE--21-8/quote-request-revise`

```json

    "data": {
        "type": "quote-request-revise",
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
        "id": "DE--21-8",
        "attributes": {
            "quoteRequestReference": "DE--21-8",
            "status": "draft",
            "isLatestVersionVisible": true,
            "createdAt": "2021-12-22 13:08:53.000000",
            "validUntil": null,
            "versions": [],
            "shownVersion": {
                "version": 3,
                "versionReference": "DE--21-8-3",
                "createdAt": "2021-12-22 13:23:17",
                "metadata": {
                    "purchase_order_number": "3",
                    "delivery_date": "Dec. 28, 2021",
                    "note": "Update"
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
            "self": "http://glue.de.spryker.local/quote-requests/DE--21-8"
        }
    }
}
```
</details>

For attribute descriptions of response samples, see [Create a request for quote: Response](#response-attributes) in the Create a request for quote section.

## Send a request for quote to an agent

TO send a request for quote to an agent, send the request:

`POST` **/quote-requests/*{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*/quote-request-send-to-customer**

PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

Request sample: `POST https://glue.mysprykershop.com/quote-requests/DE--21-8/quote-request-cancel`

```json
{
    "data": {
        "type": "quote-request-send-to-customer",
        "attributes": {}
    }
}
```

## Response

In case of the successful request, `1` is sent in response.

## Cancel a request for quote

To cancel a request for quote, send the request:

`POST` **/quote-requests/{% raw %}{{{% endraw %}*QuotationRequestID*{% raw %}}}{% endraw %}/quote-request-cancel**  

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}QuotationRequestID{% raw %}}}{% endraw %}*** | Request for quote unique identifier. To get it, [create a quote request](#create-a-request-for-quote). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |

Request sample: `POST https://glue.mysprykershop.com/quote-requests/DE--21-8/quote-request-cancel`

```json
{
    "data": {
        "type": "quote-request-cancel",
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
| 1401 | Rest user is not a company user (wrong access token). |  
| 4501 | Quote request is not found. |
| 4502 | Quote request reference is required. |
| 4503 | Cart is empty. |
| 4504 | Wrong Quote Request status for this operation. |
| 4505 | Quote Request could not be updated due to parallel-customer interaction. |
| 4506 | Something went wrong. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
