---
title: "Glue API: Manage marketplace returns"
description: Learn how to Manage Marketplace returns via the Spryker Glue API in the Spryker Marketplace.
template: glue-api-storefront-guide-template
redirect_from:
last_updated: Nov 21, 2023
related:
  - title: Retrieving Marketplace orders
    link: docs/pbc/all/order-management-system/page.version/marketplace/glue-api-retrieve-marketplace-orders.html
---

The Return Management API lets developers retrieve return information and create returns. The list of retrievable information includes:

- Sales order items that a customer can return.
- Returns per customer.
- Predefined reasons stored in the database.

In your development, the API can help you:
- View order details, including returnable or non-returnable items.
- Create returns for the returnable items.
- View return details of a specific customer.

Specify reasons for returning the sales order items.

## Installation

For details about the modules that provide the API functionality and how to install them, [see Install the Marketplace Return Management Glue API](/docs/pbc/all/return-management/{{page.version}}/marketplace/install-and-upgrade/install-the-marketplace-return-management-glue-api.html).

## Create a return

To create a return for a registered user, send the Request sample:

***
`POST` **/returns/**
***


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|---|---|---|
| offset | Offset of the order at which to begin the response. Works only together with `page[limit]`.  To work correctly, the value should be devisable by the value of `page[limit]`.  The default value is `0`. | From `0` to any. |
| limit | Maximum number of entries to return. Works only together with `page[offset]`.  The default value is `10`. | From `1` to any. |
| include | Adds resource relationships to the request. | <ul><li>return-items</li><li>order-itemsorder-items</li><li>merchants</li></ul> |

<details><summary>Request sample: create a return</summary>

`POST https://glue.mysprykershop.com/returns`

```json
{
    "data": {
        "type": "returns",
        "attributes": {
            "store": "DE",
			"returnItems": [
				{
					"salesOrderItemUuid": "b39c7e1c-12ba-53d3-8d81-5c363d5307e9",
					"reason": "0"
				},
				{
					"salesOrderItemUuid": "b189d4f2-da12-59f3-8e05-dfb4d95b1781",
					"reason": "Custom reason"
				}
			]
        }
    }
}
```

</details>

<details><summary>Request sample: create a return with return items</summary>

`POST https://glue.mysprykershop.com/returns?include=return-items`

```json
{
    "data": {
        "type": "returns",
        "attributes": {
            "store": "DE",
			"returnItems": [
				{
					"salesOrderItemUuid": "c319e465-5160-59f1-a5b8-85073d1472b7",
					"reason": "Damaged"
				}
			]
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| store | String | &check; | Store where the order was placed. |
| returnItems | cell | &check; | Set of return items. |
| salesOrderItemUuid | String | &check; | UUID of the sales order item included in the return. |
| reason | String |   | Reason to return the item. |

### Response

<details><summary>Response sample: create a return for a sales order items</summary>

```json
{
    "data": {
        "type": "returns",
        "id": "DE--21-R10",
        "attributes": {
            "merchantReference": null,
            "returnReference": "DE--21-R10",
            "store": "DE",
            "customerReference": "DE--21",
            "returnTotals": {
                "refundTotal": 0,
                "remunerationTotal": 13643
            }
        },
        "links": {
            "self": "https://glue.myspykershop.com/returns/DE--21-R10"
        }
    }
}
```

</details>

<details><summary>Response sample: create a return for the merchant order item with information about return items</summary>

```json
{
    "data": {
        "type": "returns",
        "id": "DE--21-R2",
        "attributes": {
            "merchantReference": "MER000001",
            "returnReference": "DE--21-R2",
            "store": "DE",
            "customerReference": "DE--21",
            "returnTotals": {
                "refundTotal": 0,
                "remunerationTotal": 10580
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/returns/DE--21-R2?include=return-items"
        },
        "relationships": {
            "return-items": {
                "data": [
                    {
                        "type": "return-items",
                        "id": "717e94dd-7eb6-5a3f-837b-2ea745f6ae0a"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "return-items",
            "id": "717e94dd-7eb6-5a3f-837b-2ea745f6ae0a",
            "attributes": {
                "uuid": "717e94dd-7eb6-5a3f-837b-2ea745f6ae0a",
                "reason": "Damaged",
                "orderItemUuid": "c319e465-5160-59f1-a5b8-85073d1472b7"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R2/return-items/717e94dd-7eb6-5a3f-837b-2ea745f6ae0a"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
| merchantReference | String | Unique identifier of the merchant. |
| returnReference | String | Unique identifier of the return. You can get it when creating the return. |
| store | String | Store for which the return was created. |
| customerReference | String | Unique identifier of the customer. |
| returnTotals | Object | List of totals to return. |
| refundTotal | Integer | Total refund amount. |
| remunerationTotal | Integer | Total remuneration. |

| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|---|
| return-items | uuid | String | Unique identifier of the returned item. |
| return-items | reason | String | Predefined reason why the return was created. |
| return-items | orderItemUuid | String | Unique identifier of the order item. |

For the attributes of the included resources, see [Retrieving marketplace orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/glue-api-retrieve-marketplace-orders.html).

## Retrieve returns

To retrieve returns, send the Request sample:

***
`GET` **/returns**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|---|---|---|
| offset | Offset of the order at which to begin the response. Works only together with `page[limit]`.  To work correctly, the value should be devisable by the value of `page[limit]`.  The default value is `0`. | From `0` to any. |
| limit | Maximum number of entries to return. Works only together with page[offset].  The default value is `10`. | From `1` to any. |
| include | Adds resource relationships to the request. | <ul><li>return-items</li><li>merchants</li></ul> |

