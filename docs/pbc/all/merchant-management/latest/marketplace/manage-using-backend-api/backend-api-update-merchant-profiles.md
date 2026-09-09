---
title: "Backend API: Update merchant profiles"
description: Learn how a merchant user updates the profile of their merchant and how a Back Office user updates any merchant profile using the Spryker Backend API.
last_updated: Sep 9, 2026
template: default
related:
  - title: Authenticate as a merchant user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve merchant profiles
    link: docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-retrieve-merchant-profiles.html
---

A merchant user updates the profile of the merchant they are assigned to, and a Back Office user updates the profile of any merchant by its merchant reference. Both endpoints accept the same request body and apply the same rules.

## Installation

The endpoints are provided by the `MerchantProfile` module. For installation instructions, see [Install the Merchant Profile Backend API](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-profile-backend-api.html). Updating addresses requires the `Uuid` feature described there.

## Update the profile of your merchant

To update the profile of the merchant the authenticated merchant user is assigned to, send the request:

---
`PATCH` **/merchant-profile**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the merchant user to send requests to protected resources. Get it by [authenticating as a merchant user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html). |
| Content-Type | application/vnd.api+json | &check; | The request body is a JSON:API document. |

The update is partial: attributes you omit keep their stored values. Attributes that hold a list behave as follows:

- `localizedAttributes`: entries are matched by `localeName`. Locales you omit stay untouched. Within a locale you name, all texts are replaced, so send the full set of texts for that locale.
- `addresses`: an item with a `uuid` updates that address; an item without a `uuid` creates a new address. Omit the attribute, or send an empty list, to keep the stored addresses. Addresses can't be deleted.

An attribute set to `null` is treated like an omitted attribute and doesn't clear the stored value.

Request sample: update the contact person and the German texts of your merchant

`PATCH https://glue-backend.mysprykershop.com/merchant-profile`

```json
{
    "data": {
        "type": "merchant-profiles",
        "attributes": {
            "contactPersonFirstName": "Michele",
            "contactPersonLastName": "Nemeth",
            "contactPersonPhone": "+49 30 123456",
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
                }
            ]
        }
    }
}
```

Request sample: update one address and add another

`PATCH https://glue-backend.mysprykershop.com/merchant-profile`

```json
{
    "data": {
        "type": "merchant-profiles",
        "attributes": {
            "addresses": [
                {
                    "uuid": "2c1a70a5-7e5a-4a5a-9a5f-6d2a0a2d1f11",
                    "city": "Hamburg",
                    "zipCode": "20095"
                },
                {
                    "iso2Code": "DE",
                    "address1": "Karl-Liebknecht-Strasse",
                    "address2": "5",
                    "city": "Berlin",
                    "zipCode": "10178"
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| contactPersonRole | String | | Role of the merchant's contact person. |
| contactPersonTitle | String | | Title of the contact person: `Mr`, `Mrs`, `Dr`, or `Ms`. |
| contactPersonFirstName | String | | First name of the contact person. |
| contactPersonLastName | String | | Last name of the contact person. |
| contactPersonPhone | String | | Phone number of the contact person. |
| publicEmail | String | | Email address shown to customers. |
| publicPhone | String | | Phone number shown to customers. |
| faxNumber | String | | Fax number of the merchant. |
| logoUrl | String | | URL of the merchant logo. |
| localizedAttributes | Array | | Texts to update, matched by `localeName`. Each entry replaces all texts of its locale: `description`, `bannerUrl`, `deliveryTime`, `termsConditions`, `cancellationPolicy`, `imprint`, and `dataPrivacy`. |
| addresses | Array | | Addresses to update or create. An item with a `uuid` updates the address with that identifier; an item without a `uuid` creates an address. The fields are `iso2Code`, `address1`, `address2`, `address3`, `city`, `zipCode`, `latitude`, and `longitude`. |

`merchantReference`, `merchantName`, `addresses.uuid`, and `addresses.countryName` can't be changed.

### Response

The response contains the updated profile as it is stored after the update. For the structure, see [Retrieve the profile of your merchant](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-retrieve-merchant-profiles.html#retrieve-the-profile-of-your-merchant).

{% include /pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/merchant-profiles-backend-response-attributes.md -->

## Update a merchant profile

To update the profile of a merchant as a Back Office user, send the request:

---
`PATCH` **/merchant-profiles/*{% raw %}{{merchant_reference}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{merchant_reference}}***{% endraw %} | Reference of the merchant whose profile to update. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | The request body is a JSON:API document. |

The request body and the update rules are the same as for [Update the profile of your merchant](#update-the-profile-of-your-merchant).

Request sample: update the public contact data of a merchant

`PATCH https://glue-backend.mysprykershop.com/merchant-profiles/MER000001`

```json
{
    "data": {
        "type": "merchant-profiles",
        "id": "MER000001",
        "attributes": {
            "publicEmail": "info@sony-experts.com",
            "publicPhone": "+49 30 654321"
        }
    }
}
```

### Response

The response contains the updated profile. For the structure, see [Retrieve a merchant profile](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-retrieve-merchant-profiles.html#retrieve-a-merchant-profile).

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated user is a merchant user calling `/merchant-profiles/{merchant_reference}`, or a Back Office user calling `/merchant-profile`. |
| 403 | 1302 | The access token carries the merchant user scope, but the user is not assigned to a merchant. |
| 404 | 1301 | The merchant with the specified reference doesn't exist, or the merchant doesn't have a profile. |
| 422 | 1303 | A `localizedAttributes` entry names a locale that is not available in the store. |
| 422 | 1304 | An address names a `uuid` that doesn't belong to this merchant profile, or the `Uuid` feature of the `MerchantProfile` module is disabled. |
| 422 | 1305 | An address names an unknown country in `iso2Code`. |
| 422 | N/A | The request body fails validation, for example, `contactPersonTitle` is not one of `Mr`, `Mrs`, `Dr`, `Ms`. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html).
