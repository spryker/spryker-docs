---
title: "Glue API: Authenticate through MFA"
description: This article explains how to retrieve an MFA methods code and send requests to protected resources
last_updated: Jun 16, 2025
template: glue-api-storefront-guide-template
---


## Grace period 

MFA codes are valid for a limited time. By default, Spryker uses a 30-minute grace period after successful MFA verification, 
during which the user can perform protected actions without re-triggering the new code sending and just entering the existing code.

In order to configure the grace period, see [Configure Code Validity Time](/docs/pbc/all/multi-factor-authentication/{{page.version}}/install-multi-factor-authentication-feature.html#configure-code-validity-time).



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