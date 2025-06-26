---
title: "Glue API: Activate and deactivate MFA"
description: This article explains how to activate and decativate MFA methods using Glue API
last_updated: Jun 16, 2025
template: glue-api-storefront-guide-template
---

This document describes how to activate MFA emthods to send requests to protected resources. To check if MFA is activated for your user, see [Retrieve MFA methods](/docs/pbc/all/multi-factor-authentication/202505.0/manage-using-glue-api/glue-api-retrieve-mfa-methods.html).


## Installation

- [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html)
- [Install Customer Email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-customer-email-multi-factor-authentication-method.html)



## Request MFA code

An MFA code is needed for both activating and deactivating MFA.

To request an MFA code, send the request:

---
`POST` **/multi-factor-auth-type-activate**

---

### Request 

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

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
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

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
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. To get the value, [authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user), [authenticate as a customer](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-customer.html), or [authenticate as a Back Office user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

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


`204 No Content` response means that the the MFA method has been deactivated for the user.











































