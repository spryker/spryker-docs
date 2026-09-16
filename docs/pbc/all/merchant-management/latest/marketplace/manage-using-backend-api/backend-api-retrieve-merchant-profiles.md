---
title: "Backend API: Retrieve merchant profiles"
description: Learn how a merchant user retrieves the profile of their merchant and how a Back Office user retrieves any merchant profile using the Spryker Backend API.
last_updated: Sep 16, 2026
template: default
related:
  - title: Authenticate as a merchant user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Update merchant profiles
    link: docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-update-merchant-profiles.html
---

The Backend API exposes merchant profiles through two resources, one per audience:

- `merchant-profile`: a merchant user retrieves the profile of the merchant they are assigned to. The merchant is resolved from the access token, so the endpoint carries no identifier. The resource covers what the merchant manages on the Merchant Portal profile page, including the merchant details, the Storefront URLs, the address, and the localized texts.
- `merchant-profiles`: a Back Office user retrieves the profile of any merchant by its merchant reference.

The two audiences are strictly separated. A merchant user calling the `merchant-profiles` endpoint, or a Back Office user calling the `merchant-profile` endpoint, gets a `403` response.

## Installation

The endpoints are provided by the `MerchantProfile` module and require the API Platform integration of the Backend API. For installation instructions, see [Install the Merchant Profile Backend API](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-profile-backend-api.html).

## Retrieve the profile of your merchant

To retrieve the profile of the merchant the authenticated merchant user is assigned to, send the request:

---
`GET` **/merchant-profile**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the merchant user to send requests to protected resources. Get it by [authenticating as a merchant user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html). |

The merchant of the authenticated user must be approved. A merchant user of a merchant that is still waiting for approval gets a `403` response, as in the Merchant Portal.

Request sample: retrieve the profile of your merchant

`GET https://glue-backend.mysprykershop.com/merchant-profile`

### Response

`merchantUrls` and `localizedAttributes` contain one entry per locale of the stores listed in `stores`, with `null` values where a URL or text is not set.

<details><summary>Response sample: retrieve the profile of your merchant</summary>

```json
{
    "data": {
        "type": "merchant-profile",
        "id": "MER000001",
        "attributes": {
            "merchantReference": "MER000001",
            "name": "Spryker",
            "email": "spryker@spryker.com",
            "registrationNumber": "HRB 134310",
            "isActive": true,
            "isOpenForRelationRequest": true,
            "stores": [
                "DE",
                "AT"
            ],
            "merchantUrls": [
                {
                    "localeName": "de_DE",
                    "url": "/de/merchant/spryker"
                },
                {
                    "localeName": "en_US",
                    "url": "/en/merchant/spryker"
                }
            ],
            "contactPersonTitle": "Mr",
            "contactPersonFirstName": "Harald",
            "contactPersonLastName": "Schmidt",
            "contactPersonRole": "E-Commerce Manager",
            "contactPersonPhone": "+49 30 208498350",
            "publicEmail": "info@spryker.com",
            "publicPhone": "+49 30 208498350",
            "faxNumber": "+49 30 208498351",
            "logoUrl": "https://images.example.com/merchants/spryker/logo.png",
            "address": {
                "countryIso2Code": "DE",
                "zipCode": "10117",
                "city": "Berlin",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": null,
                "latitude": "52.5290",
                "longitude": "13.3846"
            },
            "localizedAttributes": [
                {
                    "localeName": "de_DE",
                    "description": "Spryker ist der führende Anbieter für Unterhaltungselektronik.",
                    "bannerUrl": "https://images.example.com/merchants/spryker/banner-de.png",
                    "deliveryTime": "1-3 Werktage",
                    "termsConditions": "<p>Es gelten unsere allgemeinen Geschäftsbedingungen.</p>",
                    "cancellationPolicy": "<p>Widerruf innerhalb von 14 Tagen.</p>",
                    "imprint": "<p>Spryker Systems GmbH, Berlin.</p>",
                    "dataPrivacy": "<p>Wir verarbeiten Ihre Daten gemäß DSGVO.</p>"
                },
                {
                    "localeName": "en_US",
                    "description": "Spryker is your partner for consumer electronics.",
                    "bannerUrl": "https://images.example.com/merchants/spryker/banner-en.png",
                    "deliveryTime": "1-3 business days",
                    "termsConditions": null,
                    "cancellationPolicy": null,
                    "imprint": null,
                    "dataPrivacy": null
                }
            ]
        }
    }
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md -->

## Retrieve a merchant profile

To retrieve the profile of a merchant as a Back Office user, send the request:

---
`GET` **/merchant-profiles/*{% raw %}{{merchant_reference}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchant_reference}}***{% endraw %} | Reference of the merchant whose profile to retrieve. To get it, [retrieve merchants](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-merchants.html) or check the merchant in the Back Office. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: retrieve a merchant profile

`GET https://glue-backend.mysprykershop.com/merchant-profiles/MER000001`

