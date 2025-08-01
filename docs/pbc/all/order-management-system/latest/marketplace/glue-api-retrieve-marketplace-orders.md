---
title: "Glue API: Retrieve Marketplace orders"
description: Retrieve information about Marketplace orders via Glue API for your Spryker Marketplace project.
template: glue-api-storefront-guide-template
last_updated: Nov 21, 2023
related:
  - title: Managing the returns
    link: docs/pbc/all/return-management/page.version/marketplace/glue-api-manage-marketplace-returns.html
---

Every registered customer can retrieve the list of orders for their account, as well as the detailed order information, including every step of the calculation and addresses used in the orders.

In your development, this resource can help you to:

- Make the order history available to customers.
- Make order details available to enable reordering functionality.

The **Marketplace Order Management API** lets you retrieve all orders made by a registered customer.


## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see [**Install the Order Management Glue API**](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-glue-api/install-the-order-management-glue-api.html)

## Retrieve all orders

To retrieve a list of all orders made by a registered customer, send the request:

***
`GET` **/orders**
***

### Request

| HEADER KEY  | HEADER VALUE | REQUIRED | DESCRIPTION                                                  |
| ------------- | ------------ | -------- | -------------------------------- |
| Authorization | string   | &check;  | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |

| QUERY PARAMETER | DESCRIPTION  | POSSIBLE VALUES |
| ---------------- | ---------------------- | ----------------------------- |
| offset | The offset of the order at which to begin the response. Works only together with page[limit]. To work correctly, the value should be devisable by the value of page[limit]. The default value is 0. | From `0` to any. |
| limit | The maximum number of entries to return. Works only together with page[offset]. The default value is 10. | From `1` to any. |
| include | Adds resource relationships to the request.  | merchants |

| REQUEST | USAGE  |
| --------------------- | ------------------ |
| `GET https://glue.mysprykershop.com/orders`  | Retrieve all orders.  |
| `GET https://glue.mysprykershop.com/orders?page[limit]=10`  | Retrieve 10 orders. |
| `GET https://glue.mysprykershop.com/orders?page[offset]=10&page[limit]=10` | Retrieve 10 orders starting from the eleventh order.  |
| `GET https://glue.mysprykershop.com/orders?page[offset]=20`  | Retrieve all orders starting from the twenty first order.  |
| `GET https://glue.mysprykershop.com/orders?include=merchants`  | Retrieve all orders with the merchants included. |

### Response


<details>
<summary>Response sample: retrieve all orders</summary>

```json
{
    "data": [
        {
            "type": "orders",
            "id": "DE--5",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "closed"
                ],
                "createdAt": "2020-10-19 15:26:37.868585",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 500,
                    "discountTotal": 9701,
                    "taxTotal": 10962,
                    "subtotal": 92013,
                    "grandTotal": 82812,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--5"
            }
        },
        {
            "type": "orders",
            "id": "DE--4",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "shipped"
                ],
                "createdAt": "2020-10-19 15:25:57.909985",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 500,
                    "discountTotal": 14841,
                    "taxTotal": 0,
                    "subtotal": 143412,
                    "grandTotal": 129071,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--4"
            }
        },
        {
            "type": "orders",
            "id": "DE--3",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "closed"
                ],
                "createdAt": "2020-10-19 15:25:14.861031",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 1500,
                    "discountTotal": 9147,
                    "taxTotal": 2893,
                    "subtotal": 91474,
                    "grandTotal": 83827,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--3"
            }
        },
        {
            "type": "orders",
            "id": "DE--2",
            "attributes": {
                "merchantReferences": [
                    "MER000002",
                    "MER000001"
                ],
                "itemStates": [
                    "new"
                ],
                "createdAt": "2020-10-19 15:16:21.879286",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 1590,
                    "discountTotal": 3959,
                    "taxTotal": 4957,
                    "subtotal": 39586,
                    "grandTotal": 37217,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--2"
            }
        },
        {
            "type": "orders",
            "id": "DE--1",
            "attributes": {
                "merchantReferences": [
                    "MER000001",
                    "MER000002",
                    "MER000006",
                    "MER000005"
                ],
                "itemStates": [
                    "confirmed"
                ],
                "createdAt": "2020-10-19 15:14:51.183582",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 4080,
                    "discountTotal": 11884,
                    "taxTotal": 12651,
                    "subtotal": 113944,
                    "grandTotal": 106140,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--1"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/orders"
    }
}
```

