---
title: "Backend API: Manage customer addresses"
description: Learn how to retrieve, create, update, and delete customer addresses in your Spryker shop using the Spryker Backend API.
last_updated: Sep 4, 2026
template: glue-api-storefront-guide-template
---

This document describes how to manage the addresses of a customer using the Backend API. Addresses are a sub-resource of a customer, so every endpoint is addressed through the reference of the customer that owns the address.

Addresses are addressed by `uuid`. The internal database identifier is never exposed. The uuid is derived deterministically from the address, so it is stable for the lifetime of the record.

## Installation

These endpoints are provided by API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

## Retrieve customer addresses

To retrieve a paginated collection of the addresses of a customer, send the request:

***
`GET` {% raw %}**/customers/*{{customer_reference}}*/addresses**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer whose addresses you want to retrieve. To get it, [retrieve customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html#retrieve-customers). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page | Page number to return. | From `1` to any. Defaults to `1`. |
| page[limit] | Maximum number of items to return per page. | From `1` to any. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. Separate several fields with a comma. | firstName, lastName, zipCode |

Without a `sort` parameter, the collection is ordered the same way the Back Office address table orders it. Sorting by a field that is not on the list returns `400` with the error code `1203`, and the error message names the supported fields.

The collection does not accept filters.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/customers/DE--1/addresses` | Retrieve the first page of the addresses of the customer `DE--1`. |
| `GET https://glue-backend.mysprykershop.com/customers/DE--1/addresses?sort=zipCode` | Retrieve the addresses of the customer `DE--1`, ordered by postal code. |

### Response

<details>
  <summary>Response sample: retrieve customer addresses</summary>

```json
{
    "data": [
        {
            "type": "addresses",
            "id": "5caa05f5-41f5-5e6c-a254-07d7887fb4e9",
            "attributes": {
                "uuid": "5caa05f5-41f5-5e6c-a254-07d7887fb4e9",
                "customerReference": "DE--1",
                "salutation": "Mr",
                "firstName": "Spencor",
                "lastName": "Hopkin",
                "address1": "Julie-Wolfthorn-Straße",
                "address2": "1",
                "address3": "Floor 3",
                "company": "Spryker Systems GmbH",
                "city": "Berlin",
                "zipCode": "10115",
                "iso2Code": "DE",
                "country": "Germany",
                "region": "DE-BE",
                "phone": "+49 30 234567890",
                "comment": "Please ring the doorbell twice.",
                "isDefaultBilling": true,
                "isDefaultShipping": true,
                "createdAt": "2026-08-31 10:06:00.000000",
                "updatedAt": "2026-08-31 12:30:00.000000",
                "pagination": {
                    "numFound": 2,
                    "currentPage": 1,
                    "maxPage": 1,
                    "currentItemsPerPage": 10
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/customers/DE--1/addresses/5caa05f5-41f5-5e6c-a254-07d7887fb4e9"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/customers/DE--1/addresses?page=1",
        "first": "https://glue-backend.mysprykershop.com/customers/DE--1/addresses?page=1",
        "last": "https://glue-backend.mysprykershop.com/customers/DE--1/addresses?page=1"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique address identifier. Addresses the address in every operation. |
| customerReference | String | Reference of the customer who owns this address. |
| salutation | String | Salutation of the address recipient. |
| firstName | String | First name of the address recipient. |
| lastName | String | Last name of the address recipient. |
| address1 | String | Street name. |
| address2 | String | House number. |
| address3 | String | Additional address line. |
| company | String | Company name. |
| city | String | City. |
| zipCode | String | Postal code. |
| iso2Code | String | Two-letter ISO country code. |
| country | String | Country name. Derived from `iso2Code`, so this attribute is read-only. |
| region | String | ISO 3166-2 subdivision code of the region. |
| phone | String | Phone number. |
| comment | String | Delivery instructions. |
| isDefaultBilling | Boolean | Defines whether this is the default billing address of the customer. |
| isDefaultShipping | Boolean | Defines whether this is the default shipping address of the customer. |
| createdAt | String | Date and time when the address was created. |
| updatedAt | String | Date and time when the address was last updated. |

{% include pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/customer-backend-api-pagination-attributes.md -->

## Retrieve a customer address

To retrieve a single address of a customer, send the request:

***
`GET` {% raw %}**/customers/*{{customer_reference}}*/addresses/*{{address_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer who owns the address. |
| {% raw %}***{{address_uuid}}***{% endraw %} | Uuid of the address to retrieve. To get it, [retrieve customer addresses](#retrieve-customer-addresses). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `GET https://glue-backend.mysprykershop.com/customers/DE--1/addresses/5caa05f5-41f5-5e6c-a254-07d7887fb4e9`

### Response

The response contains the same attributes as [Retrieve customer addresses](#retrieve-customer-addresses), without the `pagination` object.

{% info_block infoBox "Addresses of another customer" %}

An address is reachable only through the customer who owns it. Requesting an address through a different customer reference returns `404` with the error code `1205`, exactly as an unknown uuid does, so the response never reveals that the address exists.

{% endinfo_block %}

## Add a customer address

To create an address for a customer, send the request:

***
`POST` {% raw %}**/customers/*{{customer_reference}}*/addresses**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer to create the address for. |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `POST https://glue-backend.mysprykershop.com/customers/DE--1/addresses`

```json
{
    "data": {
        "type": "addresses",
        "attributes": {
            "salutation": "Mr",
            "firstName": "Spencor",
            "lastName": "Hopkin",
            "address1": "Julie-Wolfthorn-Straße",
            "address2": "1",
            "city": "Berlin",
            "zipCode": "10115",
            "iso2Code": "DE"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| salutation | String | &check; | Salutation of the address recipient. One of `Mr`, `Mrs`, `Dr`, `Ms`, `n/a`. |
| firstName | String | &check; | First name of the address recipient. From 2 to 100 characters, and must not contain `:`, `/`, `<`, or `>`. |
| lastName | String | &check; | Last name of the address recipient. From 2 to 100 characters, and must not contain `:`, `/`, `<`, or `>`. |
| address1 | String | &check; | Street name. From 2 to 255 characters. |
| address2 | String | &check; | House number. Must not exceed 255 characters. |
| address3 | String |  | Additional address line. Must not exceed 255 characters. |
| company | String |  | Company name. Must not exceed 255 characters. |
| city | String | &check; | City. From 2 to 255 characters. |
| zipCode | String | &check; | Postal code. Must not exceed 15 characters. |
| iso2Code | String | &check; | Two-letter ISO country code. Must be a country that exists in the shop. |
| region | String |  | ISO 3166-2 subdivision code of the region. Must not exceed 6 characters, and must belong to the country given in `iso2Code`. |
| phone | String |  | Phone number. Must not exceed 255 characters. |
| comment | String |  | Delivery instructions. Must not exceed 255 characters. |
| isDefaultBilling | Boolean |  | Makes this the default billing address of the customer. |
| isDefaultShipping | Boolean |  | Makes this the default shipping address of the customer. |

{% info_block infoBox "Default billing and shipping addresses" %}

`isDefaultBilling` and `isDefaultShipping` behave in three ways:

<ul>
<li>Send <code>true</code> to make this the default address. The previous default loses the flag.</li>
<li>Omit the attribute, and the address becomes the default only if the customer has no default yet. The first address of a customer therefore always becomes both the default billing and the default shipping address.</li>
<li>Send <code>false</code>, and nothing changes. This never clears an existing default. To move a default, send <code>true</code> on the address that is to become the new default.</li>
</ul>

{% endinfo_block %}

`country` is read-only. To set the country of an address, send `iso2Code`.

### Response

Response sample:

```json
{
    "data": {
        "type": "addresses",
        "id": "5caa05f5-41f5-5e6c-a254-07d7887fb4e9",
        "attributes": {
            "uuid": "5caa05f5-41f5-5e6c-a254-07d7887fb4e9",
            "customerReference": "DE--1",
            "salutation": "Mr",
            "firstName": "Spencor",
            "lastName": "Hopkin",
            "address1": "Julie-Wolfthorn-Straße",
            "address2": "1",
            "city": "Berlin",
            "zipCode": "10115",
            "iso2Code": "DE",
            "country": "Germany",
            "isDefaultBilling": true,
            "isDefaultShipping": true,
            "createdAt": "2026-09-04 10:06:00.000000",
            "updatedAt": "2026-09-04 10:06:00.000000"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/customers/DE--1/addresses/5caa05f5-41f5-5e6c-a254-07d7887fb4e9"
        }
    }
}
```

## Edit a customer address

To update an address of a customer, send the request:

***
`PATCH` {% raw %}**/customers/*{{customer_reference}}*/addresses/*{{address_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer who owns the address. |
| {% raw %}***{{address_uuid}}***{% endraw %} | Uuid of the address to update. To get it, [retrieve customer addresses](#retrieve-customer-addresses). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; | Media type of the request body. |

Request sample: `PATCH https://glue-backend.mysprykershop.com/customers/DE--1/addresses/5caa05f5-41f5-5e6c-a254-07d7887fb4e9`

```json
{
    "data": {
        "type": "addresses",
        "id": "5caa05f5-41f5-5e6c-a254-07d7887fb4e9",
        "attributes": {
            "city": "Hamburg",
            "zipCode": "20095"
        }
    }
}
```

The request accepts the same writable attributes as [Add a customer address](#add-a-customer-address), and all of them are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

{% info_block warningBox "Changing the country of an address with a region" %}

A region must belong to the country of the address. If the address carries a `region` and you change `iso2Code`, send a region of the new country in the same request. Otherwise the request returns `422` with the error code `1212`.

{% endinfo_block %}

### Response

The response contains the updated address, with the same attributes as [Retrieve a customer address](#retrieve-a-customer-address).

## Delete a customer address

To delete an address of a customer, send the request:

***
`DELETE` {% raw %}**/customers/*{{customer_reference}}*/addresses/*{{address_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{customer_reference}}***{% endraw %} | Reference of the customer who owns the address. |
| {% raw %}***{{address_uuid}}***{% endraw %} | Uuid of the address to delete. To get it, [retrieve customer addresses](#retrieve-customer-addresses). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: `DELETE https://glue-backend.mysprykershop.com/customers/DE--1/addresses/5caa05f5-41f5-5e6c-a254-07d7887fb4e9`

### Response

A successful request returns the `204 No Content` status code with an empty body.

If the deleted address was a default billing or shipping address, the customer is left without that default. Deleting an address does not promote another address in its place.

## Other management options

- [Backend API: Manage customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customers.html)
- [Backend API: Manage customer notes](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/backend-api-manage-customer-notes.html)

## Possible errors

| CODE  | REASON |
| --- | --- |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1201 | No customer matches the given reference. |
| 1202 | The address was rejected by the shop. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1205 | No address with the given uuid belongs to the given customer. |
| 1210 | The given country does not exist. |
| 1211 | The given region does not exist. |
| 1212 | The given region does not belong to the given country. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
