---
title: "Glue API: Authenticate through MFA"
description: This article explains how to retrieve an MFA methods code and send requests to protected resources
last_updated: Jun 16, 2025
template: glue-api-storefront-guide-template
---

This document describes how to authenticate through Multi-Factor Authentication (MFA) to send requests to protected resources. 

For the list of protected resources, see [Multi-Factor Authentication in Glue API](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication-in-glue-api.html).

The email authentication method is used as an example.


## Installation

- [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html)
- [Install Customer Email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-customer-email-multi-factor-authentication-method.html)


## Prerequisites

[Activate MFA for your user](/docs/pbc/all/multi-factor-authentication/202505.0/manage-using-glue-api/glue-api-activate-and-deactivate-mfa.html)


## Request an MFA code

To request an MFA code, sent the request:

---
`POST` **/multi-factor-auth-trigger**

---


### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

```http
POST /multi-factor-auth-trigger
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "data": {
    "type": "multi-factor-auth-trigger",
    "attributes": {
      "type": "email"
    }
  }
}
```

### Response

`204 No Content` — means that the code has been sent through the requested method.

The default grace period allows the authenticated account to send requests to protected resources for 30 minutes. 


## Send requests to protected resources with MFA

Include the MFA code you've received in the `X-MFA-Code` header when calling protected endpoints.

### Example request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |
| X-MFA-Code | string | ✓ | String containing digits, letters, and symbols that authorize the user through MFA. To get the value, [request an MFA code](#request-an-mfa-code).  |

This example request shows how to change account password with MFA:

```http
PATCH /customer-password/DE--42
Authorization: Bearer <access_token>
X-MFA-Code: <your_mfa_code>
Content-Type: application/json

{
  "data": {
    "type": "customer-password",
    "attributes": {
      "password": "oldPass123",
      "newPassword": "NewPass456!",
      "confirmPassword": "NewPass456!"
    }
  }
}
```

### Example error response 

A successful response doesn't contain any MFA related information. However, an unsuccessful response might contain such information:

```json
{
  "errors": [
    {
      "status": 403,
      "code": "5900",
      "detail": "X-MFA-Code header is missing."
    }
  ]
}
```


## Possible errors

| Code | Constant                                           | Meaning                          |
|------|----------------------------------------------------|----------------------------------|
| 5900 | ERROR_CODE_MULTI_FACTOR_AUTH_CODE_MISSING          | X-MFA-Code header is missing.    |
| 5901 | ERROR_CODE_MULTI_FACTOR_AUTH_CODE_INVALID          | X-MFA-Code is invalid.           |
| 5902 | ERROR_CODE_MULTI_FACTOR_AUTH_TYPE_MISSING          | MFA type is missing.             |
| 5903 | ERROR_CODE_MULTI_FACTOR_AUTH_DEACTIVATION_FAILED   | Failed to deactivate MFA.        |
| 5904 | ERROR_CODE_MULTI_FACTOR_AUTH_VERIFY_FAILED         | MFA type already activated.      |
| 5905 | RESPONSE_CODE_NO_CUSTOMER_IDENTIFIER               | No customer identifier provided. |
| 5906 | ERROR_CODE_MULTI_FACTOR_AUTH_TYPE_NOT_FOUND        | MFA type is not found.           |
| 5907 | RESPONSE_CUSTOMER_NOT_FOUND                        | Customer not found.              |
| 5908 | RESPONSE_USER_NOT_FOUND                            | User not found.                  |
| 5909 | RESPONSE_CODE_NO_USER_IDENTIFIER                   | No user identifier provided.     |



















