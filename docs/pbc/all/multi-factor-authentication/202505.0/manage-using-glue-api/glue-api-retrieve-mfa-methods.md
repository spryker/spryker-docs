---
title: "Glue API: Retrieve MFA methods"
description: This article explains how to retrieve available MFA methods for a user
last_updated: Jun 16, 2025
template: glue-api-storefront-guide-template
---


## Installation

- [Install the Multi-Factor Authentication feature](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html)
- [Install Customer Email Multi-Factor Authentication method](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-customer-email-multi-factor-authentication-method.html)


## Retrieve MFA methods

To retrieve MFA methods and the user's status for each of them, send the request:


---
`GET` **/stores**

---


### Request

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

| Status | Name                      | Description                                                                                                                                                                                         |
|--------|---------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 0      | Disabled                  | MFA method is available but not configured for the user. Protected actions are completed without additional verification.                                                                           |
| 1      | Activation is in progress | User has initiated the MFA setup process but hasn't completed verification. The method cannot be used for protected actions until verification is complete.                                         |
| 2      | Enabled                   | MFA method is fully configured and active. The system will require additional verification using this method for all protected actions and other sensitive operations defined in the configuration. |