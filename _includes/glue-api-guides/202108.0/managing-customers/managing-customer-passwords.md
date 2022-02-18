---
title: Managing customer passwords
description: Change and reset customer password via Glue API
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-customer-passwords
originalArticleId: 51bec82b-e9f6-4c92-a87d-4f609d8176e8
redirect_from:
  - /2021080/docs/managing-customer-passwords
  - /2021080/docs/en/managing-customer-passwords
  - /docs/managing-customer-passwords
  - /docs/en/managing-customer-passwords
related:
  - title: Password Management overview
    link: docs/scos/user/features/page.version/customer-account-management-feature-overview/password-management-overview.html
---

The endpoints in this document allows you to manage customer passwords. You can change or reset a password.

## Installation

For details on the modules that provide the API functionality and how to install them, see [Glue API: Customer Access Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-customer-account-management-feature-integration.html).


## Change a customer's password

To change a customer's password, send the request:

---
`PATCH` **/customer-password/*{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}customerReference{% raw %}}}{% endraw %}*** | Customer reference that identifies the customer you want to update the password for. Should be the reference of customer the current access token is generated for. |

---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authenticates the customer you want to change the password of. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html). |


Request sample: `PATCH http://glue.mysprykershop.com/customer-password/DE--21`

```json
{
    "data": {
        "type": "customer-password",
        "id": "DE--21",
        "attributes": {
            "password": "change123",
            "newPassword": "321egnahc",
            "confirmPassword": "321egnahc"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| password | String | &check; | Specifies old password of a customer. |
| newPassword | String | &check; | Specifies the new password. |
| confirmPassword | String | &check; | Specifies password confirmation for password change. |

### Response

If password is changed successfully, the endpoint returns the `204 No Content` status code.

## Reset a customer's password

To reset a customer's password, you need to send several requests to different endpoints. To do that, follow the procedure below.

### 1. Request a password reset key

To request a password reset key, send the request:

---
`POST` **/customer-forgotten-password**

---

#### Request

Sample request: `POST https://glue.mysprykershop.com/customer-forgotten-password`

```json
{
  "data": {
    "type": "customer-forgotten-password",
    "attributes": {
        "email":"sonia@spryker.com"
    }
  }
}
```

#### Response

If the request is successful, the endpoint returns the `204 No Content` status code and the key is sent to the customer's email address.

### 2. Set a new password

To set a new password, send the request:

---
`PATCH` **/customer-restore-password/*{% raw %}{{{% endraw %}restorePasswordKey{% raw %}}}{% endraw %}***

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}restorePasswordKey{% raw %}}}{% endraw %}*** | This key can be any value, and does not have to be equal to `data.attributes.restorePasswordKey`. `data.attributes.restorePasswordKey` will be used for any operations with the customer's password. |

---

#### Request

Request sample: `PATCH https://glue.mysprykershop.com/customer-restore-password/98ffa3ecccac2b7f0815e0417784cd54`

```json
{
  "data": {
    "type": "customer-restore-password",
    "id": "98ffa3ecccac2b7f0815e0417784cd54",
    "attributes": {
        "restorePasswordKey": "98ffa3ecccac2b7f0815e0417784cd54",
        "password": "wwfh234fr943434cf",
        "confirmPassword": "wwfh234fr943434cf"
    }
  }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| restorePasswordKey | String | &check; | Unique  the Password Reset Key provided in the email sent to the customer. |
| password | String | &check; | Specifies the password to set. |
| passwordConfirmation | String | &check; | Specifies a password confirmation for password change. |

#### Response

If the password reset is successful, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
|   |   |
| 002 | Access token is missing. |
| 404 | Customer with the specified ID is not found.  |
| 406 | New password and password confirmation do not match. |
| 407 | Password change failed. |
| 408 | Old password is invalid.|
| 411 | Unauthorized request. |
| 415 | Password Reset Key is invalid. |
| 420 | The password character set is invalid.  |
| 422 | `newPassword` and `confirmPassword` values are not identic.  |
| 901 | `newPassword` and `confirmPassword` are not specified; or the password length is invalid (it should be from 8 to 64 characters). |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

## Next steps

[Authenticate as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/managing-customer-passwords.html)
