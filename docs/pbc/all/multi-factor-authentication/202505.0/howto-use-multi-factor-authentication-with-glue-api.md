---
title: How to Use Multi-Factor Authentication with Glue API
description: Learn how to create and implement your own Multi-Factor Authentication method in Spryker.
template: howto-guide-template
last_updated: Apr 7, 2025
related:
  - title: Multi-Factor Authentication Feature overview
    link: docs/pbc/all/multi-factor-authentication/page.version/multi-factor-authentication.html
  - title: Install the Multi-Factor Authentication feature
    link: docs/pbc/all/multi-factor-authentication/page.version/install-multi-factor-authentication-feature.html
  - title: Install Customer Email Multi-Factor Authentication method
    link: docs/pbc/all/multi-factor-authentication/page.version/install-customer-email-multi-factor-authentication-method.html
  - title: Create Multi-Factor Authentication methods
    link: docs/pbc/all/multi-factor-authentication/page.version/create-multi-factor-authentication-methods.html
---

This guide explains how to activate, deactivate, and use Multi-Factor Authentication (MFA) through Glue REST API. 

To lean more about MFA methods, see [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication.html).

{% info_block infoBox "MFA Type Used in This Guide" %}

This guide demonstrates the Multi-Factor Authentication (MFA) flow using the email MFA method. If you're implementing other MFA types, adapt the type field in the request payloads accordingly.

{% endinfo_block %}

## Prerequisites

[Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html)
[Install Customer Email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-customer-email-multi-factor-authentication-method.html)

## 1) Get Available MFA Methods

To determine the list of all available MFA methods in the system (regardless of whether they've been activated or not) and the user's status for each method, request the list of available methods.


**Why?**

Before you proceed, you need to know:
 - whether the user has any MFA methods configured,
 - and whether those methods are enabled or not yet set up.

**Request**

```http
GET /multi-factor-auth-types
Authorization: Bearer <access_token>
```

**Response**

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

**What the status means:**

| Status | Name                      | Description                                                                                                                                                                                         |
|--------|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | Disabled                  | MFA method is available but not configured for the user. Protected actions are completed without additional verification.                                                                           |
| 1      | Activation is in progress | User has initiated the MFA setup process but hasn't completed verification. The method cannot be used for protected actions until verification is complete.                                         |
| 2      | Enabled                   | MFA method is fully configured and active. The system will require additional verification using this method for all protected actions and other sensitive operations defined in the configuration. |


## 2) Activating MFA (First-time Setup)

If the method status is 0 (not enabled), you need to activate MFA.

### 2.1) Trigger activation

This sends a code to the user via the selected method (for example, email).

**Request**

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

**Response**: 204 No Content — code has been sent.

### 2.2) Verify the code

After the activation request, the system sends a verification code to the user's email address (or the method specified). The user should retrieve the code from their email inbox.

{% info_block infoBox "Note" %}

💡 For email MFA, the code is typically sent to the email address associated with the authenticated user.

{% endinfo_block %}

Once the code is received, verify it using the following request. The verification code must be provided in the `X-MFA-Code` header:

**Request**

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

**Response**: 204 No Content — the MFA method is now activated and enabled.

## 3) Authenticate Using MFA Before a Protected Action

If the user already has an active method, and they attempt a protected action, you must first trigger the MFA flow.

### 3.1) Trigger MFA

This sends the MFA code via the selected method (email, etc.).

{% info_block infoBox "Note" %}

MFA codes are valid for a limited time. By default, Spryker uses a 30-minute grace period after successful MFA verification, 
during which the user can perform protected actions without re-triggering the new code sending and just entering the existing code.

In order to configure the grace period, see [Configure Code Validity Time](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-code-validity-time).

{% endinfo_block %}

**Request**

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

**Response**: 204 No Content — code has been sent.

{% info_block infoBox "Error Handling" %}

For potential errors (like when the provided MFA method is not found, etc.), see the [Error Codes](#error-codes) section at the end of this document.

{% endinfo_block %}

### 3.2) Call the protected endpoint with the MFA code

Once the code is received, include it in the `X-MFA-Code` header when calling protected endpoints.

For example, if you are changing the password, you would include the MFA code in the request header:

**Request**

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
**Response**: Get the appropriate response based on the endpoint you are calling. For example, if you are changing the password, you will receive a success message indicating that the password has been changed.

If the MFA code is missing or incorrect, you will receive an error response indicating that the MFA verification failed.

**Response**

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

{% info_block infoBox "Note" %}

To review all Glue API endpoints protected by default, visit the following link [Multi-Factor Authentication in Glue API](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication-in-glue-api.html).

{% endinfo_block %}

## 4) Deactivate an MFA Method

To remove an active MFA method, you must first [trigger the code](#3.1-trigger-mfa) (if needed), and then call the deactivation endpoint with the received code.

**Request**

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

**Response**: 204 No Content — the MFA method has been deactivated.

## Error Codes

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


