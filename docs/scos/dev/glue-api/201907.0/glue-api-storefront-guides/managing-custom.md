---
title: Managing Customers
originalLink: https://documentation.spryker.com/v3/docs/managing-customers-api
redirect_from:
  - /v3/docs/managing-customers-api
  - /v3/docs/en/managing-customers-api
---

The Customer API provides functionality for the creation of customers and administration of their account data. This administration includes the possibility to maintain a set of customer addresses as separate resources. In checkout process, these address resources can be retrieved and used to speed up the buying process. On the authentication side, the API supports authentication via OAuth 2.0 protocol and password restoring functionality.

In your development, these resources can help you to:

* Retrieve relevant customer information for any page where customer information is needed
* Enable customer registration
* Allow customer login/authentication
* Enrich customer profiles with additional data such as addresses

## Installation
For details on the modules that provide the API functionality and how to install them, see [Customer API Feature Integration](/docs/scos/dev/migration-and-integration/201903.0/feature-integration-guides/glue-api/customer-api-fe).

## Creating a Customer
To create a new customer user, send a POST request to the following endpoint:
`/customers`
Sample request: `POST http://mysprykershop.com/customers`
Attributes:
| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| acceptedTerms | Boolean | ✓ | Specifies whether the customer has accepted the terms of service. For a new customer to be created, this parameter needs to be set to true. |
| confirmPassword | String | ✓ | Specifies a password confirmation for the account of the new customer. |
| email | String | ✓ | Specifies customer's last email address. The address must be unique in the system. |
| firstName | String | ✓ | Specifies customer's first name. |
| lastName | String | ✓ | Specifies customer's last name. |
| password | String | ✓ | Specifies a password (7 characters or more) for the account of the new customer. This password will be used by the customer to access their account. |
| salutation | String | ✓ | Specifies a salutation for a new customer. |

**Sample request body**
```js
{
  "data": {
    "type": "customers",
    "attributes": {
        "salutation": "Mr",
        "firstName":"John",
        "lastName":"Doe",
        "email":"jdoe@example.com",
        "password":"change123",
        "confirmPassword":"change123",
        "acceptedTerms":true
    }
  }
}
```

If a customer was created successfully, the endpoint will respond with a **RestCustomersResponse**.

**Sample response**
```js
{
	"data": {
		"type": "customers",
		"id": "DE--25",
		"attributes": {
			"firstName": "John",
			"lastName": "Doe",
			"gender": null,
			"dateOfBirth": null,
			"salutation": "Mr",
			"createdAt": "2018-11-06 08:15:02.694668",
			"updatedAt": "2018-11-06 08:15:02.694668"
		},
		"links": {
			"self": "http://mysprykershop.com/customers/DE--25"
		}
	}
}
```

After a customer has been created, you can authenticate them in the REST API and perform actions on their behalf. For details, see Authentication and Authorization. The **id** attribute of the **RestCustomersResponse** specifies a unique customer identifier that can later be used to access the new customer via REST API requests.

| Field* | Type | Description |
| --- | --- | --- |
| firstName | String | Customer's first name |
| lastName | String | Customer's last name |
| gender | String | Gender of the customer |
| dateOfBirth | String | Customer's date of birth |
| salutation | String | Salutation to use when addressing the customer |
| createdAt | String | Account creation date |
| updatedAt | String | Date of the last update |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

### Possible Errors
| Code | Reason |
| --- | --- |
| 422 | Terms of service were not accepted |
| 400 | A customer with the same email address already exists |
| 414 | The provided gender is invalid |

## Retrieving Customer Information
To retrieve information about a customer, use the following endpoint:
`/customers/{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/customers/DE-25`
where `DE-25` is the unique identifier of the customer you want to retrieve.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

If a customer with the specified ID was found, the endpoint will respond with a **RestCustomersRequest**.

**Sample response**
```js
{
		"data": {
			"type": "customers",
			"id": "DE--25",
			"attributes": {
				"firstName": "John",
				"lastName": "Doe",
				"gender": null,
				"dateOfBirth": null,
				"salutation": "Mr",
				"createdAt": "2018-11-06 08:15:02.694668",
				"updatedAt": "2018-11-06 08:15:02.694668"
			},
			"links": {
				"self": "http://mysprykershop.com/customers/DE--25"
			}
		}
	}
```

| Field* | Type | Description |
| --- | --- | --- |
| firstName | String | Customer's first name |
| lastName | String | Customer's last name |
| email | String | Customer's email address |
| gender | String | Customer's gender |
| dateOfBirth | String | Customer's date of birth |
| salutation | String | Salutation to use when addressing the customer |
| createdAt | String | Account creation date |
| updatedAt | String | Date of the last update |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

### Possible Errors:

| Code | Reason |
| --- | --- |
| 402 | A customer with the specified ID was not found |
| 405 | Customer reference is missing |

## Editing a Customer
To modify an existing customer account, send a _PATCH_ request to the following endpoint:
`/customers/{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}`

