---
title: Managing agent requests for quote
description: This endpoint allows managing agent requests for quote.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
---

This endpoint allows managing agent requests for quote.

## Installation

For details on the modules that provide the API functionality and how to install them, see <!--paste a link to a IG-->

## Create an agent request for quote

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

Sample request: `POST https://glue.mysprykershop.com/agent-quote-requests`

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

| ATTRIBUTE | REQUIRED | TYPE | DESCRIPTION |
|---|---|---|---|
| companyUserUuid | &check; | String | Company user ID |
| purchase_order_number |   | Integer | Purchase order number |
| delivery_date |   | String | Product delivery date |
| note |   | String | Notes/comments left by a customer or Back Office user. |

### Response

<details><summary>Response sample</summary>
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

</details>

<details><summary>Response sample with company-users</summary>

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

</details>

## Retrieve agent requests for quote

To retrieve requests for quote for an agent, send the following request:

---
`GET` **/agent-quote-requests**

---

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

Sample request: `POST https://glue.mysprykershop.com/agent-quote-requests`

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



## Retrieve an agent request for quote

To retrieve a request for quote for an agent, send the following request:

`GET` **/agent-quote-requests/{{QuotationRequestID}}**

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as an agent assist](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-agent-assists/authenticating-as-an-agent-assist.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|---|---|---|
| include | Adds resource relationships to the request. | <div><ul><li>customers</li><li>company-users</li><li>company-business-units</li><li>concrete-products</li></ul></div> |

Sample request: `GET https://glue.mysprykershop.com/agent-quote-requests/DE--21-22`

## Response

<details><summary>Response sample</summary>

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
}
```

</details>

<details><summary>Response sample with customers</summary>

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

## Possible errors

| CODE | REASON |
|---|---|
| 001 | Access token is invalid |
| 002 | Access token is missing |
| 101 | Cart with the given uuid is not found. |
| 102 | Failed to add an item to cart. |
| 1401 | Rest user is not a company user (wrong access token) |  
| 4501 | Quote request is not found. |
| 5402 | Quote request reference is required.  |
| 5403 | Cart is empty. |
| 5404 | Wrong Quote Request status for this operation.  |
| 5405 | Quote Request could not be updated due to parallel-customer interaction.  |
| 5406 | Something went wrong.  |
| 5407 | Something went wrong with agent. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