</details>

<details>
<summary>Response sample: retrieve all orders with the merchants included</summary>

```json
{
    "data": [
        {
            "type": "orders",
            "id": "DE--5",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "closed"
                ],
                "createdAt": "2020-10-19 15:26:37.868585",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 500,
                    "discountTotal": 9701,
                    "taxTotal": 10962,
                    "subtotal": 92013,
                    "grandTotal": 82812,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--5?include=merchants"
            }
        },
        {
            "type": "orders",
            "id": "DE--4",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "shipped"
                ],
                "createdAt": "2020-10-19 15:25:57.909985",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 500,
                    "discountTotal": 14841,
                    "taxTotal": 0,
                    "subtotal": 143412,
                    "grandTotal": 129071,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--4?include=merchants"
            }
        },
        {
            "type": "orders",
            "id": "DE--3",
            "attributes": {
                "merchantReferences": [],
                "itemStates": [
                    "closed"
                ],
                "createdAt": "2020-10-19 15:25:14.861031",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 1500,
                    "discountTotal": 9147,
                    "taxTotal": 2893,
                    "subtotal": 91474,
                    "grandTotal": 83827,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--3?include=merchants"
            }
        },
        {
            "type": "orders",
            "id": "DE--2",
            "attributes": {
                "merchantReferences": [
                    "MER000002",
                    "MER000001"
                ],
                "itemStates": [
                    "new"
                ],
                "createdAt": "2020-10-19 15:16:21.879286",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 1590,
                    "discountTotal": 3959,
                    "taxTotal": 4957,
                    "subtotal": 39586,
                    "grandTotal": 37217,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--2?include=merchants"
            },
            "relationships": {
                "merchants": {
                    "data": [
                        {
                            "type": "merchants",
                            "id": "MER000002"
                        },
                        {
                            "type": "merchants",
                            "id": "MER000001"
                        }
                    ]
                }
            }
        },
        {
            "type": "orders",
            "id": "DE--1",
            "attributes": {
                "merchantReferences": [
                    "MER000001",
                    "MER000002",
                    "MER000006",
                    "MER000005"
                ],
                "itemStates": [
                    "confirmed"
                ],
                "createdAt": "2020-10-19 15:14:51.183582",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 4080,
                    "discountTotal": 11884,
                    "taxTotal": 12651,
                    "subtotal": 113944,
                    "grandTotal": 106140,
                    "canceledTotal": 0,
                    "remunerationTotal": 0
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/orders/DE--1?include=merchants"
            },
            "relationships": {
                "merchants": {
                    "data": [
                        {
                            "type": "merchants",
                            "id": "MER000002"
                        },
                        {
                            "type": "merchants",
                            "id": "MER000001"
                        },
                        {
                            "type": "merchants",
                            "id": "MER000006"
                        },
                        {
                            "type": "merchants",
                            "id": "MER000005"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/orders?include=merchants"
    },
    "included": [
        {
            "type": "merchants",
            "id": "MER000002",
            "attributes": {
                "merchantName": "Video King",
                "merchantUrl": "/en/merchant/video-king",
                "contactPersonRole": "Country Manager DE",
                "contactPersonTitle": "Ms",
                "contactPersonFirstName": "Martha",
                "contactPersonLastName": "Farmer",
                "contactPersonPhone": "+31 123 345 678",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-logo.png",
                "publicEmail": "hi@video-king.nl",
                "publicPhone": "+31 123 345 777",
                "description": "Video King is a premium provider of video equipment. In business since 2010, we understand the needs of video professionals and enthusiasts and offer a wide variety of products with competitive prices. ",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png",
                "deliveryTime": "2-4 days",
                "latitude": "4.838470",
                "longitude": "51.558107",
                "faxNumber": "+31 123 345 733",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL <br><br>Phone: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Amsterdam<br>Register Number: 1234.4567<br></p>",
                    "dataPrivacy": "Video King values the privacy of your personal data."
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000002"
            }
        },
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
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        },
        {
            "type": "merchants",
            "id": "MER000006",
            "attributes": {
                "merchantName": "Sony Experts",
                "merchantUrl": "/en/merchant/sony-experts",
                "contactPersonRole": "Brand Manager",
                "contactPersonTitle": "Ms",
                "contactPersonFirstName": "Michele",
                "contactPersonLastName": "Nemeth",
                "contactPersonPhone": "030/123456789",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-logo.png",
                "publicEmail": "support@sony-experts.com",
                "publicPhone": "+49 30 234567691",
                "description": "Capture your moment with the best cameras from Sony. From pocket-size to professional-style, they all pack features to deliver the best quality pictures.Discover the range of Sony cameras, lenses and accessories, and capture your favorite moments with precision and style with the best cameras can offer.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/sonyexperts-banner.png",
                "deliveryTime": "1-3 days",
                "latitude": "11.547788",
                "longitude": "48.131058",
                "faxNumber": "+49 30 234567600",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Munich<br>Register Number: HYY 134306<br></p>",
                    "dataPrivacy": "Sony Experts values the privacy of your personal data."
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000006"
            }
        },
        {
            "type": "merchants",
            "id": "MER000005",
            "attributes": {
                "merchantName": "Budget Cameras",
                "merchantUrl": "/en/merchant/budget-cameras",
                "contactPersonRole": "Merchandise Manager",
                "contactPersonTitle": "Mr",
                "contactPersonFirstName": "Jason",
                "contactPersonLastName": "Weidmann",
                "contactPersonPhone": "030/123456789",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-logo.png",
                "publicEmail": "support@budgetcamerasonline.com",
                "publicPhone": "+49 30 234567591",
                "description": "DSLR and mirrorless cameras are by far the most popular with filmmakers on a tight budget when you can't afford multiple specialist cameras.Budget Cameras is offering a great selection of digital cameras with the lowest prices.",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/budgetcameras-banner.png",
                "deliveryTime": "2-4 days",
                "latitude": "10.004663",
                "longitude": "53.552463",
                "faxNumber": "+49 30 234567500",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Budget Cameras<br><br>Spitalerstraße 3<br>20095 Hamburg<br>DE<br><br>Phone: 030 1234567<br>Email: support@budgetcamerasonline.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Hamburg<br>Register Number: HXX 134305<br></p>",
                    "dataPrivacy": "Budget Cameras values the privacy of your personal data."
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000005"
            }
        }
    ]
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/orders-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/orders-response-attributes.md -->

For the attributes of the included resources, see [Retrieving merchants](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html).

## Retrieve an order

To retrieve detailed information about an order, send the request:

***
`GET` {% raw %}**/orders/*{{order_id}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION     |
| ------------------ | ------------------------------ |
| {% raw %}***{{order_id}}***{% endraw %}       | Unique identifier of an order. [Retrieve all orders](/docs/pbc/all/order-management-system/latest/base-shop/glue-api-retrieve-orders.html) to get it. |

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION |
| ------------- | ------------ | -------- | ---------------------- |
| Authorization | string       | &check;        | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html). |


| String parameter | Description     | Possible values    |
| ---------------- | -------------------- | --------------------- |
| include          | Adds resource relationships to the request. | order-shipments, concrete-products, abstract-products, merchants |

| REQUEST | USAGE |
| ----------------- | ------------------ |
| `GET https://glue.mysprykershop.com/orders/DE--6`   | Retrieve information about the `DE--6` order.  |
| `GET https://glue.mysprykershop.com/orders/DE--6?include=order-shipments` | Retrieve information about the order with the ID `DE--6` with order shipments included. |
| `GET https://glue.mysprykershop.com/orders/DE--3?include=merchants` | Retrieve order `DE--3` with the merchants included.|

