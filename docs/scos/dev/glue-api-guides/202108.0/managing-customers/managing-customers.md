---
title: Managing customers
description: Learn how to manage customers via Glue API.
last_updated: Jun 18, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customers-via-glue-api
originalArticleId: 246e73d7-562f-414f-bbc0-d102ef54ff5c
redirect_from:
  - /2021080/docs/managing-customers-via-glue-api
  - /2021080/docs/en/managing-customers-via-glue-api
  - /docs/managing-customers-via-glue-api
  - /docs/en/managing-customers-via-glue-api
---

The Customer API allows creating customers and manage their account data. This includes the possibility to maintain a set of customer addresses as separate resources. In the checkout process, you can retrieve and use these address resources to speed up the buying process. The API supports authentication via OAuth 2.0 and password restoration.

In your development, these resources can help you:

* Retrieve relevant customer information. for any page where it is needed.
* Retrieve customer subscriptions to availability notifications.
* Enable customer registration.
* Allow customer login and authentication.
* Enrich customer profiles with additional data such as addresses.

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


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| acceptedTerms | Boolean | &check; | Specifies whether the customer has accepted the terms of service. For a new customer to be created, this parameter needs to be set to true. |
| confirmPassword | String | &check;  | Specifies a password confirmation for the account of the new customer. |
| email | String | &check;  | Specifies customer's last email address. The address must be unique in the system. |
| firstName | String | &check; | Specifies customer's first name. |
| lastName | String | &check;  | Specifies customer's last name. |
| password | String | &check;  | Specifies a password (7 characters or more) for the account of the new customer. This password will be used by the customer to access their account. |
| salutation | String | &check; | Specifies a salutation for a new customer. |



### Response

<details><summary markdown='span'>Response sample</summary>

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

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| firstName | String | Customer's first name. |
| lastName | String | Customer's last name. |
| gender | String | Gender of the customer. |
| dateOfBirth | String | Customer's date of birth. |
| salutation | String | Salutation to use when addressing the customer. |
| createdAt | String | Account creation date. |
| updatedAt | String | Date of the last update. |



After creating a customer, users receive a verification email. The email contains a link with the token that confirms and finalizes the customer registration process. Customers click the verification link from the email and finish the registration. Alternatively, you can confirm the customer registration via API (see [Confirming customer registration](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/confirming-customer-registration.html)). After confirmation, you can authenticate as a customer to perform requests to the protected resources.

## Retrieve customers

To retrieve customers, send the request:

***
`GET` **/customers/**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Request sample: `GET https://glue.mysprykershop.com/customers`

### Response

<details><summary markdown='span'>Response sample</summary>

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

| PATH PARAMETER| DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Unique identifier of the customer to get information for. This parameter is returned as the `id` attribute when [creating a customer](#create-a-customer).  |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Request sample: `GET http://glue.mysprykershop.com/customers/DE-25`


### Response

<details><summary markdown='span'>Response sample</summary>

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

| ATTRIBUTE | TYPE | DESCRIPTION |
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

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Unique identifier of the customer to edit. This parameter is returned as the `id` attribute when [creating a customer](#create-a-customer). If you've already created a customer, [retrieve customers](#retrieve-customers) to get it.  |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer which you want to edit. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Request sample: `PATCH http://glue.mysprykershop.com/customers/DE-25`

```json
{
		"data" : {
			"type": "customers"
			"attributes": {
					"lastName": "Johnson",
					"email": "sonia@spryker.com",
				}
		}
	}

```

### Response

<details><summary markdown='span'>Response sample</summary>

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

| ATTRIBUTE | TYPE | DESCRIPTION |
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

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Unique identifier of the customer to anonimyze. This parameter is returned as the `id` attribute when [creating a customer](#create-a-customer). If you've already created a customer, [retrieve customers](#retrieve-customers) to get it.  |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the customer which you want to anonymize. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

Sample request: `DELETE http://mysprykershop.com/customers/DE-25`

### Response

If the customer is anonymized successfully, the endpoint returns the `204 No Content` status code.

## Retrieve subscriptions to availability notifications

To retrieve subscriptions to availability notifications, send the following:

{% info_block warningBox %}
This request is available for registered customers only.
{% endinfo_block %}

---
`GET` **/customers/*{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*/availability-notifications**

---

| PATH PARAMETER | DESCRIPTION |
|-|-|
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Unique identifier of the customer to retrieve the subscriptions of. This parameter is returned as the id attribute when creating a customer or retrieving a customer. |

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the customer or company user to send requests to protected resources. Get it by [authenticating as a customer] |

### Request

Request sample: `GET https://glue.mysprykershop.com/customers/DE--21/availability-notifications`

### Response

<details><summary markdown='span'>Response sample</summary>

```json
{
    "data": [
        {
            "type": "availability-notifications",
            "id": "d634981b8d1930f7db6e2780b7d5600a",
            "attributes": {
                "localeName": "en_US",
                "email": "sonia@spryker.com",
                "sku": "190_25111746"
            },
            "links": {
                "self": "https://glue.69.demo-spryker.com:80/availability-notifications/d634981b8d1930f7db6e2780b7d5600a"
            }
        }
    ],
    "links": {
        "self": "https://glue.69.demo-spryker.com:80/customers/DE--21/availability-notifications"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| localeName | string | Locale of the subscribed customer. |
| email | string | Customer email where the product availability email notifications are sent to. |
| sku | string | SKU of the product the user receives notifications about. |

## Other management options

There is an alternative way to retrieve existing subscriptions, for details see [Retrieving subscriptions to availability notifications](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/managing-availability-notifications/retrieving-subscriptions-to-availability-notifications.html).

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 400 | Customer with the same email address already exists. |
| 402 | Customer with the specified ID was not found. |
| 405 | Customer reference is missing. |
| 406 | New password and password confirmation do not match. |
| 410 | Failed to save changes. |
| 414 | Provided gender is invalid. |
| 420 | The password character set is invalid. |
| 422 | `newPassword` and `confirmPassword` values are not identic. |
| 802 | Request is unauthorized. |
| 901 | Indicates one of the following reasons:<ul><li>Terms of service were not accepted. Note that if you don't have the [REST Request Format](/docs/scos/dev/tutorials-and-howtos/introduction-tutorials/glue-api/validating-rest-request-format.html) validation enabled, then you will recieve the `422` status code instead of the `901` error code.</li><li> `newPassword` and `confirmPassword` are not specified.</li><li>Password length is invalid (it should be from 8 to 64 characters).</li></ul> |
| 4606 | Request is unauthorized.|


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

## Next steps

* [Authenticate as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-passwords.html)
* [Manage customer passwords](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-passwords.html)
