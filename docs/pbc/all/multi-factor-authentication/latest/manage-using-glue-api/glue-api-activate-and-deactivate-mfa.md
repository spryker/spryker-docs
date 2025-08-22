---
title: "Glue API: Activate and deactivate MFA"
description: This article explains how to activate and decativate MFA methods using Glue API
last_updated: Aug 22, 2025
template: glue-api-storefront-guide-template
---

This document describes how to activate Multi-Factor Authentication (MFA) methods to send requests to protected resources. To check if MFA is activated for your user, see [Retrieve MFA methods](/docs/pbc/all/multi-factor-authentication/latest/manage-using-glue-api/glue-api-retrieve-mfa-methods.html).

The email authentication method is used as an example. The endpoint supports all authentication methods implemented in your project.


## Installation

- [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html)
- [Install Customer Email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/latest/install-email-multi-factor-authentication-method.html)



## Request MFA code

An MFA code is needed for both activating and deactivating MFA.

To request an MFA code, send the request:

---
`POST` **/multi-factor-auth-type-activate**

---

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

```http
POST /multi-factor-auth-type-activate
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "data": {
    "type": "multi-factor-auth-type-activate",
    "attributes": {
      "type": "email"
    }
  }
}
```

### Response

`204 No Content` response means that the code has been sent to the method specified in the request.

## Submit MFA activation code

To request an MFA activation code, see [Request MFA code](#request-mfa-code).

To submit MFA verification code, send the request:

---
`POST` **/multi-factor-auth-type-verify**

---


### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

```http
POST /multi-factor-auth-type-verify
Authorization: Bearer <access_token>
X-MFA-Code: 123456
Content-Type: application/json

{
  "data": {
    "type": "multi-factor-auth-type-verify",
    "attributes": {
      "type": "email"
    }
  }
}
```

### Response

`204 No Content` response means that the the MFA method has been activated for the user.




## Submit MFA deactivation code

To request an MFA deactivation code, see [Request MFA code](#request-mfa-code).

To submit MFA verification code, send the request:

---
`POST` **/multi-factor-auth-type-deactivate**

---


### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

```http
POST /multi-factor-auth-type-deactivate
Authorization: Bearer <access_token>
X-MFA-Code: 123456
Content-Type: application/json

{
  "data": {
    "type": "multi-factor-auth-type-deactivate",
    "attributes": {
      "type": "email"
    }
  }
}
```

### Response


`204 No Content` response means that the MFA method has been deactivated for the user.





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



## Next step

[Authenticate through MFA](/docs/pbc/all/multi-factor-authentication/latest/manage-using-glue-api/glue-api-authenticate-through-mfa.html)
