### Response

<details>
<summary>Response sample: retrieve information about the order</summary>

```json
{
    "data": {
        "type": "orders",
        "id": "DE--6",
        "attributes": {
            "merchantReferences": [],
            "itemStates": [
                "payment pending"
            ],
            "createdAt": "2021-01-05 13:43:23.000000",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 1180,
                "discountTotal": 0,
                "taxTotal": 12173,
                "subtotal": 75064,
                "grandTotal": 76244,
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
                    "uuid": "3db99597-99a0-58a9-a0ea-696e8da0026e",
                    "isReturnable": false,
                    "idShipment": 11,
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
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Sony Xperia Z3 Compact",
                    "sku": "076_24394207",
                    "sumPrice": 35711,
                    "quantity": 1,
                    "unitGrossPrice": 35711,
                    "sumGrossPrice": 35711,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 35711,
                    "unitTaxAmountFullAggregation": 5702,
                    "sumTaxAmountFullAggregation": 5702,
                    "refundableAmount": 35711,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 35711,
                    "unitSubtotalAggregation": 35711,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 35711,
                    "sumPriceToPayAggregation": 35711,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "40274175-4398-5927-8980-48ead5053e69",
                    "isReturnable": false,
                    "idShipment": 12,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "White"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/24394207-3552.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 786,
                            "sumAmount": 786,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }     
                    ],                   
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
                    "idShipment": 11,
                    "idSalesExpense": 11
                },
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
                    "idShipment": 12,
                    "idSalesExpense": 12
                }
            ],
            "payments": [
                {
                    "amount": 76244,
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "Invoice"
                }
            ],
            "shipments": [],
            "calculatedDiscounts": [],
            "bundleItems": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--6"
        }
    }
}
```

