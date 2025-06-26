---
title: Manage Multi-Factor Authentication using Glue API
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

This section explains how to activate, deactivate, and use Multi-Factor Authentication (MFA) when sending requests to protected resources using Glue API.

To learn more about MFA methods, see [Multi-Factor Authentication feature overview](/docs/pbc/all/multi-factor-authentication/{{page.version}}/multi-factor-authentication.html).

We use the email authentication method as an example. If you're implementing other MFA types, adapt the type field in the request payloads accordingly.


## Installation

[Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html)
[Install Customer Email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-customer-email-multi-factor-authentication-method.html)


Before you proceed, you need to know whether the user has any MFA methods configured, and whether those methods are enabled or not yet set up.




## 3) Authenticate Using MFA Before a Protected Action

If the user already has an active method, and they attempt a protected action, you must first trigger the MFA flow.





**Response**: 204 No Content — the MFA method has been deactivated.

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


