---
title: Retrieving merchant information 
summary: "Learn how to manage merchant information via the Spryker Glue API."
---

Merchant is the individual or an organization selling products on the Marketplace. Every Merchant has a profile page where the customer can check contact information, opening hours, legal details, etc.
In your development, the Merchant API will help you perform the following tasks:

* Retrieve the profile information of a specific Merchant
* Retrieve Merchant’s Addresses
* Retrieve Merchant’s Opening Hours

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see (TODO: Link to IG, when available).

## Retrieve information about all merchants

To retrieve information about all the active merchants, send the request:
***
`GET` **/merchants/**
***
### Request

| Query prameter | Description | Examlary values |
| --- | --- | --- |
| category-keys[] | Category key that is assigned to a merchant. | {{category key}} |

| Request | Usage |
| --- | --- |
| `GET https://glue.mysprykershop.com/merchants` | Retrieve all active merchants. |
| `GET https://glue.mysprykershop.com/merchants?category-keys[]=demoshop&category-keys[]=notebooks` | Retrieve merchants with multiple category keys. |

### Response

Response sample - retrieve all active merchants

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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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



Response sample - retrieve merchants with multiple category keys

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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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
                    "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                    "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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


| Attribute | Type | Description |
| --- | --- | --- |
| merchantName           | String   | The name of the Merchant.                             |
| merchantUrl            | String   | The Merchant’s profile URL.                           |
| contactPersonRole      | String   | The role of the contact person.                       |
| contactPersonTitle     | String   | Salutation to use when addressing the contact person. |
| contactPersonFirstName | String   | Contact person’s first name.                          |
| contactPersonLastName  | String   | Contact person’s last name.                           |
| contactPersonPhone     | String   | Contact person’s phone number.                        |
| logoUrl                | String   | The Merchant’s logo URL.                              |
| publicEmail            | String   | Merchant’s public email address.                      |
| publicPhone            | String   | Merchant’s public phone number.                       |
| description            | String   | The Merchant’s description.                           |
| bannerUrl              | String   | The Merchant’s banner URL.                            |
| deliveryTime           | String   | The average delivery time.                            |
| latitude               | String   | The Merchant’s latitude.                              |
| longitude              | String   | The Merchant’s longitude.                             |
| faxNumber              | String   | Merchant’s fax number.                                |
| legalInformation       | Object   | List of legal information.                            |
| terms                  | String   | Merchant’s terms and conditions.                      |
| cancellationPolicy     | String   | Merchant’s cancellation policy.                       |
| imprint                | String   | Merchant’s imprint information.                       |
| dataPrivacy            | String   | Merchant’s data privacy conditions.                   |
| categories             | Array    | List of categories where the merchant belongs.        |
| categoryKey            | String   | Category key used for Merchant.                       |
| name                   | String   | Name of the merchant category. 

## Retrieve profile information for the specific merchant

To get the details of a specific merchant, send the request:
***
`GET` **/merchants/*{{merchantId}}***
***

| Path prameter | Description |
| --- | --- |
| *{{merchantId}}* | Merchant Reference assigned to every Merchant. |

### Request

| Query prameter | Description | Examlary values |
| --- | --- | --- |
| include | Adds resource relationships to the request. | merchant-addresses, merchant-opening-hours |

| Usage     | Description   |
| -------------------- | ---------------------- |
| `GET http://glue.mysprykershop.com/merchants/MER000006`        | Retrieve information about merchant MER000006                |
| `GET http://glue.mysprykershop.com/merchants/MER000006?include=merchant-addresses,merchant-opening-hours` | Retrieve information about merchant MER000006 with the merchant addresses and opening hours included. |

### Response

Response sample with specific merchant information

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
                "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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


Response sample with merchant addresses and opening hours</summary>

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
                "terms": "<p><span style=\"font-weight: bold;\">General Terms</span><br><br>(1) This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website. <br><br>(2) We do not collect information from visitors of our site or other details to help you with your experience.<br><br><span style=\"font-weight: bold;\">Using your Information</span><br><br>We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways: <br><br>To personalize user's experience and to allow us to deliver the type of content and product offerings in which you are most interested.<br><br><span style=\"font-weight: bold;\">Protecting visitor information</span><br><br>Our website is scanned on a regular basis for security holes and known vulnerabilities in order to make your visit to our site as safe as possible. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential. In addition, all sensitive/credit information you supply is encrypted via Secure Socket Layer (SSL) technology.</p>",
                "cancellationPolicy": "You have the right to withdraw from this contract within 14 days without giving any reason. The withdrawal period will expire after 14 days from the day on which you acquire, or a third party other than the carrier and indicated by you acquires, physical possession of the last good. You may use the attached model withdrawal form, but it is not obligatory. To meet the withdrawal deadline, it is sufficient for you to send your communication concerning your exercise of the right of withdrawal before the withdrawal period has expired.",
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


For the merchant attributes, see Retrieving all merchants.

For details on the attributes of the included resources `merchant-addresses` and `merchant-opening-hours`, see:

* Retrieving merchant addresses
* Retrieving merchant opening hours

## Retrieve merchant addresses

To retrieve merchant addresses, send the request:

***
`GET` **/merchants/*{{merchantId}}*/merchant-addresses**
***