</details>


<details>
<summary>Response sample: retrieve information about the order with order shipments included</summary>

```json
{
    "data": {
        "type": "orders",
        "id": "DE--6",
        "attributes": {
            "merchantReferences": [
                "MER000005",
                "MER000002"
            ],
            "itemStates": [
                "sent to merchant",
                "delivered"
            ],
            "createdAt": "2021-06-18 13:44:23.895154",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 2500,
                "discountTotal": 0,
                "taxTotal": 6976,
                "subtotal": 41191,
                "grandTotal": 43691,
                "canceledTotal": 0,
                "remunerationTotal": 0
            },
            "billingAddress": {
                "salutation": "Ms",
                "firstName": "Sonia",
                "middleName": null,
                "lastName": "Wagner",
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "company": "Spryker Systems GmbH",
                "city": "Berlin",
                "zipCode": "10247",
                "poBox": null,
                "phone": "4902890031",
                "cellPhone": null,
                "description": null,
                "comment": "",
                "email": null,
                "country": "Germany",
                "iso2Code": "DE"
            },
            "shippingAddress": {
                "salutation": "Ms",
                "firstName": "Sonia",
                "middleName": null,
                "lastName": "Wagner",
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "company": "Spryker Systems GmbH",
                "city": "Berlin",
                "zipCode": "10247",
                "poBox": null,
                "phone": "4902890031",
                "cellPhone": null,
                "description": null,
                "comment": "",
                "email": null,
                "country": "Germany",
                "iso2Code": "DE"
            },
            "items": [
                {
                    "merchantReference": "MER000005",
                    "state": "sent to merchant",
                    "name": "Sony Cyber-shot DSC-W830",
                    "sku": "018_21081477",
                    "sumPrice": 31140,
                    "quantity": 1,
                    "unitGrossPrice": 31140,
                    "sumGrossPrice": 31140,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 31140,
                    "unitTaxAmountFullAggregation": 4972,
                    "sumTaxAmountFullAggregation": 4972,
                    "refundableAmount": 31140,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 31140,
                    "unitSubtotalAggregation": 31140,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 31140,
                    "sumPriceToPayAggregation": 31140,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "349f3ce2-0396-5ed4-a2df-c9e053cb3350",
                    "isReturnable": false,
                    "idShipment": 11,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "productOfferReference": "offer66",
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Pink"
                        },
                        "image": "https://d2s0ynfc62ej12.cloudfront.net/b2c/21081477-Sony.jpg"
                    },
                    "salesOrderItemConfiguration": null,
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": "MER000002",
                    "state": "delivered",
                    "name": "Sony Cyber-shot DSC-W830",
                    "sku": "020_21081478",
                    "sumPrice": 10051,
                    "quantity": 1,
                    "unitGrossPrice": 10051,
                    "sumGrossPrice": 10051,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 10051,
                    "unitTaxAmountFullAggregation": 1605,
                    "sumTaxAmountFullAggregation": 1605,
                    "refundableAmount": 10051,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 10051,
                    "unitSubtotalAggregation": 10051,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 10051,
                    "sumPriceToPayAggregation": 10051,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "2b8ded00-2831-5557-83a2-3d29fc7c9ae8",
                    "isReturnable": true,
                    "idShipment": 12,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "productOfferReference": "offer27",
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Black"
                        },
                        "image": "https://d2s0ynfc62ej12.cloudfront.net/b2c/21081478-Sony.jpg"
                    },
                    "salesOrderItemConfiguration": null,
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                }
            ],
            "expenses": [
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Next-Day",
                    "sumPrice": 1500,
                    "unitGrossPrice": 1500,
                    "sumGrossPrice": 1500,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 240,
                    "sumTaxAmount": 240,
                    "unitPriceToPayAggregation": 1500,
                    "sumPriceToPayAggregation": 1500,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 12,
                    "idSalesExpense": 12
                },
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Premium",
                    "sumPrice": 1000,
                    "unitGrossPrice": 1000,
                    "sumGrossPrice": 1000,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 159,
                    "sumTaxAmount": 159,
                    "unitPriceToPayAggregation": 1000,
                    "sumPriceToPayAggregation": 1000,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 11,
                    "idSalesExpense": 11
                }
            ],
            "payments": [
                {
                    "amount": 43691,
                    "paymentProvider": "DummyMarketplacePayment",
                    "paymentMethod": "Marketplace Invoice"
                }
            ],
            "shipments": [],
            "calculatedDiscounts": [],
            "bundleItems": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--6"
        }
    }
}
```

