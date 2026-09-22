---
title: "Backend API: Update merchant profiles"
description: Learn how a merchant user updates the profile of their merchant and how a Back Office user updates any merchant profile using the Spryker Backend API.
last_updated: Sep 16, 2026
template: default
related:
  - title: Authenticate as a merchant user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-merchant-user.html
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve merchant profiles
    link: docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-retrieve-merchant-profiles.html
---

A merchant user updates the profile of the merchant they are assigned to through the `merchant-profile` resource, and a Back Office user updates the profile of any merchant by its merchant reference through the `merchant-profiles` resource. Each resource lets its audience change what it can change in its own UI:

- A merchant user can update the same data as on the Merchant Portal profile page: the merchant details (`name`, `email`, `registrationNumber`, `isOpenForRelationRequest`), the store status (`isActive`), the Storefront URLs, the contact person, the public contact data, the address, and the localized texts.
- A Back Office user can update the profile data only. The merchant details, the store status, and the Storefront URLs are managed through the `merchants` resource; if they are sent, they are ignored.

## Installation

The endpoints are provided by the `MerchantProfile` module and require the API Platform integration of the Backend API. For installation instructions, see [Install the Merchant Profile Backend API](/docs/pbc/all/merchant-management/latest/marketplace/install-and-upgrade/install-features/install-the-merchant-profile-backend-api.html).

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

The merchant of the authenticated user must be approved. A merchant user of a merchant that is still waiting for approval gets a `403` response, as in the Merchant Portal.

The update is partial: attributes you omit keep their stored values. An attribute set to `null` clears the stored value; `null` is rejected with a `422` error for the required attributes listed in the table below. Attributes that hold an object or a list behave as follows:

- `address`: the fields are merged. A field you omit keeps its stored value; `null` clears it. The address can't be removed.
- `merchantUrls`: entries are merged by `localeName`. A URL can be replaced but not removed. Send the part of the URL after the locale prefix—for example, `spryker`. The prefix `/{language code}/merchant/` is prepended automatically, as on the Merchant Portal profile page; a URL that already starts with it is stored as is. The response always contains the full URL.
- `localizedAttributes`: entries are merged by `localeName`, and within an entry by text. A text you omit keeps its stored value; `null` removes the text. Locales you omit stay untouched.

The following rules apply to a merchant user, as on the Merchant Portal profile page:

- `merchantUrls` and `localizedAttributes` accept only the locales of the stores the merchant is assigned to. The stores are listed in the `stores` attribute of the profile.
- A URL must be unique across the shop and must not contain whitespace or backslashes.
- The texts in `localizedAttributes` may contain only the HTML tags `h1` to `h6`, `br`, and `p`.

Request sample: update the contact person and the German texts of your merchant

`PATCH https://glue-backend.mysprykershop.com/merchant-profile`

```json
{
    "data": {
        "type": "merchant-profile",
        "attributes": {
            "contactPersonFirstName": "Harald",
            "contactPersonLastName": "Schmidt",
            "contactPersonPhone": "+49 30 208498350",
            "localizedAttributes": [
                {
                    "localeName": "de_DE",
                    "description": "Spryker ist der führende Anbieter für Unterhaltungselektronik.",
                    "deliveryTime": "1-3 Werktage"
                }
            ]
        }
    }
}
```

Request sample: rename your merchant, set its Storefront URLs, and clear the fax number

`PATCH https://glue-backend.mysprykershop.com/merchant-profile`

```json
{
    "data": {
        "type": "merchant-profile",
        "attributes": {
            "name": "Spryker Systems",
            "faxNumber": null,
            "merchantUrls": [
                {
                    "localeName": "de_DE",
                    "url": "spryker-systems"
                },
                {
                    "localeName": "en_US",
                    "url": "spryker-systems"
                }
            ],
            "address": {
                "city": "Hamburg",
                "zipCode": "20095"
            }
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Name of the merchant. Can't be `null`. |
| email | String | &check; | Contact email of the merchant. Must be unique across merchants. Can't be `null`. |
| registrationNumber | String | | Official business registration number. |
| isActive | Boolean | &check; | Defines whether the merchant's store is online, as the "Store Status" switch of the Merchant Portal. `false` removes the merchant from the Storefront and makes its offers unavailable; merchant users keep their access. Can't be `null`. |
| isOpenForRelationRequest | Boolean | | Defines whether the merchant accepts merchant relation requests. |
| merchantUrls | Array | | URLs of the merchant page, merged by `localeName`. Each entry has `localeName` and `url`; `url` can't be `null`. Send the part after the `/{language code}/merchant/` prefix; the prefix is prepended automatically. |
| contactPersonTitle | String | | Title of the contact person: `Mr`, `Mrs`, `Dr`, or `Ms`. |
| contactPersonFirstName | String | &check; | First name of the contact person. Must not contain `:`, `/`, `<`, or `>`. Can't be `null`. |
| contactPersonLastName | String | &check; | Last name of the contact person. Must not contain `:`, `/`, `<`, or `>`. Can't be `null`. |
| contactPersonRole | String | | Role of the contact person in the merchant company. |
| contactPersonPhone | String | | Phone number of the contact person. |
| publicEmail | String | | Email address shown to customers. |
| publicPhone | String | | Phone number shown to customers. |
| faxNumber | String | | Fax number of the merchant. |
| logoUrl | String | | URL of the merchant logo. Must not contain whitespace or backslashes. |
| address | Object | | Business address, merged field by field: `countryIso2Code`, `zipCode`, `city`, `address1`, `address2`, `address3`, `latitude`, `longitude`. `countryIso2Code` must be a configured country and can't be `null`. |
| localizedAttributes | Array | | Texts to update, merged by `localeName` and by text. Each entry has `localeName` and any of `description`, `bannerUrl`, `deliveryTime`, `termsConditions`, `cancellationPolicy`, `imprint`, and `dataPrivacy`. `bannerUrl` can't be `null`. |

`merchantReference` and `stores` can't be changed. Required means the attribute can't be cleared; you can still omit it to keep the stored value.

### Response

The response contains the full profile as it is stored after the update, in the same structure as [Retrieve the profile of your merchant](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-retrieve-merchant-profiles.html#retrieve-the-profile-of-your-merchant).

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

The merge rules for `address` and `localizedAttributes` are the same as for [Update the profile of your merchant](#update-the-profile-of-your-merchant), with the following differences:

- `name`, `email`, `registrationNumber`, `isActive`, `isOpenForRelationRequest`, and `merchantUrls` are read-only. If they are sent, they are ignored. To change them, use the `merchants` resource.
- `localizedAttributes` accepts every locale configured in the project, and the texts are not restricted to a set of HTML tags, as in the Back Office.

Request sample: update the public contact data and the English description of a merchant

`PATCH https://glue-backend.mysprykershop.com/merchant-profiles/MER000001`