| REQUEST | USAGE |
|---|---|
| `GET https://glue.mysprykershop.com/returns` | Retrieve all returns. |
| `GET https://glue.mysprykershop.com/returns?include=return-items` | Retrieve all returns with the information about return items included. |
| `GET https://glue.mysprykershop.com/returns?include=merchants` | Retrieve all returns with the respective merchants included. |

### Response

<details><summary>Response sample: retrieve all returns</summary>

```json
{
    "data": [
        {
            "type": "returns",
            "id": "DE--21-R9",
            "attributes": {
                "merchantReference": null,
                "returnReference": "DE--21-R9",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 1879
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R9"
            }
        },
        {
            "type": "returns",
            "id": "DE--21-R8",
            "attributes": {
                "merchantReference": "MER000001",
                "returnReference": "DE--21-R8",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 9865
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R8"
            }
        },
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/returns"
    }
}
```

</details>

<details><summary>Response sample: retrieve all returns with details on return items</summary>

```json
{
    "data": [
        {
            "type": "returns",
            "id": "DE--21-R4",
            "attributes": {
                "merchantReference": "MER000002",
                "returnReference": "DE--21-R4",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 24899
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R4?include=return-items"
            },
            "relationships": {
                "return-items": {
                    "data": [
                        {
                            "type": "return-items",
                            "id": "b3c46290-2eaa-5b37-bba2-60171638fabb"
                        }
                    ]
                }
            }
        },
        {
            "type": "returns",
            "id": "DE--21-R3",
            "attributes": {
                "merchantReference": "MER000002",
                "returnReference": "DE--21-R3",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 24899
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R3?include=return-items"
            },
            "relationships": {
                "return-items": {
                    "data": [
                        {
                            "type": "return-items",
                            "id": "3071bef7-f26f-5be4-b9e7-bef1d670a94b"
                        }
                    ]
                }
            }
        },
        {
            "type": "returns",
            "id": "DE--21-R2",
            "attributes": {
                "merchantReference": "MER000001",
                "returnReference": "DE--21-R2",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 10580
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R2?include=return-items"
            },
            "relationships": {
                "return-items": {
                    "data": [
                        {
                            "type": "return-items",
                            "id": "717e94dd-7eb6-5a3f-837b-2ea745f6ae0a"
                        }
                    ]
                }
            }
        },
        {
            "type": "returns",
            "id": "DE--21-R1",
            "attributes": {
                "merchantReference": "MER000006",
                "returnReference": "DE--21-R1",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 3331
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R1?include=return-items"
            },
            "relationships": {
                "return-items": {
                    "data": [
                        {
                            "type": "return-items",
                            "id": "56c8d9c7-7ea5-59ec-83ca-a633b4c0ee5c"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/returns?include=return-items"
    },
    "included": [
        {
            "type": "return-items",
            "id": "b3c46290-2eaa-5b37-bba2-60171638fabb",
            "attributes": {
                "uuid": "b3c46290-2eaa-5b37-bba2-60171638fabb",
                "reason": "Wrong item",
                "orderItemUuid": "120b7a51-69e4-54b9-96a6-3b5eab0dfe7a"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R4/return-items/b3c46290-2eaa-5b37-bba2-60171638fabb"
            }
        },
        {
            "type": "return-items",
            "id": "3071bef7-f26f-5be4-b9e7-bef1d670a94b",
            "attributes": {
                "uuid": "3071bef7-f26f-5be4-b9e7-bef1d670a94b",
                "reason": "Wrong item",
                "orderItemUuid": "42de8c95-69a7-56b1-b43e-ce876ca79458"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R3/return-items/3071bef7-f26f-5be4-b9e7-bef1d670a94b"
            }
        },
        {
            "type": "return-items",
            "id": "717e94dd-7eb6-5a3f-837b-2ea745f6ae0a",
            "attributes": {
                "uuid": "717e94dd-7eb6-5a3f-837b-2ea745f6ae0a",
                "reason": "Damaged",
                "orderItemUuid": "c319e465-5160-59f1-a5b8-85073d1472b7"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R2/return-items/717e94dd-7eb6-5a3f-837b-2ea745f6ae0a"
            }
        },
        {
            "type": "return-items",
            "id": "56c8d9c7-7ea5-59ec-83ca-a633b4c0ee5c",
            "attributes": {
                "uuid": "56c8d9c7-7ea5-59ec-83ca-a633b4c0ee5c",
                "reason": "No longer needed",
                "orderItemUuid": "7be8d4ff-a41e-527f-adb5-077e6192062b"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R1/return-items/56c8d9c7-7ea5-59ec-83ca-a633b4c0ee5c"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample: retrieve all returns with the respective merchants included</summary>

```json
{
    "data": [
        {
            "type": "returns",
            "id": "DE--21-R9",
            "attributes": {
                "merchantReference": null,
                "returnReference": "DE--21-R9",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 1879
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R9"
            }
        },
        {
            "type": "returns",
            "id": "DE--21-R8",
            "attributes": {
                "merchantReference": "MER000001",
                "returnReference": "DE--21-R8",
                "store": "DE",
                "customerReference": "DE--21",
                "returnTotals": {
                    "refundTotal": 0,
                    "remunerationTotal": 9865
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R8"
            },
            "relationships": {
                "merchants": {
                    "data": [
                        {
                            "type": "merchants",
                            "id": "MER000001"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/access-tokens?include=merchants"
    },
    "included": [
        {
            "type": "merchants",
            "id": "MER000001",
            "attributes": {
                "merchantName": "Spryker",
                "merchantUrl": "/en/merchant/spryker",
                "contactPersonRole": "E-Commerce Manager",
                "contactPersonTitle": "Mr",
                "contactPersonFirstName": "Harald",
                "contactPersonLastName": "Schmidt",
                "contactPersonPhone": "+49 30 208498350",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png",
                "publicEmail": "info@spryker.com",
                "publicPhone": "+49 30 234567891",
                "description": "Spryker is the main merchant at the Demo Marketplace.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png",
                "deliveryTime": "1-3 days",
                "latitude": "13.384458",
                "longitude": "52.534105",
                "faxNumber": "+49 30 234567800",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>",
                    "dataPrivacy": "Spryker Systems GmbH values the privacy of your personal data."
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        }
    ]
}
```

</details>


| ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|
| merchantReference | String | Unique identifier of the merchant. |
| returnReference | String | Unique identifier of the return. |
| store | String | Store for which the return was created. |
| customerReference | String | Unique identifier of the customer who created the return. |
| returnTotals | Object | List of totals of the return. |
| refundTotal | Integer | Total refund amount. |
| remunerationTotal | Integer | Total remuneration amount. |

| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|---|---|---|---|
| return-items | uuid | String | Unique identifier of the returned item. |
| return-items | reason | String | Reason which the customer selected for the return. |
| return-items | orderItemUuid | String | Unique identifier of the order item. |

For the attributes of the other other included resources, see the following:
- [Retrieving marketplace orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/glue-api-retrieve-marketplace-orders.html)
- [Retrieving merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html)

## Retrieve a return

To retrieve a return, send the Request sample:

***
`GET` {% raw %}**/returns/{{returnID}}**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
|---|---|
| {% raw %}***{{returnID}}***{% endraw %} | Unique identifier of a return to retrieve. To get it [create a return](#create-a-return) or [retrieve returns](#retrieve-returns)|

## Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|---|---|---|---|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|---|---|---|
| offset | Offset of the order at which to begin the response. Works only together with `page[limit]`.  To work correctly, the value should be devisable by the value of `page[limit]`.  The default value is `0`. | From `0` to any. |
| limit | Maximum number of entries to return. Works only together with page[offset].  The default value is `10`. | From `1` to any. |
| include | Adds resource relationships to the request. | <ul><li>return-items</li><li>merchants</li></ul> |

| REQUEST | USAGE |
|---|---|
| `GET https://glue.mysprykershop.com/returns/DE--21-R9` | Retrieve a return with the ID `DE--21-R9` for sales order items. |
|  `GET https://glue.mysprykershop.com/returns/DE--21-R6` | Retrieve a return with the ID `DE--21-R6` for sales order items. |
| `GET https://glue.mysprykershop.com/returns/DE--21-R6?include=return-items` | Retrieve a return with the ID `DE--21-R6`, including the return items. |
| `GET https://glue.mysprykershop.com/returns/DE--21-R6?include=merchants` | Retrieve a return  with the ID `DE--21-R6` for merchant order items, including the respective merchants. |

### Response

<details><summary>Response sample: retrieve a return for a sales order item</summary>

```json
{
    "data": {
        "type": "returns",
        "id": "DE--21-R9",
        "attributes": {
            "merchantReference": null,
            "returnReference": "DE--21-R9",
            "store": "DE",
            "customerReference": "DE--21",
            "returnTotals": {
                "refundTotal": 0,
                "remunerationTotal": 1879
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/returns/DE--21-R9"
        }
    }
}
```

</details>

<details><summary>Response sample: retrieve a return for a merchant order item</summary>

```json
{
    "data": {
        "type": "returns",
        "id": "DE--21-R6",
        "attributes": {
            "merchantReference": "MER000001",
            "returnReference": "DE--21-R6",
            "store": "DE",
            "customerReference": "DE--21",
            "returnTotals": {
                "refundTotal": 7842,
                "remunerationTotal": 7842
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/returns/DE--21-R6"
        }
    }
}
```

</details>

<details><summary>Response sample: retrieve a return with the return items included</summary>

```json
{
    "data": {
        "type": "returns",
        "id": "DE--21-R4",
        "attributes": {
            "merchantReference": "MER000002",
            "returnReference": "DE--21-R4",
            "store": "DE",
            "customerReference": "DE--21",
            "returnTotals": {
                "refundTotal": 0,
                "remunerationTotal": 24899
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/returns/DE--21-R4?include=return-items"
        },
        "relationships": {
            "return-items": {
                "data": [
                    {
                        "type": "return-items",
                        "id": "b3c46290-2eaa-5b37-bba2-60171638fabb"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "return-items",
            "id": "b3c46290-2eaa-5b37-bba2-60171638fabb",
            "attributes": {
                "uuid": "b3c46290-2eaa-5b37-bba2-60171638fabb",
                "reason": "Wrong item",
                "orderItemUuid": "120b7a51-69e4-54b9-96a6-3b5eab0dfe7a"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/returns/DE--21-R4/return-items/b3c46290-2eaa-5b37-bba2-60171638fabb"
            }
        }
    ]
}
```

</details>

<details><summary>Response sample: retrieve a return with the details about merchants</summary>

```json
{
    "data": {
        "type": "returns",
        "id": "DE--21-R6",
        "attributes": {
            "merchantReference": "MER000001",
            "returnReference": "DE--21-R6",
            "store": "DE",
            "customerReference": "DE--21",
            "returnTotals": {
                "refundTotal": 7842,
                "remunerationTotal": 7842
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/returns/DE--21-R6?include=merchants"
        },
        "relationships": {
            "merchants": {
                "data": [
                    {
                        "type": "merchants",
                        "id": "MER000001"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "merchants",
            "id": "MER000001",
            "attributes": {
                "merchantName": "Spryker",
                "merchantUrl": "/en/merchant/spryker",
                "contactPersonRole": "E-Commerce Manager",
                "contactPersonTitle": "Mr",
                "contactPersonFirstName": "Harald",
                "contactPersonLastName": "Schmidt",
                "contactPersonPhone": "+49 30 208498350",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-logo.png",
                "publicEmail": "info@spryker.com",
                "publicPhone": "+49 30 234567891",
                "description": "Spryker is the main merchant at the Demo Marketplace.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/spryker-banner.png",
                "deliveryTime": "1-3 days",
                "latitude": "13.384458",
                "longitude": "52.534105",
                "faxNumber": "+49 30 234567800",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Spryker Systems GmbH<br><br>Julie-Wolfthorn-Straße 1<br>10115 Berlin<br>DE<br><br>Phone: +49 (30) 2084983 50<br>Email: info@spryker.com<br><br>Represented by<br>Managing Directors: Alexander Graf, Boris Lokschin<br>Register Court: Hamburg<br>Register Number: HRB 134310<br></p>",
                    "dataPrivacy": "Spryker Systems GmbH values the privacy of your personal data."
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        }
    ]
}
```

</details>

For the attributes, see [Retrieving returns](#retrieve-returns).