### Response

The response has the same attributes as the response of [Retrieve the profile of your merchant](#retrieve-the-profile-of-your-merchant), with the resource type `merchant-profiles`. `merchantUrls` and `localizedAttributes` contain one entry for every locale configured in the project, not only the locales of the merchant's stores. A merchant that has no profile yet is returned with `null` profile attributes.

<details><summary>Response sample: retrieve a merchant profile</summary>

```json
{
    "data": {
        "type": "merchant-profiles",
        "id": "MER000001",
        "attributes": {
            "merchantReference": "MER000001",
            "name": "Spryker",
            "email": "spryker@spryker.com",
            "registrationNumber": "HRB 134310",
            "isActive": true,
            "isOpenForRelationRequest": true,
            "stores": [
                "DE",
                "AT"
            ],
            "merchantUrls": [
                {
                    "localeName": "de_DE",
                    "url": "/de/merchant/spryker"
                },
                {
                    "localeName": "en_US",
                    "url": "/en/merchant/spryker"
                }
            ],
            "contactPersonTitle": "Mr",
            "contactPersonFirstName": "Harald",
            "contactPersonLastName": "Schmidt",
            "contactPersonRole": "E-Commerce Manager",
            "contactPersonPhone": "+49 30 208498350",
            "publicEmail": "info@spryker.com",
            "publicPhone": "+49 30 208498350",
            "faxNumber": "+49 30 208498351",
            "logoUrl": "https://images.example.com/merchants/spryker/logo.png",
            "address": {
                "countryIso2Code": "DE",
                "zipCode": "10117",
                "city": "Berlin",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": null,
                "latitude": "52.5290",
                "longitude": "13.3846"
            },
            "localizedAttributes": [
                {
                    "localeName": "de_DE",
                    "description": "Spryker ist der führende Anbieter für Unterhaltungselektronik.",
                    "bannerUrl": "https://images.example.com/merchants/spryker/banner-de.png",
                    "deliveryTime": "1-3 Werktage",
                    "termsConditions": "<p>Es gelten unsere allgemeinen Geschäftsbedingungen.</p>",
                    "cancellationPolicy": "<p>Widerruf innerhalb von 14 Tagen.</p>",
                    "imprint": "<p>Spryker Systems GmbH, Berlin.</p>",
                    "dataPrivacy": "<p>Wir verarbeiten Ihre Daten gemäß DSGVO.</p>"
                },
                {
                    "localeName": "en_US",
                    "description": "Spryker is your partner for consumer electronics.",
                    "bannerUrl": "https://images.example.com/merchants/spryker/banner-en.png",
                    "deliveryTime": "1-3 business days",
                    "termsConditions": null,
                    "cancellationPolicy": null,
                    "imprint": null,
                    "dataPrivacy": null
                }
            ]
        }
    }
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md -->

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated user is a merchant user calling `/merchant-profiles/{merchant_reference}`, or a Back Office user calling `/merchant-profile`. |
| 403 | N/A | The access token carries the merchant user scope, but the user is not assigned to a merchant. |
| 403 | N/A | The merchant of the authenticated merchant user is not approved. |
| 404 | N/A | The merchant with the specified reference doesn't exist. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
