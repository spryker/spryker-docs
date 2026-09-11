---
title: "Backend API: Update translations of a glossary key"
description: Learn how to add, change, and remove translations of a glossary key in one or several locales using the Spryker Backend API.
last_updated: Sep 9, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve glossary keys
    link: docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-retrieve-glossary-keys.html
  - title: Create a glossary key
    link: docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-create-a-glossary-key.html
  - title: Edit translations in the Back Office
    link: docs/pbc/all/miscellaneous/latest/manage-in-the-back-office/edit-translations.html
---

The `glossary-keys` resource of the Backend API lets Back Office integrations manage the translations of existing glossary keys. This document describes how to add, change, and remove translations of a glossary key.

## Installation

The endpoints are provided by the `Glossary` module. For details on installing it, see [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html).

## Update translations of a glossary key

To update the translations of a glossary key, send the request:

---
`PATCH` **/glossary-keys/*{% raw %}{{key}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{key}}***{% endraw %} | Glossary key to update. The key is matched case-insensitively. To get it, [retrieve glossary keys](/docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-retrieve-glossary-keys.html#retrieve-glossary-keys). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

The update is partial and works per locale. `translations` entries are merged by `localeName`: locales you omit stay untouched, and each entry you send is applied as follows:

- A non-empty `value` creates the translation of the locale, or overwrites the existing one. A previously removed translation becomes active again.
- `value: null` removes the translation of the locale. The translation is unpublished from the Storefront and is returned as `value: null` afterwards. The glossary key itself is kept.
- An empty string is rejected.

You can send one or several locales in one request, and combine additions and removals.

Request sample: change the German translation and remove the English one

`PATCH https://glue-backend.mysprykershop.com/glossary-keys/general.newsletter.hint`

```json
{
    "data": {
        "type": "glossary-keys",
        "id": "general.newsletter.hint",
        "attributes": {
            "translations": [
                {
                    "localeName": "de_DE",
                    "value": "Jetzt Newsletter abonnieren"
                },
                {
                    "localeName": "en_US",
                    "value": null
                }
            ]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| translations | Array | &check; | Translations to apply, merged by `localeName`. Each `localeName` can appear once. |
| translations.localeName | String | &check; | Name of a configured locale—for example, `en_US`. |
| translations.value | String | &check; | New translated text in the locale, or `null` to remove the translation. Must not be an empty string. |

`key` cannot be changed.

### Response

The response contains the updated glossary key with one `translations` entry per configured locale, including the locales you didn't send.

<details>
<summary>Response sample: update translations of a glossary key</summary>

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
                    "value": "Jetzt Newsletter abonnieren"
                },
                {
                    "localeName": "en_US",
                    "value": null
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

The request is validated as a whole: if any check fails, nothing is updated and all failed checks are returned in the `errors` array.

| STATUS | CODE | REASON |
| --- | --- | --- |
| 404 | N/A | The glossary key with the specified key doesn't exist. |
| 422 | 901 | An attribute has a wrong type, or a `value` is an empty string—for example, `translations.0.value => This value is too short. It should have 1 character or more.` |
| 422 | N/A | `key` differs from the key of the glossary key. The key cannot be changed. |
| 422 | N/A | A locale specified in `translations` is not configured, or an entry has no `localeName`. |
| 422 | N/A | A `localeName` appears more than once in `translations`. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `glossary-keys` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
