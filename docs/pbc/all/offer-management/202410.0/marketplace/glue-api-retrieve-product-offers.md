---
title: "Glue API: Retrieve product offers"
description: Learn how to retrieve Spryker Marketplace product offers via the Spryker API for your Marketplace projects.
template: glue-api-storefront-guide-template
last_updated: Nov 21, 2023
related:
  - title: Retrieving product offer prices
    link: docs/pbc/all/price-management/latest/marketplace/glue-api-retrieve-product-offer-prices.html
  - title: Retrieving product offer availabilities
    link: docs/pbc/all/warehouse-management-system/latest/marketplace/glue-api-retrieve-product-offer-availability.html
---

Product offers let different merchants sell the same product on the Marketplace. Product offers are created per concrete products, and you can get the offer information via retrieving the product information.

In your development, product offers API can help you to retrieve relevant extended information for product offers.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

- [Install the Marketplace Product Offer Glue API](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html)
- [Install the Marketplace Product Offer Prices Glue API](/docs/pbc/all/price-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)
- [Install the Marketplace Product Offer Volume Prices Glue API](/docs/pbc/all/price-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)

## Retrieve a product offer

To retrieve the product offers, send the request:

---
`GET` {% raw %}**/product-offers/*{{offerId}}***{% endraw %}

---

| PATH PARAMETER | DESCRIPTION |
| ------------------ | ---------------------- |
| {% raw %}***{{offerId}}***{% endraw %} | Unique identifier of a product offer to retrieve the availability of. To get it, [retrieve the offers of a concrete product](/docs/pbc/all/product-information-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-product-offers-of-concrete-products.html). |

<a name="product-offer-included-resources"></a>

### Request

| QUERY PARAMETER | DESCRIPTION      | EXEMPLARY VALUES       |
| -------------------- | ----------------- | ---------------- |
| include          | Adds resource relationships to the request. | <ul><li>product-offer-availabilities</li><li>product-offer-prices</li><li>merchants</li></ul> |

| REQUEST | USAGE     |
| ---------- | ----------- |
| `GET https://glue.mysprykershop.com/product-offers/offer56`| Retrieve information about an offer with the `offer56` ID.   |
| `GET https://glue.mysprykershop.com/product-offers/offer78?product-offer-prices` | Retrieve information about the offer with `offer78` ID with the product offer prices. |
| `GET https://glue.mysprykershop.com/product-offers/offer101?product-offer-availabilities` | Retrieve the product offer with the `offer101` ID with the product offer availability. |
| `GET https://glue.mysprykershop.com/product-offers/offer101?merchants` | Retrieve the product offer with the `offer101` ID, including the merchant it belongs to. |

### Response

<details>
<summary>Response sample: retrieve an offer</summary>

```json
{
    "data": {
        "type": "product-offers",
        "id": "offer56",
        "attributes": {
            "merchantSku": null,
            "merchantReference": "MER000005",
            "isDefault": false
        },
        "links": {
            "self": "https://glue.mysprykershop.comm/product-offers/offer56"
        }
    }
}
```

</details>

<details>
<summary>Response sample: retrieve an offer with product offer prices included</summary>

```json
{
    "data": {
        "type": "product-offers",
        "id": "offer78",
        "attributes": {
            "merchantSku": null,
            "merchantReference": "MER000005",
            "isDefault": true
        },
        "links": {
            "self": "https://glue.mysprykershop.com/product-offers/offer78"
        },
        "relationships": {
            "product-offer-prices": {
                "data": [
                    {
                        "type": "product-offer-prices",
                        "id": "offer78"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-offer-prices",
            "id": "offer78",
            "attributes": {
                "price": 40522,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 40522,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"                        
                    },
                        "volumePrices": [
                            {
                                "grossAmount": 38400,
                                "netAmount": 39100,
                                "quantity": 3
                            }

                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-offers/offer78/product-offer-prices"
            }
        }
    ]
}
```

</details>

<details>
<summary>Response sample: retrieve an offer with product offer availabilities included</summary>

```json
{
    "data": {
        "type": "product-offers",
        "id": "offer101",
        "attributes": {
            "merchantSku": null,
            "merchantReference": "MER000006",
            "isDefault": false
        },
        "links": {
            "self": "https://glue.mysprykershop.comm/product-offers/offer101?include=product-offer-prices,product-offer-availabilities"
        },
        "relationships": {
            "product-offer-availabilities": {
                "data": [
                    {
                        "type": "product-offer-availabilities",
                        "id": "offer101"
                    }
                ]
           }
        }
    },
    "included": [
        {
            "type": "product-offer-availabilities",
            "id": "offer101",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "https://glue.mysprykershop.comm/product-offers/offer101/product-offer-availabilities"
            }

        }
    ]
}
```

</details>

<details>
<summary>Response sample: retrieve an offer with merchant information included</summary>

```json
{
    "data": {
        "type": "product-offers",
        "id": "offer101",
        "attributes": {
            "merchantSku": null,
            "merchantReference": "MER000006",
            "isDefault": false
        },
        "links": {
            "self": "https://glue.mysprykershop.comm/product-offers/offer101?include=product-offer-prices,product-offer-availabilities,merchants"
        },
        "merchants": {
                "data": [
                    {
                        "type": "merchants",
                        "id": "MER000006"
                    }
                ]
        }
    },
    "included": [
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
                "self": "https://glue.mysprykershop.comm/merchants/MER000006"
            }
        }
    ]
}
```

</details>

<a name="product-offers-response-attributes"></a>

| ATTRIBUTE   | TYPE | DESCRIPTION      |
| --------------- | -------- | -------------------- |
| merchantSku       | String   | The merchant's unique identifier of the product offer. |
| merchantReference | String   | Unique identifier of the merchant. |
| isDefault         | Boolean  | Defines if the product offer is [default](/docs/pbc/all/offer-management/latest/marketplace/marketplace-product-offer-feature-overview.html#product-offers-on-the-product-details-page) for the concrete product. |

{% include pbc/all/glue-api-guides/latest/product-offer-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-offer-availabilities-response-attributes.md -->

For the response attributes of the other included resources, see the following:
- [Retrieve product offer prices](/docs/pbc/all/price-management/latest/marketplace/glue-api-retrieve-product-offer-prices.html#product-offer-prices-response-attributes)
- [Retrieving merchants](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html#merchants-response-attributes)





## Other management options

You can use the product offers resource as follows:

- [Retrieve product offers of a concrete product](/docs/pbc/all/product-information-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-product-offers-of-concrete-products.html)
- Add product offers to a guest cart—[Creating a guest cart](/docs/pbc/all/cart-and-checkout/latest/marketplace/manage-using-glue-api/guest-carts/manage-guest-carts.html#retrieve-a-guest-cart).
- Retrieve information for the product offers in a guest cart—[Retrieving a guest cart](/docs/pbc/all/cart-and-checkout/latest/marketplace/manage-using-glue-api/guest-carts/manage-guest-carts.html#retrieve-a-guest-cart).
- Add product offers to a registered user's cart—[Adding items to a cart of a registered user](/docs/pbc/all/cart-and-checkout/latest/marketplace/manage-using-glue-api/carts-of-registered-users/manage-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart).
- Retrieve information for the product offers in registered users' carts—[Retrieving all carts](/docs/pbc/all/cart-and-checkout/latest/marketplace/manage-using-glue-api/carts-of-registered-users/manage-carts-of-registered-users.html#retrieve-registered-users-carts).

## Possible errors

| CODE | DESCRIPTION |
| - | -  |
| 3701     | Product offer was not found. |
| 3702     | Product offer ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
