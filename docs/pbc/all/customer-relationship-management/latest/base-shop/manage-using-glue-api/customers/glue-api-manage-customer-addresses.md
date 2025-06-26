---
title: "Glue API: Manage customer addresses"
description: Learn how by using the Spryker Glue API you can Create, retrieve and delete customer addresses within your Spryker Project.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customer-addresses-via-glue-api
originalArticleId: 83f855ab-83ed-4a69-a087-196f88c0007b
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-customers/managing-customer-addresses.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-customers/managing-customer-addresses.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-customers/managing-customer-addresses.html
  - /docs/scos/dev/glue-api-guides/202200.0/managing-customers/managing-customer-addresses.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-customers/managing-customer-addresses.html
  - /docs/scos/dev/glue-api-guides/202204.0/managing-customers/managing-customer-addresses.html
related:
  - title: Managing Wishlists
    link: docs/pbc/all/shopping-list-and-wishlist/page.version/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html
  - title: Login & Registration Forms
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/customer-account-management-feature-overview/customer-login-overview.html
  - title: Password Management
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/customer-account-management-feature-overview/password-management-overview.html
  - title: Customer Accounts
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/customer-account-management-feature-overview/customer-account-management-feature-overview.html
  - title: Authentication and authorization
    link: docs/dg/dev/glue-api/page.version/rest-api/glue-api-authentication-and-authorization.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Confirming customer registration
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-confirm-customer-registration.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Managing customer authentication tokens
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html
  - title: Managing customer authentication tokens via OAuth 2.0
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html
  - title: Managing customers
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html
  - title: Managing customer passwords
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-passwords.html
  - title: Retrieve customer carts
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-customer-carts.html
  - title: Retrieving customer orders
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html
---

This endpoints allows retrieving and edit customer addresses.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Glue API: Customer Access Feature Integration](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-customer-account-management-glue-api.html).

## Add an address

To add an address to a customer, send the request:

---
`POST` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to add the address to. To get it, [Retrieve customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html#retrieve-customers) or [Create a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-create-customers.html#create-a-customer). |

### Request

Request sample: add an address

`POST http://glue.mysprykershop.com/customers/DE--1/addresses`

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

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| customer_reference | String | &check; | Unique identifier of the customer to add the address to. To get it, [Retrieve customers](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html#retrieve-customers) or [Create a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-create-customers.html#create-a-customer) |
| salutation | String | &check; | Salutation to use when addressing the customer. |
| firstName | String | &check; | Customer's first name. |
| lastName | String | &check; | Customer's last name. |
| address1 | String | &check; | The first line of the customer's address. |
| address2 | String | &check; | The second line of the customer's address. |
| address3 | String | &check; | The third line of the customer's address. |
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
<summary>Response sample: add an address</summary>

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

{% include pbc/all/glue-api-guides/latest/addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/addresses-response-attributes.md -->


## Edit an address

To edit an address, send the request:

---
`PATCH` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses/*{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to edit the address of. [Create a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-create-customers.html#create-a-customer) to get it. |
| ***{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}*** | Unique identifier of the address to edit. [Add an address](#add-an-address) to get it.  |

### Request

Request sample: edit an address

`PATCH http://glue.mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`

<details>
<summary>Request sample body</summary>

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| salutation | String | Salutation to use when addressing the customer. |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| address1 | String | The first line of the customer's address. |
| address2 | String | The second line of the customer's address. |
| address3 | String | The third line of the customer's address. |
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
<summary>Response sample: edit an address</summary>

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

{% include pbc/all/glue-api-guides/latest/addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/addresses-response-attributes.md -->

## Retrieve customer's addresses

To retrieve a list of customer's addresses, send the request:

---
`GET` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to retrieve the list of. [Create a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-create-customers.html#create-a-customer) to get this id. |

### Request

Request sample: retrieve customer's addresses

`GET http://glue.mysprykershop.com/customers/DE-25/addresses`


### Response

<details>
<summary>Response sample: retrieve customer's addresses</summary>

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

{% include pbc/all/glue-api-guides/latest/addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/addresses-response-attributes.md -->

## Retrieve an address

To retrieve an address, send the request:

---
`GET` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses/*{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to retrieve the address of. [Create a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-create-customers.html#create-a-customer) to get it. |
| ***{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}*** | Unique identifier of the address to retrieve. [Add an address](#add-an-address) to get it.  |

### Request

Request sample: retrieve an address

`GET http://glue.mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`

### Response

<details>
<summary>Response sample: retrieve an address</summary>

</details>

{% include pbc/all/glue-api-guides/latest/addresses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/addresses-response-attributes.md -->

## Delete an address

To delete an address, send the request:

---
`DELETE` **/customers/*{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*/addresses/*{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}*** | Unique identifier of the customer to delete the address of. [Create a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-create-customers.html#create-a-customer) to get it. |
| ***{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}*** | Unique identifier of the address to delete. [Add an address](#add-an-address) to get it.  |

### Request

Request sample: delete an address

`DELETE http://glue.mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`

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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).

## Next steps

- [Manage carts](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)
- [Manage cart items](/docs/pbc/all/cart-and-checkout/latest/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)
- [Manage gift cards](/docs/pbc/all/gift-cards/latest/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html)
- [Manage wishlists](/docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html)
- [Manage orders](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html)
- [Manage customer authentication tokens](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html)
- [Manage customer passwords](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-passwords.html)
