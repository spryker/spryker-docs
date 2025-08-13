---
title: "Glue API: Create customers"
description: Learn how you can create new customers within your Spryker store using the Spryker GLUE API.
last_updated: Nov 2, 2022
template: glue-api-storefront-guide-template
originalArticleId: 246e73d7-562f-414f-bbc0-d102ef54ff5c
redirect_from:
- /docs/pbc/all/identity-access-management/202204.0/manage-using-glue-api/glue-api-create-customers.html
related:
  - title: Authentication and authorization
    link: docs/dg/dev/glue-api/latest/rest-api/glue-api-authentication-and-authorization.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Confirming customer registration
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-confirm-customer-registration.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
  - title: Managing customer authentication tokens
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html
  - title: Managing customer authentication tokens via OAuth 2.0
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html
  - title: Managing customer passwords
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-customer-passwords.html
---



## Installation

For details on the modules that provide the API functionality and how to install them, see [Glue API: Customer Access Feature Integration](/docs/pbc/all/identity-access-management/latest/install-and-upgrade/install-the-customer-account-management-glue-api.html).


## Create a customer

To create a customer, send the request:

---
`POST` **/customers**

---

### Request

Request sample: create a customer

`POST http://glue.mysprykershop.com/customers`

```json
{
  "data": {
    "type": "customers",
    "attributes": {
        "salutation": "Mrs",
        "firstName":"Sonia",
        "lastName":"Wagner",
        "email":"sonia@spryker.com",
	"gender": "Female",
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
| gender | String | &check; | Specifies gender of the customer. |
| firstName | String | &check; | Specifies customer's first name. |
| lastName | String | &check;  | Specifies customer's last name. |
| password | String | &check;  | Specifies a password (7 characters or more) for the account of the new customer. This password will be used by the customer to access their account. |
| salutation | String | &check; | Specifies a salutation for a new customer. |



### Response

<details><summary>Response sample: create a customer</summary>

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

{% include /pbc/all/glue-api-guides/latest/customers-response-attributes.md %} <!-- To edit, see _includes/pbc/all/glue-api-guides/latest/customers-response-attributes.md -->




After creating a customer, users receive a verification email. The email contains a link with the token that confirms and finalizes the customer registration process. Customers click the verification link from the email and finish the registration. Alternatively, you can confirm the customer registration via API (see [Confirming customer registration](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-confirm-customer-registration.html)). After confirmation, you can authenticate as a customer to perform requests to the protected resources.