| Path Parameter| Description  |
| ---------------- | ----------------------- |
| *{{merchantId}}*     | Merchant Reference assigned to every Merchant. |

### Request

Request sample: `GET http://glue.mysprykershop.com/merchants/MER000001/merchant-addresses`

### Response


Response sample - retrieve merchant addresses

```json
{
    "data": [
        {
            "type": "merchant-addresses",
            "id": "MER000001",
            "attributes": {
                "addresses": [
                    {
                        "countryName": "CountryName",
                        "address1": "address1",
                        "address2": "address2",
                        "address3": null,
                        "city": "City",
                        "zipCode": null,
                        "email": null
                    },
                    {
                        "countryName": "CountryName2",
                        "address1": "address3",
                        "address2": "address4",
                        "address3": null,
                        "city": "City2",
                        "zipCode": null,
                        "email": null
                    },
                    {
                        "countryName": "Germany",
                        "address1": "Caroline-Michaelis-Straße",
                        "address2": "8",
                        "address3": "",
                        "city": "Berlin",
                        "zipCode": "10115",
                        "email": null
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/merchants/MER000001/merchant-addresses"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/merchants/MER000001/merchant-addresses"
    }
}
```


| Attribute | Type | Description  |
| ------------- | -------- | --------------- |
| addresses       | Array    | List of Merchant Addresses information. |
| countryName     | String   | The name of the country.                |
| address1        | String   | The 1st line of the Merchant Address.   |
| address2        | String   | The 2nd line of the Merchant Address.   |
| address3        | String   | The 3rd line of the Merchant Address.   |
| city            | String   | The name of the city.                   |
| zipCode         | String   | The ZIP code.                           |
| email           | String   | The email address.                      |

## Retrieve merchant opening hours

To retrieve a merchant opening hours, send the request:
***
`GET` **/merchants/*{{merchantId}}*/merchant-opening-hours**
***

| Path Parameter | Description    |
| ------------ | ----------- |
| *{{merchantId}}*  | Merchant Reference assigned to every Merchant. |

### Request

Request sample: `GET http://glue.mysprykershop.com/merchants/MER000001/merchant-opening-hours`

### Response

Response sample - retrieve merchant opening hours

```json
{
    "data": [
        {
            "type": "merchant-opening-hours",
            "id": "MER000001",
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
                "self": "http://glue.mysprykershop.com/merchants/MER000001/merchant-opening-hours"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/merchants/MER000001/merchant-opening-hours"
    }
}
```


| Attribute| Description |
| --------------- | --------------------- |
| weekdaySchedule | An array of the schedule for weekdays. The following information is available for each weekday:<ul><li>`day`- the name of the day.</li><li>`timeFrom` - the time when the Merchant starts working on a usual day.</li><li>`timeTo` - the time when the Merchant stops working on a usual day.</li></ul> |
| dateSchedule    | An array of the schedule for special working days, e.g. holidays. Each day exposes the following information:<ul><li>`date` - specifies the date.</li><li>`timeFrom` - the time when the Merchant starts working on holiday.</li><li>`timeTo` - the time when the Merchant stops working on holiday.</li><li>`note` - the name of the holiday or special note.</li>|

## Possible Errors

For statuses, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors){target="_blank"}.