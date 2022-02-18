---
title: Managing customer addresses
description: Create, retrieve and delete customer addresses via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customer-addresses-via-glue-api
originalArticleId: 83f855ab-83ed-4a69-a087-196f88c0007b
redirect_from:
  - /2021080/docs/managing-customer-addresses-via-glue-api
  - /2021080/docs/en/managing-customer-addresses-via-glue-api
  - /docs/managing-customer-addresses-via-glue-api
  - /docs/en/managing-customer-addresses-via-glue-api
related:
  - title: Managing Wishlists
    link: docs/scos/dev/glue-api-guides/page.version/managing-wishlists/managing-wishlists.html
  - title: Login & Registration Forms
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/customer-login-overview.html
  - title: Password Management
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/password-management-overview.html
  - title: Customer Accounts
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/customer-account-management-feature-overview.html
  - title: Retrieving orders
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/retrieving-customer-orders.html
---

This endpoints allows retrieving and edit customer addresses.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Glue API: Customer Access Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-account-management-feature-integration.html).

## Add an address

To add an address to a customer, send the request:

---
`POST` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to add the address to. To get it, [Retrieve customers](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#retrieve-customers) or [Create a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#create-a-customer). |

### Request

Request sample: `POST http://glue.mysprykershop.com/customers/DE--1/addresses`

<details>
<summary markdown='span'>Request sample body</summary>

```json
{
  "data" : {
     "type": "addresses",
     "attributes": {
            "customer_reference": "DE--1",
            "salutation": "Mr",
            "firstName": "Spencor",
            "lastName": "Hopkin",
            "address1": "Third, 33, 11",
            "address2": "b",
            "address3": "aaa",
            "zipCode": "12312",
            "city": "Berlin",
            "country": "Germany",
            "iso2Code" : "DE",
            "phone": "22111-3-4-5",
            "isDefaultShipping": false,
            "isDefaultBilling": false
    	}   
    }
}
```

</details>

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| customer_reference | String | &check; | Unique identifier of the customer to add the address to. To get it, [Retrieve customers](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#retrieve-customers) or [Create a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#create-a-customer) |
| salutation | String | &check; | Salutation to use when addressing the customer. |
| firstName | String | &check; | Customer's first name. |
| lastName | String | &check; | Customer's last name. |
| address1 | String | &check; | The 1st line of the customer's address. |
| address2 | String | &check; | The 2nd line of the customer's address. |
| address3 | String | &check; | The 3rd line of the customer's address. |
| zipCode | String | &check; | ZIP code. |
| city | String | &check; | Specifies the city. |
| country | String | &check; | Specifies the country. |
| iso2Code | String | &check; | Specifies an ISO 2 Country Code to use. |
| company | String | &check; | Customer's company. |
| phone | String | &check; | Customer's phone number. |
| isDefaultShipping | Boolean | &check; | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is true. |
| isDefaultBilling | Boolean | &check; | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is true. |

### Response

<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": {
        "type": "addresses",
        "id": "5caa05f5-41f5-5e6c-a254-07d7887fb4e9",
        "attributes": {
            "salutation": "Mr",
            "firstName": "Spencor",
            "lastName": "Hopkin",
            "address1": "Third, 33, 11",
            "address2": "b",
            "address3": "aaa",
            "zipCode": "12312",
            "city": "Berlin",
            "country": "Germany",
            "iso2Code": "DE",
            "company": null,
            "phone": "22111-3-4-5",
            "isDefaultShipping": false,
            "isDefaultBilling": false
        },
        "links": {
            "self": "https://glue.mysprykershop.com/customers/DE--1/addresses/5caa05f5-41f5-5e6c-a254-07d7887fb4e9"
        }
    }
}
```

</details>

<a name="add-an-address-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| salutation | String | Salutation to use when addressing to the customer. |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| address1 | String | The 1st line of the customer's address. |
| address2 | String | The 2nd line of the customer's address. |
| address3 | String | The 3rd line of the customer's address. |
| zipCode | String | ZIP code. |
| city | String | Specifies the city. |
| country | String | Specifies the country. |
| iso2Code |   | Specifies an ISO 2 Country Code to use. |
| company | String | Specifies the customer's company. |
| phone | String | Specifies the customer's phone number. |
| isDefaultShipping | Boolean | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | Boolean | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

## Edit an address

To edit an address, send the request:

---
`PATCH` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses/*{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to edit the address of. [Create a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#create-a-customer) to get it. |
| ***{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}*** | Unique identifier of the address to edit. [Add an address](#add-an-address) to get it.  |

### Request

Request sample: `PATCH` **http://glue.mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b**

<details>
<summary markdown='span'>Request sample body</summary>

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| salutation | String | Salutation to use when addressing the customer. |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| address1 | String | The 1st line of the customer's address. |
| address2 | String | The 2nd line of the customer's address. |
| address3 | String | The 3rd line of the customer's address. |
| zipCode | String | ZIP code. |
| city | String | Specifies the city. |
| country | String | Specifies the country. |
| iso2Code | String | Specifies an ISO 2 Country Code to use. |
| company | String | Specifies the customer's company. |
| phone | String | Specifies the customer's phone number. |
| isDefaultShipping | Boolean | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | Boolean | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

### Response

<details>
<summary markdown='span'>Response sample</summary>

```json
{
		"data": {
			"type": "addresses",
			"id": 3a6ee102-007f-5245-aaec-af5b6e05685b,
			"attributes": {
				"salutation": "Mr",
				"firstName": "John",
				"lastName": "Doe",
				"address1": "11 Second Street",
				"address2": "4th Floor",
				"address3": "Suite 555",
				"zipCode": "12312",
				"city": "Berlin",
				"country": "United States",
				"iso2Code": "US",
				"company": null,
				"phone": "22111-3-4-5",
				"isDefaultShipping": false,
				"isDefaultBilling": false
			},
			"links": {
				"self": "http://glue.mysprykershop.com.com/customers/DE--25/addresses/"
			}
		}
	}
