---
title: "Backend API: Create a glossary key"
description: Learn how to create glossary keys with translations in one or several locales using the Spryker Backend API.
last_updated: Sep 9, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve glossary keys
    link: docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-retrieve-glossary-keys.html
  - title: Update translations of a glossary key
    link: docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-update-translations-of-a-glossary-key.html
  - title: Add translations in the Back Office
    link: docs/pbc/all/miscellaneous/latest/manage-in-the-back-office/add-translations.html
---

The `glossary-keys` resource of the Backend API lets Back Office integrations create glossary keys together with their translations. This document describes how to create a glossary key and which validations the request has to pass.

## Installation

The endpoints are provided by the `Glossary` module. For details on installing it, see [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html).

## Create a glossary key

To create a glossary key, send the request:

---
`POST` **/glossary-keys**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: create a glossary key with translations in two locales

`POST https://glue-backend.mysprykershop.com/glossary-keys`

```json
{
    "data": {
        "type": "glossary-keys",
        "attributes": {
            "key": "general.newsletter.hint",
            "translations": [
                {
                    "localeName": "en_US",
                    "value": "Subscribe to our newsletter"
                },
                {
                    "localeName": "de_DE",
                    "value": "Abonnieren Sie unseren Newsletter"
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| key | String | &check; | Unique glossary key, up to 255 characters. It becomes the resource `id` and cannot be changed later. Keys are matched case-insensitively, so a key that differs from an existing one only by case is rejected as a duplicate. |
| translations | Array | | Translations of the key. Provide any subset of the configured locales; each `localeName` can appear once. Omit the attribute or send an empty array to create the key without translations. |
| translations.localeName | String | &check; | Name of a configured locale—for example, `en_US`. |
| translations.value | String | &check; | Translated text in the locale. Must be a non-empty string. |

{% info_block infoBox "Locales without a translation" %}

You can create a key with translations in a subset of the configured locales. The locales you omit are returned with `value: null`, and the key is not translated in those locales until you [add the translations](/docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-update-translations-of-a-glossary-key.html).

{% endinfo_block %}

### Response

The response contains the created glossary key with one `translations` entry per configured locale.

<details>
<summary>Response sample: create a glossary key</summary>

```json
{
    "data": {
        "id": "general.newsletter.hint",
        "type": "glossary-keys",
        "attributes": {
            "key": "general.newsletter.hint",
            "translations": [
                {
                    "localeName": "de_DE",
                    "value": "Abonnieren Sie unseren Newsletter"
                },
                {
                    "localeName": "en_US",
                    "value": "Subscribe to our newsletter"
                }
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/glossary-keys/general.newsletter.hint"
        }
    }
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/glossary-keys-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/glossary-keys-backend-response-attributes.md -->

## Possible errors

The request is validated as a whole: if any check fails, nothing is created and all failed checks are returned in the `errors` array.

| STATUS | CODE | REASON |
| --- | --- | --- |
| 422 | 901 | A required attribute is missing, is blank, or has a wrong type—for example, `key => This value should not be blank.` or `translations.0.value => This value should not be blank.` |
| 422 | N/A | A glossary key with the specified `key` already exists. Keys are compared case-insensitively. |
| 422 | N/A | A locale specified in `translations` is not configured, or an entry has no `localeName`. |
| 422 | N/A | A `localeName` appears more than once in `translations`. |
| 422 | N/A | A `value` in `translations` is `null`. When creating a key, every listed locale needs a translated text; to create the key without a translation in a locale, omit that locale. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `glossary-keys` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