</details>


<details>
<summary>Response sample: retrieve an with the merchants included</summary>

```json
{
    "data": {
        "type": "orders",
        "id": "DE--2",
        "attributes": {
            "merchantReferences": [
                "MER000002",
                "MER000001"
            ],
            "itemStates": [
                "new"
            ],
            "createdAt": "2020-10-19 15:16:21.879286",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 1590,
                "discountTotal": 3959,
                "taxTotal": 4957,
                "subtotal": 39586,
                "grandTotal": 37217,
                "canceledTotal": 0,
                "remunerationTotal": 0
            },
            "billingAddress": {
                "salutation": "Ms",
                "firstName": "Sonia",
                "middleName": null,
                "lastName": "Wagner",
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "company": "Spryker Systems GmbH",
                "city": "Berlin",
                "zipCode": "10247",
                "poBox": null,
                "phone": "4902890031",
                "cellPhone": null,
                "description": null,
                "comment": "",
                "email": null,
                "country": "Germany",
                "iso2Code": "DE"
            },
            "shippingAddress": null,
            "items": [
                {
                    "merchantReference": "MER000002",
                    "state": "new",
                    "name": "Toshiba CAMILEO S30",
                    "sku": "205_6350138",
                    "sumPrice": 11611,
                    "quantity": 1,
                    "unitGrossPrice": 11611,
                    "sumGrossPrice": 11611,
                    "taxRate": "7.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 11611,
                    "unitTaxAmountFullAggregation": 684,
                    "sumTaxAmountFullAggregation": 684,
                    "refundableAmount": 10450,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 11611,
                    "unitSubtotalAggregation": 11611,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 1161,
                    "sumDiscountAmountAggregation": 1161,
                    "unitDiscountAmountFullAggregation": 1161,
                    "sumDiscountAmountFullAggregation": 1161,
                    "unitPriceToPayAggregation": 10450,
                    "sumPriceToPayAggregation": 10450,
                    "taxRateAverageAggregation": "7.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "d5e948d9-f470-5b9a-b1c7-c1321761312a",
                    "isReturnable": false,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Grey"
                        },
                        "image": "https://images.icecat.biz/img/gallery_mediums/img_6350138_medium_1481633011_6285_13738.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 1161,
                            "sumAmount": 1161,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": "MER000001",
                    "state": "new",
                    "name": "Samsung Galaxy Note 4",
                    "sku": "061_24752508",
                    "sumPrice": 27975,
                    "quantity": 1,
                    "unitGrossPrice": 27975,
                    "sumGrossPrice": 27975,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 27975,
                    "unitTaxAmountFullAggregation": 4020,
                    "sumTaxAmountFullAggregation": 4020,
                    "refundableAmount": 25177,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 27975,
                    "unitSubtotalAggregation": 27975,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 2798,
                    "sumDiscountAmountAggregation": 2798,
                    "unitDiscountAmountFullAggregation": 2798,
                    "sumDiscountAmountFullAggregation": 2798,
                    "unitPriceToPayAggregation": 25177,
                    "sumPriceToPayAggregation": 25177,
                    "taxRateAverageAggregation": "19.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "dedc66da-9af9-504f-bdfc-e45b23118786",
                    "isReturnable": false,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Black"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/24752508-8866.jpg"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [
                        {
                            "unitAmount": 2798,
                            "sumAmount": 2798,
                            "displayName": "10% Discount for all orders above",
                            "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                            "voucherCode": null,
                            "quantity": 1
                        }
                    ],
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
                    "taxAmountAfterCancellation": null
                },
                {
                    "type": "SHIPMENT_EXPENSE_TYPE",
                    "name": "Air Sonic",
                    "sumPrice": 1000,
                    "unitGrossPrice": 1000,
                    "sumGrossPrice": 1000,
                    "taxRate": "19.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "canceledAmount": null,
                    "unitDiscountAmountAggregation": null,
                    "sumDiscountAmountAggregation": null,
                    "unitTaxAmount": 159,
                    "sumTaxAmount": 159,
                    "unitPriceToPayAggregation": 1000,
                    "sumPriceToPayAggregation": 1000,
                    "taxAmountAfterCancellation": null
                }
            ],
            "payments": [
                {
                    "amount": 37217,
                    "paymentProvider": "DummyMarketplacePayment",
                    "paymentMethod": "Marketplace Invoice"
                }
            ],
            "shipments": [],
            "calculatedDiscounts": {
                "10% Discount for all orders above": {
                    "unitAmount": null,
                    "sumAmount": 3959,
                    "displayName": "10% Discount for all orders above",
                    "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                    "voucherCode": null,
                    "quantity": 2
                }
            },
            "bundleItems": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--2?include=merchants"
        },
        "relationships": {
            "merchants": {
                "data": [
                    {
                        "type": "merchants",
                        "id": "MER000002"
                    },
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
            "id": "MER000002",
            "attributes": {
                "merchantName": "Video King",
                "merchantUrl": "/en/merchant/video-king",
                "contactPersonRole": "Country Manager DE",
                "contactPersonTitle": "Ms",
                "contactPersonFirstName": "Martha",
                "contactPersonLastName": "Farmer",
                "contactPersonPhone": "+31 123 345 678",
                "logoUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-logo.png",
                "publicEmail": "hi@video-king.nl",
                "publicPhone": "+31 123 345 777",
                "description": "Video King is a premium provider of video equipment. In business since 2010, we understand the needs of video professionals and enthusiasts and offer a wide variety of products with competitive prices. ",
                "bannerUrl": "https://d2s0ynfc62ej12.cloudfront.net/merchant/videoking-banner.png",
                "deliveryTime": "2-4 days",
                "latitude": "4.838470",
                "longitude": "51.558107",
                "faxNumber": "+31 123 345 733",
                "legalInformation": {
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to let us deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it's not obligatory. To meet the withdrawal deadline, it's sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Video King<br><br>Gilzeweg 24<br>4854SG Bavel<br>NL <br><br>Phone: +31 123 45 6789<br>Email: hi@video-king.nl<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Amsterdam<br>Register Number: 1234.4567<br></p>",
                    "dataPrivacy": "Video King values the privacy of your personal data."
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000002"
            }
        },
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
                }
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        }
    ]
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/orders-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/orders-response-attributes.md -->

{% include /pbc/all/glue-api-guides/latest/order-shipments-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/order-shipments-response-attributes.md -->


For the attributes of other included resources, see [Retrieving merchants](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html).