{% info_block infoBox "Modifying Customer Addresses " %}
You need to use specialized endpoints to retrieve and manage addresses registered for a customer. For details, see [Managing the List of Customer Addresses](https://documentation.spryker.com/v4/docs/managing-customers-api#managing-the-list-of-customer-addresses
{% endinfo_block %}.)

Sample request: `PATCH http://mysprykershop.com/customers/DE-25`
where `DE-25` is the unique identifier of the customer you want to modify.

{% info_block warningBox "Authentication " %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

To modify a customer, the client must send a **RestCustomersRequest**.

**Sample request**
```js
{
		"data" : {
			"type": "customers"
			"attributes": {
					"lastName": "Johnson",
					"email": "example@mail.com",
				}
		}
	}
	
```

If a customer is modified successfully, the endpoint will respond with a **RestCustomersResponse**.

**Sample response**
```js
{
		"data": {
			"type": "customers",
			"id": "DE--25",
			"attributes": {
				"firstName": null,
				"lastName": "Johnson",
				"salutation": null,
				"email": "example@mail.com"
			},
			"links": {
				"self": "http://mysprykershop.com/customers/DE--25"
			}
		}
	}
```

| Field* | Type | Description |
| --- | --- | --- |
| firstName | String | Customer's first name |
| lastName | String | Customer's last name |
| email | String | Customer's email address |
| gender | String | Customer's gender |
| dateOfBirth | String | Customer's date of birth |
| salutation | String | Salutation to use when addressing the customer |
| createdAt | String | Account creation date |
| updatedAt | String | Date of the last update |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

### Possible Errors
| Code | Reason |
| --- | --- |
| 402 | A customer with the specified ID was not found |
| 405 | Customer reference is missing |
| 410 | Failed to save changes |
| 414 | The provided gender is invalid |

## Managing the List of Customer Addresses
Customers can provide a set of addresses used for billing, goods delivery, and other purposes. The **Customer API** provides a set of endpoints to manage addresses of a registered customer.

{% info_block warningBox "Authentication " %}
Only authenticated users can manage customer addresses. For details on how to authenticate a customer, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

## Adding an Address
To add an address to a customer, send a _POST_ request to the following endpoint:
`/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses`
Sample request: `POST http://mysprykershop.com/customers/DE-25/addresses`
where `DE-25` is the unique identifier of the customer you want to add an address to.

The POST data must contain a **RestAddressesRequest**.

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| salutation | String | ✓ | Salutation to use when addressing the customer |
| firstName | String | ✓ | Customer's first name |
| lastName | String | ✓ | Customer's last name |
| address1 | String | ✓ | The 1st line of the customer's address |
| address2 | String | ✓ | The 2nd line of the customer's address |
| address3 | String | ✓ | The 3rd line of the customer's address |
| zipCode | String | ✓ | ZIP code |
| city | String | ✓ | Specifies the city |
| country | String | ✓ | Specifies the country |
| company | String | ✓ | Customer's company |
| phone | String | ✓ | Customer's phone number |
| isDefaultShipping | Boolean | ✓ | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is true. |
| isDefaultBilling | Boolean | ✓ | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is true. |
| iso2Code | String | ✓ | Specifies an ISO 2 Country Code to use |

**Sample request body**
```js
{
		"data" : {
			"type": "addresses",
			"attributes": {
					"salutation": "Mr",
					"firstName": "John",
					"lastName": "Doe",
					"address1": "11 Second Street",
					"address2": "4th Floor",
					"address3": "Suite 555",
					"zipCode": "12312",
					"city": "Berlin",
					"country": "Germany",
					"iso2Code": "DE"
					"phone": "22111-3-4-5",
					"isDefaultShipping": false,
					"isDefaultBilling": false
				}
		
```

If the address was created successfully, the endpoint will respond with a **RestAddressesResponse**.

**Sample response**
```js
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
				"self": "http://mysprykershop.com.com/customers/DE--25/addresses/"
			}
		}
	}
```

The **id** attribute of the response will contain a unique identifier of the address that was created. You can use the ID to view and edit the address in the future.

**Sample response**

| Field* | Type | Description |
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
| isDefaultShipping | String | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | String | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

## Modifying an Address

To modify an address, send a PATCH request to the following endpoint:
`/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses/{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}`
Sample request: `PATCH http://mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`
where `DE-25` is the unique identifier of the customer you want to modify an address for, and `3a6ee102-007f-5245-aaec-af5b6e05685b` is the ID of the address you want to change.
The POST data must contain a **RestAddressesRequest**. The attributes and format of the request are the same as when creating an address.

| Field* | Type | Description |
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
| isDefaultShipping | String | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | String | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample response**

The same as when creating an address, in case, if the request is successful, the endpoint returns a **RestAddressesResponse** with updated data.

## Getting all Addresses of a Customer
To get all the addresses of a user, use the following endpoint:
`/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses`
Sample request: `GET http://mysprykershop.com/customers/DE-25/addresses`
where `DE-25` is the unique identifier of the customer whose address you want to get.

| Field* | Type | Description |
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
| iso2Code | String | Specifies an ISO 2 Country Code to use. |
| company | String | Specifies customer's company |
| phone | String | Specifies customer's phone number |
| isDefaultShipping | String | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | String | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample response**

If the request was successful, the endpoint would return **RestAddressesResponse** with all the customer's addresses.

**Example**
```js
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
						"self": "http://mysprykershop.com/customers/DE--25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b"
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
						"self": "http://mysprykershop.com/customers/DE--25/addresses/5f00ce65-dd64-5b49-ad3c-f5fae475e7e6"
					}
				}
			],
			"links": {
				"self": "http://mysprykershop.com/customers/DE--25/addresses"
			}
	}
```

## Getting a Specific Address
To get a specific address by ID, use the following endpoint:
`/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses/{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`
where `DE-25` is the unique identifier of the customer whose address you want to get, and `3a6ee102-007f-5245-aaec-af5b6e05685b` is the ID of the address you need.

**Sample response**

| Field* | Type | Description |
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
| isDefaultShipping | String | Specifies whether the address should be used as the default shipping address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |
| isDefaultBilling | String | Specifies whether the address should be used as the default billing address of the customer. If the parameter is not set, the default value is **true**. This is also the case for the first address to be saved. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the request is successful, the endpoint returns **RestAddressesResponse** with the requested address.

## Deleting an Address
To delete an address, use the following endpoint:
`/customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses/{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %}`
Sample request: `DELETE http://mysprykershop.com/customers/DE-25/addresses/3a6ee102-007f-5245-aaec-af5b6e05685b`
where `DE-25` is the unique identifier of the customer whose address you want to delete, and `3a6ee102-007f-5245-aaec-af5b6e05685b` is the ID of the necessary address.

**Sample response**

If the address is deleted successfully, the endpoint will respond with the **204 No Content** status code.

### Possible Errors
| Code | Reason |
| --- | --- |
| 402 | A customer with the specified ID was not found |
| 404 | The specified address could not be found |
| 405 | Customer reference is missing |
| 409 | Failed to update an address |
| 411 | Unauthorized request |
| 412 | No address ID provided |

## Changing Customer's Password
To change a password for a customer, use PATCH method and the following endpoint:
`/customer-password`
Sample request: `PATCH http://mysprykershop.com/customer-password`

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

**Attributes:**
| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| password | String | ✓ | Specifies old password of a customer |
| newPassword | String | ✓ | Specifies the new password |
| confirmPassword | String | ✓ | Specifies password confirmation for password change. |

**Sample request body**
```js
{
    "data": {
        "type": "customer-password",
        "attributes": {
            "password": "change123",
            "newPassword": "321egnahc",
            "confirmPassword": "321egnahc"
        }
    }
}
```

**Sample Response**

If password is changed successfully, the endpoint will respond with the **204 No Content** status code.

### Possible Errors:
| Code | Reason |
| --- | --- |
| 406 | The new password and password confirmation do not match |
| 407 | Password change failed |
| 408 | Invalid password |

## Resetting Customer's Password
In case customer forgets their password, Glue API also provides the possibility to reset it. For this purpose, you need to use the following procedure:

1. Send a POST request to the following endpoint: 
`/customer-forgotten-password`
Sample request: `POST http://mysprykershop.com/customer-forgotten-password`
**Sample Request Body**
    ```js
    {
      "data": {
        "type": "customer-forgotten-password",
        "attributes": {
            "email":"jdo@example.com"
        }
      }
    ```
    If the request was successful, the endpoint will respond with the 204 No Content status point, an email with a password reset link will be sent to the customer. The email will contain a **Password Reset Key**.
    
2. Send a PATCH request to the following endpoint: 
`/customer-restore-password`
Sample request: `PATCH http://mysprykershop.com/customer-restore-password`
**Attributes:**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| restorePasswordKey | String | ✓ | Specifies the Password Reset Key provided in the email sent to the customer. |
| password | String | ✓ | Specifies the password. |
| passwordConfirmation | String | ✓ | Specifies a password confirmation for password change. |

**Sample request body**
```js
{
  "data": {
    "type": "customer-restore-password",
    "attributes": {
        "restorePasswordKey":"9de02f7a4e08dcdf06e6b24add1e01da",
        "password":"new_pssword",
        "confirmPassword":"new_pssword"
    }
  }
}
```
If the password reset was successful, the endpoint will respond with the **204 No Content** status code.

### Possible Errors
| Code | Reason |
| --- | --- |
| 406 | The new password and password confirmation do not match |
| 408 | Invalid password |
| 411 | Unauthorized request |
| 415 | The Password Reset Key is invalid |

## Anonymizing a Customer
To anonymize a customer account, send a DELETE request to the following endpoint: 
`/customers/{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}`
Sample request: `DELETE http://mysprykershop.com/customers/DE-25`
where `DE-25` is the unique identifier of the customer you want to anonymize.
**Sample response**

If the customer is anonymized successfully, the endpoint will respond with the **204 No Content** status code.
