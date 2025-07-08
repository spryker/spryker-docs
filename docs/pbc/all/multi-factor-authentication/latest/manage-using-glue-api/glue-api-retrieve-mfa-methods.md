---
title: "Glue API: Retrieve MFA methods"
description: This article explains how to retrieve available MFA methods for a user
last_updated: Jun 16, 2025
template: glue-api-storefront-guide-template
---


This document describes how to retrieve available Multi-Factor Authentication (MFA) methods. The endpoint also shows the status of each method for the user that requested them.

The email authentication method is used as an example. The endpoint supports all authentication methods implemented in your project.


## Installation

- [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/latest/install-multi-factor-authentication-feature.html)
- [Install Customer Email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/latest/install-customer-email-multi-factor-authentication-method.html)


## Retrieve MFA methods

To retrieve MFA methods and the user's status for each of them, send the request:


---
`GET` **/stores**

---


### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

```http
GET /multi-factor-auth-types
Authorization: Bearer <access_token>
```

### Response

```json
{
  "data": [
    {
      "type": "multi-factor-auth-types",
      "attributes": {
        "type": "email",
        "status": 0
      }
    }
  ]
}
```

| Status | Name                      | DESCRIPTION |
|--------|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | Disabled                  | MFA method is available but disabled for the user. Protected actions don't require MFA. |
| 1      | Activation is in progress | User initiated the MFA setup but didn't complete the verification. Protected actions don't require MFA. |
| 2      | Enabled                   | MFA method is enabled for the user. All protected actions require MFA. |





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

[Activate MFA](/docs/pbc/all/multi-factor-authentication/latest/glue-api-activate-and-deactivate-mfa.html)






































































