---
title: "Backend API: Retrieve merchant profiles"
description: Learn how a merchant user retrieves the profile of their merchant and how a Back Office user retrieves any merchant profile using the Spryker Backend API.
last_updated: Sep 9, 2026
template: default
related:
  - title: Authenticate as a merchant user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Update merchant profiles
    link: docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-update-merchant-profiles.html
---

The `merchant-profiles` resource of the Backend API serves two audiences:

- A merchant user retrieves the profile of the merchant they are assigned to. The merchant is resolved from the access token, so the endpoint carries no identifier.
- A Back Office user retrieves the profile of any merchant by its merchant reference.

The two audiences are strictly separated. A merchant user calling the Back Office endpoint, or a Back Office user calling the merchant endpoint, gets a `403` response.

## Installation

The endpoints are provided by the `MerchantProfile` module. For installation instructions, see [Install the Merchant Profile Backend API](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-profile-backend-api.html).

## Retrieve the profile of your merchant

To retrieve the profile of the merchant the authenticated merchant user is assigned to, send the request:

---
`GET` **/merchant-profile**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the merchant user to send requests to protected resources. Get it by [authenticating as a merchant user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html). |

Request sample: retrieve the profile of your merchant

`GET https://glue-backend.mysprykershop.com/merchant-profile`

### Response

<details><summary>Response sample: retrieve the profile of your merchant</summary>

```json
{
    "data": {
        "type": "merchant-profiles",
        "id": "MER000001",
        "attributes": {
            "merchantReference": "MER000001",
            "merchantName": "Spryker",
            "contactPersonRole": "E-commerce manager",
            "contactPersonTitle": "Mr",
            "contactPersonFirstName": "Michele",
            "contactPersonLastName": "Nemeth",
            "contactPersonPhone": "+49 30 123456",
            "publicEmail": "info@sony-experts.com",
            "publicPhone": "+49 30 654321",
            "faxNumber": "+49 30 654322",
            "logoUrl": "https://images.icecat.biz/img/gallery/40208824_9199.jpg",
            "localizedAttributes": [
                {
                    "localeName": "de_DE",
                    "description": "Sony Experts ist Ihr Partner für Unterhaltungselektronik.",
                    "bannerUrl": "https://cdn.spryker.com/banner-de.png",
                    "deliveryTime": "1-3 Werktage",
                    "termsConditions": "Es gelten unsere allgemeinen Geschäftsbedingungen.",
                    "cancellationPolicy": "Widerruf innerhalb von 14 Tagen.",
                    "imprint": "Sony Experts GmbH, Berlin.",
                    "dataPrivacy": "Wir verarbeiten Ihre Daten gemäß DSGVO."
                },
                {
                    "localeName": "en_US",
                    "description": "Sony Experts is your partner for consumer electronics.",
                    "bannerUrl": null,
                    "deliveryTime": "1-3 business days",
                    "termsConditions": null,
                    "cancellationPolicy": null,
                    "imprint": null,
                    "dataPrivacy": null
                }
            ],
            "addresses": [
                {
                    "uuid": "2c1a70a5-7e5a-4a5a-9a5f-6d2a0a2d1f11",
                    "iso2Code": "DE",
                    "countryName": "Germany",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "",
                    "city": "Berlin",
                    "zipCode": "10115",
                    "latitude": "52.5308",
                    "longitude": "13.3847"
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

The response has the same structure as the response of [Retrieve the profile of your merchant](#retrieve-the-profile-of-your-merchant).

{% include /pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md -->

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated user is a merchant user calling `/merchant-profiles/{merchant_reference}`, or a Back Office user calling `/merchant-profile`. |
| 403 | 1302 | The access token carries the merchant user scope, but the user is not assigned to a merchant. |
| 404 | 1301 | The merchant with the specified reference doesn't exist, or the merchant doesn't have a profile. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html).
