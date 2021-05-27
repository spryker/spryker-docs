---
title: Retrieving product offers
description: Retrieve Marketplace product offers via API
template: glue-api-storefront-guide-template
---

{% info_block warningBox "Note" %}

This resource is available only in case you have upgraded your shop to the Marketplace provided by Spryker.

{% endinfo_block %}

Product offers allow different merchants to sell the same product on the Marketplace. Product offers are created per concrete products, and you can get the offer information via retrieving the product information.

In your development, product offers API can help you to retrieve relevant extended information for product offers.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [GLUE API: Merchant Offers feature integration](/docs/marketplace/dev/feature-integration-guides/{{ page.version }}/glue/marketplace-product-offer-feature-integration.html).

## Retrieve product offers

To retrieve the product offers, send the request:

---
GET **/product-offers/{% raw %}*{{offerId}}*{% endraw %}**

---

| PATH PARAMETER| DESCRIPTION |
| ------------------ | ------------------------------------------------------------ |
| {% raw %}***{{offerId}}***{% endraw %} | Unique identifier of a product offer. You can get it in response when retrieving the offers available for the product concrete. |

### Request

| QUERY PARAMETER | DESCRIPTION      | EXEMPLARY VALUES       |
| -------------------- | ----------------- | ---------------- |
| include          | Adds resource relationships to the request. | <ul><li>product-offer-availabilities</li><li>product-offer-prices</li><li>merchants</li> |


| REQUEST | USAGE     |
| ---------- | ----------- |
| `GET https://glue.mysprykershop.com/product-offers/offer56`| Get information about the offer56.   |
| `GET https://glue.mysprykershop.com/product-offers/offer101?product-offer-prices,product-offer-availabilities,merchants` | Get information about the offer101 with the details on product offer prices and product offer availability and merchants included. |

### Response

<details>
<summary markdown='span'>Response sample</summary>

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
            "self": "http://glue.mysprykershop.com/product-offers/offer56"
        }
    }
}
```
</details>

<details>
<summary markdown='span'>Response sample with product offer prices, product offer availabilities, and merchant information</summary>

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
            "self": "http://glue.mysprykershop.com/product-offers/offer56"
        }
    }
}
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
            "self": "http://glue.mysprykershop.com/product-offers/offer101?include=product-offer-prices,product-offer-availabilities,merchants"
        },
        "relationships": {
            "product-offer-availabilities": {
                "data": [
                    {
                        "type": "product-offer-availabilities",
                        "id": "offer101"
                    }
                ]
            },
            "product-offer-prices": {
                "data": [
                    {
                        "type": "product-offer-prices",
                        "id": "offer101"
                    }
                ]
            },
            "merchants": {
                "data": [
                    {
                        "type": "merchants",
                        "id": "MER000006"
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
                "self": "http://glue.mysprykershop.com/product-offers/offer101/product-offer-availabilities"
            }
        },
        {
            "type": "product-offer-prices",
            "id": "offer101",
            "attributes": {
                "price": 4165,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 4165,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 4420,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-offers/offer101/product-offer-prices"
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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
                    "imprint": "<p>Sony Experts<br><br>Matthias-Pschorr-Straße 1<br>80336 München<br>DE<br><br>Phone: 030 1234567<br>Email: support@sony-experts.com<br><br>Represented by<br>Managing Director: Max Mustermann<br>Register Court: Munich<br>Register Number: HYY 134306<br></p>",
                    "dataPrivacy": "Sony Experts values the privacy of your personal data."
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/merchants/MER000006"
            }
        }
    ]
}
```
</details>

<a name="product-offers-response-attributes"></a>

**General product offer information**

| ATTRIBUTE   | TYPE | DESCRIPTION      |
| --------------- | -------- | -------------------- |
| merchantSku       | String   | SKU a merchant uses to identify the offer. |
| merchantReference | String   | Merchant reference assigned to every merchant. |
| isDefault         | Boolean  | Defines whether the Product Offer is default for the concrete product. |

**Product offer availability information**

| ATTRIBUTE  | TYPE | DESCRIPTION |
| ----------------- | -------- | ------------------------ |
| isNeverOutOfStock | boolean  | Boolean to show if this is an item that is never out of stock. |
| availability  | boolean  | Boolean to inform you about availability.    |
| quantity          | integer  | Available stock.  |

**Product offer prices information**

