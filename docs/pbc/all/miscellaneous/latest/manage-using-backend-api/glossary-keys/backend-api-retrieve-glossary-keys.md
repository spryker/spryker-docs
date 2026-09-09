---
title: "Backend API: Retrieve glossary keys"
description: Learn how to retrieve the glossary key collection and single glossary keys with their translations, and how to paginate, sort, and filter them using the Spryker Backend API.
last_updated: Sep 9, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Create a glossary key
    link: docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-create-a-glossary-key.html
  - title: Update translations of a glossary key
    link: docs/pbc/all/miscellaneous/latest/manage-using-backend-api/glossary-keys/backend-api-update-translations-of-a-glossary-key.html
  - title: Manage translations in the Back Office
    link: docs/pbc/all/miscellaneous/latest/manage-in-the-back-office/manage-translations-in-the-back-office.html
---

The `glossary-keys` resource of the Backend API lets Back Office integrations read glossary keys and their translations. This document describes how to retrieve a paginated glossary key collection and a single glossary key.

## Installation

The endpoints are provided by the `Glossary` module. For details on installing it, see [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-features/install-the-spryker-core-feature.html).

## Retrieve glossary keys

To retrieve a paginated collection of glossary keys, send the request:

---
`GET` **/glossary-keys**

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

| QUERY PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| page[limit] | Number of glossary keys per page. Default: `10`, maximum: `100`. A higher value is reduced to the maximum. | `page[limit]=20` |
| page[offset] | Number of glossary keys to skip. Default: `0`. | `page[offset]=20` |
| sort | Sorts the collection by a field. Prefix the field with `-` for descending order. The only supported field is `key`; the collection is sorted by `key` in ascending order by default. Any other field returns a `400` error. | `sort=key`<br>`sort=-key` |
| filter[glossary-keys.key] | Returns only the glossary keys that contain the specified fragment. The fragment is matched case-insensitively. | `filter[glossary-keys.key]=general.` |
| filter[glossary-keys.value] | Returns only the glossary keys that have at least one active translation, in any locale, containing the specified fragment. The fragment is matched case-insensitively. Removed translations are not matched. | `filter[glossary-keys.value]=Weiter` |

When both filters are provided, a glossary key has to match both of them.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/glossary-keys` | Retrieve the first page of the glossary key collection. |
| `GET https://glue-backend.mysprykershop.com/glossary-keys?page[limit]=2&page[offset]=2` | Retrieve the second page of the collection with two glossary keys per page. |
| `GET https://glue-backend.mysprykershop.com/glossary-keys?sort=-key` | Retrieve glossary keys sorted by key in descending order. |
| `GET https://glue-backend.mysprykershop.com/glossary-keys?filter[glossary-keys.key]=general.` | Retrieve glossary keys containing `general.`. |
| `GET https://glue-backend.mysprykershop.com/glossary-keys?filter[glossary-keys.value]=Weiter` | Retrieve glossary keys with an active translation containing `Weiter` in any locale. |
| `GET https://glue-backend.mysprykershop.com/glossary-keys?filter[glossary-keys.key]=button&filter[glossary-keys.value]=Next` | Retrieve glossary keys containing `button` that have an active translation containing `Next`. |

### Response

The pagination summary is returned in the top-level `meta.pagination` object, and the pagination links in the top-level `links` object. Collection members do not carry pagination data.

Every glossary key carries one `translations` entry per configured locale, even when a filter matched the key by one of its translations only.

<details>
<summary>Response sample: retrieve glossary keys</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/glossary-keys?filter[glossary-keys.key]=general.",
        "first": "https://glue-backend.mysprykershop.com/glossary-keys?filter[glossary-keys.key]=general.&page[limit]=2&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/glossary-keys?filter[glossary-keys.key]=general.&page[limit]=2&page[offset]=60",
        "next": "https://glue-backend.mysprykershop.com/glossary-keys?filter[glossary-keys.key]=general.&page[limit]=2&page[offset]=2"
    },
    "meta": {
        "pagination": {
            "numFound": 61,
            "currentPage": 1,
            "maxPage": 31,
            "currentItemsPerPage": 2
        }
    },
    "data": [
        {
            "id": "general.back",
            "type": "glossary-keys",
            "attributes": {
                "key": "general.back",
                "translations": [
                    {
                        "localeName": "de_DE",
                        "value": "Zurück"
                    },
                    {
                        "localeName": "en_US",
                        "value": "Back"
                    }
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/glossary-keys/general.back"
            }
        },
        {
            "id": "general.next.button",
            "type": "glossary-keys",
            "attributes": {
                "key": "general.next.button",
                "translations": [
                    {
                        "localeName": "de_DE",
                        "value": "Weiter"
                    },
                    {
                        "localeName": "en_US",
                        "value": "Next"
                    }
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/glossary-keys/general.next.button"
            }
        }
    ]
}
```

</details>

| META ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| pagination.numFound | Integer | Total number of glossary keys in the collection. |
| pagination.currentPage | Integer | Number of the current page. |
| pagination.maxPage | Integer | Total number of pages. |
| pagination.currentItemsPerPage | Integer | Number of glossary keys per page. |

{% include /pbc/all/glue-api-guides/latest/glossary-keys-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/glossary-keys-backend-response-attributes.md -->

## Retrieve a glossary key

To retrieve a single glossary key with its translations, send the request:

---
`GET` **/glossary-keys/*{% raw %}{{key}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{key}}***{% endraw %} | Glossary key to retrieve. The key is matched case-insensitively; the response contains the stored key. To get it, [retrieve glossary keys](#retrieve-glossary-keys). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: retrieve a glossary key

`GET https://glue-backend.mysprykershop.com/glossary-keys/general.next.button`

### Response

<details>
<summary>Response sample: retrieve a glossary key</summary>

```json
{
    "data": {
        "id": "general.next.button",
        "type": "glossary-keys",
        "attributes": {
            "key": "general.next.button",
            "translations": [
                {
                    "localeName": "de_DE",
                    "value": "Weiter"
                },
                {
                    "localeName": "en_US",
                    "value": "Next"
                }
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/glossary-keys/general.next.button"
        }
    }
}
```

</details>

{% include /pbc/all/glue-api-guides/latest/glossary-keys-backend-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/glossary-keys-backend-response-attributes.md -->

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 400 | 400 | The `sort` parameter references an unsupported field. The supported fields are listed in the error details. |
| 404 | N/A | The glossary key with the specified key doesn't exist. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `glossary-keys` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