```

</details>

For response attributes, see [Add an address](#add-an-address-response-attributes).

## Retrieve a customer's addresses

To retrieve a list of customer's addresses, send the request:

---
`GET` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to retrieve the list of. [Create a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#create-a-customer) to get this id. |

### Request

Sample request: `GET http://glue.mysprykershop.com/customers/DE-25/addresses`


### Response

<details>
<summary markdown='span'>Response sample</summary>

```json
{
			"data": [
				{
					"type": "addresses",
					"id": "3a6ee102-007f-5245-aaec-af5b6e05685b",
					"attributes": {
						"salutation": "Mr",
						"firstName": "Jason",
						"lastName": "Voorhees",
						"address1": "123 Sleep Street",
						"address2": "123",
						"address3": null,
						"zipCode": "12345",
						"city": "Dresden",
						"country": "Germany",
						"iso2Code": "DE",
						"company": null,
						"phone": null,
						"isDefaultShipping": true,
						"isDefaultBilling": true
					},
					"links": {
						"self": "http://glue.mysprykershop.com/customers/DE--25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b"
					}
				},
				{
					"type": "addresses",
					"id": "5f00ce65-dd64-5b49-ad3c-f5fae475e7e6",
					"attributes": {
						"salutation": "Mr",
						"firstName": "John",
						"lastName": "Doe",
						"address1": "11 Second Street",
						"address2": "4th Floor",
						"address3": "Suite 555",
						"zipCode": "12312",
						"city": "Berlin",
						"country": "United States",
						"iso2Code": "US",
						"company": null,
						"phone": "22111-3-4-5",
						"isDefaultShipping": false,
						"isDefaultBilling": false
					},
					"links": {
						"self": "http://glue.mysprykershop.com/customers/DE--25/addresses/5f00ce65-dd64-5b49-ad3c-f5fae475e7e6"
					}
				}
			],
			"links": {
				"self": "http://glue.mysprykershop.com/customers/DE--25/addresses"
			}
	}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| salutation | String | Salutation to use when addressing the customer. |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| address1 | String | The 1st line of the customer's address. |
| address2 | String | The 2nd line of the customer's address. |
| address3 | String | The 3rd line of the customer's address. |
| zipCode | String | ZIP code. |
| city | String | Specifies the city. |
| country | String | Specifies the country. |
| iso2Code | String | Specifies an ISO 2 Country Code to use. |
| company | String | Specifies customer's company. |
| phone | String | Specifies customer's phone number. |
| isDefaultShipping | Boolean | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | Boolean | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

## Retrieve an address

To retrieve an address, send the request:

---
`GET` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses/*{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to retrieve the address of. [Create a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#create-a-customer) to get it. |
| ***{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}*** | Unique identifier of the address to retrieve. [Add an address](#add-an-address) to get it.  |

### Request

Request sample : `GET http://glue.mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`

### Response

<details>
<summary markdown='span'>Response sample</summary>

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| salutation | String | Salutation to use when addressing the customer |
| firstName | String | Customer's first name |
| lastName | String | Customer's last name |
| address1 | String | The 1st line of the customer's address |
| address2 | String | The 2nd line of the customer's address |
| address3 | String | The 3rd line of the customer's address |
| zipCode | String | ZIP code |
| city | String | Specifies the city |
| country | String | Specifies the country |
| iso2Code | String | Specifies an ISO 2 Country Code to use |
| company | String | Specifies the customer's company |
| phone | String | Specifies the customer's phone number |
| isDefaultShipping | Boolean | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | Boolean | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

If the request is successful, the endpoint returns **RestAddressesResponse** with the requested address.

## Delete an address

To delete an address, send the request:

---
`DELETE` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses/*{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to delete the address of. [Create a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customers.html#create-a-customer) to get it. |
| ***{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}*** | Unique identifier of the address to delete. [Add an address](#add-an-address) to get it.  |

### Request

Request sample: `DELETE http://glue.mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`

### Response

If the address is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 402 | Customer with the specified ID is not found. |
| 404 | Specified address cannot be found. |
| 405 | Customer reference is missing. |
| 409 | Failed to update an address. |
| 411 | Unauthorized request. |
| 412 | No address ID provided. |
| 901 | One of the following fields is not specified: `salutaion`, `firstName`, `lastName`, `city`, `address1`, `address2`, `zipCode`, `country`, `iso2Code`, `isDefaultShipping`, `isDefaultBilling` |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

## Next steps

* [Manage carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html)
* [Manage cart items](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-items-in-carts-of-registered-users.html)
* [Manage gift cards](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-gift-cards-of-registered-users.html)
* [Manage wishlists](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-wishlists/managing-wishlists.html)
* [Manage orders](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/retrieving-customer-orders.html)
* [Manage customer authentication tokens](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-authentication-tokens.html)
* [Manage customer passwords](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-passwords.html)
