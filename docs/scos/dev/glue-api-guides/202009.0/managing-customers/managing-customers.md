---
title: Managing customers
description: Learn how to manage customers via Glue API.
last_updated: Apr 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-customers-via-glue-api
originalArticleId: dc80d08b-f25f-44b7-b71f-298fcba9e28c
redirect_from:
  - /v6/docs/managing-customers-via-glue-api
  - /v6/docs/en/managing-customers-via-glue-api
---

The Customer API allows creating customers and managing their account data. This includes the possibility to maintain a set of customer addresses as separate resources. In the checkout process, you can retrieve and use these address resources to speed up the buying process. The API supports authentication via OAuth 2.0 and password restoration.

In your development, these resources can help you to:

* Retrieve relevant customer information for any page where it is needed
* Enable customer registration
* Allow customer login and authentication
* Enrich customer profiles with additional data such as addresses

## Installation
For details on the modules that provide the API functionality and how to install them, see [Glue API: Customer Access Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-account-management-feature-integration.html).

## Create a customer

To create a customer, send the request:

---
`POST` **/customers**

---

### Request

Request sample: `POST http://glue.mysprykershop.com/customers`

```json
{
  "data": {
    "type": "customers",
    "attributes": {
        "salutation": "Mrs",
        "firstName":"Sonia",
        "lastName":"Wagner",
        "email":"sonia@spryker.com",
        "password":"change123",
        "confirmPassword":"change123",
        "acceptedTerms":true
    }
  }
}
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| acceptedTerms | Boolean | &check; | Specifies whether the customer has accepted the terms of service. For a new customer to be created, this parameter needs to be set to true. |
| confirmPassword | String | &check;  | Specifies a password confirmation for the account of the new customer. |
| email | String | &check;  | Specifies customer's last email address. The address must be unique in the system. |
| firstName | String | &check; | Specifies customer's first name. |
| lastName | String | &check;  | Specifies customer's last name. |
| password | String | &check;  | Specifies a password (7 characters or more) for the account of the new customer. This password will be used by the customer to access their account. |
| salutation | String | &check; | Specifies a salutation for a new customer. |



### Response



<details open>
    <summary markdown='span'>Response sample</summary>
    
```json
{
	"data": {
		"type": "customers",
		"id": "DE--25",
		"attributes": {
			"firstName": "Sonia",
			"lastName": "Wagner",
			"gender": null,
			"dateOfBirth": null,
			"salutation": "Mr",
			"createdAt": "2018-11-06 08:15:02.694668",
			"updatedAt": "2018-11-06 08:15:02.694668"
		},
		"links": {
			"self": "http://glue.mysprykershop.com/customers/DE--25"
		}
	}
}
```
    
</details>

<a name="create-a-customer-response-attributes"></a>
         
| Attribute | Type | Description |
| --- | --- | --- |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| gender | String | Gender of the customer. |
| dateOfBirth | String | Customer's date of birth. |
| salutation | String | Salutation to use when addressing the customer. |
| createdAt | String | Account creation date. |
| updatedAt | String | Date of the last update. |



After creating a customer, they receive a verfication email. They click the verification link to confirm registration. After that, you can [authenticate as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html) to perform requests to the protected resources available to them.

## Retrieve customers

To retrieve customers, send the request:

***
`GET` **/customers/**
***

### Request 

| Header key | Header value | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Request sample: `GET https://glue.mysprykershop.com/customers`

### Response 

<details open>
    <summary markdown='span'>Response sample</summary>
    
```json
{
    "data": [
        {
            "type": "customers",
            "id": "DE--21",
            "attributes": {
                "firstName": "Sonia",
                "lastName": "Wagner",
                "email": "sonia@spryker.com",
                "gender": "Female",
                "dateOfBirth": null,
                "salutation": "Ms",
                "createdAt": "2020-10-07 07:02:32.683823",
                "updatedAt": "2020-10-07 07:02:32.683823"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/customers/DE--21"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/customers"
    }
}
```
</details>

See [Create a customer](#create-a-customer-response-attributes) to learn about the response attributes.

## Retrieve a customer

To retrieve information about a customer, send the request:

---
`GET` **/customers/*{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Unique identifier of the customer to get information for. This parameter is returned as the `id` attribute when [creating a customer](#create-a-customer).  |


### Request


| Header key | Header value | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Request sample: `GET http://glue.mysprykershop.com/customers/DE-25`


### Response

<details open>
    <summary markdown='span'>Response sample</summary>
    
```json
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
				"self": "http://glue.mysprykershop.com/customers/DE--25"
			}
		}
	}
```
    
</details>

| Attribute | Type | Description |
| --- | --- | --- |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| email | String | Customer's email address. |
| gender | String | Customer's gender. |
| dateOfBirth | String | Customer's date of birth. |
| salutation | String | Salutation to use when addressing the customer. |
| createdAt | String | Account creation date. |
| updatedAt | String | Date of the last update. |




## Edit a customer

To edit a customer account, send the request:

---
`PATCH` **/customers/*{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Unique identifier of the customer to edit. This parameter is returned as the `id` attribute when [creating a customer](#create-a-customer). If you've already created a customer, [retrieve customers](#retrieve-customers) to get it.  |


### Request

| Header key | Header value | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer which you want to edit. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Request sample: `PATCH http://glue.mysprykershop.com/customers/DE-25`

```json
{
		"data" : {
			"type": "customers"
			"attributes": {
					"lastName": "Sonia",
					"email": "sonia@spryker.com",
				}
		}
	}
	
```

### Response

<details open>
    <summary markdown='span'>Response sample</summary>
    
```json
{
		"data": {
			"type": "customers",
			"id": "DE--25",
			"attributes": {
				"firstName": null,
				"lastName": "Johnson",
				"salutation": null,
				"email": "sonia@spryker.com"
			},
			"links": {
				"self": "http://mysprykershop.com/customers/DE--25"
			}
		}
	}
```
    
</details>

| Attribute | Type | Description |
| --- | --- | --- |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| email | String | Customer's email address. |
| gender | String | Customer's gender. |
| dateOfBirth | String | Customer's date of birth. |
| salutation | String | Salutation to use when addressing the customer. |
| createdAt | String | Account creation date. |
| updatedAt | String | Date of the last update. |


## Anonymize a customer

To anonymize a customer, send the request: 

---
`DELETE` **/customers/*{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Unique identifier of the customer to anonimyze. This parameter is returned as the `id` attribute when [creating a customer](#create-a-customer). If you've already created a customer, [retrieve customers](#retrieve-customers) to get it.  |

### Request

| Header key | Header value | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer which you want to anonymize. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Sample request: `DELETE http://mysprykershop.com/customers/DE-25`

### Response

If the customer is anonymized successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| Code | Reason |
| --- | --- |
| 400 | Customer with the same email address already exists. |
| 402 | Customer with the specified ID was not found. |
| 405 | Customer reference is missing. |
| 410 | Failed to save changes. |
| 414 | Provided gender is invalid. |
| 422 | Terms of service were not accepted. Note that if you have the [REST Request Format](/docs/scos/dev/tutorials-and-howtos/introduction-tutorials/glue-api/validating-rest-request-format.html) validation enabled, then you will receive 901 instead of 422. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

## Next steps

* [Authenticate as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html)
* [Manage customer passwords](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-passwords.html)