```json
{
    "data": {
        "type": "merchant-profiles",
        "id": "MER000001",
        "attributes": {
            "publicEmail": "info@spryker.com",
            "publicPhone": "+49 30 208498350",
            "localizedAttributes": [
                {
                    "localeName": "en_US",
                    "description": "Spryker is your partner for consumer electronics."
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| contactPersonTitle | String | | Title of the contact person: `Mr`, `Mrs`, `Dr`, or `Ms`. |
| contactPersonFirstName | String | &check; | First name of the contact person. Must not contain `:`, `/`, `<`, or `>`. Can't be `null`. |
| contactPersonLastName | String | &check; | Last name of the contact person. Must not contain `:`, `/`, `<`, or `>`. Can't be `null`. |
| contactPersonRole | String | | Role of the contact person in the merchant company. |
| contactPersonPhone | String | | Phone number of the contact person. |
| publicEmail | String | | Email address shown to customers. |
| publicPhone | String | | Phone number shown to customers. |
| faxNumber | String | | Fax number of the merchant. |
| logoUrl | String | | URL of the merchant logo. Must not contain whitespace or backslashes. |
| address | Object | | Business address, merged field by field: `countryIso2Code`, `zipCode`, `city`, `address1`, `address2`, `address3`, `latitude`, `longitude`. `countryIso2Code` must be a configured country and can't be `null`. |
| localizedAttributes | Array | | Texts to update, merged by `localeName` and by text. Each entry has `localeName` and any of `description`, `bannerUrl`, `deliveryTime`, `termsConditions`, `cancellationPolicy`, `imprint`, and `dataPrivacy`. `bannerUrl` can't be `null`. |

### Response

The response contains the full profile as it is stored after the update, in the same structure as [Retrieve a merchant profile](/docs/pbc/all/merchant-management/latest/marketplace/manage-using-backend-api/backend-api-retrieve-merchant-profiles.html#retrieve-a-merchant-profile).

## Possible errors

The request is validated as a whole: if any check fails, nothing is updated and all failed checks are returned in the `errors` array.

| STATUS | CODE | REASON |
| --- | --- | --- |
| 400 | N/A | The request body is malformed, or `data.type` doesn't match the resource: `merchant-profile` for `/merchant-profile`, `merchant-profiles` for `/merchant-profiles/{merchant_reference}`. |
| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated user is a merchant user calling `/merchant-profiles/{merchant_reference}`, or a Back Office user calling `/merchant-profile`. |
| 403 | N/A | The access token carries the merchant user scope, but the user is not assigned to a merchant. |
| 403 | N/A | The merchant of the authenticated merchant user is not approved. |
| 404 | N/A | The merchant with the specified reference doesn't exist. |
| 422 | 901 | An attribute has a wrong type, or a required attribute is set to `null`. |
| 422 | N/A | A `merchantUrls` or `localizedAttributes` entry names a locale that is not configured. |
| 422 | N/A | A `merchantUrls` or `localizedAttributes` entry names a locale that doesn't belong to a store of the merchant. Applies to `/merchant-profile` only. |
| 422 | N/A | A URL is already used by another merchant or another page. |
| 422 | N/A | A text contains an HTML tag other than `h1` to `h6`, `br`, or `p`. Applies to `/merchant-profile` only. |
| 422 | N/A | `address.countryIso2Code` is not a configured country. |
| 422 | N/A | `email` is already used by another merchant. Applies to `/merchant-profile` only. |
| 422 | N/A | The request body fails validation—for example, `contactPersonTitle` is not one of `Mr`, `Mrs`, `Dr`, `Ms`, or a text in `localizedAttributes` is an empty string. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