| ATTRIBUTE  | TYPE | DESCRIPTION |
| --------------- | -------- | -------------------------------------- |
| price           | Integer  | Price to pay for the product in cents. |
| priceTypeName   | String   | Price type.                            |
| netAmount       | Integer  | Net price in cents.                    |
| grossAmount     | Integer  | Gross price in cents.                  |
| currency.code   | String   | Currency code.                         |
| currency.name   | String   | Currency name.                         |
| currency.symbol | String   | Currency symbol.                       |

**Merchant information**

| ATTRIBUTE  | TYPE | DESCRIPTION |
| ----------------- | -------- | ---------------------- |
| merchantName           | String   | Merchant’s name. |
| merchantUrl            | String   | Merchant’s profile URL. |
| contactPersonRole      | String   | Role of the contact person.  |
| contactPersonTitle     | String   | Salutation to use when addressing the contact person. |
| contactPersonFirstName | String   | Contact person’s first name. |
| contactPersonLastName  | String   | Contact person’s last name.  |
| contactPersonPhone     | String   | Contact person’s phone number. |
| logoUrl                | String   | Merchant’s logo URL.   |
| publicEmail            | String   | Merchant’s public email address.  |
| publicPhone            | String   | Merchant’s public phone number.  |
| description            | String   | Merchant’s description.  |
| bannerUrl              | String   | Merchant’s banner URL. |
| deliveryTime           | String   | Average delivery time.  |
| latitude               | String   | Merchant’s latitude.|
| longitude              | String   | Merchant’s longitude.  |
| faxNumber              | String   | Merchant’s fax number.  |
| legalInformation       | Object   | List of legal information. |
| terms                  | String   | Merchant’s terms and conditions.  |
| cancellationPolicy     | String   | Merchant’s cancellation policy.  |
| imprint                | String   | Merchant’s imprint information.  |
| dataPrivacy            | String   | Merchant’s data privacy conditions. |


## Retrieve product offer availability

To retrieve the product offer availability, send the request:

------

GET **/product-offers/{% raw %}*{{offerId}}*{% endraw %}/product-offer-availabilities**

------

| PATH PARAMETER | DESCRIPTION |
| ------------------ | ---------------------- |
| {% raw %}***{{offerId}}***{% endraw %} | Unique identifier of a product offer. You can get it in response when retrieving the offers available for the product concrete. |

### Request

Request sample: `https://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities`

### Response

Response sample:

```json
{
    "data": [
        {
            "type": "product-offer-availabilities",
            "id": "offer56",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities"
    }
}
```

Find all the related attribute descriptions in [Retrieve product offers](#retrieve-product-offers).

## Retrieving product offer prices

To retrieve the product offer prices, send the request:

---
GET **/product-offers/{% raw %}*{{offerID}}*{% endraw %}/product-offer-prices**

---

| PATH PARAMETER | DESCRIPTION |
| ------------------ | ------------------------------------------------------------ |
| {% raw %}***{{offerID}}***{% endraw %} | Unique identifier of a product offer. You can get it in response when retrieving the offers available for the product concrete. |

### Request

Request sample: `GET http://glue.mysprykershop.com/product-offers/offer54/product-offer-prices`

### Response

Response sample:

```json
{
    "data": [
        {
            "type": "product-offer-prices",
            "id": "offer54",
            "attributes": {
                "price": 31050,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 31050,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 31320,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-offers/offer54/product-offer-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/product-offers/offer54/product-offer-prices"
    }
}
```

Find all the related attribute descriptions in [Retrieve product offers](#retrieve-product-offers).

## Other management options

You can use the product offers resource as follows:

- Retrieve information about the existing product offers of a concrete product - [Retrieve Product Offers](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/retrieving-product-offers.html)
- Add product offers to a guest cart—[Creating a guest cart](/docs/marketplace/dev/glue-api-guides/202106.0/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart).
- Retrieve information for the product offers in a guest cart—[Retrieving a guest cart](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/guest-carts/managing-guest-carts.html#retrieve-a-guest-cart).
- Add product offers to a registered user's cart—[Adding items to a cart of a registered user](/docs/marketplace/dev/glue-api-guides/{{ page.version }}/carts-of-registered-users/managing-items-in-carts-of-registered-users.html#add-an-item-to-a-registered-users-cart).
- Retrieve information for the product offers in registered users' carts—[Retrieving all carts](/docs/marketplace/dev/glue-api-guides/{{ page.version }}//carts-of-registered-users/managing-carts-of-registered-users.html#retrieve-registered-users-carts).

## Possible errors

| CODE | DESCRIPTION |
| - | -  |
| 3701     | Product offer was not found. |
| 3702     | Product offer ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
