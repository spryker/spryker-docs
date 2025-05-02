---
title: "Glue API: Retrieve merchants"
description: Learn how to retrieve merchants in your Spryker marketplace project via the Spryker Glue API
template: glue-api-storefront-guide-template
last_updated: Jan 12, 2024
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/merchants/retrieving-merchants.html
related:
  - title: Retrieving merchant opening hours
    link: docs/pbc/all/merchant-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-merchant-opening-hours.html
  - title: Retrieving merchant addresses
    link: docs/pbc/all/merchant-management/page.version/marketplace/manage-using-glue-api/glue-api-retrieve-merchant-addresses.html
---

Merchant is an individual or an organization selling products on the Marketplace. Every merchant has a profile page where the customer can check information like contact information, opening hours, and legal details.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see [Install the Marketplace Merchant Glue API](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-merchant-glue-api.html).

## Retrieve merchants

To retrieve all merchants, send the request:

---
`GET` **/merchants**

---

{% info_block warningBox "Note" %}

This endpoint returns only [active](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#merchant-statuses) merchants. To learn how you can activate a merchant in the Back Office, see [Edit merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants/edit-merchants.html).

{% endinfo_block %}


### Request

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| category-keys[] | Filters merchants by category keys. | {% raw %}{{category key}}{% endraw %} |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/merchants` | Retrieve all merchants. |
| `GET https://glue.mysprykershop.com/merchants?category-keys[]=demoshop&category-keys[]=notebooks` | Retrieve merchants with the `demoshop` and `notebooks` category keys assigned. |

### Response

<details><summary>Response sample: retrieve all merchants</summary>

```json
{
    "data": [
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
                },
                "categories": [
                    {
                        "categoryKey": "demoshop",
                        "name": "Demoshop"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000006"
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
                },
                "categories": [
                    {
                        "categoryKey": "notebooks",
                        "name": "Notebooks"
                    },
                    {
                        "categoryKey": "tablets",
                        "name": "Tablets"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001"
            }
        },
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
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000002"
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
                },
                "categories": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000005"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/merchants"
    }
}
```
</details>



<details><summary>Response sample: retrieve merchants by category keys</summary>

```json
{
    "data": [
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
                },
                "categories": [
                    {
                        "categoryKey": "demoshop",
                        "name": "Demoshop"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000006?category-keys[0]=demoshop&category-keys[1]=notebooks"
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
                },
                "categories": [
                    {
                        "categoryKey": "notebooks",
                        "name": "Notebooks"
                    },
                    {
                        "categoryKey": "tablets",
                        "name": "Tablets"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001?category-keys[0]=demoshop&category-keys[1]=notebooks"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/merchants?category-keys[0]=demoshop&category-keys[1]=notebooks"
    }
}
```
</details>

<a name="merchants-response-attributes"></a>


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| merchantName           | String   | Name of the merchant.                             |
| merchantUrl            | String   | Merchant's profile URL.                           |
| contactPersonRole      | String   | Role of the contact person.                       |
| contactPersonTitle     | String   | Salutation to use when addressing the contact person. |
| contactPersonFirstName | String   | Contact person's first name.                          |
| contactPersonLastName  | String   | Contact person's last name.                           |
| contactPersonPhone     | String   | Contact person's phone number.                        |
| logoUrl                | String   | Merchant's logo URL.                              |
| publicEmail            | String   | Merchant's public email address.                      |
| publicPhone            | String   | Merchant's public phone number.                       |
| description            | String   | Merchant's description.                           |
| bannerUrl              | String   | Merchant's banner URL.                            |
| deliveryTime           | String   | Average delivery time.                            |
| latitude               | String   | Merchant's latitude.                              |
| longitude              | String   | Merchant's longitude.                             |
| faxNumber              | String   | Merchant's fax number.                            |
| legalInformation       | Object   | List of legal information.                        |
| legalInformation.terms                  | String   | Merchant's terms and conditions. |
| legalInformation. cancellationPolicy     | String   | Merchant's cancellation policy.|
| legalInformation.imprint                | String   | Merchant's imprint information.|
| legalInformation.dataPrivacy            | String   | Merchant's data privacy conditions.|
| categories             | Array    | List of categories where the merchant belongs.    |
| categories.categoryKey            | String   | Category key used for the merchant.  |
| categories.name                   | String   | Name of the merchant category.

## Retrieve a merchant

To retrieve a merchant, send the request:

---
`GET` {% raw %}**/merchants/*{{merchantId}}***{% endraw %}

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchantId}}***{% endraw %} | Unique identifier of a merchant to retrieve. To get it, [retrieve all merchants](#retrieve-merchants). |

{% info_block warningBox "Note" %}

This endpoint returns only [active](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/marketplace-merchant-feature-overview/marketplace-merchant-feature-overview.html#merchant-statuses) merchants. To learn how you can activate a merchant in the Back Office, see [Edit merchants](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-in-the-back-office/manage-merchants/edit-merchants.html).

{% endinfo_block %}

### Request

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | `merchant-addresses`, `merchant-opening-hours` |

| USAGE | DESCRIPTION |
| -------------------- | ---------------------- |
| `GET https://glue.mysprykershop.com/merchants/MER000006` | Retrieve a merchant with the `MER000006` ID. |
| `GET https://glue.mysprykershop.com/merchants/MER000006?include=merchant-addresses,merchant-opening-hours` | Retrieve the merchant with the `MER000006` ID, including merchant addresses and opening hours. |

### Response

<details><summary>Response sample: retrieve the merchant</summary>

```json
{
    "data": {
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
            },
            "categories": [
                {
                    "categoryKey": "demoshop",
                    "name": "Demoshop"
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/merchants/MER000006"
        }
    }
}
```

</details>


<details><summary>Response sample: retrieve a merchant with merchant addresses and opening hours included</summary>

```json
{
    "data": {
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
            },
            "categories": [
                {
                    "categoryKey": "demoshop",
                    "name": "Demoshop"
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/merchants/MER000006?include=merchant-addresses,merchant-opening-hours"
        },
        "relationships": {
            "merchant-opening-hours": {
                "data": [
                    {
                        "type": "merchant-opening-hours",
                        "id": "MER000006"
                    }
                ]
            },
            "merchant-addresses": {
                "data": [
                    {
                        "type": "merchant-addresses",
                        "id": "MER000006"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "merchant-opening-hours",
            "id": "MER000006",
            "attributes": {
                "weekdaySchedule": [
                    {
                        "day": "MONDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "13:00:00.000000"
                    },
                    {
                        "day": "MONDAY",
                        "timeFrom": "14:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "TUESDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "WEDNESDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "THURSDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "FRIDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "SATURDAY",
                        "timeFrom": "07:00:00.000000",
                        "timeTo": "20:00:00.000000"
                    },
                    {
                        "day": "SUNDAY",
                        "timeFrom": null,
                        "timeTo": null
                    }
                ],
                "dateSchedule": [
                    {
                        "date": "2020-01-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "New Year's Day"
                    },
                    {
                        "date": "2020-04-10",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Good Friday"
                    },
                    {
                        "date": "2020-04-12",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Easter Sunday"
                    },
                    {
                        "date": "2020-04-13",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Easter Monday"
                    },
                    {
                        "date": "2020-05-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "May Day"
                    },
                    {
                        "date": "2020-05-21",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Ascension of Christ"
                    },
                    {
                        "date": "2020-05-31",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Whit Sunday"
                    },
                    {
                        "date": "2020-06-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Whit Monday"
                    },
                    {
                        "date": "2020-06-11",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Corpus Christi"
                    },
                    {
                        "date": "2020-10-03",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "Day of German unity"
                    },
                    {
                        "date": "2020-11-01",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "All Saints' Day"
                    },
                    {
                        "date": "2020-12-25",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "1st Christmas day"
                    },
                    {
                        "date": "2020-12-26",
                        "timeFrom": null,
                        "timeTo": null,
                        "note": "2nd Christmas day"
                    },
                    {
                        "date": "2021-11-28",
                        "timeFrom": "13:00:00.000000",
                        "timeTo": "18:00:00.000000",
                        "note": "Sunday Opening"
                    },
                    {
                        "date": "2021-12-31",
                        "timeFrom": "10:00:00.000000",
                        "timeTo": "17:00:00.000000",
                        "note": ""
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000006/merchant-opening-hours"
            }
        },
        {
            "type": "merchant-addresses",
            "id": "MER000006",
            "attributes": {
                "addresses": [
                    {
                        "countryName": null,
                        "address1": null,
                        "address2": null,
                        "address3": null,
                        "city": null,
                        "zipCode": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000006/merchant-addresses"
            }
        }
    ]
}
```
</details>

For the merchant attributes, see [Retrieve merchants](#merchants-response-attributes).

For the attributes of the included resources, see:

* [Retrieving merchant addresses](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchant-addresses.html#merchant-addresses-response-attributes).
* [Retrieving merchant opening hours](/docs/pbc/all/merchant-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-merchant-opening-hours.html#merchant-opening-hours-response-attributes).




## Other management options

Retrieve merchant information as a relationship when sending the following requests:

* [Retrieve an abstract product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-abstract-products.html#retrieve-an-abstract-product)
* [Retrieve a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-concrete-products.html#retrieve-a-concrete-product)
* [Retrieve a wishlist](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/marketplace/manage-using-glue-api/glue-api-manage-marketplace-wishlists.html#retrieve-a-wishlist)
* [Retrieve a product offer]
* [Retrieve marketplace orders](/docs/pbc/all/order-management-system/{{page.version}}/marketplace/glue-api-retrieve-marketplace-orders.html)

Search by merchants in the product catalog. For details, see [Searching the product catalog](/docs/pbc/all/search/{{page.version}}/marketplace/glue-api-search-the-product-catalog.html).
Resolve a search engine friendly URL of a merchant page. For details, see [Resolving search engine friendly URLs](/docs/dg/dev/glue-api/{{page.version}}/rest-api/marketplace-glue-api-resolve-search-engine-friendly-urls.html).


## Possible errors

For statuses, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
