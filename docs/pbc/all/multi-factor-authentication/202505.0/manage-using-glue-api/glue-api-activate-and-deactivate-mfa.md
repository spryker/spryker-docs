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



## Activate MFA

To activate MFA, send the request:

---
`POST` **/multi-factor-auth-type-activate**

---

### Request 

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

To submit MFA verification code, send the request:

---
`POST` **/multi-factor-auth-type-verify**

### Request

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




## 4) Deactivate an MFA Method

To remove an active MFA method, you must first [trigger the code](#3.1-trigger-mfa) (if needed), and then call the deactivation endpoint with the received code.

Request

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















































